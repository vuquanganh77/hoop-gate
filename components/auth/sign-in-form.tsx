"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ProductSchema } from "@/schemas";
import { addSize } from "@/model/products/shoes/shoes"

import { useEffect } from "react";
import { useRouter } from "next/navigation";    

import type { Shoes } from "@/app/admin/shoes/columns"



import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

interface Credentials {
    username: string;
    password: string;
}

interface SignInFormProps {
    handleClose?: () => void; // Hàm đóng form chỉnh sửa
}

const SignInForm: React.FC<SignInFormProps> = ({ handleClose }) => {
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const onSubmit = async (values: any) => {
        console.log("1231312", values);
        
        try {
            const response = await fetch('/api/signin', {
                method: 'POST',
                body: JSON.stringify({ 
                    username: values.username, 
                    password: values.password
                }),
            })
    
            if (!response.ok) {
                throw new Error('Failed to sign in');
            }
    
            // const sizes = await response.json();
            router.push("/");
            setTimeout(() => {
                window.location.reload(); // Reload the home page after redirection
            }, 1000);
        } catch (error) {
            throw new Error('An unexpected error occurred');
        }

        // addSize({id: values.id, size: values.size, quantity: values.quantity});
        if(handleClose){
            handleClose();
            window.location.reload();
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

                </div>


                <Button type="submit" className="w-full">Sign In</Button>
                <div className="mt-10 mx-auto">Don't have an account? <Link href='/auth/signup'><span className="italic">Sign up</span></Link></div>

            </form>
        </Form>

    )
}

export default SignInForm;