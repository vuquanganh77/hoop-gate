"use client";

import { ProductDetail } from "@/components//products/detail";
import { ProductFav } from "@/components/products/fav";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { AppDispatch } from '@/store/store';
import { useParams } from 'next/navigation';
import { SkeletonLoading } from '@/components/layouts/skeleton'
import { useSelector } from "react-redux";
import { fetchUserDetails } from "@/features/user-slice";
import { loadShoes } from '@/features/shoes-slice';
import { loadFavs } from '@/features/fav-slice'


export default function FavPage() {
    // const [favorites, setFavorites] = useState([]);

    const dispatch = useDispatch<AppDispatch>();
    const { user, status, error } = useTypedSelector((state) => state.user);
    const { items, loading } = useTypedSelector((state) => state.shoes);
    const { favs } = useTypedSelector((state) => state.fav);

    useEffect(() => {
        dispatch(loadShoes({}));
    }, [dispatch]);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserDetails()); // Fetch user details on initial load
        }
    }, [dispatch, status]);

    console.log("user", user);


    useEffect(() => {
        if (user?.id) {
            dispatch(loadFavs(user.id));
        }
    }, [user]);

    console.log("favs", favs);
    

    return (
        <div className="flex flex-col gap-1">
            <div className="sticky top-0 bg-white p-6 w-full z-10 text-xl font-semibold">
                <span>Favourites</span>
            </div>

            <div className="grid grid-cols-3 py-6 px-20 mx-auto gap-16">
                {
                    loading ? (
                        <SkeletonLoading />
                    ) :
                        (favs?.length ? (
                            favs.map((item) => (
                                <ProductFav
                                    key={item.id}
                                    id={item.id}
                                    source={item.main_url}
                                    name={item.name}
                                    rating={item.average_rating}
                                    description={item.description}
                                    price={item.price}
                                    type={item.type}
                                />
                            ))
                        ) : (
                            <div className="text-gray-500 text-center col-span-3">
                                No favorites found.
                            </div>
                        ))
                }
            </div>

            {/* Suggest section */}
            <div className="flex flex-col p-6 mt-16">
                <div className="flex justify-between">
                    <span className="text-2xl font-semibold">Find Your Next Favorite</span>
                </div>

                <div className="flex overflow-y-auto gap-5 py-3 scrollbar-thin">
                    {
                        items.slice(1, 3).map((item) => (
                            <ProductDetail key={item.id} id={item.id} source={item.main_url} name={item.name} rating={item.average_rating} description={item.description} price={item.price} type="shoes" />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}