"use server"

import { signOut } from "next-auth/react"

export const mySignOut = async () => {
    signOut()
}
