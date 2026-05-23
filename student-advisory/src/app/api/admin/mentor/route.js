import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {

    try {

        // ================= VERIFY TOKEN =================
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
        const [rows] = await pool.query(
            "SELECT * FROM tbl_mentor ORDER BY mentor_id"
        );

        return NextResponse.json({ rows });

    } catch (err) {

        return NextResponse.json(
            {
                message: err.message
            },
            {
                status: 500
            }
        );
    }
}