'use client'

import { useSession } from "next-auth/react"

export const UserGreeting = () => {

    const { data: session } = useSession()
    const userFirstName = session?.user?.name?.split(' ')[0] || 'Usuario'

    return (
        <h1 className="text-5xl font-bold mb-8">
            Bienvenido, { userFirstName }
        </h1>
    )
}
