"use client";

import { Shoes } from "@/app/admin/shoes/columns"

export default function ModalAddSize({ shoes, setCurShoes  }: { shoes: Shoes, setCurShoes: (shoes: Shoes) => void }) {
    return (
        <>
            <button onClick={() => setCurShoes(shoes)} className="text-gray-600">
                Add size
            </button>
        </>
    )
}
