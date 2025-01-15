"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



import { Button } from "@/components/ui/button"
import { useState } from "react"
import SignInForm from "@/components/auth/sign-in-form";



export default function ModalSignin() {

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild >
                <div  className="ml-auto">Sign in</div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex pb-6 justify-center">Sign in 👟</DialogTitle>
                    <DialogDescription asChild>
                        <SignInForm handleClose={handleClose}/>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
