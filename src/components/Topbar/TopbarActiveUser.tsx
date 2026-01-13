import Image from "next/image"

//TODO: Use user's real data once implemented
interface Props {
    fullName: string;
    role: string;
    image?: string;
}

export const TopbarActiveUser = ({ fullName, role, image }: Props) => {

    return (
        <div id="profile" className="space-y-3 flex items-center">
            <Image
                src={ image || "https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg" }
                width={40}
                height={40}
                alt="Avatar user"
                className="w-12 rounded-full m-0"
            />
            <div className="hidden md:block ml-3">
                <h2
                    className="font-bold text-xs md:text-sm text-left text-teal-700 tm-user-name"
                >
                    { fullName }
                </h2>
                <p className="text-xs text-gray-500 text-center mt-0.5 tm-user-role">
                    { role }
                </p>
            </div>
        </div>
    )
}
