import { db } from "@/lib/db";

export async function fetchShippingDetails({ user_id }: { user_id: number }) {
    return db.ship_detail.findFirst({
        where: { user_id },
    });
}

export async function setShippingDetails({ user_id, name, phone, address }: { user_id: number, name: string, phone: string, address: string }) {
    const createdAt = new Date();
    const updatedAt = new Date();

    return db.ship_detail.create({
        data: {
            user_id,
            name,
            phone,
            address,
            createdAt: createdAt.toString(),
            updatedAt: updatedAt.toString(),
        },
    });
}