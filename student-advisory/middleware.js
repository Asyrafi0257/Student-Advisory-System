import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const path = req.nextUrl.pathname;

    //debug jwt secret
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    // ================= NO TOKEN =================
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
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
                if (decoded.role !== roleRoutes[route]) {
                    const res = NextResponse.redirect(new URL("/login", req.url));

                    res.cookies.set("token", "", {
                        path: "/",
                        expires: new Date(0),
                    });

                    return res;
                }
            }
        }

        return NextResponse.next();

    } catch (error) {
        const res = NextResponse.redirect(new URL("/login", req.url));

        // IMPORTANT: clear cookie properly
        res.cookies.set("token", "", {
            path: "/",
            expires: new Date(0),
        });

        return res;
    }
}

export const config = {
    matcher: ["/admin/:path*", "/student/:path*", "/lecturer/:path*"]
};