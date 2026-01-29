import { FaMapMarkedAlt, FaUser, FaUsers } from "react-icons/fa";
import { FaArrowRightFromBracket, FaListCheck } from "react-icons/fa6";
import { TbLayoutDashboardFilled } from "react-icons/tb";

import { SidebarMenu } from "./SidebarMenu";
import { MenuItems } from "./types/menuItems";
import { getUserByActiveSession } from "@/lib/services/getUserByActiveSession";
import { permissionLevelsByRole } from "@/utils/permissionLevelsByRole";
import { signOut } from "next-auth/react";

const menuItems: MenuItems[] = [
    {
        path: '/dashboard',
        label: 'Panel principal',
        icon: <TbLayoutDashboardFilled size={ 25 } />,
        permissionLevel: 1,
        role: "link"
    },
    {
        path: '/dashboard/territories',
        label: 'Territorios',
        icon: <FaListCheck size={ 25 } />,
        permissionLevel: 1,
        role: "link"
    },
    {
        path: '/dashboard/user-profile',
        label: 'Mi usuario',
        icon: <FaUser size={ 25 } />,
        permissionLevel: 1,
        role: "link"
    },
    {
        path: '/dashboard/create-user',
        label: 'Crear nuevo usuario',
        icon: <FaUsers size={ 25 } />,
        permissionLevel: 4,
        role: "link"
    },
    {
        path: '/map',
        label: 'Ver mapa del territorio',
        icon: <FaMapMarkedAlt size={ 25 } />,
        permissionLevel: 1,
        role: "link"
    },
    {
        path: '/auth/signout',
        label: 'Cerrar sesión',
        icon: <FaArrowRightFromBracket size={ 20 } />,
        permissionLevel: 1,
        role: "button"
    }
]

type Roles = "SUPERUSER" | "ADMIN" | "LEADER" | "USER"

export const Sidebar = async () => {

    const user = await getUserByActiveSession()
    const usersMenuItems = menuItems.filter ( item => item.permissionLevel <= permissionLevelsByRole[user.role as Roles] )

    return (
        <div 
            id="dashboard-sidebar"
            className="md:h-screen w-full"
        >
            <div
                id="sidebar"
                className="bg-white md:h-screen md:block shadow-xl overflow-x-hiddenw-full transition-transform duration-300 ease-in-out"
            >
                <div className="space-y-6 md:space-y-10 p-2 md:p-5">
                    <SidebarMenu menuItems={ usersMenuItems } permissionLevel={ permissionLevelsByRole[user.role as Roles] } />
                </div>
            </div>

        </div>
    )
}
