"use server"

import { prisma } from "../prisma"

export const getUserById = async ( id: string ) => {
    try {
        const response = await prisma.user.findUnique({
            where: { id },
            select: {
                name: true,
            }
        })
        return response?.name || null
    } catch ( error ) {
        console.error( 'Error fetching user data:', error )
        return null
    }
}