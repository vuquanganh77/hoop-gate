import { NextResponse } from "next/server";
import { updateCart } from "@/model/products/cart";

export async function POST(req: Request) {
    try {
        const { id, quantity } = await req.json();

        // // Update the cart item's quantity in the database
        // const updatedCart = await prisma.carts.update({
        //   where: { id },
        //   data: { quantity },
        // });
        console.log("zzz", id, quantity);

        const update_cart = await updateCart({ id, quantity });

        return NextResponse.json({ success: true, update_cart });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to update quantity" }, { status: 500 });
    }
}
