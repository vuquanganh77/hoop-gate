"use client";

import { Shoes } from "@/app/admin/shoes/columns"

export default function ModalAddSize({ shoes, setValueCurShoes  }: { shoes: Shoes, setValueCurShoes: (shoes: Shoes) => void }) {
    return (
        <>
            <button onClick={() => setValueCurShoes(shoes)} className="text-gray-600">
                Add size
            </button>
        </>
    )
}
