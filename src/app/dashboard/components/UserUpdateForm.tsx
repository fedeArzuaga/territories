'use client'

import { isValidEmail } from '@/helpers/isValidEmail';
import { useUpdateUserForm } from '@/hooks/useUpdateUserForm';
import { ChangeEvent, FormEvent, useState } from 'react'
import { IoIosSave } from 'react-icons/io';

interface Props {
    email: string,
    id: string
}

export const UserUpdateForm = ({ email, id }: Props) => {

    const { formData, error, handleInputChange, handleSubmit } = useUpdateUserForm({
        email: email,
        password: '',
        confirmPassword: ''
    }, id)

    return (
        <form 
            className="space-y-6"
            onSubmit={ handleSubmit }
        >
            {/* Campo Email */}
            <div className="mb-0">
                <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
                <input
                    type="email"
                    name="email"
                    value={ formData.email }
                    onChange={ handleInputChange }
                    className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            {
                error.email.message && (
                    <div className="mt-1">
                        <p className="m-0 text-red-500 text-sm">
                            { error.email.message }
                        </p>
                    </div>
                )
            }

            <hr className="my-4" />

            {/* Cambio de Contraseña */}
            <div className="space-y-4 mb-0">
                <h3 className="font-semibold text-lg">Cambiar Contraseña</h3>
                <div className="mb-0">
                    <label className="block text-sm font-medium mb-1">Nueva Contraseña</label>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            min={8}
                            autoComplete="true"
                            value={ formData.password }
                            onChange={ handleInputChange }
                            className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>
                {
                    error.password.message && (
                        <div className="mt-1">
                            <p className="m-0 text-red-500 text-sm">
                                { error.password.message }
                            </p>
                        </div>
                    )
                }
                <div>
                    <label className="block text-sm font-medium mt-4 mb-1">Confirmar Nueva Contraseña</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="••••••••"
                        min={8}
                        autoComplete="true"
                        value={ formData.confirmPassword }
                        onChange={ handleInputChange }
                        className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>
            {
                error.confirmPassword.message && (
                    <div className="mt-1">
                        <p className="m-0 text-red-500 text-sm">
                            { error.confirmPassword.message }
                        </p>
                    </div>
                )
            }

            <div className="pt-2 mt-4">
                <button
                    type="submit"
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-700 transition-colors cursor-pointer flex"
                >
                    <IoIosSave size={ 25 } className="mr-2" /> Guardar Cambios
                </button>
            </div>
        </form>
    )
}
