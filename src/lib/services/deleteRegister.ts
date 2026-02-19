"use server"

import { ActivityRegisterData } from "@/types/activityRegister";
import { prisma } from "../prisma"
import { revalidatePath } from "next/cache";

export const deleteRegister = async ( id: string ): Promise<ActivityRegisterData | any> => {
    try {
        const deletedRegister = await prisma.activity_Register.delete({
            where: {
                id: id
            }
        })        
        revalidatePath('/dashboard/activity-register')
        return deletedRegister;
    } catch (error) {
        console.log( error )
        throw error;
    }
}
