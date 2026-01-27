import { formatUserRole } from "@/helpers/formatUserRole"
import { prisma } from "@/lib/prisma"
import { User } from "@/types/user"
import Image from "next/image"
import Link from "next/link"

interface Props {
    user: User
}

export const LastEditedBy = ({ user }: Props) => {

    const {
        image,
        name,
        role
    } = user

    return (
        <div id="profile" className="space-y-3 flex items-center">
            <Image
                src={ image || "https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg" }
                width={30}
                height={30}
                alt="Avatar user"
                className="w-12 h-12 rounded-full m-0 object-cover"
            />
            <div className="ml-3">
                <Link
                    href="/dashboard/user-profile"
                >
                    <h2
                        className="font-bold text-xs md:text-sm text-left text-teal-700 tm-user-name"
                    >
                        { name }
                    </h2>
                </Link>
                <p className="text-xs text-gray-500 text-left mt-0.5 tm-user-role">
                    { formatUserRole( role ) }
                </p>
            </div>
        </div>
    )
}
