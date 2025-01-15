import { AccordionItem, Box, Button, Checkbox, Flex, Input, Stack, Text } from "@chakra-ui/react";
import {AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/accordion";


interface FilterSectionProps {
    title: any;
    item: any;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ title, item }) => {

    return (
        <AccordionItem>
            <h2>
                <AccordionButton>
                    <Box flex='1' textAlign='left' fontSize={['14px', '18px']}>{title}</Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>

                <Stack direction={'column'} gap={'5px'} >

                  
                        {/* <Checkbox onChange={(e) => { change(e) }} value={e} name={title} key={i}>
                            <Text fontSize={['13px', '16px']}></Text>
                        </Checkbox> */}
            
                    <Button fontSize={['13px', '16px']} name={title}>Apply</Button>
                </Stack>

            </AccordionPanel>
        </AccordionItem>
    );
};

export const PriceFilter = () => {

    return (
        <>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left' fontSize={['14px', '18px']}>Price Filter</Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>

                    <Flex m={'2%'} direction={'column'} gap={2} >
                        <Input fontSize={['13px', '16px']} type={'number'} name="minPrice" placeholder="₹ min price" />
                        <Input  fontSize={['13px', '16px']} type={'number'} name="maxPrice" placeholder="₹ max price" />
                        <Button fontSize={['13px', '16px']}>Apply</Button>
                    </Flex>

                </AccordionPanel>
            </AccordionItem>
        </>
    );
};