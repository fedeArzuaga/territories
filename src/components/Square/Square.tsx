'use client'

import type { SquareData } from "@/types/polygon"
import { LatLngExpression } from "leaflet"
import { Polygon, Popup, SVGOverlay } from "react-leaflet"
import { CustomPopUp } from "../CustomPopUp/CustomPopUp"
import { getTerritoryBasedOnSquareId } from "@/app/helpers/getTerritoryBasedOnSquareId"

interface Props {
    squareData: SquareData
}

export const Square = ({ squareData }: Props) => {

    const {
        id,
        coordinates,
        territory,
        square,
        state: squareState,
    } = squareData

    const { started, finished, notes, territoryState } = getTerritoryBasedOnSquareId( id )

    const colorFromState = squareState === 'Pendiente' ? 'red' : squareState === 'Completado' ? 'green' : 'yellow'

    return (
        <Polygon pathOptions={{ color: colorFromState }} positions={ coordinates as LatLngExpression[] }>
        
            <SVGOverlay attributes={{ stroke: 'black' }} bounds={ coordinates }>
                { territory }
            </SVGOverlay>

            <Popup >
                <CustomPopUp
                    territory={ territory }
                    square={ square }
                    squareState={ squareState }
                    territoryState={ territoryState }
                    started={ started }
                    finished={ finished }
                    notes={ notes }
                />
            </Popup>

        </Polygon>
    )
}
