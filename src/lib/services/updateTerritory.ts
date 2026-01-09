"use server";

import { TerritoryDataWithSquares } from "@/types/territory";
import { prisma } from "../prisma";

export const updateTerritory = async ( territory: TerritoryDataWithSquares ) => {
    try {
        const updated = await prisma.territory.update({
            where: { id: Number(territory.id) },
            data: {
                territoryState: territory.territoryState,
                lastLeaderName: territory.lastLeaderName,
                notes: territory.notes,
                // Ensure dates are compatible with PostgreSQL DateTime
                started: territory.started ? new Date(territory.started) : null,
                finished: territory.finished ? new Date(territory.finished) : null,
                updatedAt: new Date(),
                squares: {
                    // Change 'updateMany' to 'update'
                    update: territory.squares.map( square => ({
                        where: { id: square.id },
                        data: { state: square.state }
                    }))
                }
            }
        });

        return updated;
    } catch ( error ) {
        console.error("Prisma Update Error:", error);
        throw error;
    }
}