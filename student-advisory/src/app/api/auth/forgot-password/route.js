import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { generateToken } from "@/lib/jwt";
import { sendResetEmail } from "@/lib/email";

export async function POST(req) {
    try {

        const { resetEmail } = await req.json();

        let user = null;
        let role = null;

        // ================= ADMIN =================
        const [admin] = await pool.query(
            "SELECT * FROM tbl_admin WHERE admin_email = ?",
            [resetEmail]
        );

        if (admin.length > 0) {
            user = admin[0];
            role = "admin";
        }

        // ================= STUDENT =================
        if (!user) {
            const [student] = await pool.query(
                "SELECT * FROM tbl_students WHERE email_alternatif = ?",
                [resetEmail]
            );

            if (student.length > 0) {
                user = student[0];
                role = "student";
            }
        }

        // ================= MENTOR =================
        if (!user) {
            const [mentor] = await pool.query(
                "SELECT * FROM tbl_mentor WHERE mentor_email = ?",
                [resetEmail]
            );

            if (mentor.length > 0) {
                user = mentor[0];
                role = "mentor";
            }
        }

        // ================= NOT FOUND =================
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Email not found"
            });
        }

        // generate token (secure)
        const token = generateToken({
            email: resetEmail,
            role
        });

        const resetLink =
            //`http://localhost:3000/reset-password?token=${token}`;
            `https://soc-advisory.my/reset-password?token=${token}`;
        await sendResetEmail(resetEmail, resetLink);

        return NextResponse.json({
            success: true,
            message: "Reset email sent"
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        });
    }
}