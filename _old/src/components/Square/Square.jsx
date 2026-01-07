import { useState } from 'react'
import { Polygon, Popup, SVGOverlay } from 'react-leaflet'
import { TopIcons } from './../TopIcons/TopIcons'
import { PopUp } from '../PopUp/PopUp'

export const Square = ({ squareCords, squareData, updateContent }) => {

    const {  
        coordinates,
        territory,
        square
    } = squareCords

    const [editMode, setEditMode] = useState(false)
    const toggleEditMode = () => setEditMode( current => !current )

    return (
        <Polygon pathOptions={ {color: squareData.data.color} } positions={ coordinates }>

            <SVGOverlay attributes={{ stroke: 'transparent' }} bounds={ coordinates }>
                <text x="50%" y="50%" fill="black" fontFamily='24'>
                    { territory }
                </text>
            </SVGOverlay>

            <Popup>

                { /* Toggle Icons Section */ }
                <TopIcons 
                    editMode={ editMode } 
                    toggleEditMode={ toggleEditMode }
                    id={ `${territory}.${square}` }
                    updateContent={ updateContent }
                />

                <PopUp
                    territory={ territory }
                    square={ square }
                    state={ squareData.data.status }
                    lastDateDone={ squareData.data.lastDateDone }
                    notes={ squareData.data.notes }
                    editMode={ editMode }
                    toggleEditMode={ toggleEditMode }
                    updateContent={ updateContent }
                />

            </Popup>

        </Polygon>
    )
}
