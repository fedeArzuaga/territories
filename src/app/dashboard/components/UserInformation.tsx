import { formatUserRole } from "@/helpers/formatUserRole"
import Image from "next/image"
import { IoCameraOutline } from "react-icons/io5"

interface Props {
    image?: string,
    name: string,
    role: string
}

export const UserInformation = ({ 
    image = 'https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg', 
    name, 
    role 
}: Props) => {
    
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
                <label className="absolute bottom-0 w-10 h-10 right-0 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors flex justify-center items-center">
                    <span className="text-white text-xs">
                        <IoCameraOutline className="text-teal-500" size={25} />
                    </span>
                    <input type="file" className="hidden" />
                </label>
            </div>
            <h2 className="mt-4 text-xl font-bold">{ name }</h2>
            <p className="text-sm opacity-90">{ role }</p>
        </div>
    )
}