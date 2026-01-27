import { getCurrentDate } from "@/helpers/getCurrentDate"
import { getDaysDistanceFromCurrentDate, getDaysDistanceFromTwoGivenDates } from "@/helpers/datesFunctions"
import { prisma } from "@/lib/prisma"
import { formatToLocalDateString } from "@/helpers/formatToLocalDateString"

export const UpcomingTerritoriesToExpire = async () => {

    const allPersonalTerritories = await prisma.territory.findMany({ where: { territoryState: 'Personal' } })

    // Get dates from personal territories only if they are 15 days away from current date
    const territoriesDate = allPersonalTerritories.filter( territory => {
        if ( getDaysDistanceFromCurrentDate( territory.finished! ) <= 15 ) {
            return {
                id: territory.id,
                lastLeaderName: territory.lastLeaderName,
                started: territory.started!, 
                finished: territory.finished! 
            }
        }
    })

    return (
        <>
            {
                territoriesDate && (
                    <>
                        <p>Estos son los territorios personales que van a caducar pronto:</p>
                        
                        <ul>
                            { territoriesDate.map( territory => (
                                <li key={ territory.id } className="mt-5 p-4 border rounded-md">
                                    <p className="font-bold text-xl mb-2">Territorio N° { territory.id }</p>
                                    <p>
                                        <b>Fecha de vencimiento:</b> { formatToLocalDateString(territory.finished!) }&nbsp;
                                            ({ getDaysDistanceFromCurrentDate(territory.finished!) !== 1 
                                                ? `faltan ${getDaysDistanceFromCurrentDate(territory.finished!)} días` 
                                                : 'falta 1 día' })
                                    </p>
                                    <p>
                                        <b>Asignado a:</b> { territory.lastLeaderName }
                                    </p>
                                </li>
                            )) }
                        </ul>
                    </>
                )
            }
        </>
    )
}
