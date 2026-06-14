import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        try {
            verifyToken(token);
        } catch (err) {
            const response = NextResponse.json(
                { message: "Token expired or invalid" },
                { status: 401 }
            );

            response.cookies.set("token", "", {
                path: "/",
                expires: new Date(0),
            });

            return response;
        }

        const { id } = await params;

        const [rows] = await pool.query(
            `SELECT * FROM tbl_mentor WHERE id = ?`,
            [id]
        );

        return NextResponse.json(rows[0]);

    } catch (err) {
        return NextResponse.json(
            {
                message: "Error fetching mentor",
                error: err.message
            },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        // ================= TOKEN =================
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        try {
            verifyToken(token);
        } catch (err) {
            const response = NextResponse.json(
                { message: "Token expired or invalid" },
                { status: 401 }
            );

            response.cookies.set("token", "", {
                path: "/",
                expires: new Date(0),
            });

            return response;
        }

        const { id } = await params;

        const body = await req.json();

        const {
            mentor_id,
            mentor_name,
            mentor_active
        } = body;

        // ================= 1. UPDATE MENTOR =================
        await conn.query(
            `
            UPDATE tbl_mentor
            SET mentor_id = ?, mentor_name = ?, mentor_active = ?
            WHERE id = ?
            `,
            [mentor_id, mentor_name, mentor_active, id]
        );

        // ================= 2. AUTO REASSIGN IF INACTIVE =================
        if (mentor_active === "inactive") {

            // get all mentees
            const [mentees] = await conn.query(
                `
                SELECT stud_id 
                FROM tbl_mentor_mentee 
                WHERE mentor_id = ? AND status = 'active'
                `,
                [id]
            );

            if (mentees.length > 0) {

                // get available mentors (least load)
                const [mentors] = await conn.query(
                    `
                    SELECT m.id, COUNT(mm.stud_id) AS total
                    FROM tbl_mentor m
                    LEFT JOIN tbl_mentor_mentee mm 
                        ON m.id = mm.mentor_id AND mm.status = 'active'
                    WHERE m.mentor_active = 'active' AND m.id != ?
                    GROUP BY m.id
                    ORDER BY total ASC
                    `,
                    [id]
                );

                if (mentors.length === 0) {
                    throw new Error("No available mentor for reassignment");
                }

                let index = 0;

                for (let mentee of mentees) {

                    let newMentor = mentors[index % mentors.length];

                    // update current relationship
                    await conn.query(
                        `
                        UPDATE tbl_mentor_mentee
                        SET mentor_id = ?
                        WHERE stud_id = ? AND status = 'active'
                        `,
                        [newMentor.id, mentee.stud_id]
                    );

                    // insert history
                    await conn.query(
                        `
                        INSERT INTO tbl_mentor_mentee_history
                        (mentor_id, stud_id, old_mentor_id, new_mentor_id, action, created_at)
                        VALUES (?, ?, ?, ?, ?, NOW())
                        `,
                        [
                            id,                // mentor_id
                            mentee.stud_id,    // stud_id
                            id,                // old_mentor_id
                            newMentor.id,      // new_mentor_id
                            "auto_reassign"    // action
                        ]
                    );

                    index++;
                }
            }
        }

        await conn.commit();

        return NextResponse.json({
            message: "Mentor updated and reassignment handled successfully"
        });

    } catch (err) {

        await conn.rollback();

        return NextResponse.json(
            {
                message: "Error updating mentor",
                error: err.message
            },
            { status: 500 }
        );

    } finally {
        conn.release();
    }
}