import { NextRequest, NextResponse } from "next/server";
import { getAllClothes } from "@/model/products/clothes/loader";
import { createClothes, deleteClothes, editClothes, saveImage, updateImage } from "@/model/products/clothes/clothes";
import { uploadMainImage, uploadDetailImage } from "@/app/utils/products";
import { revalidatePath } from "next/cache";
import { getProductQuantity, getSuggestedClothes } from "@/model/products/clothes/loader";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const filters = Object.fromEntries(searchParams.entries());
        console.log("filters", filters);

        if (filters.limit) {
            const shoes = await getSuggestedClothes(filters.limit);
            return NextResponse.json(shoes);
        }
        
        const shoes = await getAllClothes(filters);
        return NextResponse.json(shoes);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch clothes' }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {

    try {
        const formData = await req.formData();

        const name = formData.get("name") as string;
        const brand = formData.get("brand") as string;
        const price = Number(formData.get("price") as string);
        const description = formData.get("description") as string;


        let result = await createClothes({ name, brand, price, description });

        const file = formData.get("main_image") as File;



        if (result.newClothes) {
            var main_image = await uploadMainImage({ file, id: result.newClothes.id });

            // Upload gallery images
            var detail_images = [];
            let index = 0;

            while (true) {
                const galleryFile = formData.get(`gallery[${index}]`) as File;
                if (!galleryFile) break; // Stop when no more files are found
                const detail_image = await uploadDetailImage({
                    file: galleryFile,
                    id: result.newClothes.id,
                });
                detail_images.push(detail_image);
                index++;
            }

            console.log("detail_images", detail_images);
            

            await saveImage({ shoes: result.newClothes, main_image, detail_images });
        } else {
            return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
        }

        revalidatePath("/");


        if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
        return NextResponse.json({
            ...result.newClothes,
            quantity: 0,
            main_url: main_image,
            gallery: detail_images,
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create new clothes' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {

    try {
        const { id } = await req.json();

        let result = await deleteClothes({ id: parseInt(id) });
        if (result?.error) {
            return NextResponse.json({ error: 'Clothes not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Clothes deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete clothes' }, { status: 500 });
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

        const result = await editClothes({ id: id, name: name, brand: brand, price: price, description: description });

        console.log("sss", formData.get("main_image"));


        if (formData.get("main_image") ) {
            const file = formData.get("main_image") as File;

            if (result.edited_clothes) {
                let main_image = await uploadMainImage({ file, id: result.edited_clothes.id });
                // Upload gallery images
                var detail_images = [''];
                if (formData.get("gallery")){
                    let index = 0;

                    while (true) {
                        const galleryFile = formData.get(`gallery[${index}]`) as File;
                        if (!galleryFile) break; // Stop when no more files are found
                        const detail_image = await uploadDetailImage({
                            file: galleryFile,
                            id: result.edited_clothes.id,
                        });
                        detail_images.push(detail_image);
                        index++;
                    }
                }
                
                await updateImage({ id: result.edited_clothes.id, main_image });
                await saveImage({ shoes: result.edited_clothes, main_image, detail_images });
            } else {
                return NextResponse.json({ error: 'Failed to upload image chay vao day' }, { status: 500 });
            }
        }


        const quantity = await getProductQuantity({ id: id });

        if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
        return NextResponse.json({ ...result.edited_clothes, quantity }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to edit clothes' }, { status: 500 });
    }
}


