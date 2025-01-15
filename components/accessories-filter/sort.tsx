import { Box, Button } from "@chakra-ui/react";
import { Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/menu";
import { AiOutlineDown } from "react-icons/ai";



export const SortFilters = () => {


    return (
        <Box>
            <Menu>
                <MenuButton as={Button} fontSize={['13px', '16px']}>
                    Sort By <AiOutlineDown style={{ marginLeft: '8px' }} />
                </MenuButton>
                <MenuList>
                    <MenuItem>Price: Low-High</MenuItem>
                    <MenuItem>Price: High-Low</MenuItem>
                    <MenuItem>Rating: Low-High</MenuItem>
                    <MenuItem>Rating: High-Low</MenuItem>
                    <MenuItem>Name: A-Z</MenuItem>
                    <MenuItem>Name: Z-A</MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
};
