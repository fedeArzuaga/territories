import { CustomPopUpForm } from './CustomPopUpForm'
import { CustomPopUpContent } from './CustomPopUpContent'

interface Props {
    territory: number,
    square: number,
    state: string,
    finished: string,
    notes: string,
    editMode: boolean
}

export const CustomPopUp = ({ 
    territory, 
    square, 
    state, 
    finished, 
    notes, 
    editMode,
}: Props) => {

    return (
        <div>
            <h3 className="text-2xl font-bold mb-0">
                Territorio N°{ territory }
            </h3>
            <p className="text-gray-400 font-bold mt-0!">
                Manzana N°{ square }
            </p>
            <CustomPopUpContent
                state={ state }
                finished={ finished }
                notes={ notes }
            />
        </div>
    )
    
}
