import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/model/users/users";
import bcrypt from 'bcrypt';

import { generateToken } from "@/jwt"; // Import the helper function

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required." },
                { status: 400 }
            );
        }

        // Call the signIn function
        const user = await signIn({ username, password });

        // Generate a JWT token
        const token = generateToken({ id: user.id, username: user.username, role: user.role, email: user.email });

        // Set the JWT as an HTTP-only cookie
        const response = NextResponse.json(
            {
                message: "Sign in successful.",
                user,
                token           // return the token
            },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Error in POST /signin:", error);

        return NextResponse.json(
            { error: "Invalid username or password." },
            { status: 401 }
        );
    }
}
