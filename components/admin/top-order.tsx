"use client";
import { useState, useEffect } from "react"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Image } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { AppDispatch } from '@/store/store';
import { fetchUserDetails } from "@/features/user-slice";


export default function TopOrder() {

    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch<AppDispatch>();
    // const { user, status, error } = useTypedSelector((state) => state.user);


    // useEffect(() => {
    //     if (status === "idle") {
    //         dispatch(fetchUserDetails()); // Fetch user details on initial load
    //     }
    // }, [dispatch, status]);

    useEffect(() => {
        const fetchTopOrders = async () => {
            try {
                const response = await fetch('/api/order/top', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const result = await response.json();

                console.log("zzz", result);
                setOrders(result);

            } catch (error) {
                console.error(error)
            }
        }

        fetchTopOrders();

    }, [])


    return (
        <div className="flex flex-col gap-9 px-16 pb-16 mt-6">
            <span className="mx-auto font-semibold">Top Orders</span>
            {/* <div className="sticky top-0 bg-white w-full z-10 text-xl font-semibold">
                <span>Orders List</span>
            </div> */}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]"></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Type</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <OrderItem
                                key={order.id}
                                product_id={order.product.id}
                                img={order.product.image_url}
                                name={order.product.name}
                                brand={order.product.brand}
                                price={order.product.price}
                                type={order.product.type}
                                quantity={order.totalQuantity}
                            />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">No orders found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </div>
    )
}

interface OrderItemProps {
    id: number;
    img: string;
    name: string;
    brand: string;
    price: number;
    type: string;
    quantity: number;
}


export function OrderItem({ id, img, name, brand, type, quantity, price}: OrderItemProps) {
    const formatted_price = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
    }).format(price)


    return (
        <>
            <TableRow className="cursor-pointer">
                <TableCell><Image src={img} width={16} height={16}></Image></TableCell>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>{brand}</TableCell>
                <TableCell>{formatted_price}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell className="text-right">{type.toUpperCase()}</TableCell>
            </TableRow>

        </>
    )
}