"use server"

import { prisma } from "../prisma"
import { formatToLocalDateString } from "@/helpers/formatToLocalDateString"

interface ActivityRegister {
    category: string,
    territoryId: number,
    lastLeaderName: string,
    started: Date,
    finished?: Date | null | undefined
}

export const setActivityRegister = async ( data: ActivityRegister ): Promise<ActivityRegister> => {

    const activityRegisterData = {
        territoryId: data.territoryId,
        started: data.started,
        finished: data.finished,
        lastLeaderName: `${ data.lastLeaderName } ${data.category === "Personal" ? "(P)" : "(C)"}`
    }

    try {
        const activityRegisterRecords = await prisma.activity_Register.findMany({
            where: { territoryId: data.territoryId }
        })
        const receivedStartedDate = formatToLocalDateString( data.started )
        const formattedDtartedDates = activityRegisterRecords.map( register => formatToLocalDateString(register.started) )

        if ( !formattedDtartedDates.includes(receivedStartedDate) ) {
            const newActivityRegister = await prisma.activity_Register.create({
                data: activityRegisterData
            })
            return {
                ...newActivityRegister,
                category: data.category
            }
        }

        const selectSavedActivity = activityRegisterRecords.filter( register => {
            if ( formatToLocalDateString(register.started) === receivedStartedDate ) {
                return register
            }
        })
        const updatedActivityRegister = await prisma.activity_Register.update({
            where: { id: selectSavedActivity[0].id },
            data: activityRegisterData
        })
        return {
            ...updatedActivityRegister,
            category: data.category
        }

    } catch ( error ) {
        console.log( error )
        return {
            ...data,
            category: data.category
        }
    }

}