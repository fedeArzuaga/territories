import { CustomPopUpContent } from './CustomPopUpContent'
import { Badge } from '../ui/Badge/Badge'

interface Props {
    territory: number,
    square: number,
    lastLeaderName: string,
    squareState: string,
    territoryState: string,
    started: Date | null,
    finished: Date | null,
    updatedAt: Date,
    managerId: string,
    notes: string | null,
}

export const CustomPopUp = ({ 
    territory, 
    square, 
    lastLeaderName,
    squareState,
    territoryState,
    started,
    finished, 
    notes,
    updatedAt
}: Props) => {
    return (
        <div>
            <h3 className="text-2xl font-bold mb-0 flex items-center">
                Territorio N°{ territory } -&nbsp;<Badge state={ territoryState } />
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
                lastLeaderName={ lastLeaderName }
                updatedAt={ updatedAt }
            />
        </div>
    )
    
}
