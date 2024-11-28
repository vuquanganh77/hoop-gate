"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/schemas";
import { addSize } from "@/model/products/shoes/shoes"

import { useEffect } from "react";

import type { Shoes } from "@/app/admin/shoes/columns"


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

interface AddSizeFormProps {
    shoes: Shoes | undefined; // Biến chứa dữ liệu giày cần chỉnh sửa
    handleClose: () => void; // Hàm đóng form chỉnh sửa
}

const AddSizeForm: React.FC<AddSizeFormProps> = ({ shoes, handleClose }) => {
    
    const form = useForm({
        defaultValues: {
            id: shoes?.id,
            name: shoes?.name,
            size: "",
            quantity: "",
            // picture: ""
        }
    })

    const onSubmit = (values: any) => {
        console.log("1231312", values);
        
        addSize({id: values.id, size: values.size, quantity: values.quantity});
        // handleClose();
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
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="string"
                                        disabled
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Size</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
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

                </div>


                <Button type="submit" className="w-full">Add</Button>

            </form>
        </Form>

    )
}

export default AddSizeForm