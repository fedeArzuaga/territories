import { getCurrentDate } from '@/helpers/getCurrentDate'
import { ChangeEvent, useState, useTransition } from 'react'

interface Props {
    lastLeaderName: string | undefined,
    started: Date | undefined,
    finished?: Date | null | undefined
}

export const useActivityRegisterForm = ({ lastLeaderName, started, finished }: Props) => {

    const [ formState , setFormState ] = useState({
        isEditing: false,
        isCompleted: finished ? true : false,
        isModalOpen: false
    })

    const [ form, setForm ] = useState({
        lastLeaderName: lastLeaderName || "",
        started: getCurrentDate(started || new Date()),
        finished: getCurrentDate(finished || new Date()),
    })
    const [ isPending, startTransition ] = useTransition()

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setForm(prev => ({
            ...prev,
            [event.target.name]: event.target.name === 'started' || event.target.name === 'finished'
                ? getCurrentDate(event.target.value)
                : event.target.value
        }))
    }

    const handleCheckboxChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setFormState( prev => ({ ...prev, isCompleted: !prev.isCompleted }))
    }

    return {
        formState,
        setFormState,
        form,
        isPending,
        startTransition,
        handleInputChange,
        handleCheckboxChange
    }

}
