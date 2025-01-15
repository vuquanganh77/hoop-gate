import { NextResponse } from "next/server";
import { deleteCart } from "@/model/products/cart";

export async function POST(req: Request) {
    try {
        const { user_id } = await req.json();

        const result = await deleteCart(user_id);

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to delete carts" }, { status: 500 });
    }
}