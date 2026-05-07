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

        const [rows] = await pool.query(
            "SELECT admin_name, admin_email, admin_imagePath FROM tbl_admin WHERE admin_id = ?",
            [decoded.id]
        );

        return NextResponse.json(rows[0]);

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
        const decoded = verifyToken(token);

        const formData = await req.formData();

        const admin_name = formData.get("admin_name");
        const email = formData.get("admin_email");
        const password = formData.get("admin_password");
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

        let query = `
            UPDATE tbl_admin
            SET admin_name = ?, admin_email = ?
        `;

        let values = [admin_name, email];

        if (password) {
            query += ", admin_password = ?";
            values.push(password);
        }

        if (profilePath) {
            query += ", admin_imagePath = ?";
            values.push(profilePath);
        }

        query += " WHERE admin_id = ?";
        values.push(decoded.id);

        await pool.query(query, values);

        return NextResponse.json({ message: "Updated successfully" });

    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}