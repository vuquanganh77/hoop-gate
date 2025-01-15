"use client";
import { useState, useEffect } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/use-type-selector';
import { AppDispatch } from '@/store/store';
import { fetchUserDetails } from "@/features/user-slice";


export default function AdminAccountPage() {

    // const [orders, setOrders] = useState([]);
    const dispatch = useDispatch<AppDispatch>();
    const { user, status, error } = useTypedSelector((state) => state.user);
    const [accounts, setAccounts] = useState([]);


    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserDetails()); // Fetch user details on initial load
        }
    }, [dispatch, status]);

    const fetchShippingDetails = async () => {
        try {
            const response = await fetch(`/api/users/details`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch shipping details.");
            }

            const data = await response.json();
            if(data){
                setAccounts(data.accounts);
            }
        } catch (error) {
            console.error("Error fetching shipping details:", error);
        }
    };

    useEffect(() => {
        if (user?.role == 1) {
            fetchShippingDetails();
        }
    }, [user]);

    return user?.role === 1 ? (
        <div className="flex flex-col gap-9 px-16 pb-16">

            <div className="sticky top-0 bg-white w-full z-10 text-xl font-semibold">
                <span>Accounts List</span>
            </div>

            <Table>
                <TableCaption>List of accounts.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Address</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {accounts.length > 0 ? (
                        accounts.map((account) => (
                            <AccountItem
                                key={account.id}
                                id={account.id}
                                username={account.username}
                                email={account.email}
                                full_name={account.name}
                                phone={account.phone}
                                address={account.address}
                            />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">No accounts found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </div>
    ): (
        <div className="px-16">
            <h1 className="text-2xl font-bold text-center text-red-500 py-32">
                You don't have permission to access this page.
            </h1>
        </div>
    );
}

interface AccountItemProps {
    id: number;
    username: string;
    email: string;
    full_name: string;
    phone: string;
    address: string;
}

export function AccountItem({ id, username, email, full_name, phone, address }: AccountItemProps) {

    return (
        <>
            <TableRow>
                <TableCell className="font-medium"><span
                    className="cursor-pointer text-blue-500 hover:underline"
                >
                    {username || '--'}
                </span></TableCell>
                <TableCell>{email || '--'}</TableCell>
                <TableCell>{full_name || '--'}</TableCell>
                <TableCell>{phone || '--'}</TableCell>
                <TableCell >
                    {address || '--'}
                </TableCell>
            </TableRow>

        </>
    )
}
