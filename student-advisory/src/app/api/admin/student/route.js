import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const available = searchParams.get("available");

        let query = "";

        //kalau nak student yang BELUM assign
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
        //kalau nak SEMUA student
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
        return NextResponse.json({
            message: error
        });
    }
}