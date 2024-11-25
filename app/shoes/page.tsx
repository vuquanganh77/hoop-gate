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
import { Filter } from "@/components/filter/filter"
import { ProductDetail } from "@/components/products/detail"


export default async function ShoesPage() {
    return (
        <>
            <div className="">
                <div className="flex justify-between p-5 items-center sticky-header top-0 ">
                    <span className="text-2xl font-bold">ALL SHOES</span>
                    <div className="flex gap-3">
                        <Button className="p-2 bg-gray-200" >Hide Filter  <SlidersHorizontal className="mr-2 h-4 w-4" /></Button>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger className="bg-gray-200 px-3 rounded-md flex justify-center items-center">Sort By <ChevronDown className="ml-1 h-4 w-4" /></DropdownMenuTrigger>
                            <DropdownMenuContent className="pr-12">
                                <DropdownMenuItem>Price: Low-High</DropdownMenuItem>
                                <DropdownMenuItem>Price: High-Low</DropdownMenuItem>
                                <DropdownMenuItem>Rating: Low-High</DropdownMenuItem>
                                <DropdownMenuItem>Rating: High-Low</DropdownMenuItem>
                                <DropdownMenuItem>Name: A-Z</DropdownMenuItem>
                                <DropdownMenuItem>Name: Z-A</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <Button className="p-2 bg-gray-200" >Reset Filter </Button>

                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <Filter />
                    <div className="grid grid-cols-3 flex-grow gap-4 px-4 w-4/5">
                        <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes"/>
                        <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes"/>
                        <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes"/>
                        <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes"/>
                        <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes"/>
                    </div>
                </div>
            </div>
        </>
    );
}