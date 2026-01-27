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

    const { id, territoryState, lastLeaderName } = territory

    return (
        <>
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
            <Button
                cssClasses="absolute top-2 right-2 !p-2"
                label=""
                icon={ <BiSolidEdit size={25} /> }
                style="primary"
                action="link"
                href={`/dashboard/territories/${id}`}
            />
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