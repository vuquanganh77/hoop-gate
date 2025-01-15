
import SignUpForm from "@/components/auth/sign-up-form";

export default function SignUpPage(){
    return (
        <div className="flex flex-col gap-6 p-10 w-1/2">
            <div className="mx-auto text-xl font-bold py-3">Sign Up to Hooper Gate</div>
            <SignUpForm />
        </div>
    )
}