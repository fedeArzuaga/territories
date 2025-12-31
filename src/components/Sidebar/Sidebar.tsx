import { FaMapMarkedAlt } from "react-icons/fa";
import { FaUsers, FaHome } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaArrowRightFromBracket } from "react-icons/fa6";

import { SidebarMenu } from "./SidebarMenu";
import { MenuItems } from "./types/menuItems";


const menuItems: MenuItems[] = [
    {
        path: '/dashboard',
        label: 'Panel principal',
        icon: <TbLayoutDashboardFilled size={ 25 } />
    },
    {
        path: '/dashboard/territories',
        label: 'Territorios',
        icon: <FaMapMarkedAlt size={ 25 } />
    },
    {
        path: '/dashboard/users',
        label: 'Usuarios',
        icon: <FaUsers size={ 25 } />
    },
    {
        path: '/map',
        label: 'Ver mapa del territorio',
        icon: <FaHome size={ 25 } />
    },
    {
        path: '/auth/signout',
        label: 'Cerrar sesión',
        icon: <FaArrowRightFromBracket size={ 25 } />
    }
]

export const Sidebar = () => {
    return (
        <div 
            id="dashboard-sidebar"
            className="md:h-full w-full"
        >
            <div
                id="sidebar"
                className="bg-white md:h-screen md:block shadow-xl overflow-x-hiddenw-full transition-transform duration-300 ease-in-out"
            >
                <div className="space-y-6 md:space-y-10 p-2 md:p-5">
                    <SidebarMenu menuItems={ menuItems } />
                </div>
            </div>

        </div>
    )
}
