"use server";

import { TerritoryDataWithSquares } from "@/types/territory";
import { prisma } from "../prisma";

interface Props {
    data: TerritoryDataWithSquares
}

export const updateTerritory = async ({ data }: Props) => {

    const startedDate = ( data.territoryState !== "Pendiente" && data.started ) 
                            ? new Date(data.started) 
                            : !data.started
                                    ? new Date()
                                    : null;
    const finishedDate = (( data.territoryState === "Completado" || data.category === "Personal") && data.finished ) 
                            ? new Date(data.finished) 
                            : null

    try {
        const updatedTerritory = await prisma.territory.update({
            where: { id: Number(data.id) },
            data: {
                territoryState: data.territoryState,
                lastLeaderName: data.lastLeaderName,
                category: data.category,
                notes: data.category !== "Personal" ? data.notes : "",
                started: startedDate,
                finished: finishedDate,
                updatedAt: new Date(),
                managerId: data.managerId,
                squares: {
                    update: data.squares.map( square => ({
                        where: { id: square.id },
                        data: { state: square.state }
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