'use client';

import {Sidebar, SidebarItem} from '@/components/common/side-bar';
import Link from 'next/link';
import { LayoutDashboard, BarChart3, UserCircle } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({children}: Readonly<{children: React.ReactNode}>) {
    const [active, setActive] = useState("Dashboard");

    const handleActive = (text: string) => {
        setActive(text);
    }
    return (
        <div className='flex'>
            <Sidebar>
                <Link href='/admin'>
                    <SidebarItem 
                        icon={<LayoutDashboard size={20} /> } 
                        text="Dashboard"
                        handleClick={handleActive}
                        active={active === "Dashboard"}
                        alert
                    />
                </Link>

                <Link href='/admin/shoes'>
                <SidebarItem 
                    icon={<BarChart3 size={20} /> } 
                    text="Shoes"
                    handleClick={handleActive}
                    active={active === "Shoes"}
                />
                </Link>
                
                <Link href='/admin/clothes'>
                <SidebarItem 
                    icon={<UserCircle size={20} /> } 
                    text="Clothes"
                    handleClick={handleActive}
                    active={active === "Clothes"}
                />
                </Link>

                <Link href='/admin/accessories'>
                <SidebarItem 
                    icon={<UserCircle size={20} /> } 
                    text="Accessories"
                    handleClick={handleActive}
                    active={active === "Accessories"}
                />
                </Link>
            </Sidebar>
            {children}
        </div>
    )
}
            // <nav>
            //     <Link href='/admin/shoes'>Shoes</Link>
            //     <Link href='/admin/clothes'>Clothes</Link>
            //     <Link href='/admin/accessories'>Accessories</Link>
            // </nav>