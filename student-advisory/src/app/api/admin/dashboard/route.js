import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [studentCount] = await pool.query(
            "SELECT COUNT(*) AS totalStudents FROM tbl_students"
        );

        const [mentorCount] = await pool.query(
            "SELECT COUNT(*) AS totalMentors FROM tbl_mentor"
        );
        const [mentorActive] = await pool.query(`
            SELECT 
                SUM(CASE WHEN mentor_active = 'active' THEN 1 ELSE 0 END) AS activeMentors,
                SUM(CASE WHEN mentor_active = 'inactive' THEN 1 ELSE 0 END) AS inactiveMentors
            FROM tbl_mentor
        `);

        return NextResponse.json({
            students: studentCount[0].totalStudents,
            mentors: mentorCount[0].totalMentors,
            activeMentor: mentorActive[0].activeMentors,
            deactiveMentor: mentorActive[0].inactiveMentors,
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}