

import { Box, Center, Flex, Image, Spacer, Icon } from "@chakra-ui/react";
import { RiHeartLine, RiShoppingBagLine } from "react-icons/ri";
import Link from 'next/link';
// import { logo } from "@/images/logo.jpg";


import { Category, NavIcon } from "@/components/navbar/category";
// import { SideDrawer } from "@/components/navbar/drawer";


export const Navbar = () => {

    return (
        <>
            <Box h={'36px'} bg={'#f5f5f5'} >
                <Center h={'36px'} justifyContent={'right'} mr={'40px'} fontSize={'16px'} cursor={'pointer'}>
                    Sign In
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
                        <Icon fontSize="2xl">
                            <RiHeartLine />
                        </Icon>
                    </Link>
                </Center>

                <Center mr={'10px'}>
                    <Link href={'/cart'}>
                        <Icon fontSize="2xl">
                            <RiShoppingBagLine />
                        </Icon>
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





