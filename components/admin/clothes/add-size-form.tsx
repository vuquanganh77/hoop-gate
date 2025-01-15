"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { Clothes } from "@/app/admin/clothes/columns"


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

interface AddSizeFormProps {
    clothes: Clothes | undefined; // Biến chứa dữ liệu giày cần chỉnh sửa
    handleClose: () => void; // Hàm đóng form chỉnh sửa
}

const AddSizeForm: React.FC<AddSizeFormProps> = ({ clothes, handleClose }) => {
    
    const form = useForm({
        defaultValues: {
            id: clothes?.id,
            name: clothes?.name,
            size: "",
            quantity: "",
        }
    })

    const onSubmit = async (values: any) => {
        console.log("1231312", values);
        
        try {
            const response = await fetch('/api/sizes', {
                method: 'POST',
                body: JSON.stringify({ 
                    action: 'add',
                    id: values.id, 
                    size: values.size, 
                    quantity: values.quantity
                }),
            })
    
            if (!response.ok) {
                throw new Error('Failed to fetch product sizes');
            }
    
            // const sizes = await response.json();
    
        } catch (error) {
            throw new Error('An unexpected error occurred');
        }

        // addSize({id: values.id, size: values.size, quantity: values.quantity});
        handleClose();
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