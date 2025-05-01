import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase"

export const getData = async ( setData ) => {
    const querySnapshot = await getDocs( collection( db, "territories" ) );
    let newData = [];
    querySnapshot.forEach( doc => newData.push( { id: doc.id, data: doc.data() } ))
    setData( data => [...newData] );
}