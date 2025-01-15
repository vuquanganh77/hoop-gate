'use client';
import Head from 'next/head';
import { ChakaProvider } from "@/components/ui/provider"
import { Footer } from '@/components/layouts/footer';
import { Navbar } from '@/components/layouts/navbar';
import { AdminNavbar } from '@/components/admin/navbar'
// import { currentUser } from '@clerk/nextjs/server'
// import {
//     ClerkProvider,
//     SignInButton,
//     SignedIn,
//     SignedOut,
//     UserButton,
// } from '@clerk/nextjs'
import "./globals.css";

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { usePathname } from 'next/navigation';

// export const metadata: Metadata = {
//     title: "Hooper Gate",
//     description: "Yeah",
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const user = await currentUser();
    // console.log(user);

    const pathname = usePathname(); // Get the current path
    const isAdminRoute = pathname.startsWith('/admin');


    return (
        <>
            <html lang="en" suppressHydrationWarning={true}>
                <body>

                    <ChakaProvider>
                        <div className='flex flex-col min-h-screen'>
                            {isAdminRoute ? <AdminNavbar /> : <Navbar />}
                            <Provider store={store}>{children}</Provider>
                            <Footer />
                        </div>
                    </ChakaProvider>
                </body>
            </html >
        </>
    );
}
