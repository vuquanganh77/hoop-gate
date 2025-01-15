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
import StarRating from "./star";


export default function OrderPage() {

    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch<AppDispatch>();
    const { user, status, error } = useTypedSelector((state) => state.user);


    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserDetails()); // Fetch user details on initial load
        }
    }, [dispatch, status]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`/api/order?user_id=${user.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const result = await response.json();

                console.log("zzz", result);


                // Fetch details for each order
                const orderDetailsPromises = result.orders.map((order) =>
                    fetch(`/api/order/details/${order.id}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }).then((res) => {
                        if (!res.ok) {
                            throw new Error(`Failed to fetch details for order ID: ${order.id}`);
                        }
                        return res.json();
                    }).then((orderDetails) => ({
                        orderDetails, // Keep the details array
                        status: order.status, // Include the status from the original order
                    }))
                );

                const allOrderDetails = await Promise.all(orderDetailsPromises);

                // Fetch product details for each product_size_id in the order details
                const updatedOrderDetails = await Promise.all(
                    allOrderDetails.map(async ({ orderDetails, status }) => {
                        const productDetailsPromises = orderDetails.map(async (orderDetail: any) => {
                            const productResponse = await fetch(`/api/shoes/size/${orderDetail.product_size_id}`);
                            if (!productResponse.ok) {
                                throw new Error(`Failed to fetch details for product_size_id: ${orderDetail.product_size_id}`);
                            }
                            const productDetails = await productResponse.json();
                            return {
                                ...productDetails,
                                ...orderDetail,
                                status,
                            };
                        });

                        // Wait for all product details to be fetched and merged into the order detail
                        return await Promise.all(productDetailsPromises);
                    })
                );

                const flattenedOrders = updatedOrderDetails.flat();

                setOrders(flattenedOrders);
                // setLoading(false);
                console.log("orders", flattenedOrders);

            } catch (error) {
                console.error(error)
            }
        }

        if (user?.id) {
            fetchOrders();
        }

    }, [user])


    return (
        <div className="flex flex-col gap-9 px-16 pb-16">

            <div className="sticky top-0 bg-white w-full z-10 text-xl font-semibold">
                <span>Orders List</span>
            </div>

            <Table>
                <TableCaption>A list of your orders.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]"></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead className="text-right">Size</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <OrderItem
                                key={order.id}
                                product_id={order.product_id}
                                img={order.main_url}
                                name={order.name}
                                brand={order.brand}
                                size={order.size}
                                quantity={order.quantity}
                                price={order.price}
                                status={order.status}
                                user={user.id}
                            />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">No orders found</TableCell>
                        </TableRow>
                    )}
                    {/* <OrderItem img="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" brand="Nike" size={8} quantity={1} price={3000000} />
                    <OrderItem img="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" brand="Nike" size={8} quantity={1} price={3000000} /> */}
                </TableBody>
            </Table>

        </div>
    )
}

interface OrderItemProps {
    product_id: number;
    img: string;
    name: string;
    brand: string;
    size: number;
    quantity: number;
    price: number;
    status: number;
    user: number;
}


export function OrderItem({ product_id, img, name, brand, size, quantity, price, status, user }: OrderItemProps) {
    const formatted_price = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
    }).format(price)

    var statusLabel = '';
    var statusColor = '';

    if (status == 0) {
        statusLabel = "Processing";
        statusColor = "bg-gray-100 text-gray-600"
    } else if (status == 1) {
        statusLabel = "Shipping";
        statusColor = "bg-yellow-100 text-yellow-600"
    } else if (status == 2) {
        statusLabel = "Canceled";
        statusColor = "bg-red-100 text-red-600"
    } else {
        statusLabel = "Paid";
        statusColor = "bg-green-200 text-green-800"
    }

    const handleClick = () => {
        if (status === 3) {
            console.log("asdasd");
            setIsModalOpen(true);
        }
    };

    const handleSubmit = async () => {
        if (comment.trim() == "") {
            alert("Comment cannot be empty. Please provide your feedback.");
            return;
        }
        console.log("Submitted Comment:", comment);
        console.log("Submitted Rating:", rating);
        console.log("sadads", product_id)

        try {
            const response = await fetch("/api/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({comment: comment, rating: rating, product_id: product_id, user_id: user}),
            });

            // Handle response
            if (!response.ok) {
                throw new Error("Failed to post comment. Please try again later.");
            }

            const result = await response.json();
            console.log("API response:", result);
            setComment("");
            setRating(0);
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
        }


    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);

    return (
        <>
            <TableRow className="cursor-pointer" onClick={handleClick}>
                <TableCell><Image src={img} width={16} height={16}></Image></TableCell>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>{brand}</TableCell>
                <TableCell className="text-right">{size}</TableCell>
                <TableCell className="text-right">{quantity}</TableCell>
                <TableCell className="text-right">{formatted_price}</TableCell>
                <TableCell className="text-right"><span
                    className={`cursor-pointer px-2 py-1 rounded ${statusColor} border`}
                >
                    {statusLabel}
                </span></TableCell>
            </TableRow>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex pb-6 justify-center">Add Comment and Rating</DialogTitle>
                        <DialogDescription className="flex justify-between px-6">
                            <span className="text-gray-600">Please share your feedback for this product.</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 p-4">
                        <textarea
                            className="w-full p-2 border rounded"
                            rows={4}
                            placeholder="Write your comment here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="flex items-center gap-2">
                            <span>Rate:</span>
                            <StarRating rating={rating} onRatingChange={setRating} />
                        </div>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}