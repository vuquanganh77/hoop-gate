import { NextRequest, NextResponse } from "next/server";
import { loadOrders } from "@/model/orders/orders"

export async function GET(req: NextRequest){
    try {

        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get("user_id");
        
        const orders = await loadOrders(parseInt(user_id));

        // console.log("day la order", order);

        return NextResponse.json({ orders: orders }, { status: 201 });
    } catch (error) {
        console.error(error)
    }
}