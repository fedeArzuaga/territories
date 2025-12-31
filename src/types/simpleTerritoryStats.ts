
export interface SimpleTerritoryState {
    territory: number,
    square: number,
    state: "Pendiente" | "En progreso" | "Completado",
    lastLeader: string,
    started: string,
    finished: string
}