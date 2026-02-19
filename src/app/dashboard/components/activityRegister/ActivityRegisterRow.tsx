import { getLastDateFinished } from "@/helpers/getLastDateFinished"
import { ActivityRegisterData } from "@/types/activityRegister"
import { ActivityRegisterCell } from "./ActivityRegisterCell"
import { register } from "module"
import { BlankCell } from "./BlankCell"

interface ActivityInformation {
    territoryGroup: ActivityRegisterData[],
    maxLength: number,
}

interface Props {
    territoryInformation: ActivityInformation
}

export const ActivityRegisterRow = ({ territoryInformation }: Props) => {

    const { territoryGroup, maxLength } = territoryInformation
    const amountOfBlankSpaces = territoryGroup.length <= maxLength 
                                    ? maxLength - territoryGroup.length 
                                    : territoryGroup.length

    return (
        <>
        <tr key={ territoryGroup[0].id } className="hover:bg-teal-50/40 transition-colors h-20 relative">
                                                                
            {/* Territory ID */}
            <td className="border border-gray-300 p-2 text-center font-black text-xl text-gray-800 bg-gray-50/30">
                <div className="w-[50px] max-w-[50px]">
                    { territoryGroup[0].territoryId }
                </div>
            </td>
            
            {/* Last Completed Date */}
            <td className="border border-gray-300 p-2 text-center font-bold text-teal-700 text-sm">
                <div className="w-[130px]">
                    { getLastDateFinished( territoryGroup ) }
                </div>
            </td>

            {/* STACKED ASSIGNMENT BLOCK 1 */}
            {
                territoryGroup.map( register => (
                    <ActivityRegisterCell
                        key={ register.id }
                        activityRegister={{
                            finished: register.finished,
                            id: register.id,
                            lastLeaderName: register.lastLeaderName,
                            started: register.started,
                            territoryId: register.territoryId,
                        }}
                    />
                ))
            }

            {/* REPLICATED EMPTY BLOCKS (To match S-13 layout) */}
            {[...Array( amountOfBlankSpaces )].map((_, i) => (
                <BlankCell
                    key={ i }
                />
            ))}
            
        </tr>

        </>
    )
}
