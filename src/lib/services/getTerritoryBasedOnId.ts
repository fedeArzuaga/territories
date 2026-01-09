import { prisma } from "../prisma";

export const getTerritoryBasedOnId = async ( id: number | string ) => {

    const territory = await prisma.territory.findUnique({
        where: { id: Number(id) },
        include: {
            squares: true,
        }
    });
    return territory;
}