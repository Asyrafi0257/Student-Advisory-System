import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        // ❌ no token
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        let decoded;

        // ❌ invalid / expired token
        try {
            decoded = verifyToken(token);
        } catch (err) {

            const response = NextResponse.json(
                { message: "Token expired or invalid" },
                { status: 401 }
            );

            // clear cookie properly
            response.cookies.set("token", "", {
                path: "/",
                expires: new Date(0),
            });

            return response;
        }
        const [rows] = await pool.query(`
            SELECT 
                mm.stud_id,
                mm.id,
                m.mentor_name AS mentor,
                s.stud_name AS mentee
            FROM tbl_mentor_mentee mm
            JOIN tbl_mentor m ON mm.mentor_id = m.id
            JOIN tbl_students s ON mm.stud_id = s.stud_id
            WHERE m.mentor_active = 'active'
            ORDER BY m.mentor_name
        `);

        return NextResponse.json(rows);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        //ambil token dulu
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value

        //check ada token ke tak
        if (!token) {
            return NextResponse.json(
                { message: "unauthorized" },
                { status: 401 }
            )
        }

        let decoded;

        // ❌ invalid / expired token
        try {
            decoded = verifyToken(token);
        } catch (err) {

            const response = NextResponse.json(
                { message: "Token expired or invalid" },
                { status: 401 }
            );

            // clear cookie properly
            response.cookies.set("token", "", {
                path: "/",
                expires: new Date(0),
            });

            return response;
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        //check id valid ke tak
        if (!id) {
            return NextResponse.json(
                { message: "User id not found" },
                { status: 400 }
            )
        }

        //ambil dulu data mentee
        const [mentee] = await pool.query(
            "SELECT * FROM tbl_mentor_mentee WHERE stud_id = ?", [id]
        )

        //check jika ada data mentee dalam database
        if (mentee.length === 0) {
            return NextResponse.json(
                { message: "Id mentee not found" },
                { status: 404 }
            )
        }

        //delete data mentee dari database
        await pool.execute(
            "DELETE FROM tbl_mentor_mentee WHERE stud_id = ?", [id]
        )

        return NextResponse.json(
            { message: "mentee deleted successfully" }
        )

    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "mentee failed to delete!" },
            { status: 500 }
        )
    }
}

