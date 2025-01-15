'use client';

import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "@/components/shoes-filter/filter"
import { ProductDetail } from "@/components/products/detail"

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { loadAccessories } from '@/features/accessories-slice';
import { AppDispatch } from '@/store/store';
import { SkeletonLoading } from '@/components/layouts/skeleton'


export default function AccessoriesPage() {

    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, load_filter } = useTypedSelector((state) => state.accessories);
    const [sort_order, setSortOrder] = useState("");
    const [filterVisible, setFilterVisible] = useState(true); // State for filter visibility
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    useEffect(() => {
        dispatch(loadAccessories({}));
    }, [dispatch, sort_order]);

    if (loading) {
        return (
            <SkeletonLoading />
        )
    }

    const resetFilter = () => {
        dispatch(loadAccessories({}));
    }

    const handleSort = (sort_action: string) => {
        setSortOrder(sort_action);
        const filters: Record<string, string> = {};
        filters.sort = sort_action;
        dispatch(loadAccessories(filters));
    }

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            dispatch(loadAccessories({ search: searchQuery })); // Dispatch search only on Enter key
        }
    };


    const toggleFilter = () => {
        setFilterVisible(!filterVisible);
    };

    return (
        <>
            <div className="">
                <div className="flex justify-between p-5 items-center sticky-header top-0 ">
                    <span className="text-2xl font-bold">ALL ACCESSORIES</span>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Search accessories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Update state without triggering search
                            onKeyDown={handleSearch} // Listen for Enter key
                            className="border rounded-md px-2"
                        />
                        <Button className="p-2 bg-gray-200 text-black" onClick={toggleFilter} > {filterVisible ? "Hide Filter" : "Show Filter"}  <SlidersHorizontal className="mr-2 h-4 w-4" /></Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="bg-gray-200 px-3 rounded-md flex justify-center items-center">Sort By <ChevronDown className="ml-1 h-4 w-4" /></DropdownMenuTrigger>
                            <DropdownMenuContent className="pr-12">
                                <DropdownMenuItem onClick={() => handleSort("priceLowHigh")}>Price: Low-High</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSort("priceHighLow")}>Price: High-Low</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSort("ratingLowHigh")}>Rating: Low-High</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSort("ratingHighLow")}>Rating: High-Low</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSort("nameAZ")}>Name: A-Z</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSort("nameZA")}>Name: Z-A</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button className="p-2 bg-gray-200 text-black" onClick={resetFilter}>Reset Filter </Button>

                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    {filterVisible && <Filter />}
                    <div className="grid grid-cols-3 flex-grow gap-4 px-4 w-4/5">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <ProductDetail
                                    key={item.id}
                                    id={item.id}
                                    source={item.main_url}
                                    name={item.name}
                                    rating={item.average_rating}
                                    description={item.description}
                                    price={item.price}
                                    type="accessories"
                                />
                            ))
                        ) : (
                            <div className="text center">No items found</div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}
