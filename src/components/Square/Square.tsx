'use client'

import { LatLngExpression } from "leaflet"
import { Polygon, Popup, SVGOverlay } from "react-leaflet"
import { CustomPopUp } from "../CustomPopUp/CustomPopUp"
import { squaresData } from "@/data/polygons"
import { getColorByState } from "@/helpers/getColorByState"
import { TerritoryData } from "@/types/territory"

interface SquareData {
    id: string,
    squareNumber: number,
    state: string,
    territory: TerritoryData,
    territoryId: number,
    updatedAt: Date,
}

interface Props {
    squareData: SquareData
}

export const Square = ({ squareData }: Props) => {

    const {
        id,
        squareNumber,
        state,
        territory,
        territoryId,
    } = squareData

    const coordinates = squaresData[id].coordinates
    const colorFromState = territory.category === "Personal" ? getColorByState( territory.category ) : getColorByState( state )

    return (
        <Polygon pathOptions={{ color: colorFromState }} positions={ coordinates as LatLngExpression[] }>
        
            <SVGOverlay attributes={{ stroke: 'black' }} bounds={ coordinates }>
                <text
                    x="50%" 
                    y="50%" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    fill="black"
                    fontSize="16"
                    style={{ pointerEvents: 'none' }}
                >
                    T:{ territoryId } - M:{ squareNumber }
                </text>
            </SVGOverlay>

            <Popup
                className="relative"
            >
                <CustomPopUp
                    territory={ territory }
                    square={ squareNumber }
                    squareState={ state }
                />
            </Popup>

        </Polygon>
    )
}
