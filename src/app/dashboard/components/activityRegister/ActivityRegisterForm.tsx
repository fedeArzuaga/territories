"use client"

import { IoIosSave } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { getCurrentDate } from "@/helpers/getCurrentDate"
import { updateRegister } from "@/lib/services/updateRegister";
import { useActivityRegisterForm } from "@/hooks/useActivityRegisterForm";
import { SubmitEvent } from "react";

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

export const ActivityRegisterForm = ({ activityRegister }: Props) => {

    const { lastLeaderName, started, finished, id, territoryId } = activityRegister

    const { 
        formState,
        setFormState,
        form,
        isPending,
        startTransition,
        handleInputChange,
        handleCheckboxChange 
    } = useActivityRegisterForm({ lastLeaderName, started, finished })

    const handleSubmit = async ( event: SubmitEvent) => {
        event.preventDefault()
        
        const updatedData = {
            ...form,
            id: id as string, // Tells typescript we're always receiving the ID
            finished: formState.isCompleted && form.finished ? getCurrentDate(form.finished) : null,
            territoryId
        }

        startTransition( async () => {
            await updateRegister( updatedData )
            setFormState( prev => ({ ...prev, isEditing: false }) )
        })

    }

    return (
        <form
            onSubmit={ handleSubmit }
        >
            <div className="p-2 border-b border-gray-200 font-bold text-gray-800 text-center min-h-16.25 flex flex-col items-start justify-center gap-2 bg-white">
                <input 
                    id="lastLeaderName"
                    name="lastLeaderName"
                    onChange={ handleInputChange }
                    type="text" 
                    required
                    placeholder="Nombre del conductor"
                    value={ form.lastLeaderName }
                    className="text-center border border-gray-300 rounded px-1 w-60"
                />
                <label
                    htmlFor="completedCheckbox"
                    className="mt-1 text-sm"
                >
                    <input 
                        type="checkbox"
                        name="completedCheckbox"
                        id="completedCheckbox"
                        checked={ formState.isCompleted }
                        onChange={ handleCheckboxChange }
                        className="mr-2"
                    />
                    { formState.isCompleted ? "Marcado como completado" : "¿Está completado?" }
                </label>
            </div>
            
            <div className="flex flex-1 text-md font-bold text-gray-500">
                <div className="flex-1 border-r border-gray-200 p-1 flex flex-col items-center justify-center">
                    <span className="text-[8px] uppercase text-gray-400 block leading-tight">Asignó</span>
                    <input 
                        id="started"
                        name="started"
                        onChange={ handleInputChange }
                        type="date" 
                        required
                        placeholder="Fecha de inicio"
                        value={ form.started ? getCurrentDate(form.started) : getCurrentDate(new Date()) }
                        className="border border-gray-300 rounded px-1 text-center w-32"
                    />
                </div>
                <div className="flex-1 p-1 flex flex-col items-center justify-center">
                    <span className="text-[8px] uppercase text-gray-400 block leading-tight">Completó</span>
                    {
                        formState.isCompleted 
                            ? (
                                <input 
                                    id="finished"
                                    name="finished"
                                    onChange={ handleInputChange }
                                    type="date" 
                                    placeholder="Fecha de finalizado"
                                    value={ form.finished ? getCurrentDate(form.finished) : undefined }
                                    className="border border-gray-300 rounded px-1 text-center w-32"
                                />
                            )
                            : (
                                <p>&nbsp;</p>
                            )
                    }
                </div>
            </div>

            {
                formState.isEditing && (
                    <div className="absolute right-2 top-2">
                        <label 
                            htmlFor="submit"
                            className="cursor-pointer hover:text-teal-500"
                        >
                            <IoIosSave size={20} />
                        </label>
                        <input
                            className="cursor-pointer tm-edit-button w-0 h-0"
                            type="submit"
                            name="submit"
                            id="submit" 
                            value="&nbsp;"
                        />
                            
                        <button
                            className="cursor-pointer mt-2 hover:text-red-400"
                            onClick={ () => setFormState( prev => ({ ...prev, isEditing: false })) } 
                        >
                            <IoClose size={20} />
                        </button>
                    </div>
                )
            }

            {
                isPending && (
                    <div
                        className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-white opacity-70"
                    >

                    </div>
                )
            }

        </form>
    )
}
