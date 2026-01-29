import { prisma } from "../prisma"

export const getLastEditedTerritory = async () => {
    const lastEditedTerritory = await prisma.territory.findFirst({
        orderBy: {
            updatedAt: 'desc'
        }
    })
    return lastEditedTerritory
}
