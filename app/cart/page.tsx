"use client";

import { ProductDetail } from "@/components/products/detail"
import { Image } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { AppDispatch } from '@/store/store';
import { useParams } from 'next/navigation';
import { SkeletonLoading } from '@/components/layouts/skeleton'
import { useSelector } from "react-redux";
import { fetchUserDetails } from "@/features/user-slice";
import { loadShoes } from '@/features/shoes-slice';
import { Trash2 } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function CartPage() {

    const [cart_items, setCartItems] = useState<CartItemProps[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    const { user, status, error } = useTypedSelector((state) => state.user);
    const { items, loading } = useTypedSelector((state) => state.shoes);

    useEffect(() => {
        dispatch(loadShoes({}));
    }, [dispatch]);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserDetails()); // Fetch user details on initial load
        }
    }, [dispatch, status]);


    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const response = await fetch(`/api/cart?user_id=${user?.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });


                if (!response.ok) {
                    throw new Error('Failed to fetch carts');
                }

                const cartData = await response.json();

                // const product_size_ids = cartData.map(item => item.product_size_id);

                // Fetch product details for each favorite product_id
                const productPromises = cartData.map((item) =>

                    fetch(`/api/shoes/size/${item.product_size_id}`)
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`Failed to fetch product for size ID ${item.product_size_id}`);
                            }
                            return res.json();
                        })
                        .then((product) => ({
                            ...product,
                            cart_id: item.id,
                            quantity: item.quantity, // Attach the quantity from cartData
                            total_price: product.price * item.quantity
                        }))
                );

                const products = await Promise.all(productPromises);
                console.log("co le nao", products);

                setCartItems(products);
                // console.log("cartItems", cart_items);

            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };

        if (user?.id) {
            fetchCarts();
        }
    }, [user]);

    useEffect(() => {
        console.log("cartItems", cart_items);
    }, [cart_items]);

    //remove function 
    const removeItem = async (id: string) => {
        console.log("chay vao ham remove");

        try {
            const response = await fetch("/api/cart/delete-item", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error("Failed to remove item from cart");
            }

            // Update the local state synchronously
            setCartItems((prevCart) => prevCart.filter((item) => item.cart_id !== id));
            // alert("Item removed from the cart");
        } catch (error) {
            console.error(error);
            // alert("Failed to remove item from cart");
        }
    };


    // Handle quantity update
    const updateQuantity = async (id: string, newQuantity: number) => {
        try {
            // Ensure quantity doesn't go below 1
            if (newQuantity < 1) {
                alert("Quantity cannot be less than 1");
                return;
            }

            const response = await fetch("/api/cart/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, quantity: newQuantity }),
            });


            if (!response.ok) {
                throw new Error("Failed to update quantity");
            }

            const updatedCart = await response.json();

            // Update the local state synchronously
            setCartItems((prevCart) =>
                prevCart.map((item) =>
                    item.cart_id === id
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        } catch (error) {
            console.error(error);
            alert("Failed to update quantity");
        }
    };

    const [isPayOnline, setIsPayOnline] = useState(false);

    // handle thanh toan online
    const handlePayOnline = async () => {
        try {
            const total_price = cart_items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            if (total_price <= 0) {
                alert("Cart is empty. Please add items to cart to proceed with payment.");
                return;
            }

            const response = await fetch("http://localhost:8888/order/create_payment_url", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: total_price,
                    language: "vn",
                    bankCode: "NCB"
                }),
            });

            if (!response.ok) {
                console.log("khong tao dc url");

                throw new Error("Failed to create payment URL");
            }

            const { payment_url } = await response.json();

            console.log("Payment URL:ssssss", payment_url);
            
            await handleOnlineCheckout();

            window.location.href = payment_url; // Redirect to the payment page

        } catch (error) {
            console.error("Error during online payment:", error);
            alert("Failed to proceed with online payment. Please try again.");
        }
    };


    const handleOnlineCheckout = async () => {
        if (!cart_items || cart_items.length == 0) {
            alert('YOur cart is empty!');
            return;
        }

        try {
            const total_price = cart_items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
            const order_response = await fetch('/api/order/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ price: total_price, user_id: user.id }),
            })

            if (!order_response.ok) {
                throw new Error("Failed to create order");
            }

            const { order_id } = await order_response.json();
            console.log("Order created successfully with di:", order_id);

            // Create order details

            const orderDetailsPromises = cart_items.map((item) =>
                fetch("/api/order/detail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        order_id,
                        product_size_id: item.id,
                        quantity: item.quantity,
                        total_price: item.total_price,
                    }),
                })
            );

            // Wait for all promises to resolve
            const orderDetailsResponses = await Promise.all(orderDetailsPromises);

            // Check for any failures
            if (orderDetailsResponses.some((res) => !res.ok)) {
                throw new Error("Failed to create some order details");
            }

            // Delete the cart
            const delete_response = await fetch('/api/cart/delete', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: user.id }),
            });

            if (!delete_response.ok) {
                throw new Error("Failed to delete cart");
            }

            setCartItems([]);

        } catch {
            console.error("Checkout failed:", error);
            alert("Something went wrong during checkout. Please try again.");
        }

    }


    const handleCheckout = async () => {
        if (!cart_items || cart_items.length == 0) {
            alert('YOur cart is empty!');
            return;
        }

        try {
            const total_price = cart_items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
            const order_response = await fetch('/api/order/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ price: total_price, user_id: user.id }),
            })

            if (!order_response.ok) {
                throw new Error("Failed to create order");
            }

            const { order_id } = await order_response.json();
            console.log("Order created successfully with di:", order_id);

            // Create order details

            const orderDetailsPromises = cart_items.map((item) =>
                fetch("/api/order/detail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        order_id,
                        product_size_id: item.id,
                        quantity: item.quantity,
                        total_price: item.total_price,
                    }),
                })
            );

            // Wait for all promises to resolve
            const orderDetailsResponses = await Promise.all(orderDetailsPromises);

            // Check for any failures
            if (orderDetailsResponses.some((res) => !res.ok)) {
                throw new Error("Failed to create some order details");
            }

            // Delete the cart
            const delete_response = await fetch('/api/cart/delete', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: user.id }),
            });

            if (!delete_response.ok) {
                throw new Error("Failed to delete cart");
            }

            setCartItems([]);

            alert("Order placed successfully and cart cleared!");
            console.log("All order details created successfully.");

        } catch {
            console.error("Checkout failed:", error);
            alert("Something went wrong during checkout. Please try again.");
        }

    }

    console.log("cartItems", cart_items);


    return (
        <div>

            <div className="flex px-3 mx-auto w-3/4 gap-60 pb-32">
                {/* bag section */}
                <div className="flex flex-col gap-3">
                    <span className="text-xl font-semibold pb-5">Bag</span>

                    {Array.isArray(cart_items) && cart_items.length > 0 ? (
                        cart_items.map((item) => (
                            <CartItem
                                key={item.id}
                                id={item.cart_id}
                                src={item.main_url}
                                name={item.name}
                                brand={item.brand}
                                description={item.description}
                                quantity={item.quantity}
                                price={item.price}
                                type={item.type}
                                size={item.size}
                                onQuantityChange={(newQuantity: number) => updateQuantity(item.cart_id, newQuantity)}
                                onRemoveItem={(cart_id: string) => removeItem(cart_id)}
                            />
                        ))
                    ) : (
                        <p>No items in the cart.</p> // You can display a message when there are no items
                    )}

                </div>

                {/* summary section */}
                <div className="flex flex-col gap-2 w-1/3">
                    <span className="font-semibold text-xl pb-5">Summary</span>
                    <span>
                        Subtotal:{" "}
                        {Array.isArray(cart_items) && cart_items.length > 0
                            ? cart_items.reduce((total, item) => total + item.price * item.quantity, 0)
                            : 0}
                    </span>

                    {/* Thanh toan online */}
                    {cart_items.length > 0 ? <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="payOnline"
                            className="cursor-pointer"
                            checked={isPayOnline}
                            onChange={(e) => setIsPayOnline(e.target.checked)}
                        />
                        <label htmlFor="payOnline" className="cursor-pointer">
                            Pay Online
                        </label>
                    </div> : ""}

                    {isPayOnline && (
                        <Button
                            className="bg-green-500 text-white hover:bg-green-700 rounded-md mt-2"
                            onClick={handlePayOnline}
                        >
                            Proceed to Pay Online
                        </Button>
                    )}
                    {/* */}

                    <Button className="bg-black text-white hover:bg-white hover:text-black border rounded-md" onClick={handleCheckout}>Checkout</Button>
                </div>
            </div>

            <div className="flex flex-col p-6 ">
                <div className="flex justify-between">
                    <span className="text-2xl font-semibold pl-5 pb-5">You Might Also Like</span>
                </div>

                <div className="flex overflow-y-auto gap-5 px-5 scrollbar-thin">
                    {
                        items.slice(1, 3).map((item) => (
                            <ProductDetail key={item.id} id={item.id} source={item.main_url} name={item.name} rating={item.average_rating} description={item.description} price={item.price} type="shoes" />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

interface CartItemProps {
    id?: string;
    src?: string;
    name?: string;
    type?: string;
    brand?: string;
    total_price?: number;
    description?: string;
    size?: number;
    price?: number;
    quantity?: number;
    onQuantityChange?: (newQuantity: number) => void;
    onRemoveItem?: (id: string) => void;
}

// Handler to update quantity
interface UpdateQuantityProps {
    id: number;
    newQuantity: number;
}

export function CartItem({ id, src, name, description, brand, size, price, type, quantity, onQuantityChange, onRemoveItem }: CartItemProps) {

    const [remove_modal, setRemoveModal] = useState(false);
    const [remove_id, setRemoveId] = useState();

    const handleRemoveModalOpen = () => setRemoveModal(true);
    const handleRemoveModalClose = () => setRemoveModal(false);

    const setValueRemove = (id: any) => {
        setRemoveId(id);
        handleRemoveModalOpen();
    };

    return (
        <div className="flex gap-6 mb-3">
            <Image src={src} width={32} height={32}></Image>
            <div className="flex flex-col gap-1 text-sm w-[350px]">
                <span className="text-xl font-semibold">{name}</span>
                <span>{brand}</span>
                <span>{type}</span>
                <span>Size {size}</span>

            </div>
            <div className="flex flex-col items-center">
                <div className="text-xl font-semibold ">{price}</div>
                <div className="flex items-center gap-3 mt-5">
                    <button
                        className="px-2 py-1 border rounded"
                        onClick={() => onQuantityChange && onQuantityChange(quantity - 1)}
                    >
                        -
                    </button>
                    <span>Quantity: {quantity}</span>
                    <button
                        className="px-2 py-1 border rounded"
                        onClick={() => onQuantityChange && onQuantityChange(quantity + 1)}
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Add a remove button */}
            <button
                className="text-gray-500 hover:text-gray-700 ml-auto"
                onClick={() => handleRemoveModalOpen()}
            >
                <Trash2 />
            </button>

            <Dialog open={remove_modal} onOpenChange={setRemoveModal}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex pb-6 justify-center">Do you sure you want to remove {name} from cart ?</DialogTitle>
                        <DialogDescription asChild>
                            <div className="flex justify-between gap-4">
                                <Button onClick={handleRemoveModalClose}>No</Button>
                                <Button
                                    onClick={() => {
                                        onRemoveItem && onRemoveItem(id);
                                        handleRemoveModalClose();
                                    }}
                                >
                                    Yes
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}