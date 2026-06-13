import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);

        const status = searchParams.get("status");
        const id = searchParams.get("id");

        let query = "SELECT * FROM tbl_mentor";
        let params = [];

        // 🔥 CASE 1: single mentor
        if (id) {
            query += " WHERE id = ?";
            params.push(id);
        }

        // 🔥 CASE 2: filter by status
        else if (status) {
            query += " WHERE mentor_active = ?";
            params.push(status);
        }

        query += " ORDER BY mentor_id";

        const [rows] = await pool.query(query, params);

        return NextResponse.json({ rows });

    } catch (err) {
        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        );
    }
}

