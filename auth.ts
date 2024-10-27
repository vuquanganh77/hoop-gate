import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "./data/users";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} =  NextAuth({
    callbacks: {
        async session({ session, token }) {
            if(token.sub && session.user) {
                session.user.id = token.sub;
            }

            if(token.role && session.user) {
                session.user.role = token.role as Number;
            }  
            
        },

        async jwt({ token }){
            if (!token.sub) return token;

            const exsistingUser = await getUserById(Number(token.sub));

            if (!exsistingUser) return token;

            token.role = exsistingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig,
})