"use client";
import { useState, useEffect } from "react";
import { getProductSizesByProductId } from "@/model/products/shoes/loader";
import { set } from "zod";

export function ShoesSizeDetail({ product_id }: { product_id: any }) {
    const [productSizes, setProductSizes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductSizes = async () => {
            try {
                const response = await fetch('/api/sizes', {
                    method: 'POST',
                    body: JSON.stringify({ 
                        action: 'fetch',
                        id: product_id 
                    }),
                })
        
                if (!response.ok) {
                    throw new Error('Failed to fetch product sizes');
                }
        
                const sizes = await response.json();
        
                setProductSizes(sizes);
                setLoading(false);
            } catch (error) {
                throw new Error('An unexpected error occurred');
            }
        };

        if (product_id) {
            fetchProductSizes();
        }
    }, [product_id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {productSizes.length > 0 ? (
                <ul className="flex flex-wrap gap-8">
                    {productSizes.map((size) => (
                        <li key={size.id} className="flex gap-3 items-center ">
                            <div className=" py-3 px-8 text-sm border rounded-md"> Size {size.size}</div>
                            <span>Quantity: {size.quantity}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No sizes available for this product.</p>
            )}
        </div>
    );
}
