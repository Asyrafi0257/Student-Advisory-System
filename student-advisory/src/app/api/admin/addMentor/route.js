import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { mentor_id, mentor_name, mentor_active } = await req.json();

        const [rows] = await pool.execute(
            "INSERT INTO tbl_mentor (mentor_id, mentor_name, mentor_active) VALUES(?, ?, ?)", [mentor_id, mentor_name, mentor_active]
        )

        return NextResponse.json({ message: "success" });
    } catch (err) {
        return NextResponse.json({ message: err });
    }
}