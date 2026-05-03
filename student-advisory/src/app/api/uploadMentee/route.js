import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";
import * as XLSX from "xlsx";

//config => paksa nextjs untuk guna node.js runtime
export const runtime = "nodejs";

// api endpoint untuk handle request
export async function POST(req) {
    try {
        //nak ambil data dari request(form)
        const formData = await req.formData();

        //file yang user upload
        const file = formData.get("file");

        //check if ada user upload file ke tak
        if (!file) {
            return NextResponse.json(
                { error: "No file Uploaded" },
                { status: 400 }
            );
        }
        //validate type
        if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
            return NextResponse.json(
                { error: "Only .xlsx and .xls files allowed" },
                { status: 400 }
            );
        }

        //validate size 
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File too large (max 10MB)" },
                { status: 400 }
            );
        }

        //nak daptkan size fail
        const fileSize = file.size;

        //nak convert file guna buffer => so buffer boleh simpan file dan juga boleh process(excel later)
        const bytes = await file.arrayBuffer();
        //Buffer => format Nodejs
        const buffer = Buffer.from(bytes);

        //baca data from excel
        //workbook => object yang wakil seluruh file excel
        const workbook = XLSX.read(buffer, { type: "buffer" });

        //kita ambil sheet pertama
        const sheetName = workbook.SheetNames[0];
        //data dalam sheet
        const sheet = workbook.Sheets[sheetName];

        //convert into json
        const data = XLSX.utils.sheet_to_json(sheet);

        //buat clean data dulu
        const cleanData = data.map(row => ({
            mentor_id: parseInt(row["Staff Id"]),
            mentor_name: row["Staff Name"] || null,
            mentor_active: row["Staff Active"] || null
        }));

        //generate unik name
        const fileName = Date.now() + "-" + file.name;

        //path dalam server
        //process.cwd() => root project
        const filePath = path.join(process.cwd(), "public/uploads/fileMentee", fileName);

        //simpan file dalam folder
        await writeFile(filePath, buffer);

        //letak path ke dalam database
        const dbPath = "/uploads/fileMentee/" + fileName;

        //simpan ke database
        await pool.execute(
            "INSERT INTO tbl_uploadmentee(file_name, file_size, file_path) VALUES(?, ?, ?)", [fileName, fileSize, filePath]
        )

        //simpan dalam database
        for (const row of cleanData) {
            if (!row.mentor_id) {
                console.warn("Skipping row without Matric:", row);
                continue; // skip row
            }
            try {

                await pool.execute(
                    "INSERT INTO tbl_mentor(mentor_id, mentor_name, mentor_active) VALUES(?, ?, ?)",
                    [row.mentor_id, row.mentor_name, row.mentor_active]
                )
            } catch (err) {
                console.error("Failed to insert row:", row, err.message);
            }
        }

        return NextResponse.json({
            message: "File uploaded & saved to DB",
            file: dbPath
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        )
    }
}