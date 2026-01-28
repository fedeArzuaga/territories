'use client'

import Link from "next/link"
import { MenuItems } from "./types/menuItems"
import { usePathname } from "next/navigation"
import { mySignOut } from "@/helpers/mySignOut"
import { signOut } from "next-auth/react"

interface Props {
    menuItems: MenuItems[],
    permissionLevel: number
}

export const SidebarMenu = ({ menuItems, permissionLevel }: Props) => {

    const pathname = usePathname()
    console.log({menuItems, permissionLevel})

    return (
        <div id="menu" className={`grid grid-cols-${menuItems.length} gap-2 md:flex justify-between md:flex-start md:flex-col`}>
            {
                menuItems.map( item => {

                    // Checks if the user has enough permission to see this menu item
                    if ( permissionLevel >= item.permissionLevel ) {

                        // Check the item role: Link
                        if ( item.role === "link" ) {
                            return (
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
                            )
                        }

                        // Check the item role: Button
                        if ( item.role === "button" ) {
                            {
                                return ( item.path.includes('signout') )
                                    ? (
                                        <button
                                            key={ item.label }
                                            onClick={ () => signOut() }
                                            className="cursor-pointer text-sm font-medium text-gray-700 hover:bg-teal-500 hover:text-white p-3 rounded-md transition duration-150 ease-in-out"
                                        >
                                            <div className="text-center md:flex md:flex-start md:items-center tm-menu-item-icon">
                                                <div className="">
                                                    { item.icon }
                                                </div>
                                                <span className="text-md font-bold ml-3 hidden lg:block">
                                                    { item.label }
                                                </span>
                                            </div>
                                        </button>
                                    )
                                    : (
                                        <button
                                            key={ item.label }
                                            className="cursor-pointer text-sm font-medium text-gray-700 hover:bg-teal-500 hover:text-white p-3 rounded-md transition duration-150 ease-in-out"
                                        >
                                            <div className="text-center md:flex md:flex-start md:items-center tm-menu-item-icon">
                                                <div className="">
                                                    { item.icon }
                                                </div>
                                                <span className="text-md font-bold ml-3 hidden lg:block">
                                                    { item.label }
                                                </span>
                                            </div>
                                        </button>
                                    )
                            }
                                
                        }
                    }
                })
            }
        </div>
    )
}
