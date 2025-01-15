import { NextRequest, NextResponse } from "next/server";
import { getShoesSizeDetail } from "@/model/products/shoes/loader"; // Ensure this function is implemented

export async function GET(req: NextRequest, { params }: { params: { size_id: string } }) {
    try {
        
        const { size_id } = params;

        // Validate ID
        const shoeId = parseInt(size_id);
        if (isNaN(shoeId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        // Fetch shoe details
        const shoe = await getShoesSizeDetail(shoeId);
        

        if (!shoe) {
            return NextResponse.json({ error: "Shoe not found" }, { status: 404 });
        }

        return NextResponse.json(shoe, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch shoe" }, { status: 500 });
    }
}
