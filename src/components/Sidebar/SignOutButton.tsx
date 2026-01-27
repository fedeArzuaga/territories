'use client'

import { signOut } from "next-auth/react"
import { FaArrowRightFromBracket } from "react-icons/fa6"

interface Props {
    location: string
}

export const SignOutButton = ( { location }: Props ) => {

    return (
        <>
            {
                location === 'sidebar' && (
                    <button
                        onClick={ () => signOut() }
                        className="cursor-pointer text-sm font-medium text-gray-700 hover:bg-teal-500 hover:text-white p-3 rounded-md transition duration-150 ease-in-out"
                    >
                        <div className="text-center md:flex md:flex-start md:items-center tm-menu-item-icon">
                            <div className="">
                                <FaArrowRightFromBracket size={ 25 } />
                            </div>
                            <span className="text-md font-bold ml-3 hidden lg:block">
                                Cerrar sesión
                            </span>
                        </div>
                    </button>
                )
            }
            {
                location === 'map' && (
                    <button
                        onClick={ () => signOut() }
                        className="bg-gray-800 text-white px-5 py-4 rounded-xl font-bold cursor-pointer fixed bottom-4 right-4 tm-dashboard-link"
                    >
                        <div className="flex justify-center items-center">
                            <FaArrowRightFromBracket size={ 20 } />
                            <span className="ml-3">Cerrar sesión</span>
                        </div>
                    </button>
                )
            }
        </>
    )
}
