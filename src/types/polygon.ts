
/**
 * Reestructuring the dataset to have two main datasets: territories and squares. This improves:
 * 
 * Efficiently since we do not have to loop through every single square to access a territory square
 * Readibility and maintanibility in the near future
 */

export interface TerritoriesData {
    [territoryId: number]: TerritoryData
}

export interface SquaresData {
    [squareId: string]: SquareData
}

export interface SquareData {
    id: string,
    territory: number,
    square: number,
    state: string,
    coordinates: Cords[]
}

export interface TerritoryData {
    id: number,
    name: string,
    lastLeader: string,
    started: string,
    finished: string,
    territoryState: string,
    notes: string,
    squareIds: squareId[]
}

export type squareId = string
export type Cords = [number, number]
export type State = "Pendiente" | "En progreso" | "Completado"
