"use client"

import { ChangeEvent, FormEvent, useState, useTransition } from "react"
import { BiSolidEdit } from "react-icons/bi";
import { IoIosSave } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";

import { Modal } from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/Button";

import { formatToLocalDateString } from "@/helpers/formatToLocalDateString"
import { getCurrentDate } from "@/helpers/getCurrentDate"
import { updateRegister } from "@/lib/services/updateRegister";
import { deleteRegister } from "@/lib/services/deleteRegister";

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

export const ActivityRegisterCell = ({ activityRegister }: Props) => {

    const {
        id,
        lastLeaderName,
        started,
        finished,
        territoryId
    } = activityRegister

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

    const handleDeleteRegister = async () => {
        if ( id ) {
            startTransition( async () => {
                await deleteRegister( id )
            })
        }
    }

    const handleSubmit = async ( event: FormEvent<HTMLFormElement>) => {
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
        <>
            <td className="border border-gray-300 p-0 relative align-top" colSpan={1}>
                <div className="flex flex-col h-full min-w-75 w-full">

                    {
                        !formState.isEditing && (
                            <div className="absolute right-2 top-2">
                                <button
                                    className="cursor-pointer tm-edit-button hover:text-teal-500"
                                    onClick={ () => setFormState( prev => ({ ...prev, isEditing: true })) } 
                                >
                                    <BiSolidEdit size={20} />
                                </button>
                                <button
                                    className="cursor-pointer tm-edit-button mt-2 hover:text-red-400"
                                    onClick={ () => setFormState( prev => ({ ...prev, isModalOpen: true })) } 
                                >
                                    <IoTrashOutline size={20} />
                                </button>
                            </div>
                        )
                    }

                    {
                        formState.isEditing
                            ? (
                                <>
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

                                    </form>
                                </>
                            ) : (
                                <>
                                    <div className="p-2 border-b border-gray-200 font-bold text-gray-800 text-center min-h-16.25 flex items-center justify-center bg-white">
                                        { lastLeaderName }
                                    </div>
                                    
                                    <div className="flex flex-1 text-md font-bold text-gray-500">
                                        <div className="flex-1 border-r border-gray-200 p-1 flex flex-col items-center justify-center">
                                            <span className="text-[8px] uppercase text-gray-400 block leading-tight">Asignó</span>
                                            { 
                                                started ? formatToLocalDateString(started) : <p>&nbsp;</p> 
                                            }
                                        </div>
                                        <div className="flex-1 p-1 flex flex-col items-center justify-center">
                                            <span className="text-[8px] uppercase text-gray-400 block leading-tight">Completó</span>
                                            { 
                                                finished ? formatToLocalDateString(finished) : <p>&nbsp;</p> 
                                            }
                                        </div>
                                    </div>
                                </>
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

                    {
                        formState.isModalOpen && (
                            <Modal 
                                isOpen={ formState.isModalOpen } 
                                onClose={() => setFormState( prev => ({ ...prev, isModalOpen: false }) )} 
                                maxWidth="max-w-[500px]"
                            >
                                <div className="text-center p-4">
                                    <h2 className="text-4xl font-bold mb-4">¿Está seguro que desea eliminar el registro?</h2>
                                    <p className="text-lg mt-6">
                                        Esta acción es irreversible. Una vez borrado el registro seleccionado, ya no se podrá recuperar.
                                    </p>
                                    <div
                                        className="flex flex-col md:flex-row justify-center items-center gap-6 mt-6"
                                    >
                                        <Button
                                            label="Cancelar"
                                            style="dark"
                                            customClasses="px-6"
                                            onClickHandler={ () => setFormState( prev => ({ ...prev, isModalOpen: false }) ) }
                                            icon={ <IoClose size={20} /> }
                                        />
                                        <Button
                                            label="Sí, eliminar registro."
                                            style="danger"
                                            customClasses="px-6"
                                            onClickHandler={ () => {
                                                handleDeleteRegister()
                                                setFormState( prev => ({ ...prev, isModalOpen: false }) )
                                            }}
                                            icon={ <IoTrashOutline size={20} /> }
                                        />
                                    </div>
                                </div>
                            </Modal>
                        )
                    }

                </div>
            </td>
        </>
    )
}
