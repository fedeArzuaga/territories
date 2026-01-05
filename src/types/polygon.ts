

export interface PolygonData {
    id: string,
    territory: number,
    square: number,
    color: string,
    started: string,
    finished: string,
    notes: string,
    state: "Pendiente" | "En progreso" | "Completado",
    lastLeader: string,
    coordinates: number[][]
}

export type Cords = [number, number]
export type State = "Pendiente" | "En progreso" | "Completado"
