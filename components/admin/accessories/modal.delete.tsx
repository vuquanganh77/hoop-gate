"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useDispatch } from 'react-redux';
import { deleteAccessories } from '@/features/accessories-slice';
import { AppDispatch } from '@/store/store';


export default function ModalDelete({ id }: { id: number }) {

    const [isOpen, setIsOpen] = useState(false);
    // const { deleteShoes } = useShoesContext();
    const dispatch = useDispatch<AppDispatch>();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleDelete = async () => {
        dispatch(deleteAccessories(id));
        handleClose();
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex pb-6 justify-center">Do you sure you want to delete this accessories?</DialogTitle>
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
