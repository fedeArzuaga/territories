
export const getColorByState = ( state: string ): string => {
    if ( state === "Personal" ) return "blue"
    if ( state === "Completado" ) return "green"
    if ( state === "En progreso" ) return "yellow"
    return "red"
}
