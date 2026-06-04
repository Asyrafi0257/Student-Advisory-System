import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { writeFile, mkdir } from "fs/promises"; // tambah mkdir
import path from "path";
import * as XLSX from "xlsx";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
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

        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json(
                { error: "No file Uploaded" },
                { status: 400 }
            );
        }

        if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
            return NextResponse.json(
                { error: "Only .xlsx and .xls files allowed" },
                { status: 400 }
            );
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File too large (max 10MB)" },
                { status: 400 }
            );
        }

        const fileSize = file.size;
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        const cleanData = data.map(row => ({
            mentor_id: parseInt(row["Staff Id"]),
            mentor_name: row["Staff Name"] || null,
            mentor_active: row["Staff Active"] || null
        }));

        const fileName = Date.now() + "-" + file.name;

        // ================= TAMBAH NI =================
        const uploadDir = path.join(process.cwd(), "public/uploads/fileMentor");
        await mkdir(uploadDir, { recursive: true }); // auto create folder
        // ==============================================

        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        const dbPath = "/uploads/fileMentor/" + fileName;

        await pool.execute(
            "INSERT INTO tbl_uploadmentor(file_name, file_size, file_path) VALUES(?, ?, ?)",
            [fileName, fileSize, filePath]
        );

        for (const row of cleanData) {
            if (!row.mentor_id) {
                console.warn("Skipping row without Matric:", row);
                continue;
            }
            try {
                const [existing] = await pool.execute(
                    "SELECT mentor_id FROM tbl_mentor WHERE mentor_id = ?",
                    [row.mentor_id]
                );

                if (existing.length > 0) {
                    console.warn(`mentor already exists: ${row.mentor_id}`);
                    continue;
                }

                await pool.execute(
                    "INSERT INTO tbl_mentor(mentor_id, mentor_name, mentor_active) VALUES(?, ?, ?)",
                    [row.mentor_id, row.mentor_name, row.mentor_active]
                );
            } catch (err) {
                console.error("Failed to insert row:", row, err.message);
            }
        }

        return NextResponse.json({
            message: "File uploaded & saved to DB",
            file: dbPath
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        );
    }
}