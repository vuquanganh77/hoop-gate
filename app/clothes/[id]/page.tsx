"use client";
import { ProductDetail } from "@/components/products/detail"
import { Button } from "@/components/ui/button"
import { Star, Heart } from "lucide-react"
import { ProductReview } from "@/components/products/review"
import { useState } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function ClothesDetail() {

    const [mainImage, setMainImage] = useState(
        "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/465c4a3c-7e96-4572-b2a2-ae3fe8d7b1dd/AS+M+NSW+AUTHRZD++PERSONNEL+TE.png"
    );

    const images = [
        "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/465c4a3c-7e96-4572-b2a2-ae3fe8d7b1dd/AS+M+NSW+AUTHRZD++PERSONNEL+TE.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/208890c4-29d0-4d87-b12d-f7e0e5d3518d/JA+2+PREHEAT+EP.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3f9dd5d1-6702-46f7-b608-2d6a93ff09ff/JA+2+PREHEAT+EP.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e8b34bb0-c386-401c-94c2-ac6fe816a59f/JA+2+PREHEAT+EP.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f60f579f-7949-42a0-92ae-60d824705859/JA+2+PREHEAT+EP.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4cffd5a7-e95f-4925-bf08-9614b53ef636/JA+2+PREHEAT+EP.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f3b665b8-f3da-4bac-abbd-22f4541f638f/JA+2+PREHEAT+EP.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/85f8a71e-b052-411b-899a-fc21bd4742fc/JA+2+PREHEAT+EP.png",
        // Add more image URLs here
    ];

    const [selectedSize, setSelectedSize] = useState(null);

    const sizes = [
        { label: "M 3.5 / W 5", id: "M 3.5 / W 5" },
        { label: "M 4 / W 5.5", id: "M 4 / W 5.5" },
        { label: "M 4.5 / W 6", id: "M 4.5 / W 6" },
        { label: "M 5 / W 6.5", id: "M 5 / W 6.5" },
        { label: "M 5.5 / W 7", id: "M 5.5 / W 7" },
        { label: "M 6 / W 7.5", id: "M 6 / W 7.5" },
        { label: "M 6.5 / W 8", id: "M 6.5 / W 8" },
        { label: "M 7 / W 8.5", id: "M 7 / W 8.5" },
        { label: "M 7.5 / W 9", id: "M 7.5 / W 9" },
        { label: "M 8 / W 9.5", id: "M 8 / W 9.5" },
        { label: "M 8.5 / W 10", id: "M 8.5 / W 10" },
        { label: "M 9 / W 10.5", id: "M 9 / W 10.5" },
        { label: "M 9.5 / W 11", id: "M 9.5 / W 11" },
        { label: "M 10 / W 11.5", id: "M 10 / W 11.5" },
        { label: "M 10.5 / W 12", id: "M 10.5 / W 12" },
        { label: "M 11 / W 12.5", id: "M 11 / W 12.5" },
        { label: "M 11.5 / W 13", id: "M 11.5 / W 13" },
        { label: "M 12 / W 13.5", id: "M 12 / W 13.5" },
        { label: "M 12.5 / W 14", id: "M 12.5 / W 14" },
        { label: "M 13 / W 14.5", id: "M 13 / W 14.5" },
    ];

    const price = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
    }).format(3000000)

    return (
        <div>
            <div className="flex gap-7  justify-center pb-32">

                {/* shoes pictures */}
                <div className="flex justify-center pb-10 sticky-wrapper ">
                    <div className="sticky-content">
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-4 max-h-[600px] overflow-y-scroll scrollbar-hide">
                            {images.map((img, index) => (
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

                {/* shoes details */}
                <div className="flex flex-col gap-2 ">
                    <span className="font-semibold">Nike Ja 2</span>
                    <span className="">Shoes</span>
                    <span className="font-semibold mb-5">{price}</span>

                    <div className="max-w-4xl pb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Select Size</h3>
                            <button className="text-sm">Size Guide</button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {sizes.map((size) => (
                                <button
                                    key={size.id}
                                    // onClick={() => setSelectedSize(size.id)}
                                    className={`w-full py-3 px-8 text-sm border rounded-md ${selectedSize === size.id
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-black border-gray-300"
                                        } hover:bg-gray-100 focus:outline-none`}
                                >
                                    {size.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button className="bg-black text-white radius rounded-3xl p-3">Add to cart</Button>
                    <Button className="bg-white text-black border radius rounded-3xl p-3">Favorite<Heart /></Button>

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
                                <AccordionTrigger className="text-xl flex justify-between"><span>Reviews(10)</span> <span className="ml-32 flex text-black"><Star /><Star /><Star /><Star /><Star /></span></AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-2 max-w-96">
                                    <ProductReview createdAt='20/11/2024' user='vqanh77' content='San pham rat tuyet voi' rating={5}/>
                                    <ProductReview createdAt='20/11/2024' user='vqanh77' content='Toi se mua them lan nua' rating={3}/>
                                    <ProductReview createdAt='20/11/2024' user='vqanh77' content='San pham nay co tot khong' rating={4}/>
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
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="clothes"/>
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="clothes"/>
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="clothes"/>
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="clothes"/>
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="clothes"/>
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="clothes"/>
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="clothes"/>
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="clothes"/>
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="clothes"/>
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="clothes"/>
                </div>
            </div>
        </div>
    )
}