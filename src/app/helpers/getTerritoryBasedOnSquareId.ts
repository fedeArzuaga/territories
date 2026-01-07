import { territoriesData } from "@/data/polygons";
import { TerritoryData } from "@/types/polygon";

export const getTerritoryBasedOnSquareId = ( squareId: string ) => {
    const territoryId = Number(squareId.split(":")[1].split("-")[0])
    const territoryData: TerritoryData = territoriesData[territoryId]
    return territoryData
}
