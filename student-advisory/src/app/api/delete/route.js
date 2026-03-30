import { NextResponse } from "next/server";
import pool from "@/lib/db";
import path from "path";
import fs from "fs";

export async function DELETE(req) {
    try{
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");

        //check id valid ke tak
        if(!id){
            return NextResponse.json(
                { message: "User id not found"},
                {status: 400}
            )
        }
        //ambil file dari database
        const [rows] = await pool.query(
            "SELECT * FROM tbl_uploads WHERE uploads_id = ?", [id]
        )

        //check jika takde file dalam database
        if(rows.length === 0){
            return NextResponse.json(
                {message: "Id file not found"},
                {status: 404}
            )
        }

        //simpan file yg nk delete dalam variable
        const file = rows[0];

        //delete file dari server
        const filePath = path.join(process.cwd(), "public", file.file_path)

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        //delete file dari database
        const deleteFile = await pool.execute(
            "DELETE FROM tbl_uploads WHERE uploads_id = ?", [id]
        );

        return NextResponse.json(
            {message: "File deleted successfully"}
        )

    }catch(error){
        console.log(error);
        return NextResponse.json(
            { message: "fail failed deleted!"},
            {status: 500}
        )
    }
}