import { BigGridBox, SmallGridBox } from "@/components/home/grid-box";
import { Image } from "@chakra-ui/react";
import { Star } from "lucide-react";
import Link from 'next/link';



interface ProductDetailProps {
    id: number;
    source: string;
    name: string;
    description: string;
    rating: number;
    price: number;
    type: string;
}

export const ProductDetail = ({ id, source, name, rating, description, price, type }: ProductDetailProps) => {
    let href="";

    if (type == "shoes") {
        href = `/shoes/${id}`;
    } else if (type == "clothes") {
        href = `/clothes/${id}`;
    } else {
        href = `/accessories/${id}`;
    }

    const formatted_price = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
    }).format(price)

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
                    <div>{formatted_price}</div>
                </div>
            </Link>
        </>
    )
}