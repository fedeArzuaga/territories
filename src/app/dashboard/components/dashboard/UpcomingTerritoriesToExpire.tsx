import { formatDistanceToNowStrict } from "date-fns"
import { es } from "date-fns/locale"

import { getDaysDistanceFromCurrentDate } from "@/helpers/datesFunctions"
import { prisma } from "@/lib/prisma"
import { formatToLocalDateString } from "@/helpers/formatToLocalDateString"
import { Widget } from "@/components/Widget/Widget"

export const UpcomingTerritoriesToExpire = async () => {

    const pendingPersonalTerritories = await prisma.territory.findMany({ 
        where: { 
            category: 'Personal',
            NOT: {
                territoryState: 'Completado'
            }
        } 
    })

    // Get dates from personal territories only if they are 15 days away from current date
    const territoriesToExpire = pendingPersonalTerritories.filter( territory => {

        const isTerritoryDateAfterCurrentDate = territory.finished!.getTime() > new Date().getTime()
        const daysDistance = Number(formatDistanceToNowStrict( territory.finished!, { unit: 'day' } ).split(' ')[0])
        console.log(territory.id,isTerritoryDateAfterCurrentDate, daysDistance)

        if ( isTerritoryDateAfterCurrentDate && daysDistance <= 15 ) {
            return {
                id: territory.id,
                lastLeaderName: territory.lastLeaderName,
                started: territory.started!, 
                finished: territory.finished! 
            }
        }
    })

    // Get expired territories (finished date is before current date)
    const expiredTerritories = pendingPersonalTerritories.filter( territory => {
        const isTerritoryDateBeforeCurrentDate = territory.finished!.getTime() < new Date().getTime()
        if ( isTerritoryDateBeforeCurrentDate ) {
            return {
                id: territory.id,
                lastLeaderName: territory.lastLeaderName,
                started: territory.started!, 
                finished: territory.finished! 
            }
        }
    })

    return (
        <div
            className="flex flex-col gap-6"
        >
            {
                territoriesToExpire.length > 0 && (
                    <Widget
                        title="Territorios personales próximos a caducar"
                        type="info"
                    >
                        <p>Estos son los territorios personales que van a caducar pronto:</p>
                        
                        <ul>
                            { territoriesToExpire.map( territory => (
                                <li key={ territory.id } className="mt-5 p-4 border rounded-md">
                                    <p className="font-bold text-xl mb-2">Territorio N° { territory.id }</p>
                                    <p>
                                        <b>Fecha de vencimiento:</b> { formatToLocalDateString(territory.finished!) }&nbsp;
                                            (faltan { formatDistanceToNowStrict( territory.finished!, { unit: 'day', locale: es } ) })
                                    </p>
                                    <p>
                                        <b>Asignado a:</b> { territory.lastLeaderName }
                                    </p>
                                </li>
                            )) }
                        </ul>
                    </Widget>
                )
            }
            {
                expiredTerritories.length > 0 && (
                    <Widget
                        title="Territorios personales caducados"
                        type="danger"
                    >
                        <p>Estos son los territorios personales que han caducado:</p>
                        
                        <ul>
                            { expiredTerritories.map( territory => (
                                <li key={ territory.id } className="mt-5 p-4 border rounded-md">
                                    <p className="font-bold text-xl mb-2">Territorio N° { territory.id }</p>
                                    <p>
                                        <b>Fecha de vencimiento:</b> { formatToLocalDateString(territory.finished!) }&nbsp;
                                            (hace { formatDistanceToNowStrict( territory.finished!, { unit: 'day', locale: es } ) })
                                    </p>
                                    <p>
                                        <b>Asignado a:</b> { territory.lastLeaderName }
                                    </p>
                                </li>
                            )) }
                        </ul>
                    </Widget>
                )
            }
        </div>
    )
}
