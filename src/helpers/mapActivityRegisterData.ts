import { ActivityRegisterData } from '@/types/activityRegister';
import React from 'react'

export const mapActivityRegisterData = ( activityRegisterData: ActivityRegisterData[] | undefined ) => {
    if ( !activityRegisterData ) return
    
    return activityRegisterData?.reduce( ( accumulator, current ) => {
        const id = current.territoryId;

        if (!accumulator[id]) {
            accumulator[id] = [];
        }

        accumulator[id].push(current);
        return accumulator;

    }, {} as Record<string, ActivityRegisterData[]>)
}
