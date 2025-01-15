import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/model/orders/orders"

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const {price, user_id} = body;
        
        const order = await createOrder(price, user_id);

        // console.log("day la order", order);
        const order_id = order.id;

        return NextResponse.json({ order_id: order_id }, { status: 201 });
    } catch (error) {
        console.error(error)
    }
}