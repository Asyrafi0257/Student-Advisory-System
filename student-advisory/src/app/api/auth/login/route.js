import pool from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";

export async function POST(req) {
    try {
        const { email, password, role } = await req.json();

        if (!email || !password || !role) {
            return NextResponse.json({
                success: false,
                message: "Missing fields"
            });
        }

        let user = null;
        let tokenPayload = null;

        // ================= ADMIN =================
        if (role === "admin") {

            const [rows] = await pool.query(
                "SELECT * FROM tbl_admin WHERE admin_email = ?",
                [email]
            );

            if (rows.length === 0) {
                return NextResponse.json({
                    success: false,
                    message: "Admin not found"
                });
            }

            user = rows[0];

            const isMatch = await bcrypt.compare(password, user.admin_password);

            if (!isMatch) {
                return NextResponse.json({
                    success: false,
                    message: "Wrong password"
                });
            }

            tokenPayload = {
                id: user.admin_id,
                role: "admin",
                name: user.admin_name
            };
        }

        // ================= STUDENT =================
        else if (role === "student") {

            const [rows] = await pool.query(
                "SELECT * FROM tbl_students WHERE email_alternatif = ?",
                [email]
            );

            if (rows.length === 0) {
                return NextResponse.json({
                    success: false,
                    message: "Student not found"
                });
            }

            user = rows[0];

            const isMatch = await bcrypt.compare(password, user.stud_password);

            if (!isMatch) {
                return NextResponse.json({
                    success: false,
                    message: "Wrong password"
                });
            }

            tokenPayload = {
                id: user.stud_id,
                role: "student",
                matric: user.stud_matric
            };
        }

        // ================= MENTOR =================
        else if (role === "mentor") {

            const [rows] = await pool.query(
                "SELECT * FROM tbl_mentor WHERE mentor_email = ?",
                [email]
            );

            if (rows.length === 0) {
                return NextResponse.json({
                    success: false,
                    message: "Mentor not found"
                });
            }

            user = rows[0];

            const isMatch = await bcrypt.compare(password, user.mentor_password);

            if (!isMatch) {
                return NextResponse.json({
                    success: false,
                    message: "Wrong password"
                });
            }

            tokenPayload = {
                id: user.id,
                role: "mentor",
                staffNo: user.mentor_id
            };
        }

        else {
            return NextResponse.json({
                success: false,
                message: "Invalid role"
            });
        }

        // ================= GENERATE TOKEN =================
        const token = generateToken(tokenPayload);

        const response = NextResponse.json({
            success: true,
            role
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24
        });

        return response;

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}