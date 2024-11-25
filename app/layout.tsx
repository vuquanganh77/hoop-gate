import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider"
import { Footer } from '@/components/layouts/footer';
import { Navbar } from '@/components/layouts/navbar';
import "./globals.css";

export const metadata: Metadata = {
    title: "Hooper Gate",
    description: "Yeah",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body>
                <Provider>
                    <div className='flex flex-col min-h-screen'>
                        <Navbar />
                            {children}
                        <Footer />
                    </div>
                </Provider>
            </body>
        </html >
    );
}
