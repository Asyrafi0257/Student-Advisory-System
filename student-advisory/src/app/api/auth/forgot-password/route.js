import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { generateToken } from "@/lib/jwt";
import { sendResetEmail } from "@/lib/email";

export async function POST(res){
    try {
        const {resetEmail} = await res.json();

        const [rows] = await pool.query(
            "SELECT * FROM tbl_admin WHERE admin_email = ?", [resetEmail]
        )

        if(rows.length === 0){
            return NextResponse.json({success:false});
        }

        const response = NextResponse.json({success:true});

        //nk reset token
        const token = generateToken({resetEmail});
        const resetLink = `http://localhost:3000/reset-password?token=${token}`;

        //nk check email hantar ke tak
        await sendResetEmail(resetEmail, resetLink);
    
        return response;

    }catch(error){
        return NextResponse.json({error:error.message});
    }
}