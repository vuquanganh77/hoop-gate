import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; 
import { getAllShoes } from "@/model/products/shoes/loader";
import { createShoes, deleteShoes, editShoes } from "@/model/products/shoes/shoes";

export async function GET(){
    try {
        const shoes = await getAllShoes();
        return NextResponse.json(shoes);
    } catch (error) {
        return NextResponse.json({error: 'Failed to fetch shoes'}, {status: 500});
    }
}


export async function POST(req: NextRequest){
    
    try {   
        let {name, size, brand, price, description} = await req.json();

        size = parseFloat(size);
        price = parseFloat(price);
        
        let result = await createShoes({name, brand, price, description});
        if (result.error) return NextResponse.json({error: result.error}, {status: 400});
        return NextResponse.json(result.newShoes, { status: 201 });
    } catch (error) {
        return NextResponse.json({error: 'Failed to create new shoes'}, {status: 500});
    }
}

export async function DELETE(req: NextRequest){

    try {
        const {id} = await req.json();

        let result = await deleteShoes({id: parseInt(id)});
        if (result?.error){
            return NextResponse.json({error: 'Shoes not found'}, {status: 404});
        }

        return NextResponse.json({message: 'Shoes deleted'}, {status: 200});
    } catch(error) {
        return NextResponse.json({error: 'Failed to delete shoes'}, {status: 500});
    }
}


export async function PUT(req: NextRequest){

    try {
        let {id, name, size, brand, price, description} = await req.json();
        console.log("edited_shoes", id, brand);
        
        const result = await editShoes({id, name, size, brand, price, description});
        if (result.error) return NextResponse.json({error: result.error}, {status: 400});

        return NextResponse.json(result.edited_shoes, { status: 200 });
    } catch(error) {
        return NextResponse.json({error: 'Failed to edit shoes'}, {status: 500});
    }
}

