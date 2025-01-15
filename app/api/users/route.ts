import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/jwt"; // Import your token verification helper
import { log } from "node:console";

export async function GET() {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    try {
        const user = verifyToken(token); // Decode and verify the token
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
