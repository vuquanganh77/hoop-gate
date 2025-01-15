import { NextRequest, NextResponse } from "next/server";
import { getClothesSizeDetail } from "@/model/products/clothes/loader"; 

export async function GET(req: NextRequest, { params }: { params: { size_id: string } }) {
    try {
        
        const { size_id } = params;

        // Validate ID
        const clothesId = parseInt(size_id);
        if (isNaN(clothesId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        // Fetch shoe details
        const clothes = await getClothesSizeDetail(clothesId);
        

        if (!clothes) {
            return NextResponse.json({ error: "Clothes not found" }, { status: 404 });
        }

        return NextResponse.json(clothes, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch clothes" }, { status: 500 });
    }
}
