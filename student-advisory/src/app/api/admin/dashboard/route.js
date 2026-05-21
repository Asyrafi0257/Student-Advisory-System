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

        // ACTIVE / INACTIVE
        const [mentorActive] = await pool.query(`
            SELECT 
                SUM(CASE WHEN mentor_active = 'active' THEN 1 ELSE 0 END) AS activeMentors,
                SUM(CASE WHEN mentor_active = 'inactive' THEN 1 ELSE 0 END) AS inactiveMentors
            FROM tbl_mentor
        `);

        // GROUP MENTOR BASED ON TOTAL STUDENTS
        const [mentorStudents] = await pool.query(`
            SELECT 
                totalStudents,
                GROUP_CONCAT(mentor_name SEPARATOR ', ') AS mentors,
                GROUP_CONCAT(id SEPARATOR ',') AS mentorIds
            FROM (

                SELECT 
                    m.id,
                    m.mentor_name,
                    COUNT(mm.stud_id) AS totalStudents
                FROM tbl_mentor m

                LEFT JOIN tbl_mentor_mentee mm
                    ON mm.mentor_id = m.id

                GROUP BY m.id

            ) grouped

            GROUP BY totalStudents
            ORDER BY totalStudents ASC
        `);

        // LIST OF MENTEE
        const [mentees] = await pool.query(`
            SELECT 
                s.stud_id,
                s.stud_imagePath,
                s.stud_name,
                mm.mentor_id
            FROM tbl_mentor_mentee mm
            JOIN tbl_students s
                ON s.stud_id = mm.stud_id
        `);

        return NextResponse.json({
            students: studentCount[0].totalStudents,
            mentors: mentorCount[0].totalMentors,
            activeMentor: mentorActive[0].activeMentors,
            deactiveMentor: mentorActive[0].inactiveMentors,

            mentorStudents,

            mentees,

        });

    } catch (error) {

        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: 500
            }
        );

    }

}