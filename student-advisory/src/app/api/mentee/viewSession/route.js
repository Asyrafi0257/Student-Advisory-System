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

        const stud_id = decoded.id;

        const [session] = await pool.query(
            "SELECT s.session_id, s.session_title, s.session_description, s.session_date, s.session_location, s.session_type, s.session_start_time, s.session_end_time, mm.stud_id, mm.id, mm.mentor_id FROM tbl_session s INNER JOIN tbl_mentor_mentee mm ON s.mentor_id = mm.mentor_id WHERE mm.stud_id = ? ORDER BY session_date DESC;", [stud_id]
        )

        return NextResponse.json({
            success: true,
            session
        });

    } catch (err) {
        return NextResponse.json({
            success: false,
            message: "server Error",
            status: 500
        })
    }
}