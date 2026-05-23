import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";


export async function GET(req) {
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, { status: 401 });
        }

        const decoded = verifyToken(token);

        const mentor_id = decoded.id;

        const [rows] = await pool.query(
            `SELECT s.stud_name, s.stud_matric,s.program, s.stud_imagePath, s.inasis, s.no_phone, s.email_alternatif, mm.mentor_id, mm.id
             FROM tbl_students s
             INNER JOIN tbl_mentor_mentee mm ON s.stud_id = mm.stud_id
             WHERE mm.mentor_id = ?
            `, [mentor_id]
        );

        const [totalMentee] = await pool.query(
            `SELECT COUNT(*) AS total
             FROM tbl_mentor_mentee
             WHERE mentor_id = ?`,
            [mentor_id]
        );
        const [totalStudCs] = await pool.query(
            `SELECT 
                SUM(CASE WHEN s.program = 'Bachelor of Science Computer' THEN 1 ELSE 0 END) AS studCs,
                SUM(CASE WHEN s.program = 'Bachelor of Information Technology' THEN 1 ELSE 0 END) AS studIt
            FROM tbl_students s
            INNER JOIN tbl_mentor_mentee mm ON s.stud_id = mm.stud_id
            WHERE mm.mentor_id = ?
            `, [mentor_id]
        )

        return NextResponse.json({
            success: true,
            rows,
            totalMentee: totalMentee[0].total,
            totalCs: totalStudCs[0].studCs,
            totalIt: totalStudCs[0].studIt

        });

    } catch (err) {

        // JWT ERROR
        if (
            err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError"
        ) {

            const response = NextResponse.json(
                { message: "Token invalid or expired" },
                { status: 401 }
            );

            response.cookies.set("token", "", {
                path: "/",
                expires: new Date(0),
            });

            return response;
        }

        // SERVER ERROR
        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        );
    }
}