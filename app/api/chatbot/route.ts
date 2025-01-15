// // /app/api/chat/route.ts
// import { NextResponse } from 'next/server';
// import { QdrantClient } from '@qdrant/qdrant-js';
// import { OpenAI } from 'openai';

// if (!process.env.HUGGING_FACE_KEY) {
//     throw new Error('HUGGING_FACE_KEY is not defined');
// }

// const qdrantClient = new QdrantClient({
//     url: process.env.QDRANT_URL,
// });

// const openai = new OpenAI({
//     apiKey: process.env.OPEN_AI_KEY,
// });

// const HF_API_KEY = process.env.HUGGING_FACE_KEY;

// async function getEmbeddingsFromHuggingFace(data: string) {
//     const payload = {
//         inputs: data,  
//     };

//     // console.log("Data being sent to Hugging Face:", payload);

//     // const embedding = await openai.embeddings.create({
//     //     model: "text-embedding-ada-002",
//     //     input: "Your text string goes here",
//     //     encoding_format: "float",
//     //   });
      
//     // console.log("zzzz", embedding);


//     const response = await fetch('https://api-inference.huggingface.co/models/sentence-transformers/bert-base-nli-mean-tokens', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${HF_API_KEY}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify( payload ), 
//     });

//     if (!response.ok) {
//         const errorDetails = await response.text();
//         throw new Error(`Hugging Face API Error: ${response.status} ${response.statusText} - ${errorDetails}`);
//     }

//     const result = await response.json();

//     console.log('Hugging Face response:', result);
    
//     if (!result || !result[0]) {
//         throw new Error('Failed to retrieve embeddings');
//     }
//     return result[0].embedding;
// }

// export async function POST(request: Request) {
//     try {
//         const { message } = await request.json();
//         if (!message || typeof message !== 'string') {
//             return NextResponse.json({ error: 'Invalid input format' }, { status: 400 });
//         }

//         // Step 1: Generate embedding for the user query using Hugging Face
//         const userEmbedding = await getEmbeddingsFromHuggingFace(message);
//         // Use the embedding for Qdrant or further processing
//         console.log('User embedding:', userEmbedding);
//         // Step 2: Search for relevant products in Qdrant
//         // const searchResponse = await qdrantClient.search(
//         //     'products', // collection name
//         //     {
//         //         vector: userEmbedding,
//         //         limit: 3, // Adjust the number of results as needed
//         //     }
//         // );

//         // Step 3: Use Qdrant results to provide context to the response
//         // const context = searchResponse
//         //     .map((item) => item.payload?.description || '')
//         //     .join('\n');

//         // const reply = `Here are some related products based on your input:\n${context}` || 'No related products found.';
//         // return NextResponse.json({ reply });

//     } catch (error) {
//         console.error('Error processing request:', error);
//         return NextResponse.json(
//             { error: 'Error processing your request. Please try again later.' },
//             { status: 500 }
//         );
//     }
// }
