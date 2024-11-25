import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckboxWithText } from "@/components/products/checkbox"




export const Filter = () => {



    return (
        <div className="w-1/5 px-5 pb-52 border-t border-r border-gray-200 h-[800px] ">
            <Accordion type="multiple" >
                <AccordionItem value="item-1" className=" mt-4">
                    <AccordionTrigger>Price Filter</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                        <Input placeholder="Min price" />
                        <Input placeholder="Max price" />
                        <Button className="bg-black text-white">Apply</Button>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>Brand</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                        <CheckboxWithText id="nike" content="Nike" />
                        <CheckboxWithText id="adidas" content="Adidas" />
                        <CheckboxWithText id="puma" content="Puma" />
                        <CheckboxWithText id="new_balance" content="New Balance" />
                        <CheckboxWithText id="under_armour" content="Under Armour" />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>Size</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                    <Input placeholder="Pick a size" />
                    <Button className="bg-black text-white">Apply</Button>
                    </AccordionContent>
                </AccordionItem>


            </Accordion>
        </div>
    );
};


