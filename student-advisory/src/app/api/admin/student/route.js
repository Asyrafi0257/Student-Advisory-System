import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET(req) {
    try {

        // ================= TOKEN CHECK =================
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

        // ================= API LOGIC =================
        const { searchParams } = new URL(req.url);
        const available = searchParams.get("available");

        let query = "";

        // student belum assign mentor
        if (available === "true") {
            query = `
                SELECT *
                FROM tbl_students s
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM tbl_mentor_mentee mm
                    WHERE mm.stud_id = s.stud_id
                )
                ORDER BY s.stud_matric
            `;
        }

        // semua student
        else {
            query = `
                SELECT *
                FROM tbl_students
                ORDER BY stud_matric
            `;
        }

        const [rows] = await pool.query(query);

        return NextResponse.json({ rows });

    } catch (error) {

        return NextResponse.json(
            {
                message: error.message
            },
            {
                status: 500
            }
        );
    }
}