// app/api/verify-token/route.ts

import { NextResponse } from "next/server";
import { verifyToken } from "@/jwt"; // Helper to verify JWT
import { cookies } from "next/headers";

export async function GET(req: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    console.log("token", cookieStore.getAll());
    
    // const token = req.cookies.get("token"); // Retrieve token from cookies

    if (!token) {
        return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    try {
        const decodedToken = verifyToken(token); // Verify the token
        return NextResponse.json({ user: decodedToken }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
}
