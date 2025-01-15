"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Accessories } from "@/app/admin/accessories/columns"

import CreateForm from '@/components/admin/accessories/create-form';
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useDispatch } from 'react-redux';
import { addAccessories } from '@/features/accessories-slice';
import { AppDispatch } from '@/store/store';


export default function Modal() {

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleAddAccessories = (new_accessories: Accessories) => {
       dispatch(addAccessories(new_accessories));
        setIsOpen(false);
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild >
                <Button variant="outline" className="ml-auto">Add</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex pb-6 justify-center">Add new accessories 👟</DialogTitle>
                    <DialogDescription asChild>
                        <CreateForm addAccessories={handleAddAccessories} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
