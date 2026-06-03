import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export function middleware(req) {

    // ================= DEBUG =================
    console.log("HOST:", req.headers.get("host"));
    console.log("XFH:", req.headers.get("x-forwarded-host"));
    console.log("PROTO:", req.headers.get("x-forwarded-proto"));
    console.log("PATH:", req.nextUrl.pathname);

    const token = req.cookies.get("token")?.value;
    const path = req.nextUrl.pathname;

    console.log("TOKEN:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    // ================= NO TOKEN =================
    if (!token) {

        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = "/login";

        return NextResponse.redirect(loginUrl);
    }

    try {

        const decoded = verifyToken(token);

        const roleRoutes = {
            "/admin": "admin",
            "/student": "student",
            "/lecturer": "mentor",
        };

        for (const route in roleRoutes) {

            if (path.startsWith(route)) {

                console.log("CURRENT PATH:", path);
                console.log("TOKEN ROLE:", decoded.role);
                console.log("REQUIRED ROLE:", roleRoutes[route]);

                // ================= ROLE CHECK =================
                if (decoded.role !== roleRoutes[route]) {

                    const loginUrl = req.nextUrl.clone();
                    loginUrl.pathname = "/login";

                    const res = NextResponse.redirect(loginUrl);

                    // clear invalid token
                    res.cookies.set("token", "", {
                        path: "/",
                        expires: new Date(0),
                    });

                    return res;
                }
            }
        }

        // ================= VALID =================
        return NextResponse.next();

    } catch (error) {

        console.log("JWT ERROR:", error.message);

        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = "/login";

        const res = NextResponse.redirect(loginUrl);

        // clear broken token
        res.cookies.set("token", "", {
            path: "/",
            expires: new Date(0),
        });

        return res;
    }
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/student/:path*",
        "/lecturer/:path*",
    ],
};