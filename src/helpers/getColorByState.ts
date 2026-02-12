
export const getColorByState = ( state: string ): string => {
    if ( state === "Pendiente" ) return "red"
    if ( state === "Completado" ) return "green"
    if ( state === "En progreso" ) return "yellow"
    return "blue"
}
