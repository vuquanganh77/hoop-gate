import { AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = ({ handleExpanded, expanded }: { handleExpanded: () => void, expanded: boolean }) => {
    return (
        <div className='bg-gray-500 h-14 flex items-center sticky top-0 z-10'>
            <div className="left-4 relative">
                <Button onClick={handleExpanded} className="p-1.5 rounded-lg">
                    {expanded ? <AlignJustify /> : <AlignJustify />}
                </Button>
            </div>
            <div className="pl-6 text-lg">Hooper Gate</div>
        </div>
    )
}

export { Navbar }