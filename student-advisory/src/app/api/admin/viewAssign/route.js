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
                m.mentor_name AS mentor,
                s.stud_name AS mentee
            FROM tbl_mentor_mentee mm
            JOIN tbl_mentor m ON mm.mentor_id = m.id
            JOIN tbl_students s ON mm.stud_id = s.stud_id
            ORDER BY m.mentor_name
        `);

        return NextResponse.json(rows);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}