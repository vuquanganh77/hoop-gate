import { NextResponse } from "next/server";
import { deleteCartItem } from "@/model/products/cart";

export async function POST(req: Request) {
    try {
        const { id } = await req.json();

        const result = await deleteCartItem(parseInt(id));

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to delete carts" }, { status: 500 });
    }
}