"use server"

import { User } from "@/types/user"
import { prisma } from "../prisma"
import { revalidatePath } from "next/cache"

interface Props {
    user: User,
    hasSeenLatestUpdate: boolean
}

export const updateUserLatestUpdate = async ({ user, hasSeenLatestUpdate }: Props): Promise<User> => {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                hasSeenLatestUpdate 
            }
        })
        revalidatePath('/dashboard')
        return updatedUser
    } catch (error) {
        console.log(error)
        throw error;
    }
}
