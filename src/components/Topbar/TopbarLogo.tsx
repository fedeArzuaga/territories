import { GrMapLocation } from "react-icons/gr"

export const TopbarLogo = () => {
    return (
        <div className="font-bold text-sm text-left flex flex-start items-center">
            <div className="bg-teal-700 p-3 rounded-full w-10 h-10 flex justify-center items-center m-auto md:hidden">
                <GrMapLocation size={20} className="text-white" /> 
            </div>
            <div className="flex flex-start items-center">
                <div className="bg-teal-700 p-2 w-8 h-8 rounded-full hidden md:flex justify-center items-center">
                    <GrMapLocation size={40} className="text-white" />
                </div>
                <span className="text-sm ml-3">
                    Territorios <br className="md:hidden" />Los Bulevares
                </span>
            </div>
        </div>
    )
}
