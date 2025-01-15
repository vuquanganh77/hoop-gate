import { NextRequest, NextResponse } from "next/server";
import { getOrderDetails } from "@/model/orders/orders"; // Ensure this function is implemented

export async function GET(req: NextRequest, { params }: { params: { order_id: number } }) {
    try {
        
        const { order_id } = params;
        console.log("char vao api order detail", order_id);

        // Fetch shoe details
        const order_details = await getOrderDetails(order_id);

        console.log("day la thu can tim", order_details);
        

        if (!order_details) {
            return NextResponse.json({ error: "Order details not found" }, { status: 404 });
        }

        return NextResponse.json(order_details, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch order details" }, { status: 500 });
    }
}
