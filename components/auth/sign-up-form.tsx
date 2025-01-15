"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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

interface SignUpFormProps {
    handleClose?: () => void; // Hàm đóng form chỉnh sửa
}

const SignUpForm: React.FC<SignUpFormProps> = () => {

    const form = useForm({
        defaultValues: {
            email: "",
            phone_number: "",
            username: "",
            password: "",
            check_password: "",
        }
    })

    const onSubmit = async (values: any) => {
        console.log("1231312", values);

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({
                    email: values.email,
                    phone_number: values.phone_number,
                    username: values.username,
                    password: values.password,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to sign up');
            }

            // const sizes = await response.json();

        } catch (error) {
            throw new Error('An unexpected error occurred');
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
                        name="email"
                        render={({ field }) => (

                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (

                            <FormItem>
                                <FormLabel>Phone number</FormLabel>
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
                        name="username"
                        render={({ field }) => (

                            <FormItem>
                                <FormLabel>Username</FormLabel>
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="check_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Re enter Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>


                <Button type="submit" className="w-full">Sign Up</Button>
                <div className="mt-10 mx-auto">Already have an account? <Link href='/auth/signin'><span className="italic"> Sign In</span></Link></div>

            </form>
        </Form>

    )
}

export default SignUpForm;