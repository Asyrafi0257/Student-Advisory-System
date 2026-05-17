import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(){
    try{
        const [rows] = await pool.query(
            "SELECT * FROM tbl_uploads ORDER BY created_at DESC"
        );

        return NextResponse.json({rows})
    } catch(err){
        console.error(err)
        return NextResponse.json(
            {error : "failed to fetch files"},
            {status : 500}
        )
    }
}