import { ActivityRegisterData } from "@/types/activityRegister";
import { format } from "date-fns";
import { formatToLocalDateString } from "./formatToLocalDateString";

export const getLastDateFinished = ( activityRegisters: ActivityRegisterData[] ) => {
    const finishedDates = activityRegisters.filter( register => {
        if ( register.finished !== null ) {
            return register.finished
        }
    })
    const lastFinishedDate = finishedDates.at(-1)?.finished
    return lastFinishedDate ? formatToLocalDateString(lastFinishedDate) : ""
}
