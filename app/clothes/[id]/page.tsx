"use client";
import { ProductDetail } from "@/components/products/detail"
import { Button } from "@/components/ui/button"
import { Star, Heart } from "lucide-react"
import { ProductReview } from "@/components/products/review"
import { useState } from "react";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { loadClothes } from '@/features/clothes-slice';
import { AppDispatch } from '@/store/store';
import { useParams } from 'next/navigation';
import { SkeletonLoading } from '@/components/layouts/skeleton'
import { useSelector } from "react-redux";
import { fetchUserDetails } from "@/features/user-slice";
import { loadComments } from "@/features/comment-slice";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function ClothesDetail() {
    
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useTypedSelector((state) => state.clothes);
    const [suggested_clothes, setSuggestedClothes] = useState([]);
    const { user, status, error } = useTypedSelector((state) => state.user);
    const { comments } = useTypedSelector((state) => state.comment);
    const [mainImage, setMainImage] = useState<string | undefined>("");
    const [selectedSize, setSelectedSize] = useState<string>("");


    useEffect(() => {
        if (id) {
            dispatch(loadClothes({}));
            dispatch(loadComments(id));
        }
    }, [id, dispatch]);


    // Access user data and status from Redux store
    
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserDetails()); // Fetch user details on initial load
        }
    }, [dispatch, status]);
    
    
    const clothes = items.find((item) => item.id === Number(id));
    
    useEffect(() => {
        if (clothes?.main_url) {
            setMainImage(clothes.main_url); // Update state when shoes are loaded
        }
    }, [clothes]);

    useEffect(() => {
        if(clothes){
            dispatch(loadComments(clothes?.id)); // Fetch user details on initial load
        }
    }, [clothes]);

    if (!clothes) return <SkeletonLoading />;
    
    const handleAddToCart = async () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        } else {

            if (!clothes?.id || !user?.id) {
                alert("User or product information is missing.");
                return;
            }

            try {
                const response = await fetch('/api/cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: user?.id,
                        product_id: clothes.id,
                        size: selectedSize,
                    }),
                });

                const data = await response.json();
            } catch (error) {
                console.error(error);
                alert('An error occurred. Please try again.');
            }
        }
    }

    const handleFavorite = async () => {
        // alert("Add product" + shoes?.name + "to favorite" );
        if (!clothes?.id || !user?.id) {
            alert("User or product information is missing.");
            return;
        }

        try {
            const response = await fetch('/api/fav', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user?.id,
                    product_id: clothes.id,
                }),
            });

            const data = await response.json();
            // console.log("data", data);


            if (response.ok) {
                alert(`Product "${clothes?.name}" added to favorites!`);
            } else {
                alert(`Error: ${data.error || 'Unable to add to favorites.'}`);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    }

    const sizes = [
        { label: "3 US / 2 UK / 36 VN", id: "3" },
        { label: "4 US / 3 UK / 37 VN", id: "4" },
        { label: "5 US / 4 UK / 38 VN", id: "5" },
        { label: "6 US / 5.5 UK / 39 VN", id: "6" },
        { label: "6.5 US / 6 UK / 39.5 VN", id: "6.5" },
        { label: "7 US / 6.5 UK / 40 VN", id: "7" },
        { label: "7.5 US / 7 UK / 40.5 VN", id: "7.5" },
        { label: "8 US / 7.5 UK / 41 VN", id: "8" },
        { label: "8.5 US / 8 UK / 41.5 VN", id: "8.5" },
        { label: "9 US / 8.5 UK / 42 VN", id: "9" },
        { label: "9.5 US / 9 UK / 42.5 VN", id: "9.5" },
        { label: "10 US / 9.5 UK / 43 VN", id: "10" },
        { label: "10.5 US / 10 UK / 43.5 VN", id: "10.5" },
        { label: "11 US / 10.5 UK / 44 VN", id: "11" },
        { label: "11.5 US / 11 UK / 44.5 VN", id: "11.5" },
        { label: "12 US / 11.5 UK / 45 VN", id: "12" },
        { label: "12.5 US / 12 UK / 45.5 VN", id: "12.5" },
        { label: "13 US / 12.5 UK / 46 VN", id: "13" },
        { label: "13.5 US / 13 UK / 46.5 VN", id: "13.5" },
        { label: "14 US / 13.5 UK / 47 VN", id: "14" },
    ];


    const sizes_with_quantity = sizes.map((size) => {
        // Find the corresponding size in shoeSizes
        const matchingClothes = clothes.sizes.find((clothe) => clothe.size.toString() === size.id);
        return {
            ...size,
            quantity: matchingClothes ? matchingClothes.quantity : 0, // Add quantity attribute
        };
    });

    // console.log("sizes_with_quantity", sizes_with_quantity);


    // if(shoes) {
    const price = clothes ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
    }).format(clothes.price) : "Loading...";

    var gallery = JSON.parse(clothes.gallery);
    // }

    return (
        <div>
            <div className="flex gap-7  justify-center pb-32">

                {/* shoes pictures */}
                <div className="flex justify-center pb-10 sticky-wrapper ">
                    <div className="sticky-content">
                        <div className="flex gap-6">
                            <div className="flex flex-col gap-4 max-h-[600px] overflow-y-scroll scrollbar-hide">
                                {gallery.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-20 h-20 object-cover cursor-pointer"
                                        onMouseEnter={() => setMainImage(img)}
                                    />
                                ))}
                            </div>
                            <div className="relative">
                                <img
                                    src={mainImage}
                                    alt="Main product"
                                    className="w-[500px] h-[600px] object-cover border-2 border-gray-200 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* clothes details */}
                <div className="flex flex-col gap-2 ">
                    <span className="font-semibold">{clothes?.name}</span>
                    <span className="">{clothes?.brand}</span>
                    <span className="font-semibold mb-5">{price}</span>

                    <div className="max-w-4xl pb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Select Size</h3>
                            <button className="text-sm">Size Guide</button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {sizes_with_quantity.map((size) => (
                                <button
                                    key={size.id}
                                    onClick={() => size.quantity > 0 && setSelectedSize(size.id)} // Only update selected size if available
                                    disabled={size.quantity === 0} // Disable the button if the size is not available
                                    className={`w-full py-3 px-8 text-sm border rounded-md ${size.quantity === 0
                                        ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed" // Unavailable style
                                        : selectedSize === size.id
                                            ? "bg-black text-white border-black" // Selected style
                                            : "bg-white text-black border-gray-300 hover:bg-gray-100" // Default style
                                        }`}
                                >
                                    {size.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button className="bg-black text-white radius rounded-3xl p-3 hover:bg-white hover:text-black hover:border" onClick={handleAddToCart}>Add to cart</Button>
                    <Button className="bg-white text-black border radius rounded-3xl p-3 hover:bg-black hover:text-white" onClick={handleFavorite}>Favorite<Heart /></Button>

                    <div className="flex flex-col gap-1 max-w-96">
                        <span className="font-semibold">Shipping</span>
                        <span>You'll see our shipping options at checkout.</span>
                        <br />
                        <span>Nike C1TY is engineered to overcome anything the city throws your way. A mesh upper keeps the fit breathable, while the reinforced sides and toe box help protect your feet from the elements. This edition pulls color inspiration from tactical surplus clothing—giving street style a whole new meaning.</span>
                    </div>

                    {/* Reviews */}
                    <div>
                        <Accordion type="multiple" >
                            <AccordionItem value="item-1" className=" mt-4">
                                <AccordionTrigger className="text-xl">Shipping & Returns</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-2 max-w-96">
                                    Free standard shipping on orders $50+ and free 60-day returns for Hooper Gate Members
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-xl flex justify-between"><span>Reviews({comments.length})</span> <span className="ml-32 flex text-black"><Star /><Star /><Star /><Star /><Star /></span></AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-2 max-w-96">
                                    {
                                        comments.length > 0 ?
                                            comments.map((comment) => (
                                                <ProductReview key={comment.id} createdAt={comment.createAt} user={comment.user_name} content={comment.content} rating={comment.star} />
                                            )) : <div>No comments</div>
                                    }
                                    {/* <ProductReview createdAt='20/11/2024' user='vqanh77' content='San pham rat tuyet voi' rating={5} />
                                    <ProductReview createdAt='20/11/2024' user='vqanh77' content='Toi se mua them lan nua' rating={3} />
                                    <ProductReview createdAt='20/11/2024' user='vqanh77' content='San pham nay co tot khong' rating={4} /> */}
                                </AccordionContent>
                            </AccordionItem>


                        </Accordion>

                    </div>

                </div>
            </div>

            <div className="flex flex-col p-6">
                <div className="flex justify-between ">
                    <span className="text-2xl font-semibold">You Might Also Like</span>
                </div>

                <div className="flex overflow-y-auto gap-5 py-3 scrollbar-thin">
                    {
                        items.slice(1, 6).map((item) => (
                            <ProductDetail key={item.id} source={item.main_url} name={item.name} rating={item.average_rating} description={item.description} price={item.price} type="clothes" />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}