import { NextRequest, NextResponse } from "next/server";
import { getTopOrders } from "@/model/orders/orders"; 

export async function GET(req: NextRequest) {
    try {

        // Fetch shoe details
        const top_orders = await getTopOrders();

        console.log("day la thu can tim", top_orders);
        

        if (!top_orders) {
            return NextResponse.json({ error: "Orders not found" }, { status: 404 });
        }

        return NextResponse.json(top_orders, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}