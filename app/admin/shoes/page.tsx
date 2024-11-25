"use client";

import { Shoes, columns } from "./columns"
import { DataTable } from "./data-table";
import AdminBreadCrumb from "@/components/admin/bread-crumb"
import Modal from "@/components/admin/shoes/modal.add"
import { useState, useEffect } from 'react';
import { useShoesContext } from '@/context/product';
import EditForm from "@/components/admin/shoes/edit-form"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export default function AdminShoesBoard() {
    const [isOpen, setIsOpen] = useState(false);
    const [edit_shoes, setEditShoes] = useState<Shoes>();
    const { shoes, setShoes, addShoes, editShoes } = useShoesContext();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const setValueEditShoes = (edit_shoes: Shoes) => {
        setEditShoes(edit_shoes);
        // editShoes(edit_shoes); // Gọi hàm edit giày
        handleOpen();
    };

    useEffect(() => {
        const fetchShoes = async () => {
            const response = await fetch('/api/shoes', {
                method: 'GET',
            })

            if (response.ok) {
                const data = await response.json();
                setShoes(data);
            } else {
                console.error('Failed to fetch shoes');
            }
        }
        fetchShoes();
    }, [])


    return (
        <>
            <div className=" flex flex-col flex-grow overflow-auto p-3">
                <div className='flex justify-between px-20'>
                    <div className='relative top-6'><AdminBreadCrumb path="Shoes" /></div>
                    <Modal />
                </div>
                <div className='px-20 py-6 flex-grow'>
                    <DataTable columns={columns(setValueEditShoes)} data={shoes}/>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex pb-6 justify-center">Edit shoes 👟</DialogTitle>
                        <DialogDescription asChild>
                            <EditForm edit_shoes={edit_shoes} editShoes={editShoes} handleClose={handleClose}/>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

