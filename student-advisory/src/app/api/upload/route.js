import {NextResponse} from "next/server";
import pool from "@/lib/db";
import {writeFile} from "fs/promises";
import path from "path";
import * as XLSX from "xlsx";
 
//config => paksa nextjs untuk guna node.js runtime
export const runtime = "nodejs";

// api endpoint untuk handle request
export async function POST(req){
    try{
        //nak ambil data dari request(form)
        const formData = await req.formData();
        
        //file yang user upload
        const file = formData.get("file");

        //check if ada user upload file ke tak
        if(!file) {
            return NextResponse.json(
                {error : "No file Uploaded"},
                {status : 400}
            );
        }
        //validate type
        if (!file.name.endsWith(".xlsx")) {
        return NextResponse.json(
            { error: "Only .xlsx files allowed" },
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
        const workbook = XLSX.read(buffer, {type: "buffer"}); 

        //kita ambil sheet pertama
        const sheetName = workbook.SheetNames[0];
        //data dalam sheet
        const sheet = workbook.Sheets[sheetName];

        //convert into json
        const data = XLSX.utils.sheet_to_json(sheet);

        //buat clean data dulu
        const cleanData = data.map(row => ({
            stud_matric: row.Matrik,
            stud_name: row.Nama || null,
            gender: row.Jantina || null,
            code_uum: row["Kod UUM"] || null,
            academic_qualifications: row["Kelayakan Akademik"] || null,
            pmk_masuk: row["PMK Masuk"] || null,
            band_muet: row["Band MUET"] || null,
            status_oku: row["Status OKU"] || null,
            disability_description: row["Keterangan Cacat"] || null,
            inasis: row.Inasis || null,
            no_phone: row["No Phone"] || null,
            email_alternatif: row["Email Alternatif"] || null,
            email_uum: row["Email UUM"] || null,
            stud_address: row.Alamat || null,
            state: row.Negeri || null,
            parent_income: row["Pendapatan Waris"] || null
        }));

        //generate unik name
        const fileName = Date.now() + "-" + file.name;

        //path dalam server
        //process.cwd() => root project
        const filePath = path.join(process.cwd(), "public/uploads", fileName);

        //simpan file dalam folder
        await writeFile(filePath, buffer);

        //letak path ke dalam database
        const dbPath = "/uploads/" + fileName;

        //simpan ke database
        await pool.execute(
            "INSERT INTO tbl_uploads(file_name, file_size, file_path) VALUES(?, ?, ?)", [fileName, fileSize, filePath]
        )

        //simpan dalam database
        for(const row of cleanData){
            if (!row.Matrik) {
                console.warn("Skipping row without Matric:", row);
                continue; // skip row
            }
            await pool.execute(
                "INSERT INTO tbl_students(stud_matric, stud_name, gender, code_uum, academic_qualifications, pmk_masuk, band_muet, status_oku, disability_description, inasis, no_phone, email_alternatif, email_uum, stud_address, state, parent_income) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
                row.parent_income
                ]
            )
            }

        return NextResponse.json({
            message : "File uploaded & saved to DB",
            file : dbPath
        })
    }catch(error){
        console.error(error);
        return NextResponse.json(
            {error : "Upload failed"},
            {status : 500}
        )
    }
}