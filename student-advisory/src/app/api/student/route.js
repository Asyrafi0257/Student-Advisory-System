import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const [rows] = await pool.query(
            "SELECT * FROM tbl_students ORDER BY stud_matric"
        )
        return NextResponse.json({rows})
    } catch(error){
        return NextResponse.json({
            message:error
        })
    }

}