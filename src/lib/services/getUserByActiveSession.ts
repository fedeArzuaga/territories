import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '../prisma'
import { User } from '@/types/user'

export const getUserByActiveSession = async () => {
    const session = await getServerSession( authOptions )
    const activeUser = await prisma.user.findUnique({
        where: {
            email: session?.user?.email || ''
        }
    })
    
    return activeUser as User || { name: 'Usuario Activo', role: 'Rol de Usuario', image: undefined, email: 'unknown' }
}
