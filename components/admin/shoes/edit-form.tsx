"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/schemas";

import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { editShoes, setPageIndex } from '@/features/shoes-slice';
import { AppDispatch } from '@/store/store'

import type { Shoes } from "@/app/admin/shoes/columns"


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";


interface EditFormProps {
    edit_shoes: Shoes | undefined; // Biến chứa dữ liệu giày cần chỉnh sửa
    // editShoes: (edit_shoes: Shoes) => void; // Hàm để cập nhật dữ liệu giày
    handleClose: () => void; // Hàm đóng form chỉnh sửa
}

const EditForm: React.FC<EditFormProps> = ({ edit_shoes, handleClose }) => {

    const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
    // const [galleryPreview, setGalleryPreview] = useState<string[]>([]); // State for image preview
    const [galleryImage, setGalleryImage] = useState<File[]>([]);

    useEffect(() => {
        console.log("edit_shoes", edit_shoes);

    }, [edit_shoes]);


    const form = useForm({
        resolver: zodResolver(ProductSchema),          // 👈 use for validation
        defaultValues: {
            name: edit_shoes?.name,
            description: edit_shoes?.description || "",
            price: edit_shoes?.price,
            brand: edit_shoes?.brand,
            main_image: null,
            gallery: [],
        }
    })

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (values: any) => {
        edit_shoes = { ...edit_shoes, ...values };

        console.log("values", values, edit_shoes);

        if (edit_shoes) {
            dispatch(editShoes(edit_shoes));
            // dispatch(setPageIndex)
            handleClose();

        }
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
                                        <Input {...field} />
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

                        <FormField
                            control={form.control}
                            name="main_image"
                            render={({ field }) => {
                                const [previewImage, setPreviewImage] = useState<string | null>(null);

                                // Gán giá trị mặc định khi có sẵn URL
                                useEffect(() => {
                                    if (edit_shoes?.main_url && field.value === null) {
                                        setPreviewImage(edit_shoes?.main_url); // URL mặc định từ backend
                                    } else {
                                        setPreviewImage(field.value);
                                    }

                                }, []);

                                return (
                                    <FormItem>
                                        <FormLabel>Main Image</FormLabel>
                                        <FormControl>
                                            <>
                                                {previewImage && (
                                                    <div className="mb-4">
                                                        <img
                                                            src={previewImage}
                                                            alt="Preview"
                                                            className="w-32 h-32 rounded-md"
                                                        />
                                                    </div>
                                                )}
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        if (e.target.files && e.target.files[0]) {
                                                            const file = e.target.files[0];
                                                            field.onChange(file);
                                                            setPreviewImage(URL.createObjectURL(file)); // Cập nhật ảnh xem trước
                                                        }
                                                    }}
                                                    onBlur={field.onBlur}
                                                    name={field.name}
                                                    ref={field.ref}
                                                />
                                            </>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="gallery"
                            render={({ field }) => {
                                const [galleryPreview, setGalleryPreview] = useState<string[]>([]); // State for image preview

                                // Initialize gallery previews from `edit_shoes.gallery`
                                useEffect(() => {
                                    if (edit_shoes?.gallery) {
                                        try {
                                            const parsedGallery = JSON.parse(edit_shoes.gallery);
                                            if (Array.isArray(parsedGallery)) {
                                                setGalleryPreview(parsedGallery);
                                                console.log("parsedGallery", parsedGallery);

                                            }
                                        } catch (error) {
                                            console.error("Failed to parse gallery JSON:", error);
                                        }
                                    }
                                }, [edit_shoes]);

                                return (
                                    <FormItem>
                                        <FormLabel>Gallery</FormLabel>
                                        <FormControl>
                                            <>
                                                {/* Preview existing and new images */}
                                                {galleryPreview.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {galleryPreview.map((url, index) => (
                                                            <img
                                                                key={index}
                                                                src={url}
                                                                alt={`Gallery Image ${index + 1}`}
                                                                className="w-32 h-32 rounded-md"
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                                {/* Input for adding new images */}
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
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
                                            </>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                    </div>


                    <Button type="submit" className="w-full">Edit</Button>

                </form>
            </Form>
        </div>
    )
}

export default EditForm