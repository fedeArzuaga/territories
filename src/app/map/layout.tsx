import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

import MapProvider from "@/providers/MapProvider";
import { getUserByActiveSession } from "@/lib/services/getUserByActiveSession";
import { SignOutButton } from "@/components/Sidebar/SignOutButton";

export default async function MapLayout({
    children
    }: {
    children: React.ReactNode;
})  {

    const user = await getUserByActiveSession()

    return (
        <>
            <MapProvider>
                { children }
            </MapProvider>
            {
                user.role !== 'USER' 
                    ? (
                        <Link
                            href='/dashboard'
                            className="bg-gray-800 text-white px-5 py-4 rounded-xl font-bold cursor-pointer fixed bottom-4 right-4 tm-dashboard-link"
                        >
                            <div className="flex justify-center items-center">
                                <span className="mr-3">Administrar territorios</span>
                                <FaArrowRightLong size={20} />
                            </div>
                        </Link>
                    )
                    : (
                        <SignOutButton location="map" />
                    )
            }
        </>
    )
}