"use server";

import * as z from "zod";

import { signIn } from"@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    
    const validateFields = LoginSchema.safeParse(values);
    
    if (!validateFields.success) {
        return { error: "Invalid fields!" };
    }
    
    const { username, password } = validateFields.data;
    
    try {
        await signIn("credentials", {
            username,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })

        // // Return success if signIn does not throw an error
        // return { success: true };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": 
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }

        // // Catch any other errors and return a default error
        // return { error: "An unexpected error occurred." };

        throw error;

    }
}