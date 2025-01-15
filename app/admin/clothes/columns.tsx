"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { DataTableColumnHeader } from "@/components/admin/column-header"
import ModalDelete from "@/components/admin/clothes/modal.delete"
import ModalEdit from "@/components/admin/clothes/modal.edit"
import ModalAddSize from "@/components/admin/clothes/modal.add.size"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Clothes = {
    id: number
    name: string
    brand: string
    price: number
    description: string
    quantity: number
    main_image?: File
    main_url: string
    createAt: string;
    updatedAt: string;
}

export const columns = (setValueEditClothes: (clothes: Clothes) => void, setValueCurClothes: (clothes: Clothes) => void): ColumnDef<Clothes>[] => [
    {
        accessorKey: "name",
        header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: "brand",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Brand" />
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
            }).format(price)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Quantity" />
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const clothes = row.original

            const handleActionClick = (e: React.MouseEvent) => {
                // Ngăn DropdownMenu tự động đóng khi click vào item
                e.preventDefault();
            };

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">

                            <DropdownMenuItem onClick={handleActionClick}>
                                <ModalAddSize clothes={clothes} setValueCurClothes={setValueCurClothes} />
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem onClick={handleActionClick}>
                                <ModalEdit edit_clothes={clothes} setValueEditClothes={setValueEditClothes} />
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={handleActionClick}>
                                <ModalDelete id={clothes.id} />
                            </DropdownMenuItem>


                        </DropdownMenuContent>

                    </DropdownMenu>
                </>
            )
        },

    },
]

