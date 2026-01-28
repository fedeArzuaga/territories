"use server"

import { revalidatePath } from "next/cache"

export const revalidateMyPath = async ( path: string ) => {
    revalidatePath( path )
}
