import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const res = await req.json();

        const { assignments } = res;

        for (const item of assignments) {

            const [rows] = await db.query(
                "SELECT COUNT(*) as total FROM tbl_mentee_mentor WHERE mentor_id = ?",
                [item.mentor_id]
            );

            if (rows[0].total >= 5) {
                return NextResponse.json(
                    { error: `Mentor ${item.mentor_id} can only 5 mentee` },
                    { status: 400 }
                );
            }

            //check duplicate student
            const [existing] = await db.query(
                "SELECT * FROM tbl_mentee_mentor WHERE stud_matric = ?",
                [item.stud_matric]
            );

            if (existing.length > 0) {
                return NextResponse.json(
                    { error: `Student ${item.stud_matric} already have mentor` },
                    { status: 400 }
                );
            }

            await db.query(
                "INSERT INTO tbl_mentor_mentee (mentor_id, stud_matric) VALUES (?, ?)"[item.mentor_id, item.stud_matric]
            );
        }
        return NextResponse.json({ message: "Success" })
    } catch (err) {
        return NextResponse.json({ message: "Error Saving!" }, { status: 500 });
    }
}