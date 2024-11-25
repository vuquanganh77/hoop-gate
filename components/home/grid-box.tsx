import { GridItem, Image } from "@chakra-ui/react";


interface GridBoxProps {
    source: string;
}

export const BigGridBox = ({ source }: GridBoxProps) => {
    return (
        <GridItem
            colSpan={2}
            cursor={'pointer'}
            h={['200px', '200px', '400px', '500px', '500px']}
            borderRadius={'15px'}
            overflow={'hidden'}
        >
            <Image className="imgAnimation" mt={'-35%'} src={source} />
        </GridItem>
    );
};


export const SmallGridBox = ({ source }: GridBoxProps) => {
    return (
        <GridItem
            cursor={'pointer'}
            borderRadius={'15px'}
            h={['100px', '100px', '200px', '250px', '300px']}
            overflow={'hidden'}
        >
            <Image className="imgAnimation" mt={'-45%'} src={source} />
        </GridItem>
    );
};


export const ClothGridBox = ({ source }: GridBoxProps) => {
    return (
        <GridItem
            cursor={'pointer'}
            borderRadius={'15px'}
            overflow={'hidden'}
        >
            <Image className="imgAnimation" src={source} />
        </GridItem>
    );
};