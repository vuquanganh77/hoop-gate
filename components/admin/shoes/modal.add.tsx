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
import { useState } from "react"
import { useDispatch } from 'react-redux';
import { addShoes } from '@/features/shoes-slice';
import { AppDispatch } from '@/store/store';


export default function Modal() {

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleAddShoes = (new_shoes: Shoes) => {
       dispatch(addShoes(new_shoes));
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
