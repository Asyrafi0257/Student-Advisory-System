import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";

export async function POST(req){
    
    try{
        const {newPass, token} = await req.json();
        
        //verify token
        const decode = verifyToken(token);

        if(!decode){
            return NextResponse.json({success: false})
        }

        //ambil email dari token
        const email = decode.email;

        const hashPassword = await bcrypt.hash(newPass, 10);

        await pool.query(
            "UPDATE tbl_admin SET admin_password = ? WHERE admin_email = ?",[hashPassword, email]
        )

        return NextResponse.json({success:true});

    }catch(error){
        return NextResponse.json({success:false})
    }
}