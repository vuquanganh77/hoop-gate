import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/model/orders/orders"; // Ensure this function is implemented

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { status, id } = body
        console.log("char vao api order detail", id);

        const updated_order = await updateOrderStatus(id, status);

        // console.log("day la thu can tim", order_details);
        

        if (!updated_order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(updated_order, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
    }
}
