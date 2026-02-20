import { formatToLocalDateString } from "@/helpers/formatToLocalDateString"

interface ActivityCellProps {
    id?: string,
    lastLeaderName?: string,
    started?: Date,
    finished?: Date | null,
    territoryId: number
}

interface Props {
    activityRegister: ActivityCellProps
}

export const ActivityRegisterContent = ({ activityRegister }: Props) => {

    const { lastLeaderName, started, finished } = activityRegister

    return (
        <>
            <div className="p-2 border-b border-gray-200 font-bold text-gray-800 text-center min-h-16.25 flex items-center justify-center bg-white">
                { lastLeaderName }
            </div>
            
            <div className="flex flex-1 text-md font-bold text-gray-500">
                <div className="flex-1 border-r border-gray-200 p-1 flex flex-col items-center justify-center">
                    <span className="text-[8px] uppercase text-gray-400 block leading-tight">Asignó</span>
                    { 
                        started ? formatToLocalDateString(started) : <p>&nbsp;</p> 
                    }
                </div>
                <div className="flex-1 p-1 flex flex-col items-center justify-center">
                    <span className="text-[8px] uppercase text-gray-400 block leading-tight">Completó</span>
                    { 
                        finished ? formatToLocalDateString(finished) : <p>&nbsp;</p> 
                    }
                </div>
            </div>
        </>
    )
}
