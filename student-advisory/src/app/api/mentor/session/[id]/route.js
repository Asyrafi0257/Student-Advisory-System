import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function DELETE(req) {

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const decoded = verifyToken(token);
        const mentor_id = decoded.id;

        const { searchParams } = new URL(req.url);
        const session_id = searchParams.get("session_id");

        if (!session_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Session ID required",
                },
                { status: 400 }
            );
        }

        //only owner can delete session
        const [result] = await pool.query(
            `
            DELETE FROM tbl_session
            WHERE session_id = ?
            AND mentor_id = ?
            `,
            [session_id, mentor_id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Session not found or not allowed",
                },
                { status: 403 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Session deleted successfully",
        });

    } catch (error) {

        console.log("DELETE SESSION ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

export async function GET(req, { params }) {
    try {
        const { id } = await params;

        const [rows] = await pool.query(
            `SELECT * FROM tbl_session WHERE session_id = ?`,
            [id]
        );
        console.log(rows)

        return NextResponse.json(rows[0]);
    } catch (err) {
        return NextResponse.json(
            { message: "Error fetching mentor", error: err.message },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const body = await req.json();

        const { session_title, session_description, session_date, session_start_time, session_end_time, session_location, session_type } = body;

        await pool.query(`
            UPDATE tbl_session
            SET session_title=?, session_description=?, session_date=?, session_start_time=?, session_end_time=?, session_location=?, session_type=? WHERE session_id = ?`, [session_title, session_description, session_date, session_start_time, session_end_time, session_location, session_type, id]
        );

        return NextResponse.json({ message: "Session updated successfully" });
    } catch (err) {
        return NextResponse.json(
            { message: "Error updating mentor", error: err.message },
            { status: 500 }
        );
    }
}