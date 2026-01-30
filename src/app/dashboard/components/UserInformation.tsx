'use client'

import Image from "next/image"
import { UserUploadProfilePicture } from "./UserUploadProfilePicture"

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
    
    return (
        <div className="flex flex-col items-center text-center">
            <div className="relative group">
                <Image
                    src={ image }
                    alt={`Imagen de perfil de ${name}`}
                    width={300}
                    height={300}
                    className="w-48 h-48 sm:w-32 sm:h-32 xl:w-48 xl:h-48 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <UserUploadProfilePicture id={ id } />
            </div>
            <h2 className="mt-4 text-xl font-bold">{ name }</h2>
            <p className="text-sm opacity-90">{ role }</p>
        </div>
    )
}