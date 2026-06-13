import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
    try {

        // ================= VERIFY TOKEN =================
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        // ❌ no token
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        let decoded;

        // ❌ invalid / expired token
        try {
            decoded = verifyToken(token);
        } catch (err) {

            const response = NextResponse.json(
                { message: "Token expired or invalid" },
                { status: 401 }
            );

            // clear cookie properly
            response.cookies.set("token", "", {
                path: "/",
                expires: new Date(0),
            });

            return response;
        }

        // ================= API LOGIC =================
        const { id } = await params;

        const [rows] = await pool.query(
            `SELECT * FROM tbl_mentor WHERE id = ?`,
            [id]
        );

        return NextResponse.json(rows[0]);

    } catch (err) {

        return NextResponse.json(
            {
                message: "Error fetching mentor",
                error: err.message
            },
            {
                status: 500
            }
        );
    }
}

export async function PUT(req, { params }) {
    const conn = await pool.getConnection();

    try {

        // ================= VERIFY TOKEN =================
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        let decoded;

        try {
            decoded = verifyToken(token);
        } catch (err) {

            const response = NextResponse.json(
                { message: "Token expired or invalid" },
                { status: 401 }
            );

            response.cookies.set("token", "", {
                path: "/",
                expires: new Date(0),
            });

            return response;
        }

        // ================= API LOGIC =================
        const { id } = await params;

        const body = await req.json();

        const {
            mentor_id,
            mentor_name,
            mentor_active
        } = body;

        await conn.beginTransaction();

        // 1. Update mentor
        await conn.query(
            `
            UPDATE tbl_mentor
            SET mentor_id = ?, mentor_name = ?, mentor_active = ?
            WHERE id = ?
            `,
            [mentor_id, mentor_name, mentor_active, id]
        );

        // 2. Kalau deactive, delete semua relationship mentee
        if (mentor_active === "inactive") {
            await conn.query(
                "DELETE FROM tbl_mentor_mentee WHERE mentor_id = ?",
                [id]
            );
        }

        await conn.commit();

        return NextResponse.json({
            message: "Mentor updated successfully"
        });

    } catch (err) {

        await conn.rollback();

        return NextResponse.json(
            {
                message: "Error updating mentor",
                error: err.message
            },
            {
                status: 500
            }
        );

    } finally {
        conn.release();
    }
}
