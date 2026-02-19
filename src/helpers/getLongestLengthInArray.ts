import { ActivityRegisterData } from "@/types/activityRegister";

export const getLongestActivityArray = ( activityRegister: Record<number, ActivityRegisterData[]> ): number => {
    let length = 0;
    for( const territoryId in activityRegister ) {
        if ( activityRegister[territoryId].length > length ) {
            length = activityRegister[territoryId].length
        }
    }
    return length
}
