import pool from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";

export async function POST(req) {
    try {
        console.log("LOGIN API HIT");

        const { email, password } = await req.json();
        console.log("EMAIL RECEIVED:", email);

        // ================= ADMIN =================
        console.log("CHECK ADMIN...");
        const [adminRows] = await pool.query(
            "SELECT * FROM tbl_admin WHERE admin_email = ?",
            [email]
        );

        console.log("ADMIN FOUND:", adminRows.length);

        if (adminRows.length > 0) {
            const admin = adminRows[0];

            const isMatch = await bcrypt.compare(
                password,
                admin.admin_password
            );

            if (!isMatch) {
                return NextResponse.json({
                    success: false,
                    message: "Wrong password"
                });
            }

            const token = generateToken({
                id: admin.admin_id,
                role: "admin",
                name: admin.admin_name
            });

            const response = NextResponse.json({
                success: true,
                role: "admin"
            });

            response.cookies.set("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            return response;
        }

        // ================= STUDENT =================
        console.log("CHECK STUDENT...");
        const [studentRows] = await pool.query(
            "SELECT * FROM tbl_students WHERE email_alternatif = ?",
            [email]
        );

        console.log("STUDENT FOUND:", studentRows.length);

        if (studentRows.length > 0) {
            const student = studentRows[0];

            const isMatch = await bcrypt.compare(
                password,
                student.stud_password
            );

            if (!isMatch) {
                return NextResponse.json({
                    success: false,
                    message: "Wrong password"
                });
            }

            const token = generateToken({
                id: student.stud_id,
                role: "student",
                matric: student.stud_matric
            });

            const response = NextResponse.json({
                success: true,
                role: "student"
            });

            response.cookies.set("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            return response;
        }

        // ================= MENTOR =================
        console.log("CHECK MENTOR...");
        const [mentorRows] = await pool.query(
            "SELECT * FROM tbl_mentor WHERE mentor_email = ?",
            [email]
        );

        console.log("MENTOR FOUND:", mentorRows.length);

        if (mentorRows.length > 0) {
            const mentor = mentorRows[0];

            const isMatch = await bcrypt.compare(
                password,
                mentor.mentor_password
            );

            if (!isMatch) {
                return NextResponse.json({
                    success: false,
                    message: "Wrong password"
                });
            }

            const token = generateToken({
                id: mentor.id,
                role: "mentor",
                staffNo: mentor.mentor_id
            });

            const response = NextResponse.json({
                success: true,
                role: "mentor"
            });

            response.cookies.set("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });

            return response;
        }

        // ================= NO USER =================
        return NextResponse.json({
            success: false,
            message: "User not found"
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}