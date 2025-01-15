import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // Log a message to the server console
        console.log("Online payment API called");

        // Optionally, extract and log data from the request body
        const body = await request.json();
        console.log("Received payment details:", body);

        return NextResponse.redirect("http://localhost:3000/cart");
    } catch (error) {
        console.error("Error processing online payment alert:", error);
        return NextResponse.json(
            { error: "Failed to process online payment alert." },
            { status: 500 }
        );
    }
}
