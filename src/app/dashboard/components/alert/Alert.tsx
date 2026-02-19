"use client"

import { updateUserLatestUpdate } from "@/lib/services/updateUserLatestUpdate"
import { User } from "@/types/user"
import { BsInfoCircle } from "react-icons/bs"
import { IoClose } from "react-icons/io5"

interface Props {
    children: React.ReactNode
    user: User,
    hasSeenLatestUpdate: boolean
}

export const Alert = ({ user, hasSeenLatestUpdate, children }: Props) => {
    return (
        <div role="alert" className="flex justify-between rounded items-start border-l-4 border-l-blue-950 bg-blue-100 text-blue-950 col-span-1 xl:col-span-4 gap-4 p-3 px-5 sm:shadow-lg">
            <div className="flex justify-start rounded items-start gap-4">
                <div className="mt-0.5">
                    <BsInfoCircle size={20} />
                </div>
                <div>
                    { children }
                </div>
            </div>
            <div className="mt-1">
                <button
                    className="cursor-pointer"
                    onClick={ () => updateUserLatestUpdate({ user, hasSeenLatestUpdate }) }
                >
                    <IoClose size={20} />
                </button>
            </div>
        </div>
    )
}
