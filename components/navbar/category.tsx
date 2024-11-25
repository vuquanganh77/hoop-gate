import { Center, Icon, Text } from "@chakra-ui/react";
import Link from 'next/link';


interface CategoryProps {
    text: string;
    link: string;
    name: string;
}

export const Category = ({ text, link, name }: CategoryProps) => {
    
    return (
        <Center
            h={'60px'}
            cursor={'pointer'}
            paddingX={'15px'}
            _hover={{ borderBottom: `2px solid black ` }}
        >
            <Link
                // onClick={handlePath}
                href={link}
                className="font-semibold"
            >
                {text}
            </Link>
        </Center>
    );
};


interface DrawerCategoryProps {
    text: string;
    link: string;
    name: string;
}

export const DrawerCategory = ({ text, link, name }: DrawerCategoryProps) => {
    return (
        <Text fontSize={'20px'} fontWeight={500}>
            <Link
                // onClick={handlePath}
                href={link}
          
            >
                {text}
            </Link>
        </Text>
    );
};


interface NavIconProps {
    iconName: any;
}

export const NavIcon = ({ iconName }: NavIconProps) => {
    return (
        <Icon
            as={iconName}
            w={'28px'}
            h={'28px'}
            mr={'10px'}
        />
    );
};
