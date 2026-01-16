"use client";

import { useState } from "react";
import { Widget } from "@/components/Widget/Widget";
import { FiLogIn } from "react-icons/fi";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Auth logic here
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        })
        
        if ( result?.ok ) redirect('/map');
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
                                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
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
                                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
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
                </Widget>
            </div>
        </div>
    );
}