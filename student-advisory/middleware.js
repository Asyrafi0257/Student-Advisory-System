import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req) {

    //ambil cookies yang client simpan di browser
    const token = req.cookies.get("token")?.value;

    //redirect to login if not exist
    if(!token){
        return NextResponse.redirect(
            new URL("/login", req.url) // req.url ni full URL dalam bentuk string
        )
    }
    try{
        verifyToken(token);
        return NextResponse.next(); //dia pergi ke route user request
    }catch{
        return NextResponse.redirect(
            new URL("/login", req.url)
        )
    }
}

//semua route dibawah mana ii file akan lalui middleware first (check token);
export const config = {
    matcher:["/admin/:path*"]
}