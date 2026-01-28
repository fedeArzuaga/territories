'use server'

import { User } from "@/types/user"
import { prisma } from "../prisma"
import { revalidatePath } from "next/cache"

export const deleteUserById = async ( uuid: string ): Promise<User> => {
    const deletedUser = await prisma.user.delete({
        where: {
            id: uuid
        }
    })
    revalidatePath('/dashboard/create-user')
    return deletedUser
}
