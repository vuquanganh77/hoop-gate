import { NextRequest, NextResponse } from "next/server";
import { fetchShippingDetails, setShippingDetails } from "@/model/users/shipping-details";
import { log } from "node:console";

export async function GET(request: NextRequest) {
    try {
        // Get the user_id from query parameters
        const { searchParams } = new URL(request.url);
        const user_id = searchParams.get("user_id");

        if (!user_id) {
            return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
        }

        // Fetch favorite products from the database
        const shipping_details = await fetchShippingDetails({user_id: parseInt(user_id)});

        return NextResponse.json(shipping_details, { status: 200 });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return NextResponse.json({ error: 'Failed to fetch favorites.' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const { user_id, name, phone, address } = body;

        console.log("vao api post shipping details", body);

        if (!user_id ) {
            return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
        }

        const newShippingDetails = await setShippingDetails({ user_id: parseInt(user_id), name, phone, address });

        return NextResponse.json(newShippingDetails, { status: 201 });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return NextResponse.json({ error: 'Failed to add to favorites.' }, { status: 500 });
    }
}