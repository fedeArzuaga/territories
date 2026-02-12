import { prisma } from "../prisma";

export const getAllSquares = async () => {
    const squares = await prisma.square.findMany({
        select: {
            id: true,
            squareNumber: true,
            state: true,
            territoryId: true,
            updatedAt: true,
            territory: {
                select: {
                    id: true,
                    category: true,
                    managerId: true,
                    updatedAt: true,
                    territoryState: true,
                    lastLeaderName: true,
                    notes: true,
                    started: true,
                    finished: true,
                    manager: true
                }
            }
        }
    });
    return squares;
}