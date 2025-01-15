import { BigGridBox, SmallGridBox } from "@/components/home/grid-box";
import { Button } from "@/components/ui/button";
import { Image } from "@chakra-ui/react";
import { Star } from "lucide-react";
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { AppDispatch } from '@/store/store';
import { useParams } from 'next/navigation';
import { SkeletonLoading } from '@/components/layouts/skeleton'
import { useSelector } from "react-redux";
import { fetchUserDetails } from "@/features/user-slice";
import { removeFav } from '@/features/fav-slice';

interface ProductDetailProps {
    id: number;
    source: string;
    name: string;
    description: string;
    rating: number;
    price: number;
    type: string;
}

export const ProductFav = ({ id, source, name, rating, description, price, type }: ProductDetailProps) => {
    let href = "";
    // const id_number = parseInt(id);

    if (type == "shoes") {
        href = `/shoes/${id}`;
    } else if (type == "clothes") {
        href = `/clothes/${id}`;
    } else {
        href = `/accessories/${id}`;
    }

    const dispatch = useDispatch<AppDispatch>();

    const handleRemove = () => {
        console.log("remove", id);

        dispatch(removeFav(id));


    }

    const formatted_price = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
    }).format(price)

    return (
        <>
            <div className="flex flex-col  w-[348px] h-[435px] mb-36">
                <Link href={href}>
                    <div className="overflow-hidden  object-fi">
                        <Image className="imgAnimation" src={source} />
                    </div>
                    <div className="flex justify-between">
                        <span className="font-bold">{name}</span>
                        <span className="flex items-center gap-1"> {formatted_price}</span>
                    </div>
                </Link>
                <div>{description}</div>

                <Button className="mt-3 border rounded-lg hover:bg-white hover:text-black" onClick={handleRemove}>Remove</Button>
            </div>
        </>
    )
}