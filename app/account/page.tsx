"use client";

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { AppDispatch } from '@/store/store';
import { fetchUserDetails } from "@/features/user-slice";
import { Pencil } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function AccountPage() {

    const dispatch = useDispatch<AppDispatch>();
    const { user, status, error } = useTypedSelector((state) => state.user);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserDetails()); // Fetch user details on initial load
        }
    }, [dispatch, status]);

    const handleClick = () => {
        setIsModalOpen(true);
    };

    const [shippingDetails, setShippingDetails] = useState({
        name: "--",
        phone: "--",
        address: "--",
    });

    useEffect(() => {
        if (user?.id) {
            fetchShippingDetails(user.id);
        }
    }, [user]);

    const fetchShippingDetails = async (user_id: string) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/shipping-details?user_id=${user_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch shipping details.");
            }

            const data = await response.json();
            setShippingDetails({
                name: data?.name || "--",
                phone: data?.phone || "--",
                address: data?.address || "--",
            });
        } catch (error) {
            console.error("Error fetching shipping details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            // API call to save shipping details
            const response = await fetch(`/api/shipping-details`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: user?.id, ...shippingDetails }),
            });

            if (!response.ok) {
                throw new Error("Failed to save shipping details.");
            }

            const data = await response.json();
            console.log("asdasd", data);
            

            // Update the shipping details state
            setShippingDetails({
                name: data.name || "--",
                phone: data.phone || "--",
                address: data.address || "--",
            });

            // Close the dialog
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error creating shipping details:", error);
        }
    };



    return (
        <div className="p-6 space-y-6 pb-32">
            {/* Account Details Section */}
            <section className='mb-12'>
                <div className='flex gap-10 items-center'>
                    <h2 className="text-2xl font-bold mb-4">Account Details</h2>
                    <Pencil
                        size={20}
                        className="text-gray-500 hover:text-blue-500 cursor-pointer relative bottom-2"
                    />
                </div>
                <div className="space-y-4">
                    {/* Username */}
                    <div className="flex items-center gap-5">
                        <p className="text-lg text-gray-700">Username:</p>
                        <div className="flex items-center gap-10">
                            <p className="text-lg text-gray-700">{user?.username || "--"}</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-5">
                        <p className="text-lg text-gray-700">Email: </p>
                        <div className="flex items-center gap-10">
                            <p className="text-lg text-gray-700">{user?.email || "--"}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shipping Details Section */}
            <section>
                <div className='flex gap-10 items-center'>
                    <div className="text-2xl font-bold mb-4 text-center">Shipping Details</div>
                    <Pencil
                        size={20}
                        className="text-gray-500 hover:text-blue-500 cursor-pointer relative bottom-2"
                        onClick={() => handleClick()}
                    />
                </div>
                <div className="space-y-4">
                    {/* Name */}
                    <div className="flex items-center gap-5">
                        <p className="text-lg text-gray-700">Full Name:</p>
                        <div className="flex items-center gap-10">
                            <p className="text-lg text-gray-700">{shippingDetails?.name || "--"}</p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-5 items-center">
                        <p className="text-lg text-gray-700">Phone:</p>
                        <div className="flex items-center gap-10">
                            <p className="text-lg text-gray-700">{shippingDetails?.phone || "--"}</p>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-center gap-5">
                        <p className="text-lg text-gray-700">Address:</p>
                        <div className="flex items-center gap-10">
                            <p className="text-lg text-gray-700">{shippingDetails?.address || "--"}</p>
                        </div>
                    </div>
                </div>
            </section>


            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex pb-6 justify-center">Add shipping detail</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={shippingDetails.name !== "--" ? shippingDetails.name : ""}
                                onChange={handleInputChange}
                                placeholder="Enter full name"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={shippingDetails.phone !== "--" ? shippingDetails.phone : ""}
                                onChange={handleInputChange}
                                placeholder="Enter phone number"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={shippingDetails.address !== "--" ? shippingDetails.address : ""}
                                onChange={handleInputChange}
                                placeholder="Enter address"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}