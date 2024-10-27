"use client";

import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { useState, createContext, useContext } from "react";

const SidebarContext = createContext();

const Sidebar = ({children}: {children: React.ReactNode}) => {
    const [expanded, setExpanded] = useState(true);
  return (
    <aside className="h-screen">
        <nav className="h-full inline-flex flex-col bg-white border-r shadow-sm">
            <div className="p-4 pb-2 flex justify-between items-center">
                
                <img src="https://img.logoipsum.com/243.svg" className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} alt="" />
                <button
                    onClick={() => setExpanded((curr) => !curr)}
                    className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                >
                    {expanded ? <ChevronFirst /> : <ChevronLast /> }
                </button>
            </div>

            <SidebarContext.Provider value={{expanded}}>
                <ul className="flex-1 px-3">{children}</ul>
            </SidebarContext.Provider>

            <div className="border-t flex p-3">
                <div className="flex justify-between items-center w-10 ml-3">
                    
                    <div className={`
                        flex justify-between items-center
                        overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                    `}  />

                    <div className={`${expanded ? "leading-4" : "hidden"}`}>
                        <h4 className="font-semibold">Quang anh</h4>
                        <span className="text-xs text-gray-600">quanganh@gmail.com</span>
                    </div>
                    
                   
                </div>
            </div>
        </nav>
    </aside>
  )
}


const SidebarItem = ({icon, text, active, alert, handleClick}: {
    icon: React.ReactNode,
    text: string,
    active?: boolean,
    alert?: boolean
    handleClick?: (text: string) => void,
}) => {
    const {expanded} = useContext(SidebarContext);
    return (
        <li className={`
            relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
            ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}
        `}
            onClick={() => handleClick && handleClick(text)}
        >
            {icon}
            <span className={`overflow-hidden transition-all  ${expanded ? "w-36 ml-3" : "w-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>{text}</div>
            )}
        </li>
    )
}

export {Sidebar, SidebarItem}
