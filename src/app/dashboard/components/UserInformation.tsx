'use client'

import { formatUserRole } from "@/helpers/formatUserRole"
import { UploadButton } from "@/utils/uploadthing"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { IoCameraOutline } from "react-icons/io5"

interface Props {
    image?: string,
    name: string,
    role: string,
    id: string
}

export const UserInformation = ({ 
    image = 'https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg', 
    name, 
    role,
    id
}: Props) => {

    const router = useRouter()
    
    return (
        <div className="flex flex-col items-center text-center">
            <div className="relative group">
                <Image
                    src={ image }
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <UploadButton
                    endpoint="profilePicture"
                    onClientUploadComplete={ async (res) => {
                        await fetch(`/api/user/profile-picture/${id}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ image: res[0].ufsUrl })
                        })
                        router.refresh()
                    }}
                    onUploadError={(error: Error) => {
                        // Do something with the error.
                        throw new Error(`ERROR! ${error.message}`);
                    }}
                />
            </div>
            <h2 className="mt-4 text-xl font-bold">{ name }</h2>
            <p className="text-sm opacity-90">{ role }</p>
        </div>
    )
}