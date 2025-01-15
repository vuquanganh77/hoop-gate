"use client";
import { decode as jwtDecode } from "jsonwebtoken";
import { useState, useEffect } from "react";
import { Box, Center, Flex, Image, Spacer, Icon } from "@chakra-ui/react";

import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { SkeletonLoading } from "@/components/layouts/skeleton";

import { RiHeartLine, RiShoppingBagLine } from "react-icons/ri";
import Link from 'next/link';
import ModalSignin from "@/components/auth/modal-signin";
// import { logo } from "@/images/logo.jpg";


import { Category, NavIcon } from "@/components/navbar/category";
// import { SideDrawer } from "@/components/navbar/drawer";


export const Navbar = () => {

    const [user, setUser] = useState<any>(null); // State to store user info
    const [loading, setLoading] = useState(true); // Add a loading state

    const fetchUserInfo = async () => {
        try {
            const res = await fetch("/api/users", { credentials: "include" }); // Include cookies

            if (res.ok) {
                const data = await res.json();
                console.log("co data", data);

                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Failed to fetch user info:", error);
            setUser(null);
        } finally {
            setLoading(false); // API call completed
        }
    };

    useEffect(() => {
        fetchUserInfo(); // Check token on component mount
        console.log("user", user);

    }, []);

    // Handle loading state
    if (loading) {
        return (<SkeletonLoading />)
    }

    const handleSignOut = async () => {
        try {
            const response = await fetch('/api/signout', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            // Optionally, reload the page or redirect the user
            window.location.reload();
        } catch (error) {
            console.error(error.message);
        }

    }

    return (
        <>
            <Box h={'36px'} bg={'#f5f5f5'} >
                <Center h={'36px'} justifyContent={'right'} mr={'40px'} fontSize={'16px'} cursor={'pointer'}>
                    {user ? (
                        // Dropdown for signed-in user
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                {user.username}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {
                                    user.role === 1 ? (
                                        <DropdownMenuItem>
                                            <Link href="/admin">
                                                Admin
                                            </Link>
                                        </DropdownMenuItem>
                                    ) : null
                                }
                                <DropdownMenuItem >
                                    <Link href="/account">
                                        Account
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem >
                                    <Link href="/orders">
                                        Orders
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem >
                                    <div className="cursor-pointer" onClick={handleSignOut}>
                                        Logout
                                    </div>
                                </DropdownMenuItem>

                            </DropdownMenuContent>

                        </DropdownMenu>
                    ) : (
                        // Modal for sign-in
                        <ModalSignin />
                    )}
                </Center>
            </Box>

            <Flex h={'60px'} flexDirection={"row"} px={'20px'} >

                <Box w={'80px'}>
                    <Link href={'/'}><Image src='' /></Link>
                </Box>

                <Spacer />

                <Box display={['none', 'none', 'flex', 'flex', 'flex']}>
                    <Category name={'/'} text={"Home"} link={'/'} />
                    <Category name={'men'} text={"Shoes"} link={'/shoes'} />
                    <Category name={'women'} text={"Clothes"} link={'/clothes'} />
                    <Category name={'kids'} text={"Accessories"} link={'/accessories'} />
                </Box>

                <Spacer />

                <Center mr={'10px'}>
                    <Link href={'/fav'}>
                        <Heart />
                    </Link>
                </Center>

                <Center mr={'10px'}>
                    <Link href={'/cart'}>
                        <ShoppingCart />
                    </Link>
                </Center>

                <Box display={['flex', 'flex', 'none', 'none', 'none']}>
                    <Center mr={'10px'}>
                        {/* <SideDrawer handlePath={handlePath} /> */}
                    </Center>
                </Box>

            </Flex>

            <Box h={['10px', '20px', '30px', '40px', '40px']} ></Box>
        </>
    );
};





