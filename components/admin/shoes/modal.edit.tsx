"use client";

import { Shoes } from "@/app/admin/shoes/columns"

export default function ModalEdit({ edit_shoes, setValueEditShoes  }: { edit_shoes: Shoes, setValueEditShoes: (edit_shoes: Shoes) => void }) {
    return (
        <>
            <button onClick={() => setValueEditShoes(edit_shoes)} className="text-gray-600">
                Edit
            </button>
        </>
    )
}
