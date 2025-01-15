"use client";

import { Shoes, columns } from "./columns"
import { DataTable } from "./data-table";
import AdminBreadCrumb from "@/components/admin/bread-crumb"
import Modal from "@/components/admin/shoes/modal.add"
import { useState, useEffect } from 'react';
import EditForm from "@/components/admin/shoes/edit-form"
import AddSizeForm from "@/components/admin/shoes/add-size-form";

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { loadShoes } from '@/features/shoes-slice';
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


export default function AdminShoesBoard() {
    const [edit_form_is_open, setEditFormOpen] = useState(false);
    const [add_size_form_is_open, setAddSizeFormOpen] = useState(false);
    const [edit_shoes, setEditShoes] = useState<Shoes>();
    const [cur_shoes, setCurShoes] = useState<Shoes>();

    const handleEditFormOpen = () => setEditFormOpen(true);
    const handleEditFormClose = () => setEditFormOpen(false);

    const handleAddSizeFormOpen = () => setAddSizeFormOpen(true);
    const handleAddSizeFormClose = () => setAddSizeFormOpen(false);

    const setValueEditShoes = (edit_shoes: Shoes) => {
        setEditShoes(edit_shoes);
        // editShoes(edit_shoes); // Gọi hàm edit giày
        handleEditFormOpen();
    };

    const setValueCurShoes = (cur_shoes: Shoes) => {
        setCurShoes(cur_shoes);
        handleAddSizeFormOpen();
    };

    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useTypedSelector((state) => state.shoes) as { items: Shoes[], loading: boolean };
    const { user, status, error } = useTypedSelector((state) => state.user);
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserDetails()); // Fetch user details on initial load
        }
    }, [dispatch, status]);
  
    useEffect(() => {
      dispatch(loadShoes({}));
    }, [dispatch]);
  

    return user?.role === 1 ? (
        <>
            <div className=" flex flex-col flex-grow overflow-auto p-3">
                <div className='flex justify-between px-28'>
                    <div className='relative top-6'><AdminBreadCrumb path="Shoes" /></div>
                    <Modal />
                </div>
                <div className='px-20 py-6 flex-grow'>
                    <DataTable columns={columns(setValueEditShoes, setValueCurShoes)} data={items}/>
                </div>
            </div>

            <Dialog open={edit_form_is_open} onOpenChange={setEditFormOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex pb-6 justify-center">Edit shoes 👟</DialogTitle>
                        <DialogDescription asChild>
                            <EditForm edit_shoes={edit_shoes} handleClose={handleEditFormClose}/>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


            <Dialog open={add_size_form_is_open} onOpenChange={setAddSizeFormOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex pb-6 justify-center">Add products size 👟</DialogTitle>
                        <DialogDescription asChild>
                            <AddSizeForm shoes={cur_shoes} handleClose={handleAddSizeFormClose}/>
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

