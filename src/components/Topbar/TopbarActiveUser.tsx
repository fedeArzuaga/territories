import Image from "next/image"
import Link from "next/link";

interface Props {
    fullName: string;
    role: string;
    image?: string;
}

export const TopbarActiveUser = ({ fullName, role, image }: Props) => {

    return (
        <div id="profile" className="space-y-3 flex items-center">
            <Link
                href="/dashboard/user-profile"
                className="m-0"
            >
                <Image
                    src={ image || "https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg" }
                    width={40}
                    height={40}
                    alt="Avatar user"
                    className="w-12 h-12 rounded-full m-0 object-cover"
                />
            </Link>
            <div className="hidden md:block ml-3">
                <Link
                    href="/dashboard/user-profile"
                >
                    <h2
                        className="font-bold text-xs md:text-sm text-left text-teal-700 tm-user-name"
                    >
                        { fullName }
                    </h2>
                </Link>
                <p className="text-xs text-gray-500 text-left mt-0.5 tm-user-role">
                    { role }
                </p>
            </div>
        </div>
    )
}
