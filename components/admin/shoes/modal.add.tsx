"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Shoes } from "@/app/admin/shoes/columns"

import CreateForm from '@/components/admin/shoes/create-form';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useShoesContext } from "@/context/product";


export default function Modal() {

    const [isOpen, setIsOpen] = useState(false);
    const { addShoes } = useShoesContext();

    const handleAddShoes = (new_shoes: Shoes) => {
        addShoes(new_shoes); // Gọi hàm thêm giày mới
        setIsOpen(false);
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild >
                <Button variant="outline" className="ml-auto">Add</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex pb-6 justify-center">Add new shoes 👟</DialogTitle>
                    <DialogDescription asChild>
                        <CreateForm addShoes={handleAddShoes} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
