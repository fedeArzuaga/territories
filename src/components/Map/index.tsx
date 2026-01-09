"use client"

import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression, LatLngTuple, Map as LeafletMap } from 'leaflet';
import { useEffect, useRef, useState } from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
    posix: LatLngExpression | LatLngTuple,
    zoom: number,
    children: React.ReactNode
}

const defaults = {
    zoom: 19,
}

export default function Map({ zoom = defaults.zoom, posix, children }: MapProps) {
    const mapRef = useRef<LeafletMap | null>(null);
    const [instanceKey, setInstanceKey] = useState(0);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Increment key to force a brand new DOM element on every mount
        setInstanceKey(prev => prev + 1);
        
        return () => {
            if (mapRef.current) {
                mapRef.current.off();
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return (
        <div className="w-full h-full relative">
            {/* The instanceKey ensures this div is treated as new by React/Leaflet */}
            <div key={instanceKey} className="w-full h-full">
                <MapContainer
                    center={posix}
                    zoom={zoom}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                    whenReady={() => {
                        // Delay ready state to allow DOM to settle
                        setTimeout(() => setIsReady(true), 100);
                    }}
                    ref={mapRef}
                >
                    {isReady && (
                        <>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {children}
                        </>
                    )}
                </MapContainer>
            </div>
        </div>
    )
}