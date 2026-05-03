import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const [rows] = await pool.query(
            "SELECT * FROM tbl_mentor ORDER BY mentor_id"
        )

        return NextResponse.json({ rows });
    } catch (err) {
        return NextResponse.json({ message: err })
    }
}