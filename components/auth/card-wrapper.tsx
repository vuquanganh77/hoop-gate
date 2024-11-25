import { 
    Card,
    CardHeader,
    CardContent,
    CardFooter
 } from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerTitle?: string;
    headerLabel?: string;
    backButtonLabel?: string;
    backButtonHref?: string;
    showSocial?: boolean;
};

export const CardWrapper = ({
    children,
    headerTitle,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {
    return (
        <Card className="w-2/5">
            <CardHeader>
                <Header title={headerTitle} label={headerLabel ?? ''}></Header>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>

            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}

            <CardFooter>
                <BackButton label={backButtonLabel ?? ''} href={backButtonHref ?? ''} />
            </CardFooter>
        </Card>
    )
}