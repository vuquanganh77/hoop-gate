"use client";

import { Accessories, columns } from "./columns"
import { DataTable } from "./data-table";
import AdminBreadCrumb from "@/components/admin/bread-crumb"
import Modal from "@/components/admin/accessories/modal.add"
import { useState, useEffect } from 'react';
import EditForm from "@/components/admin/accessories/edit-form"
import AddSizeForm from "@/components/admin/accessories/add-size-form";

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { loadAccessories } from '@/features/accessories-slice';
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


export default function AdminAccessoriesBoard() {
    const [edit_form_is_open, setEditFormOpen] = useState(false);
    const [add_size_form_is_open, setAddSizeFormOpen] = useState(false);
    const [edit_accessories, setEditAccessories] = useState<Accessories>();
    const [cur_accessories, setCurAccessories] = useState<Accessories>();

    const handleEditFormOpen = () => setEditFormOpen(true);
    const handleEditFormClose = () => setEditFormOpen(false);

    const handleAddSizeFormOpen = () => setAddSizeFormOpen(true);
    const handleAddSizeFormClose = () => setAddSizeFormOpen(false);

    const setValueEditAccessories = (edit_accessories: Accessories) => {
        setEditAccessories(edit_accessories);
        // editShoes(edit_shoes); // Gọi hàm edit giày
        handleEditFormOpen();
    };

    const setValueCurAccessories = (cur_accessories: Accessories) => {
        setCurAccessories(cur_accessories);
        handleAddSizeFormOpen();
    };

    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useTypedSelector((state) => state.accessories) as { items: Accessories[], loading: boolean };
    const { user, status, error } = useTypedSelector((state) => state.user);
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserDetails()); // Fetch user details on initial load
        }
    }, [dispatch, status]);

    useEffect(() => {
        dispatch(loadAccessories({}));
    }, [dispatch]);

    console.log("phu kien", items);


    return user?.role === 1 ? (
        <>
            <div className=" flex flex-col flex-grow overflow-auto p-3">
                <div className='flex justify-between px-28'>
                    <div className='relative top-6'><AdminBreadCrumb path="Accessories" /></div>
                    <Modal />
                </div>
                <div className='px-20 py-6 flex-grow'>
                    <DataTable columns={columns(setValueEditAccessories, setValueCurAccessories)} data={items} />
                </div>
            </div>

            <Dialog open={edit_form_is_open} onOpenChange={setEditFormOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex pb-6 justify-center">Edit accessories </DialogTitle>
                        <DialogDescription asChild>
                            <EditForm edit_accessories={edit_accessories} handleClose={handleEditFormClose} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


            <Dialog open={add_size_form_is_open} onOpenChange={setAddSizeFormOpen}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex pb-6 justify-center">Add products size 👟</DialogTitle>
                        <DialogDescription asChild>
                            <AddSizeForm accessories={cur_accessories} handleClose={handleAddSizeFormClose} />
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

