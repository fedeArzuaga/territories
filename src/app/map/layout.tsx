import MapProvider from "@/providers/MapProvider";

export default function MapLayout({
    children
    }: {
    children: React.ReactNode;
})  {
    return (
        <>
            <MapProvider>
                { children }
            </MapProvider>
        </>
    )
}