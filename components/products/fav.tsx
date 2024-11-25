import { BigGridBox, SmallGridBox } from "@/components/home/grid-box";
import { Button } from "@/components/ui/button";
import { Image } from "@chakra-ui/react";
import { Star } from "lucide-react";
import Link from 'next/link';



interface ProductDetailProps {
    source: string;
    name: string;
    description: string;
    rating: number;
    price: number;
    type: string;
}

export const ProductFav = ({ source, name, rating, description, price, type }: ProductDetailProps) => {
    let href = "";

    if (type == "shoes") {
        href = "/shoes/1";
    } else if (type == "clothes") {
        href = "/clothes/1";
    } else {
        href = "/accessories/1";
    }

    return (
        <>
            <div className="flex flex-col  w-[348px] h-[435px] mb-36">
                <Link href={href}>
                    <div className="overflow-hidden  object-fi">
                        <Image className="imgAnimation" src={source} />
                    </div>
                    <div className="flex justify-between">
                        <span className="font-bold">{name}</span>
                        <span className="flex items-center gap-1"> {price}</span>
                    </div>
                </Link>
                <div>{description}</div>

                <Button className="mt-3 border rounded-lg hover:bg-black hover:text-white">Add to cart</Button>
            </div>
        </>
    )
}