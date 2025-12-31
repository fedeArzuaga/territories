'use client'

import type { PolygonData } from "@/types/polygon"
import { LatLngBoundsExpression, LatLngExpression } from "leaflet"
import { Polygon, Popup, SVGOverlay } from "react-leaflet"
import { CustomPopUp } from "../CustomPopUp/CustomPopUp"
import { CustomPopUpTopbar } from "../CustomPopUp/CustomPopUpTopbar"

interface Props {
    squareData: PolygonData
}

export const Square = ({ squareData }: Props) => {

    const {  
        coordinates,
        territory,
        square,
        state,
        finished,
        notes
    } = squareData

    const colorFromState = state === 'Pendiente' ? 'red' : state === 'Completado' ? 'green' : 'yellow'

    return (
        <Polygon pathOptions={{ color: colorFromState }} positions={ coordinates as LatLngExpression[] }>
        
            <SVGOverlay attributes={{ stroke: 'black' }} bounds={ coordinates as LatLngBoundsExpression }>
                { territory }
            </SVGOverlay>

            <Popup >
                <CustomPopUp
                    territory={ territory }
                    square={ square }
                    state={ state }
                    finished={ finished }
                    notes={ notes }
                    editMode={ false }
                />
            </Popup>

        </Polygon>
    )
}
