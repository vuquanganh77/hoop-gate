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

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { AppDispatch } from '@/store/store';
import { fetchUserDetails } from "@/features/user-slice";
import { loadOrders, updateOrder } from "@/features/order-slice";
import { OrderDetail } from "./order-detail";
import { Button } from "@/components/ui/button"


export default function AdminOrderPage() {

    // const [orders, setOrders] = useState([]);
    const dispatch = useDispatch<AppDispatch>();
    const { user, status, error } = useTypedSelector((state) => state.user);

    const { orders, loading } = useTypedSelector((state) => state.order);


    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserDetails()); // Fetch user details on initial load
        }
    }, [dispatch, status]);

    useEffect(() => {
        dispatch(loadOrders()); // Fetch orders on initial load
    }, [dispatch]);

    return user?.role === 1 ? (
        <div className="flex flex-col gap-9 px-16 pb-16">

            <div className="sticky top-0 bg-white w-full z-10 text-xl font-semibold">
                <span>Orders List</span>
            </div>

            <Table>
                <TableCaption>List of orders.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Total price</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <OrderItem
                                key={order.id}
                                id={order.id}
                                username={order.user_name}
                                payment_method={order.is_payment_online}
                                created_at={order.createdAt}
                                total_price={order.total_price}
                                status={order.status}
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
    ) : (
        <div className="px-16">
            <h1 className="text-2xl font-bold text-center text-red-500 py-32">
                You don't have permission to access this page.
            </h1>
        </div>
    );
}

interface OrderItemProps {
    id: number;
    username: string;
    payment_method: number;
    created_at: string;
    total_price: number;
    status: number;
    onStatusClick?: () => void;
    onUserClick?: () => void;
}


export function OrderItem({ id, username, payment_method, created_at, total_price, status }: OrderItemProps) {
    const formatted_price = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
    }).format(total_price)

    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);
    const [order_id, setOrderId] = useState<number | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const handleStatusClick = (id: any) => {
        console.log(`Modify status for order ID: ${id}`);

        setOrderId(id)
        setIsModalStatusOpen(true); // Open the modal
    };

    const handleUserClick = (id: any) => {
        // console.log("ádasd", user_name);
        setOrderId(id)
        setIsModalDetailOpen(true); // Open the modal
    };

    const payment = payment_method == 1 ? "Online" : "Cash On Delivery";

    // const statusLabel = status === 0 ? "Shipping" : "Paid";
    // const statusColor = status === 0 ? "bg-yellow-100 text-yellow-600" : "bg-green-200 text-green-800";

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
    }else {
        statusLabel = "Paid";
        statusColor = "bg-green-200 text-green-800"
    }

    const handleClose = () => {
        setIsModalStatusOpen(false);
    }

    const handleChange = (status: number) => {
        console.log("changeee");
        // const newStatus = status === 0 ? 1 : 0; // Toggle between 0 and 1
        dispatch(updateOrder({ id, status }));
        setIsModalStatusOpen(false);
    }


    return (
        <>
            <TableRow>
                <TableCell className="font-medium"><span
                    className="cursor-pointer text-blue-500 hover:underline"
                    onClick={() => handleUserClick(id)}
                >
                    {username}
                </span></TableCell>
                <TableCell>{payment}</TableCell>
                <TableCell>{created_at}</TableCell>
                <TableCell>{formatted_price}</TableCell>
                <TableCell className="text-right"><span
                    className={`cursor-pointer px-2 py-1 rounded ${statusColor} border`}
                    onClick={() => handleStatusClick(id)}
                >
                    {statusLabel}
                </span></TableCell>
            </TableRow>

            <Dialog open={isModalDetailOpen} onOpenChange={setIsModalDetailOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex pb-6 justify-center">Order Details </DialogTitle>
                        <DialogDescription asChild>
                            <OrderDetail id={order_id} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Dialog open={isModalStatusOpen} onOpenChange={setIsModalStatusOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex pb-6 justify-center">Change Order Status</DialogTitle>
                        <DialogDescription className="flex justify-between px-6">
                            <Button onClick={() => handleChange(0)}>Processing</Button>
                            <Button onClick={() => handleChange(1)}>Shipping</Button>
                            <Button onClick={() => handleChange(2)}>Canceled</Button>
                            <Button onClick={() => handleChange(3)}>Paid</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
