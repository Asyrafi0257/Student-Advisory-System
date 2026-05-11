import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/jwt";

export async function GET(req) {
    try {

        const token = req.cookies.get("token")?.value;

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

export async function PUT(req) {
    try {

        const token = req.cookies.get("token")?.value;

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

        if (file && file.name) {

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const path = `/uploads/profile/${Date.now()}-${file.name}`;

            const fs = require("fs");

            fs.writeFileSync(`./public${path}`, buffer);

            profilePath = path;
        }

        // ================= ADMIN =================
        if (decoded.role === "admin") {

            const admin_name = formData.get("admin_name");
            const email = formData.get("admin_email");
            //const password = formData.get("admin_password");

            let query = `
                UPDATE tbl_admin
                SET admin_name = ?, admin_email = ?
            `;

            let values = [admin_name, email];

            // if (password) {
            //     query += ", admin_password = ?";
            //     values.push(password);
            // }

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
            // const password = formData.get("mentor_password");

            let query = `
                UPDATE tbl_mentor
                SET mentor_name = ?, mentor_email = ?
            `;

            let values = [mentor_name, email];

            // if (password) {
            //     query += ", mentor_password = ?";
            //     values.push(password);
            // }

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

        return NextResponse.json(
            { message: "Invalid role" },
            { status: 403 }
        );

    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}