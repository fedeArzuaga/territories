import { SquareData } from "./square"
import { User } from "./user"

export interface TerritoryData {
    id: number,
    category?: string | null,
    territoryState: string,
    lastLeaderName: string | null,
    notes: string | null,
    started: Date | null | string,
    finished: Date | null | string,
    managerId: string | null,
    manager?: User | null,
    updatedAt: Date
}

export interface TerritoryDataWithSquares extends TerritoryData {
    squares: SquareData[]
}

export interface TerritoryDataWithSquaresAndManager extends TerritoryData {
    squares: SquareData[],
    manager: User | null
}

export type squareId = string