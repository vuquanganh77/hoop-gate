import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Create a response with the "token" cookie cleared
        const response = NextResponse.json(
            { message: "Logout successful." },
            { status: 200 }
        );

        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 0, // Expire immediately
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Error in POST /logout:", error);

        return NextResponse.json(
            { error: "Logout failed." },
            { status: 500 }
        );
    }
}
