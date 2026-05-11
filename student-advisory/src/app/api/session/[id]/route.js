import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function DELETE(req) {

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const decoded = verifyToken(token);
        const mentor_id = decoded.id;

        const { searchParams } = new URL(req.url);
        const session_id = searchParams.get("session_id");

        if (!session_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Session ID required",
                },
                { status: 400 }
            );
        }

        //only owner can delete session
        const [result] = await pool.query(
            `
            DELETE FROM tbl_session
            WHERE session_id = ?
            AND mentor_id = ?
            `,
            [session_id, mentor_id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Session not found or not allowed",
                },
                { status: 403 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Session deleted successfully",
        });

    } catch (error) {

        console.log("DELETE SESSION ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}