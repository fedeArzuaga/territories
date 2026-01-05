'use client'

import dynamic from "next/dynamic";

// 1. Define the dynamic import at the top level
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
    // 2. Pass children directly as a prop or within the component tags )
    return (
        <div className="w-full h-screen">
            <Map 
                posix={[-34.815597, -56.304091]} 
                zoom={12}
            >
                {children}
            </Map>
        </div>
    );
}