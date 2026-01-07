import { CustomPopUpContent } from './CustomPopUpContent'
import { Badge } from '../ui/Badge/Badge'

interface Props {
    territory: number,
    square: number,
    squareState: string,
    territoryState: string,
    started: string,
    finished: string,
    notes: string,
}

export const CustomPopUp = ({ 
    territory, 
    square, 
    squareState,
    territoryState,
    started,
    finished, 
    notes
}: Props) => {

    const badgeType = territoryState === "Pendiente" ? "danger" : territoryState === "En progreso" ? "warning" : "success"

    return (
        <div>
            <h3 className="text-2xl font-bold mb-0 flex items-center">
                Territorio N°{ territory } -&nbsp;<Badge type={ badgeType } text={ territoryState } />
            </h3>
            <p className="text-gray-400 font-bold mt-0!">
                Manzana N°{ square }
            </p>
            <CustomPopUpContent
                territoryState={ territoryState }
                squareState={ squareState }
                started={ started }
                finished={ finished }
                notes={ notes }
            />
        </div>
    )
    
}
