"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckboxWithText } from "@/components/products/checkbox"
import { useState, ChangeEvent } from "react";
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { loadShoes } from '@/features/shoes-slice';
import { AppDispatch } from '@/store/store';


export const Filter = () => {

    const dispatch = useDispatch();
    const { items, loading, load_filter } = useTypedSelector((state) => state.shoes);

    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");
    const [brands, setBrands] = useState<string[]>([]);
    const [size, setSize] = useState<string>("");

    const handleBrandChange = (brand: string) => {
        setBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((b) => b !== brand)
                : [...prev, brand]
        );
    };

    const applyFilters = () => {
        const filters: Record<string, string> = {};
        if (minPrice) filters.minPrice = minPrice;
        if (maxPrice) filters.maxPrice = maxPrice;
        if (brands.length > 0) filters.brands = brands.join(",");
        if (size) filters.size = size;

        dispatch(loadShoes(filters));
    };

    const handleInputChange =
        (setter: React.Dispatch<React.SetStateAction<string>>) =>
            (event: ChangeEvent<HTMLInputElement>) => {
                setter(event.target.value);
            };

    return (
        <div className="w-1/5 px-5 pb-52 border-t border-r border-gray-200 h-[800px] ">
            <Accordion type="multiple" >
                <AccordionItem value="item-1" className=" mt-4">
                    <AccordionTrigger>Price Filter</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                        <Input placeholder="Min price" value={minPrice || load_filter.minPrice} onChange={handleInputChange(setMinPrice)} />
                        <Input placeholder="Max price" value={maxPrice || load_filter.maxPrice} onChange={handleInputChange(setMaxPrice)}/>
                        <Button className="bg-black text-white"  onClick={applyFilters}>Apply</Button>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>Brand</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                        <CheckboxWithText id="nike" content="Nike" onChange={() => handleBrandChange("nike")}/>
                        <CheckboxWithText id="adidas" content="Adidas" onChange={() => handleBrandChange("adidas")}/>
                        <CheckboxWithText id="puma" content="Puma" onChange={() => handleBrandChange("puma")}/>
                        <CheckboxWithText id="new_balance" content="Jordan" onChange={() => handleBrandChange("jordan")}/>
                        <CheckboxWithText id="under_armour" content="Under Armour" onChange={() => handleBrandChange("under armour")}/>
                        <Button className="bg-black text-white" onClick={applyFilters}>Apply</Button>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>Size</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                        <Input placeholder="Pick a size" value={size || load_filter.size} onChange={handleInputChange(setSize)}/>
                        <Button className="bg-black text-white" onClick={applyFilters}>Apply</Button>
                    </AccordionContent>
                </AccordionItem>


            </Accordion>
        </div>
    );
};


