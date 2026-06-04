import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(req) {
    try {

        // =========================
        // CHECK TOKEN
        // =========================
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized"
                },
                { status: 401 }
            );
        }

        let decoded;

        try {
            decoded = verifyToken(token);
        } catch (err) {

            const response = NextResponse.json(
                { message: "Token expired or invalid" },
                { status: 401 }
            );

            response.cookies.set("token", "", {
                path: "/",
                expires: new Date(0),
            });

            return response;
        }

        // =========================
        // GET MENTOR ID
        // =========================
        const mentor_id = decoded.id;

        // =========================
        // GET FORMDATA
        // =========================
        const formData = await req.formData();

        const title = formData.get("title");
        const date = formData.get("date");
        const location = formData.get("location");
        const image = formData.get("image");

        // =========================
        // VALIDATION
        // =========================
        if (!title || !date || !location || !image) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please fill all required fields"
                },
                { status: 400 }
            );
        }

        // image type validation
        if (
            !image.name.endsWith(".png") &&
            !image.name.endsWith(".jpg") &&
            !image.name.endsWith(".jpeg")
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Only PNG, JPG, JPEG allowed"
                },
                { status: 400 }
            );
        }

        // image size validation (5MB)
        if (image.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Image too large (max 5MB)"
                },
                { status: 400 }
            );
        }

        // =========================
        // CONVERT IMAGE
        // =========================
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // =========================
        // GENERATE FILE NAME
        // =========================
        const fileName = `${Date.now()}-${image.name}`;

        // =========================
        // CREATE FOLDER
        // =========================
        const uploadDir = path.join(
            process.cwd(),
            "public/uploads/report"
        );

        await mkdir(uploadDir, { recursive: true });

        // =========================
        // FILE PATH
        // =========================
        const imagePath = path.join(uploadDir, fileName);

        // =========================
        // SAVE IMAGE
        // =========================
        await writeFile(imagePath, buffer);

        // path untuk database/frontend
        const dbPath = `/uploads/report/${fileName}`;

        // =========================
        // INSERT DATABASE
        // =========================
        const [result] = await pool.query(
            `INSERT INTO tbl_report
            (
                mentor_id,
                report_imagePath,
                report_title,
                report_date,
                report_location
            )
            VALUES (?, ?, ?, ?, ?)`,
            [
                mentor_id,
                dbPath,
                title,
                date,
                location
            ]
        );

        // =========================
        // SUCCESS
        // =========================
        return NextResponse.json({
            success: true,
            message: "Report session successfully",
            report_id: result.insertId,
            image: dbPath
        });

    } catch (err) {

        console.error(err);

        return NextResponse.json(
            {
                success: false,
                message: "Upload failed"
            },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized"
                },
                { status: 401 }
            );
        }

        let decoded;

        try {
            decoded = verifyToken(token);
        } catch (err) {

            const response = NextResponse.json(
                { message: "Token invalid or expired" },
                { status: 401 }
            );

            response.cookies.set("token", "", {
                path: "/",
                expires: new Date(0),
            });

            return response;
        }

        const mentor_id = decoded.id;

        const [rows] = await pool.query(
            `SELECT * FROM tbl_report
             WHERE mentor_id = ?
             ORDER BY created_at DESC`,
            [mentor_id]
        );

        return NextResponse.json({
            success: true,
            rows
        });

    } catch (err) {

        console.error(err);

        return NextResponse.json(
            {
                success: false,
                message: "Server Error"
            },
            { status: 500 }
        );
    }
}