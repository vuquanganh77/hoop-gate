import { BigGridBox, SmallGridBox } from "@/components/home/grid-box";
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

export const ProductDetail = ({ source, name, rating, description, price, type }: ProductDetailProps) => {
    let href="";

    if (type == "shoes") {
        href = "/shoes/1";
    } else if (type == "clothes") {
        href = "/clothes/1";
    } else {
        href = "/accessories/1";
    }

    return (
        <>
            <Link href={href}>
                <div className="flex flex-col  w-[348px] h-[435px] mb-5">
                    <div className="overflow-hidden  object-fi">
                        <Image className="imgAnimation" src={source} />
                    </div>
                    <div className="flex justify-between">
                        <span className="font-bold">{name}</span>
                        <span className="flex items-center gap-1"><Star className="w-4 h-4" /> {rating}</span>
                    </div>
                    <div>{description}</div>
                    <div>{price}</div>
                </div>
            </Link>
        </>
    )
}