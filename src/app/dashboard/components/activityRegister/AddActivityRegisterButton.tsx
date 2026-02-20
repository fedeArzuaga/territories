"use client"

import { Button } from "@/components/ui/Button/Button"
import { Modal } from "@/components/ui/Modal/Modal"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import { AddActivityRegisterForm } from "./AddActivityRegisterForm"

export const AddActivityRegisterButton = () => {

    const [isModalOpen, setIsModalOpen] = useState( false )

    return (
        <div className="flex justify-between mb-6">
            <Button
                icon={ <FaPlus size={20} /> }
                label="Agregar registro de actividad"
                style="primary"
                customClasses="px-6"
                onClickHandler={ () => setIsModalOpen( true )  }
            />

            {
                isModalOpen && (
                    <Modal
                        isOpen={ isModalOpen }
                        onClose={ () => setIsModalOpen( false ) }
                    >
                        <AddActivityRegisterForm />
                    </Modal>
                )
            }

        </div>
    )
}
