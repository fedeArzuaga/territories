"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../prisma"
import { revalidateMyPath } from "./revalidateMyPath"

interface ActivityRegisterForm {
    id: string,
    territoryId: number,
    lastLeaderName: string,
    started: string,
    finished: string | null
}

export const updateRegister = async ( activityRegister: ActivityRegisterForm ) => {
    if ( activityRegister ) {
        try {
            console.log( activityRegister )
            const updatedRegister = await prisma.activity_Register.update({
                where: {
                    id: activityRegister.id
                },
                data: {
                    finished: activityRegister.finished ? new Date(activityRegister.finished) : null,
                    lastLeaderName: activityRegister.lastLeaderName,
                    started: new Date(activityRegister.started),
                    territoryId: activityRegister.territoryId
                }
            })
            revalidatePath('/dashboard/activity-register')
            return updatedRegister
        } catch (error) {
            console.log( error )
            throw error;
        }
    }
}
