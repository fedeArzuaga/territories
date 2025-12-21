'use client'

import dynamic from "next/dynamic";
import { useMemo } from "react";

interface Props {
    children: React.ReactNode
}

export default function MapProvider({ children }: Props) {
    const Map = useMemo(() => dynamic(
        () => import('../components/Map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    return (
        <>
            <div className="bg-white-700 w-[100%] h-[100vh]">
                <Map 
                    posix={[-34.815597, -56.304091]} 
                    zoom={ 14 }
                >
                    { children }
                </Map>
            </div>
        </>
    )
}