"use client"

import { BiSolidEdit } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";

import { Modal } from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/Button";

import { deleteRegister } from "@/lib/services/deleteRegister";
import { useActivityRegisterForm } from "@/hooks/useActivityRegisterForm";
import { ActivityRegisterForm } from "./ActivityRegisterForm";
import { ActivityRegisterContent } from "./ActivityRegisterContent";

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
        finished
    } = activityRegister

    const { 
        formState,
        setFormState,
        startTransition,
    } = useActivityRegisterForm({ lastLeaderName, started, finished })

    const handleDeleteRegister = async () => {
        if ( id ) {
            startTransition( async () => {
                await deleteRegister( id )
            })
        }
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
                                <ActivityRegisterForm activityRegister={ activityRegister } />
                            ) : (
                                <ActivityRegisterContent activityRegister={ activityRegister } />
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
