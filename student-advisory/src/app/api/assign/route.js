import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { assignments } = await req.json();

        if (!assignments || !Array.isArray(assignments)) {
            return NextResponse.json(
                { error: "Invalid payload" },
                { status: 400 }
            );
        }

        for (const item of assignments) {
            const { mentor_id, stud_id } = item;

            if (!mentor_id || !stud_id) {
                continue; // skip invalid data
            }

            // 1. Check total mentee for mentor (limit 10)
            const [countRows] = await pool.query(
                "SELECT COUNT(*) as total FROM tbl_mentor_mentee WHERE mentor_id = ?",
                [mentor_id]
            );

            if (countRows[0].total >= 10) {
                continue; // skip kalau dah full
            }

            // 2. Check duplicate student assignment
            const [existing] = await pool.query(
                "SELECT * FROM tbl_mentor_mentee WHERE stud_id = ?",
                [stud_id]
            );

            if (existing.length > 0) {
                continue; // skip kalau student dah ada mentor
            }

            // 3. Insert assignment
            await pool.execute(
                "INSERT INTO tbl_mentor_mentee (mentor_id, stud_id) VALUES (?, ?)",
                [mentor_id, stud_id]
            );
        }

        return NextResponse.json({
            message: "Assignments saved successfully"
        });

    } catch (err) {
        //console.error("POST /assign error:", err);

        return NextResponse.json(
            { error: "Server error while saving assignments" },
            { status: 500 }
        );
    }
}