
import SignInForm from "@/components/auth/sign-in-form";

export default function SignUpPage(){
    return (
        <div className="flex flex-col gap-6 p-10 w-1/2">
            <div className="mx-auto text-xl font-bold py-3">Sign In to Hooper Gate</div>
            <SignInForm />
        </div>
    )
}