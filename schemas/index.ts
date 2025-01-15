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


export const ProductSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    brand: z.string().min(1, {
        message: "Brand is required"
    }),
    price: z.preprocess((val) => parseFloat(val as string), z.number()),
    description: z.string().optional(), // Description is optional
    main_image: z
    .union([
        z.instanceof(File).refine((file) => /\.(jpg|jpeg|png)$/i.test(file.name), {
            message: "Picture must be a .jpg, .jpeg, or .png file",
        }).refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "Picture size must be less than 5MB",
        }),
        z.null(), // Allow null
    ])
    .optional(), // Main image is optional
    gallery: z
        .array(
            z
                .instanceof(File)
                .refine((file) => /\.(jpg|jpeg|png)$/i.test(file.name), {
                    message: "Each picture must be a .jpg, .jpeg, or .png file",
                })
                .refine((file) => file.size <= 5 * 1024 * 1024, {
                    message: "Each picture size must be less than 5MB",
                })
        )
        .optional()
});