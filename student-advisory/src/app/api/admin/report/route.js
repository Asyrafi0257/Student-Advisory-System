import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        verifyToken(token);

        const [report] = await pool.query(`
            SELECT 
                r.mentor_id,
                r.report_id,
                r.report_imagePath,
                r.report_title,
                r.report_date,
                r.report_location,
                r.created_at,
                m.mentor_name
            FROM tbl_report r
            INNER JOIN tbl_mentor m 
                ON r.mentor_id = m.id
            ORDER BY r.created_at DESC
        `);

        return NextResponse.json(report);

    } catch (err) {
        return NextResponse.json(
            {
                success: false,
                message: "Server problem",
            },
            { status: 500 }
        );
    }
}