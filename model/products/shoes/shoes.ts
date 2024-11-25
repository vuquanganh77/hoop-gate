import { db } from "@/lib/db";
import { getShoesById } from "./loader";

interface ShoesAttrs {
    name: string;
    brand: string;
    price: number;
    description?: string;
}


export function readShoes({ name, brand, price, description }: ShoesAttrs) {
    let error = "";

    if (!name) {
        error = 'Name is required';
        return { error: error };
    }

    else if (!brand) {
        error = 'Brand is required';
        return { error: error };
    }

    else if (!price) {
        error = 'Price is required';
        return { error: error };
    }
}

export async function createShoes({ name, brand, price, description }: ShoesAttrs) {
    
    readShoes({ name, brand, price, description });
    // Ep kieu
    // const parsedSize = parseFloat(size);
    // const parsedPrice = parseFloat(price);
    const createAt = new Date();
    const updatedAt = new Date();
    try {
        const newShoes = await db.products.create({
            data: { name, brand, price, description: "", type: "shoes", createAt: createAt.toString(), updatedAt: updatedAt.toString() },
        });
        return { newShoes: newShoes };
    } catch (error) {
        return { error };
    }
}


export async function editShoes({ id, name, brand, price, description }: { id: number, name: string, brand: string, price: number, description: string }) {
    
    readShoes({ name, brand, price, description });
    // Ep kieu
    // const parsedSize = parseFloat(size);
    // const parsedPrice = parseFloat(price);
    
    try { 
        console.log("chay vao edit function", id);
        const updatedAt = new Date();
        
        const edited_shoes = await db.products.update({
            where: { id: id },
            data: { name, brand, price, description, type: "shoes", updatedAt: updatedAt.toString()},
        });

        console.log("chay vao edit roiiii", edited_shoes);
        return { edited_shoes: edited_shoes, error: null };
    } catch (error) {
        return { error: error };
    } 
}


export async function deleteShoes({ id }: { id: number }) {
    try {
        const shoes = await getShoesById({ id });
        if (!shoes){
            return {error: 'Shoes not found'};
        }

        await db.products.delete({where: {id: id}});
    } catch (error) {
        return { error: error };
    }
}