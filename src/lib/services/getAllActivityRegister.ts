import { prisma } from "../prisma"

export const getAllActivityRegister = async () => {
    try {
        return await prisma.activity_Register.findMany({
            orderBy: {
                started: 'asc'
            }
        })
    } catch (error) {
        console.log( error )
    }
}
