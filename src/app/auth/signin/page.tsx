"use client";

import { useEffect, useState } from "react";
import { Widget } from "@/components/Widget/Widget";
import { FiLogIn } from "react-icons/fi";
import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { getUserByActiveSession } from "@/lib/services/getUserByActiveSession";
import { useRouter } from "next/navigation";

interface LoginForm {
    email: string;
    password: string;
}

export default function LoginPage() {

    const [loginForm, setLoginForm] = useState<LoginForm>({ 
        email: '', 
        password: ''
    });
    const { email, password } = loginForm;
    const [error, setError] = useState('')
    const router = useRouter()

    const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
        setError('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Auth logic here
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            })
            
            if ( result?.ok ) router.push('/map');

            if ( !result?.ok && result?.status === 401 ) {
                setError('Las credenciales no son válidas. Inténtelo nuevamente.')
            }
            
        } catch ( error ) {
            console.log( error )
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Territorio<br />Los Bulevares</h1>
                    <p className="text-gray-500 mt-2 font-medium">Gestión centralizada de territorios</p>
                </div>

                <Widget title="Iniciar Sesión" type="default">
                    <form onSubmit={handleSubmit} className="space-y-6 py-2">
                        {/* Campo Email */}
                        <div className="flex flex-col">
                            <label className="font-bold mb-2 text-sm text-gray-700">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={ handleInputChange }
                                autoComplete="email"
                                placeholder="ejemplo@correo.com"
                                className="w-full p-3 border rounded-md bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none transition-all h-11"
                                required
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div className="flex flex-col">
                            <label className="font-bold mb-2 text-sm text-gray-700">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={ handleInputChange }
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="w-full p-3 border rounded-md bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none transition-all h-11"
                                required
                            />
                        </div>

                        {/* Botón de Envío */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center shadow-md"
                            >
                                Iniciar Sesión
                                <FiLogIn size={25} className="ml-2" />
                            </button>
                        </div>
                    </form>
                    {
                        error && (
                            <div
                                className="rounded-md border border-red-300 bg-red-100 text-red-700 py-2 px-3 text-sm mt-4"
                            >
                                { error }
                            </div>
                        )
                    }
                </Widget>
            </div>
        </div>
    );
}