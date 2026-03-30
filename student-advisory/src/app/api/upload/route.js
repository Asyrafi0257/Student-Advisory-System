import {NextResponse} from "next/server";
import pool from "@/lib/db";
import {writeFile} from "fs/promises";
import path from "path";
 
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

        //nak daptkan size fail
        const fileSize = file.size;

        //nak convert file guna buffer => so buffer boleh simpan file dan juga boleh process(excel later)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        //generate unik name
        const fileName = Date.now() + "-" + file.name;

        //path dalam server
        //process.cwd() => root project
        const filePath = path.join(process.cwd(), "/public/uploads", fileName);

        //simpan file dalam folder
        await writeFile(filePath, buffer);

        //letak path ke dalam database
        const dbPath = "/uploads/" + fileName;

        //simpan ke database
        await pool.execute(
            "INSERT INTO tbl_uploads(file_name, file_size, file_path) VALUES(?, ?, ?)", [fileName, fileSize, filePath]
        )

        return NextResponse.json({
            message : "File uploaded & saved to DB",
            file : dbPath
        })
    }catch(error){
        console.error(error);
        return NextResponse,json(
            {error : "Upload failed"},
            {status : 500}
        )
    }
}