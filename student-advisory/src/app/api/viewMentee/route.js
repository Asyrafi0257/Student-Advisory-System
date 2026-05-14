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

        const mentor_id = decoded.id;

        const [rows] = await pool.query(
            `SELECT s.stud_name, s.stud_matric,s.program, s.stud_imagePath, s.inasis, s.no_phone, s.email_alternatif, mm.mentor_id, mm.id
             FROM tbl_students s
             INNER JOIN tbl_mentor_mentee mm ON s.stud_id = mm.stud_id
             WHERE mm.mentor_id = ?
            `, [mentor_id]
        );

        return NextResponse.json({
            success: true,
            rows
        });

    } catch (err) {

        console.log(err);

        return NextResponse.json({
            success: false,
            message: "Server Error"
        }, { status: 500 });
    }
}