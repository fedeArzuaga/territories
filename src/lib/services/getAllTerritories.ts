import { prisma } from "../prisma";

interface Options {
    limit?: number
    includeSquares?: boolean
}

export const getAllTerritories = async ( {includeSquares, limit = 100}: Options) => {
    const territories = await prisma.territory.findMany({
        take: limit,
        include: {
            squares: includeSquares ? true : false,
        }
    })
    return territories;
}