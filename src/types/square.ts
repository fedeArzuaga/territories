import { TerritoryData } from "./territory"

export interface SquareData {
    id: string,
    territoryId: number,
    squareNumber: number,
    state: string
}

export interface SquareDataWithTerritory extends SquareData {
    territory: TerritoryData
}

export type Cords = [number, number]