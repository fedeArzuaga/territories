import { getUserByActiveSession } from "@/lib/services/getUserByActiveSession"

export const UserGreeting = async () => {

    const user = await getUserByActiveSession()

    return (
        <h1 className="text-5xl font-bold mb-8">
            Bienvenido, { user.name.split(" ")[0] }
        </h1>
    )
}
