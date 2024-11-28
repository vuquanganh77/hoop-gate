'use client';

// import { Sidebar, SidebarItem } from '@/components/admin/side-bar';
// import { Navbar } from '@/components/admin/navbar';
// import Link from 'next/link';
// import { LayoutDashboard, BarChart3, UserCircle } from 'lucide-react';
// import { useState, useEffect } from 'react';
import { ShoesProvider } from '@/context/product';
// import { useRouter } from 'next/router';

// export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
//     const [active, setActive] = useState<string | null>(null);
//     const [expanded, setExpanded] = useState(true);
//     // const router = useRouter();


//     // useEffect(() => {
//     //     // Cập nhật state active dựa trên URL
//     //     const path = router.pathname;
//     //     if (path.includes('shoes')) {
//     //         setActive('Shoes');
//     //     } else if (path.includes('clothes')) {
//     //         setActive('Clothes');
//     //     } else if (path.includes('accessories')) {
//     //         setActive('Accessories');
//     //     } else {
//     //         setActive('Dashboard');
//     //     }
//     // }, [router.pathname]);

//     // console.log("1234");


//     const handleActive = (text: string) => {
//         setActive(text);
//     }

//     const handleExpanded = () => {
//         setExpanded((curr) => !curr)
//     }



//     return (
//         <div className='flex flex-col h-screen'>
//             {/* <Navbar expanded={expanded} handleExpanded={handleExpanded}/> */}
//             <div className='flex flex-grow h-screen'>
//                 <Sidebar expanded={expanded}>
//                     <Link href='/admin'>
//                         <SidebarItem
//                             icon={<LayoutDashboard size={20} />}
//                             text="Dashboard"
//                             handleClick={handleActive}
//                             active={active === "Dashboard"}
//                         />
//                     </Link>

//                     <Link href='/admin/shoes'>
//                         <SidebarItem
//                             icon={<BarChart3 size={20} />}
//                             text="Shoes"
//                             handleClick={handleActive}
//                             active={active === "Shoes"}
//                         />
//                     </Link>

//                     <Link href='/admin/clothes'>
//                         <SidebarItem
//                             icon={<UserCircle size={20} />}
//                             text="Clothes"
//                             handleClick={handleActive}
//                             active={active === "Clothes"}
//                         />
//                     </Link>

//                     <Link href='/admin/accessories'>
//                         <SidebarItem
//                             icon={<UserCircle size={20} />}
//                             text="Accessories"
//                             handleClick={handleActive}
//                             active={active === "Accessories"}
//                         />
//                     </Link>
//                 </Sidebar>

//                 <ShoesProvider>
//                     {children}
//                 </ShoesProvider>
//             </div>
//         </div>
//     )
// }




// // import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// // import { AppSidebar } from "@/components/admin/app-side-bar"

// // export default function Layout({ children }: { children: React.ReactNode }) {
// //   return (
// //     <SidebarProvider>
// //       <AppSidebar />
// //       <main className='flex-grow overflow-auto'>
// //       <SidebarTrigger className='relative z-10'/>
// //         <ShoesProvider>
// //             {children}
// //         </ShoesProvider>
// //       </main>
// //     </SidebarProvider>
// //   )
// // }
export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <ShoesProvider>
            {children}
        </ShoesProvider>
        </>
    );
}