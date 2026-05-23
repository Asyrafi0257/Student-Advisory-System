import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function POST(req) {

    try {

        // ambil cookies dari browser dan ambil token
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        //check token ada ke tak
        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        //kita verify token

        const decoded = verifyToken(token);

        // ambil mentor_id dari token
        const mentor_id = decoded.id;

        //kita ambil req yang client hantar
        const body = await req.json();
        //kita ambil setiap field daripada body
        const {
            session_title,
            session_description,
            session_date,
            session_start_time,
            session_end_time,
            session_location,
            session_type,
        } = body;

        //validate if session not exist

        if (
            !session_title ||
            !session_description ||
            !session_date ||
            !session_start_time ||
            !session_end_time ||
            !session_location ||
            !session_type
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Please fill all required fields",
                },
                { status: 400 }
            );
        }

        //insert data session dalam db
        const [result] = await pool.query(
            `
            INSERT INTO tbl_session (
                mentor_id,
                session_title,
                session_description,
                session_date,
                session_start_time,
                session_end_time,
                session_location,
                session_type
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                mentor_id,
                session_title,
                session_description,
                session_date,
                session_start_time,
                session_end_time,
                session_location,
                session_type,
            ]
        );


        return NextResponse.json(
            {
                success: true,
                message: "Session created successfully",
                session_id: result.session_id,
            },
            { status: 201 }
        );

    } catch (err) {

        // JWT ERROR
        if (
            err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError"
        ) {

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

        // SERVER ERROR
        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        );
    }
}

export async function GET() {
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
            return NextResponse.json(
                { message: "Token invalid or expired" },
                { status: 401 }
            );
        }

        const [rows] = await pool.query(
            "SELECT * FROM tbl_session ORDER BY updated_at"
        );

        if (!rows) {
            return NextResponse.json({ message: "No data available" })
        }

        return NextResponse.json({ rows })
    } catch (error) {
        console.log("🔥 FULL ERROR:", error);

        return NextResponse.json(
            {
                message: error.message,
                code: error.code,
                stack: error.stack
            },
            { status: 500 }
        );
    }
}
