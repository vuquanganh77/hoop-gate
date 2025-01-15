import { NextRequest, NextResponse } from "next/server";
import { calculateRevenue } from "@/model/orders/orders";

export async function GET(request: NextRequest) {
    try {
        // Calculate total monthly revenue from database
        const totalRevenue = await calculateRevenue();

        return NextResponse.json(totalRevenue, { status: 200 });
    } catch (error) {
        console.error('Error calculating revenue:', error);
        return NextResponse.json({ error: 'Failed to calculate revenue.' }, { status: 500 });
    }
}