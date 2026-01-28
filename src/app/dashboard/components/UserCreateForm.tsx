'use client'

import { AnimatedCheckmark } from "@/components/ui/CheckMark/CheckMark"
import { Modal } from "@/components/ui/Modal/Modal"
import { Spinner } from "@/components/ui/Spinner/Spinner"
import { useCreateUserForm } from "@/hooks/useCreateUserForm"
import Link from "next/link"
import { useState } from "react"
import { FaMapMarkedAlt } from "react-icons/fa"
import { IoIosSave } from "react-icons/io"

export const UserCreateForm = () => {

    const [ isModalOpen, setIsModalOpen ] = useState( false )
    const { form, errors, isCreatingUser, handleInputChange, handleSubmit } = useCreateUserForm( setIsModalOpen )

    return (
        <>
            <form 
                className="space-y-6"
                onSubmit={ handleSubmit }
            >
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="mb-0">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nombre completo</label>
                            <input
                                type="text"
                                name="fullName"
                                value={ form.fullName }
                                onChange={ handleInputChange }
                                autoComplete="full-name"
                                placeholder="Ej: Marcos Silva"
                                className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>
                        {
                            errors.fullName && (
                                <div className="mt-1">
                                    <p className="m-0 text-red-500 text-sm">
                                        { errors.fullName }
                                    </p>
                                </div>
                            )
                        }
                    </div>
                    <div className="mb-0">
                        <div>
                            <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={ form.email }
                                onChange={ handleInputChange }
                                autoComplete="email"
                                placeholder="Ej: msilva@hotmail.com"
                                className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>
                        {
                            errors.email && (
                                <div className="mt-1">
                                    <p className="m-0 text-red-500 text-sm">
                                        { errors.email }
                                    </p>
                                </div>
                            )
                        }
                    </div>
                    <div className="mb-0">
                        <div>
                            <label className="block text-sm font-medium mb-2">Rol del usuario</label>
                            <select
                                name="role"
                                value={ form.role }
                                onChange={ handleInputChange }
                                className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="">- Seleccione un rol -</option>
                                <option value="ADMIN">Administrador</option>
                                <option value="LEADER">Conductor</option>
                                <option value="USER">Usuario</option>
                            </select>
                        </div>
                        {
                            errors.role && (
                                <div className="mt-1">
                                    <p className="m-0 text-red-500 text-sm">
                                        { errors.role }
                                    </p>
                                </div>
                            )
                        }
                    </div>
                    <div className="mb-0">
                        <div>
                            <label className="block text-sm font-medium mb-2">Teléfono:</label>
                            <input
                                type="text"
                                name="phone"
                                value={ form.phone }
                                onChange={ handleInputChange }
                                autoComplete="phone"
                                placeholder="Ej: 091523869"
                                className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>
                        {
                            errors.phone && (
                                <div className="mt-1">
                                    <p className="m-0 text-red-500 text-sm">
                                        { errors.phone }
                                    </p>
                                </div>
                            )
                        }
                    </div>
                    <div className="mb-0">
                        <div>
                            <label className="block text-sm font-medium mb-2">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                value={ form.password }
                                onChange={ handleInputChange }
                                autoComplete="new-password"
                                placeholder="••••••••"
                                className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>
                        {
                            errors.password && (
                                <div className="mt-1">
                                    <p className="m-0 text-red-500 text-sm">
                                        { errors.password }
                                    </p>
                                </div>
                            )
                        }
                    </div>
                    <div className="mb-0">
                        <div>
                            <label className="block text-sm font-medium mb-2">Confirmar contraseña</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={ form.confirmPassword }
                                onChange={ handleInputChange }
                                autoComplete="confirm-password"
                                placeholder="••••••••"
                                className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>
                        {
                            errors.confirmPassword && (
                                <div className="mt-1">
                                    <p className="m-0 text-red-500 text-sm">
                                        { errors.confirmPassword }
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="pt-2 mt-4">
                    <button
                        type="submit"
                        className="bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors cursor-pointer flex items-center"
                    >
                        {
                            isCreatingUser
                                ? (
                                    <>
                                        <Spinner /> Creando usuario...
                                    </>
                                ) 
                                : (
                                    <>
                                        <IoIosSave size={ 30 } className="mr-2" /> Crear nuevo usuario
                                    </>
                                )
                        }
                        
                    </button>
                </div>
            </form>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                maxWidth="max-w-[600px]"
            >
                <div className="text-center">
                    <AnimatedCheckmark trigger={ isModalOpen } />
                    <h2 className="text-4xl font-bold mb-4">Nuevo usuario creado</h2>
                    <p className="text-lg">El usuario ha sido creado correctamente.</p>
                </div>
            </Modal>
        </>
    )
}
