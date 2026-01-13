
export const formatUserRole = ( role: string ) => {
    if ( role === 'SUPERUSER' ) return 'Superusuario'
    if ( role === 'ADMIN' ) return 'Administrador'
    if ( role === 'LEADER' ) return 'Conductor'
    return 'Publicador'
}
