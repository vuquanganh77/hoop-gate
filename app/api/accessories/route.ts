import { NextRequest, NextResponse } from "next/server";
import { getAllAccessories } from "@/model/products/accessories/loader";
import { createAccessories, deleteAccessories, editAccessories, saveImage, updateImage } from "@/model/products/accessories/accessories";
import { uploadMainImage, uploadDetailImage } from "@/app/utils/products";
import { revalidatePath } from "next/cache";
import { getProductQuantity, getSuggestedAccessories } from "@/model/products/accessories/loader";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const filters = Object.fromEntries(searchParams.entries());
        console.log("filters", filters);

        if (filters.limit) {
            const accessories = await getSuggestedAccessories(filters.limit);
            return NextResponse.json(accessories);
        }
        
        const accessories = await getAllAccessories(filters);
        return NextResponse.json(accessories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch accessories' }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {

    try {
        const formData = await req.formData();

        const name = formData.get("name") as string;
        const brand = formData.get("brand") as string;
        const price = Number(formData.get("price") as string);
        const description = formData.get("description") as string;


        let result = await createAccessories({ name, brand, price, description });

        const file = formData.get("main_image") as File;



        if (result.newAccessories) {
            var main_image = await uploadMainImage({ file, id: result.newAccessories.id });

            // Upload gallery images
            var detail_images = [];
            let index = 0;

            while (true) {
                const galleryFile = formData.get(`gallery[${index}]`) as File;
                if (!galleryFile) break; // Stop when no more files are found
                const detail_image = await uploadDetailImage({
                    file: galleryFile,
                    id: result.newAccessories.id,
                });
                detail_images.push(detail_image);
                index++;
            }

            console.log("detail_images", detail_images);
            

            await saveImage({ accessories: result.newAccessories, main_image, detail_images });
        } else {
            return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
        }

        revalidatePath("/");


        if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
        return NextResponse.json({
            ...result.newAccessories,
            quantity: 0,
            main_url: main_image,
            gallery: detail_images,
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create new accessories' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {

    try {
        const { id } = await req.json();

        let result = await deleteAccessories({ id: parseInt(id) });
        if (result?.error) {
            return NextResponse.json({ error: 'Accessories not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Accessories deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete accessories' }, { status: 500 });
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

        const result = await editAccessories({ id: id, name: name, brand: brand, price: price, description: description });

        console.log("sss", formData.get("main_image"));


        if (formData.get("main_image") ) {
            const file = formData.get("main_image") as File;

            if (result.edited_accessories) {
                let main_image = await uploadMainImage({ file, id: result.edited_accessories.id });
                // Upload gallery images
                var detail_images = [''];
                if (formData.get("gallery")){
                    let index = 0;

                    while (true) {
                        const galleryFile = formData.get(`gallery[${index}]`) as File;
                        if (!galleryFile) break; // Stop when no more files are found
                        const detail_image = await uploadDetailImage({
                            file: galleryFile,
                            id: result.edited_accessories.id,
                        });
                        detail_images.push(detail_image);
                        index++;
                    }
                }
                
                await updateImage({ id: result.edited_accessories.id, main_image });
                await saveImage({ accessories: result.edited_accessories, main_image, detail_images });
            } else {
                return NextResponse.json({ error: 'Failed to upload image chay vao day' }, { status: 500 });
            }
        }


        const quantity = await getProductQuantity({ id: id });

        if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
        return NextResponse.json({ ...result.edited_accessories, quantity }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to edit accessories' }, { status: 500 });
    }
}


