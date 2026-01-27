'use client'

import { LatLngExpression } from "leaflet"
import { Polygon, Popup, SVGOverlay } from "react-leaflet"
import { CustomPopUp } from "../CustomPopUp/CustomPopUp"
import { squaresData } from "@/data/polygons"
import { getColorByState } from "@/helpers/getColorByState"

interface TerritoryInfo {
    finished: Date | null
    id: number
    lastLeaderName: string | null
    managerId: string | null
    notes: string | null
    started: Date | null
    territoryState: string
    updatedAt: Date,
}

interface SquareData {
    id: string,
    squareNumber: number,
    state: string,
    territory: TerritoryInfo,
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

    const { started, finished, notes, territoryState, lastLeaderName, managerId, updatedAt } = territory

    const colorFromState = getColorByState( state )

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

            <Popup >
                <CustomPopUp
                    territory={ territoryId }
                    square={ squareNumber }
                    lastLeaderName={ lastLeaderName || '' }
                    squareState={ state }
                    territoryState={ territoryState }
                    started={ started }
                    finished={ finished }
                    notes={ notes }
                    updatedAt={ updatedAt }
                    managerId={ managerId || '' }
                />
            </Popup>

        </Polygon>
    )
}
