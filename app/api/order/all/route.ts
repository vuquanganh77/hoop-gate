import { NextRequest, NextResponse } from "next/server";
import { loadAllOrders } from "@/model/orders/orders"

export async function GET(req: NextRequest){
    try {

        const orders = await loadAllOrders();

        // console.log("day la order", order);

        return NextResponse.json({ orders: orders }, { status: 201 });
    } catch (error) {
        console.error(error)
    }
}