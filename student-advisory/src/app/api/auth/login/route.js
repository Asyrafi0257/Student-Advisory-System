import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/jwt";


export async function POST(req){
    try{
        const {name, password} = await req.json();

        //nak hash password
        //const hashPassword = await bcrypt.hash(password, 10);

        const [rows] = await pool.query(
            "SELECT * FROM tbl_admin WHERE admin_name = ?", [name]
        );
        
        if(rows.length == 0){
            return NextResponse.json({success:false});
        } 

        const isMatch = await bcrypt.compare(password, rows[0].admin_password);
        if(!isMatch){
            return NextResponse.json({success:false});
        }

        //generate token
        const token = generateToken({
            id: rows[0].admin_id,
            name: rows[0].admin_name
        })

        const response = NextResponse.json({success: true});

        response.cookies.set("token", token, {
            httpOnly:true,
            secure:true,
            sameSite:"strict"
        })

        return response;

    } catch(error) {
        return NextResponse.json({error:error.message});
    }
}