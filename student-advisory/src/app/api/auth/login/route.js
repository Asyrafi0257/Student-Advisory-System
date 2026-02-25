import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req){
    try{
        const {name, password} = await req.json();

        const [row] = await pool.query(
            "SELECT * FROM tbl_admin WHERE name = ? AND password = ?", [name, password]
        );

        if(row > 0){
            return NextResponse.json({success:true});
        } 

        return NextResponse.json({success: false});

    } catch(e) {
        return NextResponse.json({error:error.message});
    }
}