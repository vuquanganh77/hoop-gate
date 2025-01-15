"use client";

import { Accessories } from "@/app/admin/accessories/columns"

export default function ModalAddSize({ accessories, setValueCurAccessories  }: { accessories: Accessories, setValueCurAccessories: (accessories: Accessories) => void }) {
    return (
        <>
            <button onClick={() => setValueCurAccessories(accessories)} className="text-gray-600">
                Add size
            </button>
        </>
    )
}
