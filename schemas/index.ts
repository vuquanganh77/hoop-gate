import * as z from "zod";

export const LoginSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
});

export const RegisterSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required"
    }),
    password: z.string().min(5, {
        message: "Minimum 5 characters required"
    }),
    email: z.string().email({
        message: "Email is required"
    })
});

export const ShoesSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    brand: z.string().min(1, {
        message: "Brand is required"
    }),
    price: z.preprocess((val) => parseFloat(val as string), z.number()),
    // size: z.number().min(1, {
    //     message: "Size is required"
    // }),
    // price: z.number().min(1, {
    //     message: "Price is required"
    // }),

});