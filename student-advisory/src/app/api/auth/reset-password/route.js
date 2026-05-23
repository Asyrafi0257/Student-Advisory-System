import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";

export async function POST(req) {

    try {

        const { newPass, token } = await req.json();

        // verify token
        const decode = verifyToken(token);

        if (!decode) {
            return NextResponse.json({
                success: false,
                message: "Invalid token"
            });
        }

        // ambil data dari token
        const email = decode.email;
        const role = decode.role;

        // hash password
        const hashPassword = await bcrypt.hash(newPass, 10);

        // ================= ADMIN =================
        if (role === "admin") {

            await pool.query(
                "UPDATE tbl_admin SET admin_password = ? WHERE admin_email = ?",
                [hashPassword, email]
            );
        }

        // ================= STUDENT =================
        else if (role === "student") {

            await pool.query(
                "UPDATE tbl_students SET stud_password = ? WHERE email_alternatif = ?",
                [hashPassword, email]
            );
        }

        // ================= MENTOR =================
        else if (role === "mentor") {

            await pool.query(
                "UPDATE tbl_mentor SET mentor_password = ? WHERE mentor_email = ?",
                [hashPassword, email]
            );
        }

        // invalid role
        else {
            return NextResponse.json({
                success: false,
                message: "Invalid role"
            });
        }

        return NextResponse.json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {

        return NextResponse.json({
            success: false,
            error: error.message
        });

    }
}