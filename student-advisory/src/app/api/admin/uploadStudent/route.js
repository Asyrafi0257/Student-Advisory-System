import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";
import * as XLSX from "xlsx";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST(req) {
    try {

        // ================= TOKEN CHECK =================
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        // ❌ no token
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        let decoded;

        // ❌ invalid / expired token
        try {
            decoded = verifyToken(token);
        } catch (err) {

            const response = NextResponse.json(
                { message: "Token expired or invalid" },
                { status: 401 }
            );

            // clear cookie properly
            response.cookies.set("token", "", {
                path: "/",
                expires: new Date(0),
            });

            return response;
        }

        // ================= ORIGINAL CODE =================

        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json(
                { error: "No file Uploaded" },
                { status: 400 }
            );
        }

        if (!file.name.endsWith(".xlsx")) {
            return NextResponse.json(
                { error: "Only .xlsx files allowed" },
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
            stud_matric: parseInt(row.Matrik),
            stud_name: row.Nama || null,
            gender: row.Jantina || null,
            code_uum: row["Kod UUM"] || null,
            academic_qualifications: row["Kelayakan Akademik"] || null,
            pmk_masuk: parseFloat(row["PMK Masuk"]) || null,
            band_muet: parseFloat(row["Band MUET"]) || null,
            status_oku: row["Status OKU"] || null,
            disability_description: row["Keterangan Cacat"] || "",
            inasis: row.Inasis || null,
            no_phone: row["No Phone"] || null,
            email_alternatif: row["Email Alternatif"] || null,
            email_uum: row["Email UUM"] || null,
            stud_address: row.Alamat || null,
            state: row.Negeri || null,
            parent_income: row["Pendapatan Waris"] || "Tiada Pendapatan"
        }));

        const fileName = Date.now() + "-" + file.name;

        const filePath = path.join(
            process.cwd(),
            "public/uploads/fileStud",
            fileName
        );

        await writeFile(filePath, buffer);

        const dbPath = "/uploads/fileStud/" + fileName;

        await pool.execute(
            "INSERT INTO tbl_uploads(file_name, file_size, file_path) VALUES(?, ?, ?)",
            [fileName, fileSize, dbPath]
        );

        for (const row of cleanData) {

            if (!row.stud_matric) continue;

            try {
                const [existing] = await pool.execute(
                    "SELECT stud_matric FROM tbl_students WHERE stud_matric = ?",
                    [row.stud_matric]
                );

                if (existing.length > 0) continue;

                await pool.execute(
                    `INSERT INTO tbl_students(
                        stud_matric, stud_name, gender, code_uum,
                        academic_qualifications, pmk_masuk, band_muet,
                        status_oku, disability_description, inasis,
                        no_phone, email_alternatif, email_uum,
                        stud_address, state, parent_income, stud_password
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        row.stud_matric,
                        row.stud_name,
                        row.gender,
                        row.code_uum,
                        row.academic_qualifications,
                        row.pmk_masuk,
                        row.band_muet,
                        row.status_oku,
                        row.disability_description,
                        row.inasis,
                        row.no_phone,
                        row.email_alternatif,
                        row.email_uum,
                        row.stud_address,
                        row.state,
                        row.parent_income,
                        ""
                    ]
                );

            } catch (err) {
                console.error(err);
            }
        }

        return NextResponse.json({
            message: "File uploaded & saved to DB",
            file: dbPath,
            user: decoded.id
        });

    } catch (err) {

        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        );
    }
}