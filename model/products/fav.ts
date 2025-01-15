import { db } from "@/lib/db";

export async function setFav({ user_id, product_id }: { user_id: number, product_id: number }) {
    console.log("chay vao set fav");
    
    // Check if the favorite already exists
    const existingFavorite = await db.favorites.findFirst({
        where: { user_id, product_id },
    });

    if (existingFavorite) {
        return 'Already in favorites.';
    }

    // Add to favorites
    const newFavorite = await db.favorites.create({
        data: {
            user_id,
            product_id,
        },
    });

    return newFavorite;
}


export async function getAllFav({ user_id }: { user_id: number }) {
    return db.favorites.findMany({
        where: { user_id },
        select: { id:true, product_id: true },   
    })
}


export async function deleteFav(id: any){
    try {
        await db.favorites.delete({
            where: {
                id: id, 
            },
        });
        return id;
        console.log(`Record with ID ${id} has been deleted.`);
    } catch (error) {
        console.error(`Error deleting record with ID ${id}:`, error);
        throw new Error("Failed to delete record");
    }
}