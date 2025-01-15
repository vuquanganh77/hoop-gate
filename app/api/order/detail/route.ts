import { NextRequest, NextResponse } from "next/server";
import { createOrderDetail } from "@/model/orders/orders"

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const {order_id, product_size_id, quantity, total_price} = body;
        
        const order_detail = await createOrderDetail({order_id, product_size_id, quantity, total_price});

        // console.log("day la order", order);

        return NextResponse.json({ order_detail: order_detail }, { status: 201 });
    } catch (error) {
        console.error(error)
    }
}

