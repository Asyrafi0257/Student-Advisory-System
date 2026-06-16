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

        const decoded = verifyToken(token);
        const stud_id = decoded.id;

        // ================= GET HISTORY DATA =================
        const [rows] = await pool.query(`
            SELECT 
                h.id,
                h.mentor_id,
                h.stud_id,
                m.mentor_name,
                m.mentor_active,
                h.action,
                h.created_at
            FROM tbl_mentor_mentee_history h
            LEFT JOIN tbl_mentor m 
                ON h.mentor_id = m.id
            WHERE h.stud_id = ?
            ORDER BY h.created_at ASC
        `, [stud_id]);

        // ================= RESPONSE =================
        return NextResponse.json(
            {
                message: "Success",
                rows
            },
            { status: 200 }
        );

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