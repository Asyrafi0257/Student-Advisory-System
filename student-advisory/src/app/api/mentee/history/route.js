import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {
    try {
        // ================= GET TOKEN =================
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // ================= VERIFY TOKEN =================
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

        // ================= GET HISTORY DATA =================
        const [rows] = await pool.query(`
            SELECT 
                h.id,
                h.mentor_id,
                m.mentor_name,
                m.mentor_active,
                h.action,
                h.created_at
            FROM tbl_mentor_mentee_history h
            LEFT JOIN tbl_mentor m 
                ON h.mentor_id = m.id
            ORDER BY h.created_at ASC
        `);

        // ================= RESPONSE =================
        return NextResponse.json(
            {
                message: "Success",
                data: rows
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("GET HISTORY ERROR:", error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}