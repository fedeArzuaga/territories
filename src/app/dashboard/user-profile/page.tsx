"use client";

import { MouseEvent, useRef, useState } from "react";
import { Widget } from "@/components/Widget/Widget";
import { IoCameraOutline } from "react-icons/io5";
import Image from "next/image";
import { FaEye } from "react-icons/fa";

export default function UserProfilePage() {
    // Estado local para los campos editables
    const [userData, setUserData] = useState({
        name: "Fernando Llambías", // No editable según requerimiento, solo lectura
        email: "ferllambis@egmail.com",
        role: "Administrador", // Solo lectura
        profileImage: "https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg",
    });

    return (
        <div className="mx-auto">
            <h1 className="text-5xl font-bold mb-8">Mi Perfil</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Visual information */}
                <div className="lg:col-span-1">
                    <Widget title="Usuario" type="primary">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative group">
                                <Image
                                    src={userData.profileImage}
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                                <label className="absolute bottom-0 w-10 h-10 right-0 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors flex justify-center items-center">
                                    <span className="text-white text-xs">
                                        <IoCameraOutline className="text-teal-500" size={25} />
                                    </span>
                                    <input type="file" className="hidden" />
                                </label>
                            </div>
                            <h2 className="mt-4 text-xl font-bold">{userData.name}</h2>
                            <p className="text-sm opacity-90">{userData.role}</p>
                        </div>
                    </Widget>
                </div>

                {/* Edit user data */}
                <div className="lg:col-span-3">
                    <Widget title="Editar Información" type="default">
                        <form className="space-y-6">
                            {/* Campo Email */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
                                <input
                                    type="email"
                                    defaultValue={userData.email}
                                    className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <hr className="my-4" />

                            {/* Cambio de Contraseña */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Cambiar Contraseña</h3>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nueva Contraseña</label>
                                    <div className="relative">
                                        <input
                                            type="passowrd"
                                            name="password"
                                            placeholder="••••••••"
                                            autoComplete="true"
                                            className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Confirmar Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        autoComplete="true"
                                        className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="bg-teal-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-700 transition-colors cursor-pointer"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>

            </div>
        </div>
    );
}