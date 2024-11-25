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


export default async function AccessoriesPage() {
    return (
        <>
            <div className="">
                <div className="flex justify-between p-5 items-center sticky-header top-0 ">
                    <span className="text-2xl font-bold">All Accessories</span>
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
                        <ProductDetail source="https://www.nike.sa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwffa687e9/nk/444/5/4/9/d/f/444549df_046c_44f6_992c_43fd637f0786.jpg?sw=520&sh=520&sm=fit" name="Nike T-shirt" rating={5} description="Men's accessories" price={3000000} type="accessories"/>
                        <ProductDetail source="https://www.nike.sa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwffa687e9/nk/444/5/4/9/d/f/444549df_046c_44f6_992c_43fd637f0786.jpg?sw=520&sh=520&sm=fit" name="Nike T-shirt" rating={5} description="Men's accessories" price={3000000} type="accessories"/>
                        <ProductDetail source="https://www.nike.sa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwffa687e9/nk/444/5/4/9/d/f/444549df_046c_44f6_992c_43fd637f0786.jpg?sw=520&sh=520&sm=fit" name="Nike T-shirt" rating={5} description="Men's accessories" price={3000000} type="accessories"/>
                        <ProductDetail source="https://www.nike.sa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwffa687e9/nk/444/5/4/9/d/f/444549df_046c_44f6_992c_43fd637f0786.jpg?sw=520&sh=520&sm=fit" name="Nike T-shirt" rating={5} description="Men's accessories" price={3000000} type="accessories"/>
                        <ProductDetail source="https://www.nike.sa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwffa687e9/nk/444/5/4/9/d/f/444549df_046c_44f6_992c_43fd637f0786.jpg?sw=520&sh=520&sm=fit" name="Nike T-shirt" rating={5} description="Men's accessories" price={3000000} type="accessories"/>
                    </div>
                </div>
            </div>
        </>
    );
}