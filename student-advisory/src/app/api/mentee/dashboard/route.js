import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {

    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, { status: 401 });
        }

        const decoded = verifyToken(token);

        const stud_id = decoded.id;

        const [mentor] = await pool.query(
            `SELECT m.mentor_id, m.mentor_name, m.mentor_email, m.mentor_imagePath, mm.id, mm.mentor_id FROM tbl_mentor m INNER JOIN tbl_mentor_mentee mm ON m.id = mm.mentor_id WHERE mm.stud_id = ?`, [stud_id]
        )

        return NextResponse.json({
            success: true,
            mentor: mentor[0]
        })
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