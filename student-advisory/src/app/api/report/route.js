import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { writeFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(req) {
    try {

        // ambil token
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            });
        }

        // verify token
        const decoded = verifyToken(token);

        // ambil mentor_id
        const mentor_id = decoded.id;

        // ambil formData
        const formData = await req.formData();

        // ambil semua field
        const title = formData.get("title");
        const date = formData.get("date");
        const location = formData.get("location");
        const image = formData.get("image");

        // validate
        if (!title || !date || !location || !image) {
            return NextResponse.json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        // convert image ke buffer
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // generate nama file
        const fileName = `${Date.now()}-${image.name}`;

        // path simpan image
        const imagePath = path.join(
            process.cwd(),
            "public/uploads/report",
            fileName
        );

        // simpan image
        await writeFile(imagePath, buffer);

        // save database
        const [result] = await pool.query(
            `INSERT INTO tbl_report
            (mentor_id, report_imagePath, report_title, report_date, report_location)
            VALUES (?, ?, ?, ?, ?)`,
            [
                mentor_id,
                `/uploads/${fileName}`,
                title,
                date,
                location
            ]
        );

        return NextResponse.json({
            success: true,
            message: "Report session successfully",
            report_id: result.insertId
        });

    } catch (err) {

        console.log(err);

        return NextResponse.json({
            success: false,
            message: "Server Error"
        }, {
            status: 500
        });
    }
}