import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAllShoes } from "@/model/products/shoes/loader";
import { createShoes, deleteShoes, editShoes, saveImage, updateImage } from "@/model/products/shoes/shoes";
import { uploadImage } from "@/app/utils/products";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";

export async function GET() {
    try {
        const shoes = await getAllShoes();
        return NextResponse.json(shoes);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch shoes' }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {

    try {
        const formData = await req.formData();

        const name = formData.get("name") as string;
        const brand = formData.get("brand") as string;
        const price = Number(formData.get("price") as string);
        const description = formData.get("description") as string;


        let result = await createShoes({ name, brand, price, description });

        const file = formData.get("main_image") as File;

        
        
        if (result.newShoes) {
            let main_image = await uploadImage({ file, id: result.newShoes.id });
            await saveImage({ shoes: result.newShoes, main_image });
        } else {
            return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
        }

        revalidatePath("/");


        if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
        return NextResponse.json(result.newShoes, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create new shoes' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {

    try {
        const { id } = await req.json();

        let result = await deleteShoes({ id: parseInt(id) });
        if (result?.error) {
            return NextResponse.json({ error: 'Shoes not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Shoes deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete shoes' }, { status: 500 });
    }
}


export async function PUT(req: NextRequest) {

    try {  
        const formData = await req.formData();
        const id_string = formData.get("id");
        if (id_string === null) {
            throw new Error("ID is missing");
        }
        const id = Number(id_string);
        const name = formData.get("name") as string;
        const brand = formData.get("brand") as string;
        const price = Number(formData.get("price") as string);
        const description = formData.get("description") as string;
        const file = formData.get("main_image") as File;


        const result = await editShoes({ id: id, name: name, brand: brand, price: price, description:description });

        
        if (result.edited_shoes) {
            let main_image = await uploadImage({ file, id: result.edited_shoes.id });
            await updateImage({ id: result.edited_shoes.id, main_image });
            await saveImage({ shoes: result.edited_shoes, main_image });
        } else {
            return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
        }

        if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
        return NextResponse.json(result.edited_shoes, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to edit shoes' }, { status: 500 });
    }
}


// async function uploadImage({ file, result }: { file: any, result: any }) {
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = new Uint8Array(arrayBuffer);
//     const dirPath = `./public/uploads/products/${result.newShoes?.id}`;
//     await fs.mkdir(dirPath, { recursive: true });
//     await fs.writeFile(`${dirPath}/${file.name}`, buffer);

//     let main_image = `/uploads/products/${result.newShoes?.id}/${file.name}`;

//     return main_image;
// }

