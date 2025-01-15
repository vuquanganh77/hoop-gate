import { NextRequest, NextResponse } from "next/server";
import { updateQuantity } from "@/model/orders/orders"; // Ensure this function is implemented

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { id } = body
        console.log("char vao api cap nhat quantity", id);

        await updateQuantity(id);

        // console.log("day la thu can tim", order_details);
        
        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
    }
}
