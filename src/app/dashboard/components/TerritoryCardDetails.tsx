import { BiSolidEdit } from 'react-icons/bi'

import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { territoriesData } from '@/data/polygons'

interface Props {
    territoryId: string
}

export const TerritoryCardDetails = ({
    territoryId
}: Props) => {

    const { id, name, territoryState, lastLeader } = territoriesData[Number(territoryId)]

    return (
        <>
            <h4 className="text-2xl font-bold">{ name }</h4>
            <div className="mt-6">
                <p className="mt-2">
                    <b className="mr-2">Estado:</b> 
                    <Badge 
                        type={ territoryState === 'Pendiente' ? 'danger' : territoryState === 'En progreso' ? 'warning' : 'success' } 
                        text={ territoryState } 
                    />
                </p>
                <p className="mt-2">
                    <b>Último conductor:</b> { lastLeader }
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