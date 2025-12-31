

export interface PolygonData {
    territory: number,
    square: number,
    color: string,
    started: string,
    finished: string,
    notes: string,
    state: "Pendiente" | "En progreso" | "Completado",
    coordinates: number[][]
}

export type Cords = [number, number]
export type State = "Pendiente" | "En progreso" | "Completado"
