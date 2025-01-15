"use client";

import { Accessories } from "@/app/admin/accessories/columns"

export default function ModalEdit({ edit_accessories, setValueEditAccessories  }: { edit_accessories: Accessories, setValueEditAccessories: (edit_accessories: Accessories) => void }) {
    return (
        <>
            <button onClick={() => setValueEditAccessories(edit_accessories)} className="text-gray-600">
                Edit
            </button>
        </>
    )
}
