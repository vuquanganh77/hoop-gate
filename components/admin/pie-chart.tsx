"use client";

import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from 'react';

export default function BasicPie() {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchOrderTypes = async () => {
            try {
                const response = await fetch('/api/order/types', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch order types');
                }
                const data = await response.json();
                console.log("asd", data);
                
                setChartData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrderTypes();
    }, []);

    return (
        <div className='flex flex-col gap-6 items-center'>
            <span className='font-semibold mb-6'>Type of Orders</span>
            <PieChart
                series={[
                    {
                        data: chartData
                    },
                ]}
                width={400}
                height={200}
            />
        </div>
    );
}