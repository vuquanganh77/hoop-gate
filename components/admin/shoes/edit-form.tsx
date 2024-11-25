"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoesSchema } from "@/schemas";

import { useMemo, useEffect } from "react";

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
    editShoes: (edit_shoes: Shoes) => void; // Hàm để cập nhật dữ liệu giày
    handleClose: () => void; // Hàm đóng form chỉnh sửa
}

const EditForm: React.FC<EditFormProps> = ({ edit_shoes, editShoes, handleClose }) => {
    console.log("12345", edit_shoes);

    useEffect(() => {
        console.log("edit_shoes has changed:", edit_shoes);
    }, [edit_shoes]);

    const form = useForm({
        resolver: zodResolver(ShoesSchema),          // 👈 use for validation
        defaultValues: {
            name: edit_shoes?.name,
            description: edit_shoes?.description || "",
            price: edit_shoes?.price,
            brand: edit_shoes?.brand,
            // picture: ""
        }
    })

    const onSubmit = (values: any) => {
        edit_shoes = { ...edit_shoes, ...values };

        console.log("values", values, edit_shoes);
        
        if (edit_shoes) {
            editShoes(edit_shoes);
            handleClose();
        }
    }

    return (

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

                    {/* <FormField
                        control={form.control}
                        name="picture"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Picture</FormLabel>
                                <FormControl>
                                    <Input {...field} type="file" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

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


                <Button type="submit" className="w-full">Edit</Button>

            </form>
        </Form>

    )
}

export default EditForm