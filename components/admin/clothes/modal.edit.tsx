"use client";

import { Clothes } from "@/app/admin/clothes/columns"

export default function ModalEdit({ edit_clothes, setValueEditClothes  }: { edit_clothes: Clothes, setValueEditClothes: (edit_clothes: Clothes) => void }) {
    return (
        <>
            <button onClick={() => setValueEditClothes(edit_clothes)} className="text-gray-600">
                Edit
            </button>
        </>
    )
}
