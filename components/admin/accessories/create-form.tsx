"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/schemas";
import { useState } from "react";

import type { Accessories } from "@/app/admin/accessories/columns"


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const CreateForm: React.FC<{ addAccessories: (new_accessories: Accessories) => void }> = ({ addAccessories }) => {

    const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
    const [galleryPreview, setGalleryPreview] = useState<string[]>([]); // State for image preview
    const [galleryImage, setGalleryImage] = useState<File[]>([]);

    const form = useForm({
        resolver: zodResolver(ProductSchema),          // 👈 use for validation
        defaultValues: {
            name: "",
            description: "",
            price: "",
            brand: "",
            main_image: null,
            gallery: []
        }
    })

    const onSubmit = (values: any) => {
        console.log("gia tri value", values);
        addAccessories(values);
    }

    return (
        <div className="max-h-[80vh] overflow-y-auto p-4 border border-gray-200 rounded-lg bg-white scrollbar-thin"> {/* Scrollable form container */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="string"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="string"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mb-4">
                            <img src={imagePreview} alt="Uploaded Image" className="h-32 w-32" />
                        </div>
                    )}
                    <FormField
                        control={form.control}
                        name="main_image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                field.onChange(e.target.files[0])
                                                const imageUrl = URL.createObjectURL(e.target.files[0]); // Create image URL
                                                setImagePreview(imageUrl); // Set the preview URL
                                            }
                                        }}
                                        onBlur={field.onBlur}
                                        name={field.name}
                                        ref={field.ref}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Image Preview */}
                    <div className="grid grid-cols-3 gap-4">
                        {galleryPreview.length > 0 && (
                            galleryPreview.map((url, index) => (
                                <div className="w-full h-32 rounded-md overflow-hidden" key={`gallery - ${index}`}>
                                    <img src={url} alt="Uploaded Image" className="h-32 w-32" />
                                </div>
                            ))
                        )}
                    </div>
                    {/* Multiple Images Input */}
                    <FormField
                        control={form.control}
                        name="gallery"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gallery</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                // Convert FileList to an array of files
                                                setGalleryImage([...galleryImage, e.target.files[0]]);

                                                field.onChange([...galleryImage, e.target.files[0]]); // Pass the array to the form field
                                                const imageGalleryUrl = URL.createObjectURL(e.target.files[0]); // Create image URL
                                                setGalleryPreview([...galleryPreview, imageGalleryUrl]); // Set the preview URL
                                            }
                                        }}
                                        onBlur={field.onBlur}
                                        name={field.name}
                                        ref={field.ref}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <Button type="submit" className="w-full">Add</Button>

                </form>
            </Form>
        </div>
    )
}

export default CreateForm