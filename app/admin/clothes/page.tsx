"use client";

import { Clothes, columns } from "./columns"
import { DataTable } from "./data-table";
import AdminBreadCrumb from "@/components/admin/bread-crumb"
import Modal from "@/components/admin/clothes/modal.add"
import { useState, useEffect } from 'react';
import EditForm from "@/components/admin/clothes/edit-form"
import AddSizeForm from "@/components/admin/clothes/add-size-form";

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { loadClothes } from '@/features/clothes-slice';
import { AppDispatch } from '@/store/store';
import { fetchUserDetails } from "@/features/user-slice";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export default function AdminClothesBoard() {
    const [edit_form_is_open, setEditFormOpen] = useState(false);
    const [add_size_form_is_open, setAddSizeFormOpen] = useState(false);
    const [edit_clothes, setEditClothes] = useState<Clothes>();
    const [cur_clothes, setCurClothes] = useState<Clothes>();

    const dispatch = useDispatch<AppDispatch>();
    const { user, status, error } = useTypedSelector((state) => state.user);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserDetails()); // Fetch user details on initial load
        }
    }, [dispatch, status]);

    const handleEditFormOpen = () => setEditFormOpen(true);
    const handleEditFormClose = () => setEditFormOpen(false);

    const handleAddSizeFormOpen = () => setAddSizeFormOpen(true);
    const handleAddSizeFormClose = () => setAddSizeFormOpen(false);

    const setValueEditClothes = (edit_clothes: Clothes) => {
        setEditClothes(edit_clothes);
        // editShoes(edit_shoes); // Gọi hàm edit giày
        handleEditFormOpen();
    };

    const setValueCurClothes = (cur_clothes: Clothes) => {
        setCurClothes(cur_clothes);
        handleAddSizeFormOpen();
    };

   
    const { items, loading } = useTypedSelector((state) => state.clothes) as { items: Clothes[], loading: boolean };

    useEffect(() => {
        dispatch(loadClothes({}));
    }, [dispatch]);

    console.log("quan ao", items);


    return user?.role === 1 ? (
        <>
            <div className=" flex flex-col flex-grow overflow-auto p-3">
                <div className='flex justify-between px-28'>
                    <div className='relative top-6'><AdminBreadCrumb path="Clothes" /></div>
                    <Modal />
                </div>
                <div className='px-20 py-6 flex-grow'>
                    <DataTable columns={columns(setValueEditClothes, setValueCurClothes)} data={items} />
                </div>
            </div>

            <Dialog open={edit_form_is_open} onOpenChange={setEditFormOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex pb-6 justify-center">Edit clothes </DialogTitle>
                        <DialogDescription asChild>
                            <EditForm edit_clothes={edit_clothes} handleClose={handleEditFormClose} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


            <Dialog open={add_size_form_is_open} onOpenChange={setAddSizeFormOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex pb-6 justify-center">Add products size 👟</DialogTitle>
                        <DialogDescription asChild>
                            <AddSizeForm clothes={cur_clothes} handleClose={handleAddSizeFormClose} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    ) : (
        <div className="px-16">
            <h1 className="text-2xl font-bold text-center text-red-500 py-32">
                You don't have permission to access this page.
            </h1>
        </div>
    );
}

