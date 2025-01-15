import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/model/users/loader"; // Ensure this function is implemented

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        // Validate ID
        const user_id = parseInt(id);
        if (isNaN(user_id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        // Fetch user details
        const user = await getUserById(user_id);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}
