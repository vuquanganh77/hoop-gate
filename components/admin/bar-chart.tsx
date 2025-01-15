"use client";

import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts';

export default function BarChartA() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchOrderTypes = async () => {
            try {
                const response = await fetch('/api/order/bar', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch order types');
                }
                const data = await response.json();
                console.log("barr", data);
                
                setChartData(data); // Assuming `data` is an array of objects with products, orders, and favorites
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrderTypes();
    }, []);

    // Ensure chartData is populated and has at least 3 objects
    if (chartData.length === 0) {
        return <div>Loading...</div>; // Show a loading message or spinner
    }

    // Ensure that the data structure is as expected
    const productsData = chartData.map(item => item.products || 0);
    const ordersData = chartData.map(item => item.orders || 0);
    const favoritesData = chartData.map(item => item.favorites || 0);

    return (
        <div className='flex flex-col items-center'>
            <span className='font-semibold '>Products Chart</span>

            <BarChart
                xAxis={[{ scaleType: 'band', data: ['Shoes', 'Clothes', 'Accessories'] }]}
                series={[
                    { data: productsData },
                    { data: ordersData },
                    { data: favoritesData }
                ]}
                width={500}
                height={300}
            />
        </div>
    );
}
