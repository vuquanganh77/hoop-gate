"use client";

import BarChartA from "@/components/admin/bar-chart";
import BasicPie from "@/components/admin/pie-chart";
import TopOrder from "@/components/admin/top-order";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { AppDispatch } from '@/store/store';
import { fetchUserDetails } from "@/features/user-slice";

const AdminPage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [monthlyRevenue, setMonthlyRevenue] = useState<string | null>(null);
    // New states for the statistics
    const [totalOrder, setTotalOrder] = useState<number | null>(null);
    const [totalShoesSold, setTotalShoesSold] = useState<number | null>(null);
    const [totalClothesSold, setTotalClothesSold] = useState<number | null>(null);
    const [totalAccessoriesSold, setTotalAccessoriesSold] = useState<number | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const { user, status, error } = useTypedSelector((state) => state.user);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserDetails()); // Fetch user details on initial load
        }
    }, [dispatch, status]);


    const handleExportClick = async () => {
        // Simulating revenue calculation or fetching
        try {
            const revenue = await fetchMonthlyRevenue(); // Replace with your actual logic
            const formatted_revenue = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
            }).format(revenue)
            setMonthlyRevenue(formatted_revenue);
            setIsPopupOpen(true);
        } catch (error) {
            console.error("Failed to fetch revenue:", error);
        }
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setMonthlyRevenue(null);
    };

    const fetchMonthlyRevenue = async (): Promise<number> => {
        try {
            const response = await fetch('/api/revenue', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch monthly revenue: ${response.statusText}`);
            }

            const data = await response.json();

            console.log("Monthly revenue data:", data);


            return data || 0;
        } catch (error) {
            console.error("Error fetching monthly revenue:", error);
            return 0; // Return 0 if there was an error
        }
    };


    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            // const response = await fetch("/api/statistics", {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // });

            // if (!response.ok) {
            //     throw new Error(`Failed to fetch statistics: ${response.statusText}`);
            // }

            // const data = await response.json();
            setTotalOrder(45);
            setTotalShoesSold(40);
            setTotalClothesSold(5);
            setTotalAccessoriesSold(0);
        } catch (error) {
            console.error("Error fetching statistics:", error);
        }
    };


    return user?.role === 1 ? (
        <div className="px-16">
            <span className="pl-16 mb-14 font-bold text-2xl">DashBoard</span>

            {/* Statistics Section */}
            <div className="grid grid-cols-4 gap-4 my-8">
                <div className="p-4 bg-white shadow rounded-lg text-center">
                    <h3 className="text-lg font-bold">Orders</h3>
                    <p className="text-xl">{totalOrder !== null ? totalOrder : "Loading..."}</p>
                </div>
                <div className="p-4 bg-white shadow rounded-lg text-center">
                    <h3 className="text-lg font-bold">Shoes</h3>
                    <p className="text-xl">{totalShoesSold !== null ? totalShoesSold : "Loading..."}</p>
                </div>
                <div className="p-4 bg-white shadow rounded-lg text-center">
                    <h3 className="text-lg font-bold">Clothes</h3>
                    <p className="text-xl">{totalClothesSold !== null ? totalClothesSold : "Loading..."}</p>
                </div>
                <div className="p-4 bg-white shadow rounded-lg text-center">
                    <h3 className="text-lg font-bold">Accessories</h3>
                    <p className="text-xl">
                        {totalAccessoriesSold !== null ? totalAccessoriesSold : "Loading..."}
                    </p>
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleExportClick}>Revenue</Button>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex justify-center">
                    <BarChartA />
                    <BasicPie />
                </div>

                <div className="flex-grow">
                    <TopOrder />
                </div>
            </div>

            {/* Popup Component */}
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Monthly Revenue</h2>
                        {monthlyRevenue !== null ? (
                            <p className="text-lg">Revenue this month: {monthlyRevenue}</p>
                        ) : (
                            <p className="text-lg">Loading...</p>
                        )}
                        <div className="flex justify-end mt-4">
                            <Button onClick={closePopup}>Close</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : (
        <div className="px-16">
            <h1 className="text-2xl font-bold text-center text-red-500 py-32">
                You don't have permission to access this page.
            </h1>
        </div>
    );

};

export default AdminPage;
