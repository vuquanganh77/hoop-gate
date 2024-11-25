import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.users.findFirst({
            where: {
                email: email
            }
        });

        return user;
    } catch {
        return null;
    }
}


export const getUserById = async (id: number) => {
    try {
        const user = db.users.findUnique({
            where: {
                id: id,
            }
        });

        return user;
    } catch {
        return null;
    }
}


export const getUserByUsername = async (username: string) => {
    try {
        const user = db.users.findFirst({
            where: {
                username: username,
            }
        });

        return user;
    } catch {
        return null;
    }
}