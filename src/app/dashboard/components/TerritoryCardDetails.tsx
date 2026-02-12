import { BiSolidEdit } from 'react-icons/bi'

import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { TerritoryDataWithSquares } from '@/types/territory'

interface Props {
    territory: TerritoryDataWithSquares
}

export const TerritoryCardDetails = ({
    territory
}: Props) => {

    const { id, territoryState, lastLeaderName, category } = territory

    return (
        <>
            {
                category && (
                    <span className={`
                        rounded-full px-3 py-1 text-sm font-bold mb-4 inline-block
                        ${ category === "Personal" ? "bg-blue-100 text-blue-800" : "bg-teal-100 text-teal-800" }
                    `}>
                        { category }
                    </span>
                )
            }
            <h4 className="text-2xl font-bold">Territorio N° { id }</h4>
            <div className="mt-6">
                <p className="mt-2">
                    <b className="mr-2">Estado:</b> 
                    <Badge 
                        state={ territoryState }
                    />
                </p>
                <p className="mt-2">
                    {
                        territoryState === "Personal"
                            ? (
                                <>
                                    <b>Asignado a:</b> { lastLeaderName }
                                </>
                            )
                            : (
                                <>
                                    <b>Último conductor:</b> { lastLeaderName }
                                </>
                            )
                    }
                </p>
            </div>
        </>
    )
}

{/* BACKUP
{
    state !== "Pendiente" && (
        <>
            <p className="mt-2">
                <b>Se inició:</b> { started }
            </p>
            <p className="mt-2">
                <b>Se finalizó:</b> { finished }
            </p>
        </>
    )
}    
*/}