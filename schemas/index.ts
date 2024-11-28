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
        .optional(z.instanceof(File)) // Main image is optional
        .refine((file) => file && /\.(jpg|jpeg|png)$/i.test(file.name), {
            message: "Picture must be a .jpg, .jpeg, or .png file"
        })
        .refine((file) => file && /\.(jpg|jpeg|png)$/i.test(file.name), {
            message: "Picture must be a .jpg, .jpeg, or .png file"
        })
        .refine((file) => file && file.size <= 5 * 1024 * 1024, {  // Giới hạn kích thước tệp 5MB
            message: "Picture size must be less than 5MB"
        }),
    // gallery: z
    //     .array(
    //         z
    //             .instanceof(File) // Validate each item in the array is a File instance
    //             .refine((file) => /\.(jpg|jpeg|png)$/i.test(file.name), {
    //                 message: "Gallery must contain .jpg, .jpeg, or .png files",
    //             })
    //             .refine((file) => file.size <= 5 * 1024 * 1024, {
    //                 message: "Each gallery image must be less than 5MB",
    //             })
    //     )
    //     .optional() // Gallery is optional
    //     .refine((files) => files?.length ?? 0 <= 10, {
    //         message: "You can upload up to 10 images in the gallery",
    //     }),

});