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


export default function ModalDelete({ id }: { id: number }) {

    const [isOpen, setIsOpen] = useState(false);
    const { deleteShoes } = useShoesContext();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleDelete = async () => {
        deleteShoes(id);
        handleClose();
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex pb-6 justify-center">Do you sure you want to delete this shoes?</DialogTitle>
                        <DialogDescription className="flex justify-between px-6">
                            <Button onClick={handleClose}>No</Button>
                            <Button onClick={handleDelete}>Yes</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <button onClick={handleOpen} className="text-red-500">
                Delete
            </button>
        </>
    )
}
