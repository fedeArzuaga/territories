'use client'

import { signOut } from "next-auth/react"
import { FaArrowRightFromBracket } from "react-icons/fa6"

export const SignOutButton = () => {
    return (
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
