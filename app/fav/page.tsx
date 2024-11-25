import { ProductDetail } from "@/components//products/detail";
import { ProductFav } from "@/components/products/fav";

export default function FavPage() {
    return (
        <div className="flex flex-col gap-1">
            <div className="sticky top-0 bg-white p-6 w-full z-10 text-xl font-semibold">
                <span>Favourites</span>
            </div>

            <div className="grid grid-cols-3 py-6 px-20 mx-auto gap-16">
                <ProductFav source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes" />
                <ProductFav source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes" />
                <ProductFav source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes" />
                <ProductFav source="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" rating={5} description="Men's shoes" price={3000000} type="shoes" />
            </div>

            {/* Suggest section */}
            <div className="flex flex-col p-6 mt-16">
                <div className="flex justify-between">
                    <span className="text-2xl font-semibold">Find Your Next Favorite</span>
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