import { ProductDetail } from "@/components/products/detail" 
import { Image } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

export default function CartPage(){
    return (
        <div>

            <div className="flex px-3 mx-auto w-2/3 gap-60 pb-60 ">
                {/* bag section */}
                <div className="flex flex-col gap-3">
                    <span className="text-xl font-semibold pb-5">Bag</span>
                    <CartItem src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction"  description="Men's shoes" price={3000000} type="shoes" size={9.5}/>
                    <CartItem src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction"  description="Men's shoes" price={3000000} type="shoes" size={9.5}/>
                </div>

                {/* summary section */}
                <div className="flex flex-col gap-2 w-1/3">
                    <span className="font-semibold text-xl pb-5">Summary</span>
                    <span>Subtotal {}</span>

                    <span>Total</span>
                    <Button className="bg-black text-white hover:bg-white hover:text-black border rounded-md">Checkout</Button>
                </div>
            </div>

            <div className="flex flex-col p-6 mt-16">
                <div className="flex justify-between">
                    <span className="text-2xl font-semibold">You Might Also Like</span>
                </div>

                <div className="flex overflow-y-auto gap-5 py-3 scrollbar-thin">
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes" />
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes" />
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes" />
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes" />
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes" />
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes" />
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes" />
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes" />
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes" />
                    <ProductDetail source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes" />
                </div>
            </div>
        </div>
    )
}

interface CartItemProps {
    src?: string;
    name?: string;
    type?: string;
    description?: string;
    size?: number;
    price?: number;
    quantity?: number;
}

export function CartItem({src, name, description, size, price, type, quantity}: CartItemProps){
    return (
        <div className="flex gap-6">
            <Image src={src} width={32} height={32}></Image>
            <div className="flex flex-col gap-1 text-sm mr-32">
                <span className="text-xl font-semibold">{name}</span>
                <span>{type}</span>
                <span> Quantity: {quantity}</span>
                <span>Size {size}</span>
            </div>
            <div className="text-xl font-semibold">{price}</div>
        </div>
    )
}