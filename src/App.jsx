import { MapContainer, TileLayer } from "react-leaflet"
import { polygons } from "./data/polygons"
import { Square } from "./components/Square/Square"
import { getData } from "./utils/getData"

import { useEffect, useState } from "react"

import 'leaflet/dist/leaflet.css'
import { Loader } from "./components/Loader/Loader"
import { setZoomBasedOnScreenWidth } from "./utils/setZoomBasedOnScreenWidth"

function App() {

    const [data, setData] = useState([])

    useEffect( () => {
        getData( setData )
        // return getData( setData );
    }, [])

    return (
        <>  
            <div style={{height: 536}}>
                <MapContainer center={[-34.815597, -56.304091]} zoom={ setZoomBasedOnScreenWidth() } scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { 
                        data.length ?
                            (
                                polygons.map( polygon => (
                                    <Square 
                                        key={ `${polygon.territory}.${polygon.square}` } 
                                        squareCords={ polygon }
                                        squareData={ data.find( doc => doc.id === `${polygon.territory}.${polygon.square}` ) }
                                        updateContent={{ getData, setData }} 
                                    />
                                ))
                            )
                        : (
                            <Loader />   
                        )
                    }   
                </MapContainer>
            </div>
        </>
    )
}

export default App
