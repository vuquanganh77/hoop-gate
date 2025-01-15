"use client";

import { Clothes } from "@/app/admin/clothes/columns"

export default function ModalAddSize({ clothes, setValueCurClothes  }: { clothes: Clothes, setValueCurClothes: (clothes: Clothes) => void }) {
    return (
        <>
            <button onClick={() => setValueCurClothes(clothes)} className="text-gray-600">
                Add size
            </button>
        </>
    )
}
