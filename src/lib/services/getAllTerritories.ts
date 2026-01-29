import { prisma } from "../prisma";

interface Options {
    limit?: number
    includeSquares?: boolean
    customOrder?: "asc" | "desc"
}

export const getAllTerritories = async ( {includeSquares, limit = 100, customOrder}: Options) => {
    const territories = await prisma.territory.findMany({
        take: limit,
        include: {
            squares: includeSquares ? true : false,
        },
        orderBy: {
            updatedAt: customOrder
        }
    })
    return territories;
}