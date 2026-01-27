"use server";

import { TerritoryDataWithSquares } from "@/types/territory";
import { prisma } from "../prisma";

interface Props {
    isPersonal: boolean,
    data: TerritoryDataWithSquares
}

export const updateTerritory = async ({ isPersonal, data }: Props) => {
    try {
        const updatedTerritory = await prisma.territory.update({
            where: { id: Number(data.id) },
            data: {
                territoryState: data.territoryState,
                lastLeaderName: data.lastLeaderName,
                notes: isPersonal ? '' : data.notes, 
                started: data.started ? new Date(data.started) : null,
                finished: data.finished ? new Date(data.finished) : null,
                updatedAt: new Date(),
                managerId: data.managerId,
                squares: {
                    update: data.squares.map( square => ({
                        where: { id: square.id },
                        data: { state: isPersonal ? "Personal" : square.state }
                    }))
                }
            }
        });
        return updatedTerritory;
    } catch ( error ) {
        console.error("Prisma Update Error:", error);
        throw error;
    }
}