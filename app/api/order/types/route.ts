// pages/api/orders/types.ts
import { NextRequest, NextResponse } from "next/server";
import { getOrderTypes } from '@/model/orders/orders';

export  async function GET(req: NextRequest, res: NextResponse) {
    try {
        const data = await getOrderTypes();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
