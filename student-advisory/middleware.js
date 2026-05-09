import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const path = req.nextUrl.pathname;

    // ================= NO TOKEN =================
    if (!token) {
        return NextResponse.redirect(
            new URL("/login", req.url)
        );
    }

    try {
        const decoded = verifyToken(token);

        // ================= ADMIN ROUTE =================
        if (path.startsWith("/admin")) {
            if (decoded.role !== "admin") {
                return NextResponse.redirect(
                    new URL("/login", req.url)
                );
            }
        }

        // ================= STUDENT ROUTE =================
        if (path.startsWith("/student")) {
            if (decoded.role !== "student") {
                return NextResponse.redirect(
                    new URL("/login", req.url)
                );
            }
        }

        // ================= Mentor ROUTE =================
        if (path.startsWith("/lecturer")) {
            if (decoded.role !== "mentor") {
                return NextResponse.redirect(
                    new URL("/login", req.url)
                );
            }
        }

        // allow request
        return NextResponse.next();

    } catch (error) {
        return NextResponse.redirect(
            new URL("/login", req.url)
        );
    }
}
export const config = {
    matcher: ["/admin/:path*", "/student/:path*", "/lecturer/:path*"]
};