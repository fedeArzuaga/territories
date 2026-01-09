'use client'

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Map = dynamic(
    () => import('../components/Map'),
    {
        loading: () => (
            <div className="bg-gray-100 w-full h-screen flex items-center justify-center">
                <p>A map is loading...</p>
            </div>
        ),
        ssr: false
    }
);

interface Props {
    children: React.ReactNode
}

export default function MapProvider({ children }: Props) {
    const pathname = usePathname();

    return (
        // The key={pathname} forces a complete remount on route changes
        <div key={pathname} className="w-full h-screen overflow-hidden">
            <Map 
                posix={[-34.815597, -56.304091]} 
                zoom={12}
            >
                {children}
            </Map>
        </div>
    );
}