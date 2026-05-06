import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
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