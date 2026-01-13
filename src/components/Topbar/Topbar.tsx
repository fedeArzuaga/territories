import { TopbarActiveUser } from "./TopbarActiveUser"
import { TopbarLogo } from "./TopbarLogo"
import { getUserByActiveSession } from "@/lib/services/getUserByActiveSession"
import { formatUserRole } from "@/helpers/formatUserRole"

export const Topbar = async () => {

    const { name, role, image } = await getUserByActiveSession()

    return (
        <div className="bg-white flex justify-between items-center px-5 py-3">
            <TopbarLogo />
            <TopbarActiveUser
                fullName={ name }
                role={ formatUserRole(role) }
                image={ image || undefined }
            />
        </div>
    )
}
