import { CustomPopUpContent } from './CustomPopUpContent'
import { Badge } from '../ui/Badge/Badge'
import { TerritoryData } from '@/types/territory'

interface Props {
    square: number,
    squareState: string,
    territory: TerritoryData
}

export const CustomPopUp = ({ 
    square, 
    squareState,
    territory,
}: Props) => {
    return (
        <div>

            <span
                className={`
                    border-t-12 absolute -top-1 left-0 right-0 h-9 rounded-full
                    ${ territory.category === "Personal" ? "border-blue-500" : "border-teal-500" } 
                `}
            >

            </span>

            <h3 className="text-2xl font-bold mb-0 flex items-center">
                Territorio N°{ territory.id } -&nbsp;<Badge state={ territory.territoryState } />
            </h3>
            <p className="text-gray-400 font-bold mt-0!">
                Manzana N°{ square }
            </p>
            <CustomPopUpContent
                squareState={ squareState }
                territory={ territory }
            />
        </div>
    )
    
}
