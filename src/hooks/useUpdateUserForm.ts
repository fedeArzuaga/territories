'use client'

import { isValidEmail } from '@/helpers/isValidEmail';
import { ChangeEvent, FormEvent, useState } from 'react'

interface InitialState {
    email: string,
    password: string,
    confirmPassword: string
}

interface Props {
    initialState: InitialState,
    id: string
}

const initialErrorState = {
    email: { message: '' },
    password: { message: '' },
    confirmPassword: { message: '' }
}

export const useUpdateUserForm = ( initialState: InitialState, id: string, openModal: ( state:boolean ) => void ) => {

    const [formData, setFormData] = useState( initialState );
    const [error, setError] = useState( initialErrorState )

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        event.preventDefault()
        setFormData( prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
        setError( initialErrorState )
    }

    const handleSubmit = async ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
        
        // Check if it's a valid email address
        if ( !isValidEmail( formData.email ) ) {
            setError( prev => ({
                ...prev,
                email: { message: 'Introduzca un correo electrónico válido' }
            }))
            return
        }

        // Check if the password is more than 8 characteres long
        if ( formData.password.length <= 8 ) {
            setError( prev => ({
                ...prev,
                password: { message: 'La contraseña debe tener más de 8 caracteres' }
            }))
            return
        }

        // Check if both passwords match
        if ( formData.password !== formData.confirmPassword ) {
            setError( prev => ({
                ...prev,
                confirmPassword: { message: 'Las contraseñas no coinciden' }
            }))
            return
        }

        const newUserData = {
            email: formData.email,
            password: formData.password
        }

        await fetch(`/api/user/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( newUserData )
        })
        openModal(true)

    }

    return {
        formData,
        error,
        handleInputChange,
        handleSubmit
    }

}
