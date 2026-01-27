import { SquareData } from "./square"

export interface TerritoryData {
    id: number,
    territoryState: string,
    lastLeaderName: string | null,
    notes: string | null,
    started: Date | null | string,
    finished: Date | null | string,
    managerId: string | null,
    updatedAt: Date
}

export interface TerritoryDataWithSquares extends TerritoryData {
    squares: SquareData[]
}

export type squareId = string