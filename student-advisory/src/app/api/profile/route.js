import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function GET(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decoded = verifyToken(token);

        // ================= ADMIN =================
        if (decoded.role === "admin") {
            const [rows] = await pool.query(
                "SELECT admin_name, admin_email, admin_imagePath FROM tbl_admin WHERE admin_id = ?",
                [decoded.id]
            );

            return NextResponse.json({
                role: "admin",
                name: rows[0].admin_name,
                email: rows[0].admin_email,
                image: rows[0].admin_imagePath,
            });
        }

        // ================= MENTOR =================
        if (decoded.role === "mentor") {
            const [rows] = await pool.query(
                "SELECT mentor_id, mentor_name, mentor_email, mentor_imagePath FROM tbl_mentor WHERE id = ?",
                [decoded.id]
            );

            return NextResponse.json({
                role: "mentor",
                id: rows[0].mentor_id,
                name: rows[0].mentor_name,
                email: rows[0].mentor_email,
                image: rows[0].mentor_imagePath,
            });
        }

        // ================= STUDENT =================
        if (decoded.role === "student") {
            const [rows] = await pool.query(
                "SELECT * FROM tbl_students WHERE stud_id = ?",
                [decoded.id]
            );

            const student = rows[0];

            return NextResponse.json({
                role: "student",
                id: student.stud_id,
                matric: student.stud_matric,
                name: student.stud_name,
                email: student.email_alternatif,
                program: student.program,
                gender: student.gender,
                code_uum: student.code_uum,
                academic_qualifications: student.academic_qualifications,
                pmk_masuk: student.pmk_masuk,
                band_muet: student.band_muet,
                status_oku: student.status_oku,
                inasis: student.inasis,
                no_phone: student.no_phone,
                email_uum: student.email_uum,
                stud_address: student.stud_address,
                state: student.state,
                parent_income: student.parent_income,
                disability: student.disability_description,
                image: student.stud_imagePath
            });
        }

        return NextResponse.json({ message: "Invalid role" }, { status: 403 });

    } catch (err) {
        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const decoded = verifyToken(token);

        const formData = await req.formData();

        const file = formData.get("profile");

        let profilePath = null;

        // ================= IMAGE UPLOAD (PHONE FIX ADDED ONLY) =================
        if (file && file.size > 0) {

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            console.log(file);
            console.log(file.size);
            console.log(file.name);
            console.log(buffer.length);

            let folder = "profile";

            if (decoded.role === "admin") folder = "admin";
            if (decoded.role === "mentor") folder = "mentor";
            if (decoded.role === "student") folder = "mentee";

            const fs = require("fs");

            // CREATE FOLDER IF NOT EXISTS
            fs.mkdirSync(`./public/uploads/profile/${folder}`, { recursive: true });

            // ================= PHONE FIX START =================
            const ext = file.type?.split("/")[1] || "jpg";

            const fileName = `${Date.now()}.${ext}`;
            const filePath = `/uploads/profile/${folder}/${fileName}`;

            //ni simpan dalam server
            fs.writeFileSync(`./public/${filePath}`, buffer);

            profilePath = filePath;
        }

        // ================= ADMIN =================
        if (decoded.role === "admin") {

            const admin_name = formData.get("admin_name");
            const email = formData.get("admin_email");

            let query = `
                UPDATE tbl_admin
                SET admin_name = ?, admin_email = ?
            `;

            let values = [admin_name, email];

            if (profilePath) {
                query += ", admin_imagePath = ?";
                values.push(profilePath);
            }

            query += " WHERE admin_id = ?";
            values.push(decoded.id);

            await pool.query(query, values);

            return NextResponse.json({
                message: "Admin updated successfully"
            });
        }

        // ================= MENTOR =================
        if (decoded.role === "mentor") {

            const mentor_name = formData.get("mentor_name");
            const email = formData.get("mentor_email");

            let query = `
                UPDATE tbl_mentor
                SET mentor_name = ?, mentor_email = ?
            `;

            let values = [mentor_name, email];

            if (profilePath) {
                query += ", mentor_imagePath = ?";
                values.push(profilePath);
            }

            query += " WHERE id = ?";
            values.push(decoded.id);

            await pool.query(query, values);

            return NextResponse.json({
                message: "Mentor updated successfully"
            });
        }

        // ================= STUDENT =================
        if (decoded.role === "student") {

            const name = formData.get("stud_name");
            const email = formData.get("stud_email");
            const program = formData.get("program");
            const gender = formData.get("gender");
            const code = formData.get("code_uum");
            const academic = formData.get("academic_qualifications");
            const pmk = Number(formData.get("pmk_masuk")) || 0;
            const band_muet = Number(formData.get("band_muet")) || 0;
            const status_oku = formData.get("status_oku");
            const inasis = formData.get("inasis");
            const phone = formData.get("no_phone");
            const email_uum = formData.get("email_uum");
            const address = formData.get("student_address");
            const state = formData.get("state");
            const parent_income = formData.get("parent_income");
            const disability = formData.get("disability");

            let query = `
                UPDATE tbl_students SET
                    stud_name = ?,
                    email_alternatif = ?,
                    program = ?,
                    gender = ?,
                    code_uum = ?,
                    academic_qualifications = ?,
                    pmk_masuk = ?,
                    band_muet = ?,
                    status_oku = ?,
                    inasis = ?,
                    no_phone = ?,
                    email_uum = ?,
                    stud_address = ?,
                    state = ?,
                    parent_income = ?,
                    disability_description = ?
            `;

            let values = [
                name,
                email,
                program,
                gender,
                code,
                academic,
                pmk,
                band_muet,
                status_oku,
                inasis,
                phone,
                email_uum,
                address,
                state,
                parent_income,
                disability
            ];

            if (profilePath) {
                query += ", stud_imagePath = ?";
                values.push(profilePath);
            }

            query += " WHERE stud_id = ?";
            values.push(decoded.id);

            await pool.query(query, values);

            return NextResponse.json({
                message: "Student updated successfully"
            });
        }

        return NextResponse.json(
            { message: "Invalid role" },
            { status: 403 }
        );

    } catch (err) {
        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        );
    }
}