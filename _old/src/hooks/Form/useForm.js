import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./../../firebase/firebase";
import { getData } from "../../utils/getData";
import { getDocById } from "../../utils/getDocById";
import { updateDocLocally } from "../../utils/updateDocLocally";

export const useForm = ( id, updateContent, toggleEditMode ) => {

    const [formData, setFormData] = useState({
        state: "",
        lastDateDone: "",
        notes: ""
    })
    const [updatingData , setUpdatingData] = useState(false);

    const { setData } = updateContent;
    const { state, lastDateDone, notes } = formData;

    const getNewColor = state => {
        switch( state ) {
            case "completed":
                return "green"
                break;
            case "inProgress":
                return "yellow"
                break;
            default:
                return "red"
                break;
        }
    }

    const handleFormChange = e => {
        setFormData( current => {
            return {
                ...current,
                [e.target.name]: e.target.value
            }
        } )
    }

    const handleSaveChanges = async e => {
        setUpdatingData(true)
        e.preventDefault();
        const newData = {
            color: getNewColor( state ),
            status: state,
            lastDateDone,
            notes
        }
        await setDoc(doc(db, "territories", id), {
            ...newData
        })
        await getData( setData )
        toggleEditMode()
        setUpdatingData(false)
    }

    const handleReset = async e  => {
        setUpdatingData(true)
        e.preventDefault();
        const newData = {
            color: "red",
            status: "pending",
            lastDateDone,
            notes
        }
        await setDoc(doc(db, "territories", id), {
            ...newData
        })
        await getData( setData )
        toggleEditMode()
        setUpdatingData(false)
    }

    return {
        handleFormChange,
        handleSaveChanges,
        handleReset,
        lastDateDone,
        state,
        notes,
        updatingData
    }

}
