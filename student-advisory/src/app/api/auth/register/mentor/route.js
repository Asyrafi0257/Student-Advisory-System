import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const {
            mentor_email,
            mentor_no,
            mentor_password,
            mentor_confirmPassword
        } = await req.json();

        console.log("MENTOR REGISTER HIT:", mentor_email, mentor_no);

        // check password
        if (mentor_password !== mentor_confirmPassword) {
            return NextResponse.json({
                success: false,
                message: "Password not match"
            });
        }

        // check staff 
        const [staff] = await pool.query(
            "SELECT * FROM tbl_mentor WHERE mentor_id = ?",
            [mentor_no]
        );

        if (staff.length === 0) {
            return NextResponse.json({
                success: false,
                message: "Staff number not found in system"
            });
        }

        // check email dh guna blm
        const [existingEmail] = await pool.query(
            "SELECT * FROM tbl_mentor WHERE mentor_email = ?",
            [mentor_email]
        );

        if (existingEmail.length > 0) {
            return NextResponse.json({
                success: false,
                message: "Email already in use"
            });
        }
        const hashPassword = await bcrypt.hash(mentor_password, 10);

        // update email dengan password bila jumpa mentor_id dalam db
        await pool.query(
            `UPDATE tbl_mentor
             SET mentor_email = ?, mentor_password = ?
             WHERE mentor_id = ?`,
            [mentor_email, hashPassword, mentor_no]
        );

        return NextResponse.json({
            success: true,
            message: "Account activated successfully"
        });

    } catch (err) {
        console.error("MENTOR REGISTER ERROR:", err);

        return NextResponse.json({
            success: false,
            message: "Server error"
        });
    }
}