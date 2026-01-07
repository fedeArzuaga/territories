import { TopbarActiveUser } from "./TopbarActiveUser"
import { TopbarLogo } from "./TopbarLogo"


export const Topbar = () => {
    return (
        <div className="bg-white flex justify-between items-center px-5 py-3">
            <TopbarLogo />
            <TopbarActiveUser />
        </div>
    )
}
