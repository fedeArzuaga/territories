import { isValidEmail } from "@/helpers/isValidEmail"
import { revalidateMyPath } from "@/lib/services/revalidateMyPath"
import { useState, ChangeEvent, FormEvent, useTransition } from "react"

export const useCreateUserForm = ( openModal: ( state:boolean ) => void ) => {
    
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: ''
    })
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: ''
    })
    const [isCreatingUser, startTransition] = useTransition()

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement|HTMLSelectElement> ) => {
        setForm( prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
        setErrors(({
            ...errors,
            [event.target.name]: ''
        }))
    }

    const handleSubmit = async ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault()

        if ( !form.fullName.includes(" ") ) {
            setErrors({
                ...errors,
                fullName: 'El nombre debe ser completo, tanto nombre como apellido (Ej: Juan Pérez)'
            })
            return
        }
        
        if ( !isValidEmail(form.email) ) {
            setErrors({
                ...errors,
                email: 'Introduzca un correo electrónico válido'
            })
            return
        }

        if ( !form.role ) {
            setErrors({
                ...errors,
                role: 'Debe seleccionar un rol de usuario'
            })
            return
        }

        if ( form.phone.length !== 9 ) {
            setErrors({
                ...errors,
                phone: 'El número de teléfono debe ser un formato de celular de uruguay (9 caracteres, formato: 09XXXXXXX)'
            })
            return
        }

        if ( form.password.length < 8 ) {
            setErrors({
                ...errors,
                password: 'La contraseña debe tener al menos 8 caracteres'
            })
            return
        }

        if ( form.password !== form.confirmPassword ) {
            setErrors({
                ...errors,
                confirmPassword: 'Las contraseñas no coinciden. Por favor, inténtelo de nuevo'
            })
            return
        }

        try {
            startTransition( async () => {
                await fetch('/api/user/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...form})
                })
                await revalidateMyPath('/dashboard/create-user')
                openModal( true )
            })
        } catch ( error ) {
            throw new Error('Algo salió mal')
        }

    }

    return {
        form,
        errors,
        isCreatingUser,
        handleInputChange,
        handleSubmit
    }
}
