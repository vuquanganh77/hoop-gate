import { PrismaClient } from '@prisma/client';

// global khong bi anh huong boi hot reload
declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}