import React from 'react'

export const updateDocLocally = ( id, setData, newData ) => {
    setData( current => current.map( doc => {
        if ( doc.id === id ) {
            return {
                id,
                data: newData
            }
        }
    }) )
}
