import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

export const getDocById = async ( id, setData ) => {
    
    const docRef = doc( db, "territories", id )
    const docSnap = await getDoc( docRef )
    const data = { id: docSnap.id.toString(), data: docSnap.data() }

    setData( current => current.map( doc => {
        if ( doc.id === docSnap.id ) {
            return {
                id: docSnap.id.toString(), 
                data: docSnap.data()
            }
        }
        console.log( current )
    }) )

}
