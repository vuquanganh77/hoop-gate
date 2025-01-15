import { db } from "@/lib/db";
import { getAccessoriesById } from "./loader";
import { log } from "console";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
// import { promises } from "fs";
// const { readFile, writeFile, mkdir } = promises;


interface AccessoriesAttrs {
    name: string;
    brand: string;
    price: number;
    description: string;
}


export function readAccessories({ name, brand, price, description }: AccessoriesAttrs) {
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

export async function createAccessories({ name, brand, price, description }: AccessoriesAttrs) {

    readAccessories({ name, brand, price, description });
    // Ep kieu
    // const parsedSize = parseFloat(size);
    // const parsedPrice = parseFloat(price);
    const createAt = new Date();
    const updatedAt = new Date();
    try {
        const newAccessories = await db.products.create({
            data: { name, brand, price, description: "", type: "accessories", createAt: createAt.toString(), updatedAt: updatedAt.toString() },
        });
        return { newAccessories: newAccessories };
    } catch (error) {
        return { error };
    }
}


export async function editAccessories({ id, name, brand, price, description }: { id: number, name: string, brand: string, price: number, description: string }) {

    readAccessories({ name, brand, price, description });
    // Ep kieu
    // const parsedSize = parseFloat(size);
    // const parsedPrice = parseFloat(price);

    try {
        const updatedAt = new Date();

        const edited_accessories = await db.products.update({
            where: { id: id },
            data: { name, brand, price, description, type: "accessories", updatedAt: updatedAt.toString() },
        });

        return { edited_accessories: edited_accessories, error: null };
    } catch (error) {
        return { error: error };
    }
}


export async function deleteAccessories({ id }: { id: number }) {
    try {
        const accessories = await getAccessoriesById({ id });
        if (!accessories) {
            return { error: 'Accessories not found' };
        }

        await db.products.delete({ where: { id: id } });
    } catch (error) {
        return { error: error };
    }
}


export async function addSize({ id, size, quantity }: { id: number, size: string, quantity: string }) {
    try {
        let createAt = new Date();
        let updatedAt = new Date();
         // Validate size and quantity
         if (!size || isNaN(parseInt(size))) {
            throw new Error("Invalid size value provided");
        }
        if (!quantity || isNaN(parseInt(quantity))) {
            throw new Error("Invalid quantity value provided");
        }
        const sizeInt = parseInt(size);
        const quantityInt = parseInt(quantity);
        const product_id = id;
    
        console.log("gia tri truyen vao", {
            product_id,
            sizeInt,
            quantityInt,
            createdAt: createAt.toString(),
            updatedAt: updatedAt.toString(),
          });

        console.log("chay vao add size");

        const accessories_sizes = await db.product_size.create({
            data: { product_id: product_id, size: sizeInt, quantity: quantityInt, createdAt: createAt.toString(), updatedAt: updatedAt.toString() },
        });
        console.log("shoes_sizes", accessories_sizes);

        return { newAccessoriesSize: accessories_sizes };

    } catch (error) {
        console.error("Error in addSize function:", error);
        return { error: error };
    }
}


export async function saveImage({ accessories, main_image, detail_images }: { accessories: any, main_image: any, detail_images: any }) {
    try {
        const createAt = new Date();
        const updatedAt = new Date();

        // Serialize detail_images array to a JSON string
        const serializedDetailImages = JSON.stringify(detail_images);

        await db.product_image.create({
            data: { product_id: accessories.id, main_url: main_image, createAt: createAt.toString(), updatedAt: updatedAt.toString(), urls: serializedDetailImages }
        });
    } catch (error) {
        return { error: 'Failed to save images' };
    }
}


export async function updateImage({ id, main_image }: { id: number,  main_image: any }) {
    try {
        const updatedAt = new Date();
        await db.product_image.update({
            where: { product_id: id },
            data: { main_url: main_image, updatedAt: updatedAt.toString() },
        });
    } catch (error) {
        return { error: 'Failed to delete image' };
    }
}
