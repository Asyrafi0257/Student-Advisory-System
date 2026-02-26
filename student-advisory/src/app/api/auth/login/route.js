import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req){
    try{
        const {name, password} = await req.json();
        console.log("Input :" + name + password)

        const [rows] = await pool.query(
            "SELECT * FROM tbl_admin WHERE admin_name = ? AND admin_password = ?", [name, password]
        );

        if(rows.length > 0){
            return NextResponse.json({success:true});
        } 

        return NextResponse.json({success: false});

    } catch(error) {
        return NextResponse.json({error:error.message});
    }
}