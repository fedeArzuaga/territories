import { BiSolidEdit } from 'react-icons/bi'

import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { SimpleTerritoryState } from '@/types/simpleTerritoryStats'

export const TerritoryCardDetails = ({ 
    territory, 
    square, 
    state, 
    lastLeader, 
    id 
}: SimpleTerritoryState) => {

    return (
        <>
            <h4 className="text-2xl font-bold">Territorio N° { territory }</h4>
            <p className="text-sm text-gray-400 font-bold"> Manzana N° { square }</p>
            <div className="mt-6">
                <p className="mt-2">
                    <b className="mr-2">Estado:</b> 
                    <Badge 
                        type={ state === 'Pendiente' ? 'danger' : state === 'En progreso' ? 'warning' : 'success' } 
                        text={ state } 
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
                type="primary"
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