import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req) {
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
        const { mentor_id, mentor_name, mentor_active } = await req.json();

        const [rows] = await pool.execute(
            "INSERT INTO tbl_mentor (mentor_id, mentor_name, mentor_active) VALUES(?, ?, ?)", [mentor_id, mentor_name, mentor_active]
        )

        return NextResponse.json({ message: "success" });
    } catch (err) {
        return NextResponse.json({ message: err, status: 500 });
    }
}