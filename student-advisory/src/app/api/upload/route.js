import {NextResponse} from "next/server";
import formidable from "formidable-serverless";
import pool from "@/lib/db";

//kena disable dulu body parse default sbb nak upload file kena raw multipart/formdata
//configuration khas untuk app router
export const runtime = "nodejs";
export const requestBody = {
    sizeLimit:"10mb", 
};

export async function POST(req){
    // Convert NextRequest body (ReadableStream) ke Buffer
    const bodyBuffer = Buffer.from(await req.arrayBuffer());
    return new Promise((resolve) => {
        const form = formidable({
            //uploadDir => kita nk simpan file sementara di server
            uploadDir: "./public/uploads",

            //keepExtensions => nak simpan extension asal file(.xlsx, .jpg, dll)
            keepExtensions:true,
        });

        //formidable baca file dan fields dari request
        form.parse(bodyBuffer, async (err, fields, files) => {
            if(err){
                return resolve(
                    //status:500 => internal server error
                    NextResponse.json({
                        error: "Upload Failed"
                    }, 
                    {status: 500})
                );
            }

            const file = Array.isArray(files.file) ? files.file[0] : files.file;
            const fileName = file.originalFilename; //nama asal file dari komputer user
            const filePath = "/uploads/" + file.newFilename; //path file yg disimpan di server(lokasi file di server)

            try {
                    //simpan info file ke dalam database
                await pool.execute(
                    "INSERT INTO tbl_uploads(file_name, file_path) VALUES(?, ?)",
                    [fileName, filePath]
                );

                return resolve(
                    NextResponse.json({
                        message: "Upload success",
                        fileName,
                    })
                )
            } catch(err){
                return resolve(NextResponse.json({
                    error:"Database insert failed"
                },
                {status:500}
            ))
            }
            
        })
    })
}