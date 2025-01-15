import { NextResponse } from "next/server";
import { getUsersWithShipDetails } from "@/model/users/users"; 

export async function GET() {

    try {
        const accounts = await getUsersWithShipDetails(); 
        
        return NextResponse.json({ accounts }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}