import { NextResponse } from "next/server";
import pool from "@/lib/db";
import path from "path";
import fs from "fs";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function DELETE(req) {
    try {
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
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        //check id valid ke tak
        if (!id) {
            return NextResponse.json(
                { message: "User id not found" },
                { status: 400 }
            )
        }
        //ambil file dari database
        const [rows] = await pool.query(
            "SELECT * FROM tbl_uploadmentor WHERE uploads_id = ?", [id]
        )

        //check jika takde file dalam database
        if (rows.length === 0) {
            return NextResponse.json(
                { message: "Id file not found" },
                { status: 404 }
            )
        }

        //simpan file yg nk delete dalam variable
        const file = rows[0];

        //delete file dari server
        const filePath = path.join(process.cwd(), "public/uploads", file.file_name)

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        //delete file dari database
        await pool.execute(
            "DELETE FROM tbl_uploadmentor WHERE uploads_id = ?", [id]
        );

        return NextResponse.json(
            { message: "File deleted successfully" }
        )

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "fail failed deleted!" },
            { status: 500 }
        )
    }
}