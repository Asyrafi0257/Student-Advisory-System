import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM tbl_uploadmentor ORDER BY created_at DESC"
        )
        return NextResponse.json({ rows })
    } catch (err) {
        return NextResponse.json(
            { message: "Failed to fetch files mentor" },
            { status: 500 }
        )
    }
}