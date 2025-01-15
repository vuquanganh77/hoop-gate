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

import { Image } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { AppDispatch } from '@/store/store';
import { fetchUserDetails } from "@/features/user-slice";
import { LucideChartNoAxesColumnIncreasing } from "lucide-react";

export function OrderDetail(id: any) {

    const [order_detail, setOrderDetail] = useState([]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {

                console.log("zzz", id.id);
                // Fetch details for the specified order
                const response = await fetch(`/api/order/details/${id.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch details for order ID: ${id.id}`);
                }

                const orderDetails = await response.json();



                // Fetch product details for each product_size_id in the order details
                const productDetailsPromises = orderDetails.map(async (orderDetail: any) => {
                    const productResponse = await fetch(`/api/shoes/size/${orderDetail.product_size_id}`);
                    if (!productResponse.ok) {
                        throw new Error(`Failed to fetch details for product_size_id: ${orderDetail.product_size_id}`);
                    }
                    const productDetails = await productResponse.json();

                    // Combine product details with the order detail
                    return {
                        ...productDetails,
                        ...orderDetail,
                    };
                });

                // Wait for all product details to be fetched and merged
                const updatedOrderDetails = await Promise.all(productDetailsPromises);

                setOrderDetail(updatedOrderDetails)
                // console.log("zzz", updatedOrderDetails);
                // Return the updated order details
                return updatedOrderDetails;
            } catch (error) {
                console.error("Error fetching order details:", error);
                throw error;
            }
        };

        fetchOrderDetails();
    }, [])

    return (
        <div >
            <Table>
                <TableCaption>Order details.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]"></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead className="text-right">Size</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {order_detail.length > 0 ? (
                        order_detail.map((order) => (
                            <OrderItem
                                key={order.id}
                                img={order.main_url}
                                name={order.name}
                                brand={order.brand}
                                size={order.size}
                                quantity={order.quantity}
                                price={order.price}
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
    img: string;
    name: string;
    brand: string;
    size: number;
    quantity: number;
    price: number;
}


export function OrderItem({ img, name, brand, size, quantity, price }: OrderItemProps) {
    const formatted_price = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
    }).format(price)

    return (
        <TableRow>
            <TableCell><Image src={img} width={16} height={16}></Image></TableCell>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>{brand}</TableCell>
            <TableCell className="text-right">{size}</TableCell>
            <TableCell className="text-right">{quantity}</TableCell>
            <TableCell className="text-right">{formatted_price}</TableCell>
        </TableRow>
    )
}