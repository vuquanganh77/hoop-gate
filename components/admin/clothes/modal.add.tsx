"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Clothes } from "@/app/admin/clothes/columns"

import CreateForm from '@/components/admin/clothes/create-form';
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useDispatch } from 'react-redux';
import { addClothes } from '@/features/clothes-slice';
import { AppDispatch } from '@/store/store';


export default function Modal() {

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleAddClothes = (new_clothes: Clothes) => {
       dispatch(addClothes(new_clothes));
        setIsOpen(false);
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild >
                <Button variant="outline" className="ml-auto">Add</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex pb-6 justify-center">Add new clothes 👟</DialogTitle>
                    <DialogDescription asChild>
                        <CreateForm addClothes={handleAddClothes} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
