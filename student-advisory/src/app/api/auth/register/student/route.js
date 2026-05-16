import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { stud_email, stud_matric, stud_password, stud_confirmPassword } = await req.json();

        //check password match
        if (stud_password !== stud_confirmPassword) {
            return NextResponse.json({
                success: false,
                message: "Password not match"
            });
        }

        //check matric number student
        const [rows] = await pool.query(
            `SELECT * FROM tbl_students 
             WHERE stud_matric = ?`,
            [stud_matric]
        );

        if (rows.length === 0) {
            return NextResponse.json({
                success: false,
                message: "Matric not found in system"
            });
        }

        const user = rows[0];

        //check already activated
        if (user.stud_password) {
            return NextResponse.json({
                success: false,
                message: "Account already activated"
            });
        }

        // 4. hash password
        const hashedPassword = await bcrypt.hash(stud_password, 10);

        // 5. update student
        await pool.query(
            `UPDATE tbl_students 
             SET stud_password = ?, email_alternatif = ?
             WHERE stud_matric = ?`,
            [hashedPassword, stud_email, stud_matric]
        );


        return NextResponse.json({
            success: true,
            message: "Account activated successfully"
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Server error"
        });
    }
}