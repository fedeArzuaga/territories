'use client'

import Link from "next/link"
import { MenuItems } from "./types/menuItems"
import { usePathname } from "next/navigation"

interface Props {
    menuItems: MenuItems[]
}

export const SidebarMenu = ({ menuItems }: Props) => {

    const pathname = usePathname()

    return (
        <div id="menu" className="grid grid-cols-5 gap-2 md:flex justify-between md:flex-start md:flex-col">
            {
                menuItems.map( item => (
                    <Link
                        key={ item.label }
                        href={ item.path }
                        className={`
                            text-sm font-medium 
                            ${ ( item.path === pathname || ( pathname.startsWith(item.path) && item.path !== '/dashboard' ) )
                                ? 'bg-teal-500 hover:bg-teal-600 text-white' 
                                : 'text-gray-700 hover:bg-teal-500 hover:text-white' }
                            p-3 rounded-md transition duration-150 ease-in-out
                        `}
                    >
                        <div className="text-center md:flex md:flex-start md:items-center tm-menu-item-icon">
                            <div className="">
                                { item.icon }
                            </div>
                            <span className="text-md font-bold ml-3 hidden lg:block">
                                { item.label }
                            </span>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}
