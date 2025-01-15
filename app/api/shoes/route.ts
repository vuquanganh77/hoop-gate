import { NextRequest, NextResponse } from "next/server";
import { getAllShoes } from "@/model/products/shoes/loader";
import { createShoes, deleteShoes, editShoes, saveImage, updateImage, saveImageEditing } from "@/model/products/shoes/shoes";
import { uploadMainImage, uploadDetailImage } from "@/app/utils/products";
import { revalidatePath } from "next/cache";
import { getProductQuantity, getSuggestedShoes } from "@/model/products/shoes/loader";
import { OpenAI } from 'openai';
import { QdrantClient } from '@qdrant/qdrant-js';
import { HuggingFace } from 'huggingface';



// Initialize OpenAI and Qdrant clients
// const openai = new OpenAI({
//     apiKey: process.env.OPEN_AI_KEY,
// });

// if (!process.env.HUGGING_FACE_KEY) {
//     throw new Error('HUGGING_FACE_KEY is not defined');
// }

// if (!process.env.HUGGING_FACE_KEY) {
//     throw new Error('HUGGING_FACE_KEY is not defined');
// }
// const huggingface = new HuggingFace(process.env.HUGGING_FACE_KEY); // Initialize Hugging Face client


// const qdrantClient = new QdrantClient({
//     url: process.env.QDRANT_URL,
// });

// if (!process.env.HUGGING_FACE_KEY) {
//     throw new Error('HUGGING_FACE_KEY is not defined');
// }

// const HF_API_KEY = process.env.HUGGING_FACE_KEY;

// // Helper function to fetch embeddings from Hugging Face API
// async function getEmbeddingsFromHuggingFace(data: any) {
//     const response = await fetch('https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${HF_API_KEY}`,
//             'Content-Type': 'application/json',
//             "x-use-cache": "false"
//         },
//         body: JSON.stringify({ sentences: data, source_sentence: "" }),
//     });

//     if (!response.ok) {
//         const errorDetails = await response.text();
//         console.error('Error Details:', errorDetails);
//         throw new Error(`Error fetching embeddings from Hugging Face: ${response.status} ${response.statusText}`);
//     }

//     const result = await response.json();
//     return result[0]?.embedding; // Returns the embedding vector
// }

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const filters = Object.fromEntries(searchParams.entries());
        console.log("filters", filters);

        if (filters.limit) {
            const shoes = await getSuggestedShoes(filters.limit);
            return NextResponse.json(shoes);
        }

        const shoes = await getAllShoes(filters);
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
            var main_image = await uploadMainImage({ file, id: result.newShoes.id });

            // Upload gallery images
            var detail_images = [];
            let index = 0;

            while (true) {
                const galleryFile = formData.get(`gallery[${index}]`) as File;
                if (!galleryFile) break; // Stop when no more files are found
                const detail_image = await uploadDetailImage({
                    file: galleryFile,
                    id: result.newShoes.id,
                });
                detail_images.push(detail_image);
                index++;
            }

            await saveImage({ shoes: result.newShoes, main_image, detail_images });

            // const combinedInput = `Product Name: ${name}.Brand: ${brand}.Price: $${price}.`;

            // console.log("truoc khi embed", combinedInput);

            // Step 2: Generate embedding for the product details

            // const embedding = await huggingface.featureExtraction({
            //     model: 'sentence-transformers/all-MiniLM-L6-v2', // A free, pre-trained model for embedding generation
            //     inputs: [combinedInput],
            // });


            // const response = await fetch('https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2', {
            //     method: 'POST',
            //     headers: {
            //         'Authorization': `Bearer ${process.env.HUGGING_FACE_KEY}`,
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ inputs: [combinedInput] }),
            // });
            
            // const embedding = await response.json();

            // const a = 
            //     `"inputs": "Can you please let us know more details about your "`;
            // const embedding = await getEmbeddingsFromHuggingFace([a]);
            
            // if (!embedding) {
            //     throw new Error('Failed to generate embedding from Hugging Face');
            // }
            
            // console.log("embeddingResponse", a);

            // // Step 3: Insert embedding into Qdrant
            // await qdrantClient.upsert("products",
            //     {
            //         points: [
            //             {
            //                 id: result.newShoes.id.toString(),
            //                 vector: embedding,
            //                 payload: { name, description, brand, price },
            //             },
            //         ],
            //     },
            // );

        } else {
            return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
        }

        revalidatePath("/");

        if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
        return NextResponse.json({
            ...result.newShoes,
            quantity: 0,
            main_url: main_image,
            gallery: detail_images,
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to create new shoes' + error }, { status: 500 });
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

        const result = await editShoes({ id: id, name: name, brand: brand, price: price, description: description });

        console.log("sss", formData.get("main_image"));


        if (formData.get("main_image")) {
            const file = formData.get("main_image") as File;

            if (result.edited_shoes) {
                let main_image = await uploadMainImage({ file, id: result.edited_shoes.id });
                // Upload gallery images
                var detail_images = [''];

                console.log("co gallery");
                
                let index = 0;

                while (true) {
                    console.log(" day rooiiii co gallery", index);
                    const galleryFile = formData.get(`gallery[${index}]`) as File;
                    console.log("galleryFile", galleryFile);
                    
                    if (!galleryFile) break; // Stop when no more files are found
                    const detail_image = await uploadDetailImage({
                        file: galleryFile,
                        id: result.edited_shoes.id,
                    });
                    detail_images.push(detail_image);
                    index++;
                }
                

                // console.log("khonggg co gallery");
                await updateImage({ id: result.edited_shoes.id, main_image });
                await saveImageEditing({ shoes: result.edited_shoes, main_image, detail_images });
            } else {
                return NextResponse.json({ error: 'Failed to upload image chay vao day' }, { status: 500 });
            }
        }


        const quantity = await getProductQuantity({ id: id });

        if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
        return NextResponse.json({ ...result.edited_shoes, quantity }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to edit shoes' }, { status: 500 });
    }
}


// const HF_API_KEY = process.env.HUGGING_FACE_KEY; // Hugging Face API Key

// // Helper function to fetch embeddings from Hugging Face API
// async function getEmbeddingsFromHuggingFace(text: string) {
    
//     const response = await fetch('https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${HF_API_KEY}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ inputs: "asdasdasd" }),
//     });
//     console.log("chay vao api embed", response);

//     const data = await response.json();
//     return data[0].embedding; // Returns the embedding vector
// }