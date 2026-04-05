import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){

    try{
        const [rows] = await pool.query(
            "SELECT * FROM tbl_mentee ORDER BY mentee_id"
        )

        if(rows.length === 0){
            return NextResponse.json({
                message : "No data Mentee"
            })
        }

        return NextResponse.json({rows});
    } catch(err){
        return NextResponse.json({message : err})
    }
}