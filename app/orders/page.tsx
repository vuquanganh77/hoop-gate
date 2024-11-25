import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Image } from "@chakra-ui/react";


export default function OrderPage() {
    return (
        <div className="flex flex-col gap-9 px-16 pb-16">

            <div className="sticky top-0 bg-white w-full z-10 text-xl font-semibold">
                <span>Orders</span>
            </div>

            <Table>
                <TableCaption>A list of your orders.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]"></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <OrderItem img="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" brand="Nike" quantity={1} price={3000000} />
                    <OrderItem img="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/84d6451c-ce28-44af-876e-0b02a24c53c1/JA+2+PREHEAT+EP.png" name="Ja 2 Deduction" brand="Nike" quantity={1} price={3000000} />
                </TableBody>
            </Table>

        </div>
    )
}

interface OrderItemProps {
    img: string;
    name: string;
    brand: string;
    quantity: number;
    price: number;
}


export function OrderItem({ img, name, brand, quantity, price }: OrderItemProps) {
    return (
        <TableRow>
            <TableCell><Image src={img} width={16} height={16}></Image></TableCell>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>{brand}</TableCell>
            <TableCell className="text-right">{quantity}</TableCell>
            <TableCell className="text-right">{price}</TableCell>
        </TableRow>
    )
}