import { CustomPopUpContent } from './CustomPopUpContent'
import { Badge } from '../ui/Badge/Badge'

interface Props {
    category: string | null,
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
    category,
    finished, 
    lastLeaderName,
    notes,
    square, 
    squareState,
    started,
    territory, 
    territoryState,
    updatedAt
}: Props) => {
    return (
        <div>

            <span
                className={`
                    border-t-12 absolute -top-1 left-0 right-0 h-9 rounded-full
                    ${ category === "Personal" ? "border-blue-500" : "border-teal-500" } 
                `}
            >

            </span>

            <h3 className="text-2xl font-bold mb-0 flex items-center">
                Territorio N°{ territory } -&nbsp;<Badge state={ territoryState } />
            </h3>
            <p className="text-gray-400 font-bold mt-0!">
                Manzana N°{ square }
            </p>
            <CustomPopUpContent
                category={ category }
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
