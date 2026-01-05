'use client'

import { ChangeEvent, useState } from "react";
import { IoIosSave } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";

export const EditTerritoryForm = () => {

    const [form, setForm] = useState({
        state: 'Pendiente',
        leader: '',
        startDate: '',
        endDate: '',
        notes: ''
    })

    const { 
        state, 
        leader, 
        startDate, 
        endDate, 
        notes 
    } = form

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement> ) => {
        setForm( prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    // Lógica de validación de fechas
    const isDateError = startDate && endDate && (new Date(startDate) > new Date(endDate)) || false;

    return (
        <form className="space-y-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Estado: Dropdown */}
                <div className="flex flex-col">
                    <label className=" font-bold mb-2">Estado: *</label>
                    <select
                        value={ state }
                        onChange={ handleInputChange }
                        name="state"
                        className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none h-10"
                        required
                    >
                        <option value="">Seleccione estado</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En progreso">En progreso</option>
                        <option value="Completado">Completado</option>
                    </select>
                </div>

                {/* Último Conductor */}
                <div className="flex flex-col">
                    <label className=" font-bold mb-2">Último conductor: *</label>
                    <input
                        type="text"
                        name="leader"
                        value={ leader }
                        onChange={ handleInputChange }
                        className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none h-10"
                        required
                    />
                </div>

                {/* Fechas Dinámicas */}
                {state !== "Pendiente" && state !== "" && (
                    <>
                        <div className="flex flex-col">
                            <label className=" font-bold mb-2">Se comenzó el: *</label>
                            <input
                                type="date"
                                name="startDate"
                                value={ startDate }
                                onChange={ handleInputChange }
                                className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none h-10"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className=" font-bold mb-2">Se finalizó el: *</label>
                            <input
                                type="date"
                                name="endDate"
                                value={ endDate }
                                onChange={ handleInputChange }
                                disabled={ state  === "En progreso" }
                                className={`w-full p-2 rounded-md focus:ring-2 focus:ring-teal-500 outline-none h-10 ${
                                    state === "En progreso" ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-black border"
                                }`}
                                required={ state === "Completado" }
                            />
                            {isDateError && (
                                <span className="text-red-500 text-xs mt-1 font-bold">
                                    La fecha de inicio no puede ser mayor a la de fin.
                                </span>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Notas: Full Width */}
            <div className="flex flex-col w-full">
                <label className=" font-bold mb-2">Notas:</label>
                <textarea
                    name="notes"
                    value={ notes }
                    onChange={ handleInputChange }
                    rows={4}
                    placeholder="Escriba observaciones adicionales aquí..."
                    className="w-full p-3 border rounded-md bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none"
                ></textarea>
            </div>

            <div className="flex items-start bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-950" role="alert">
                <div className="mr-2 mt-1">
                    <FaInfoCircle size={ 20 } />
                </div>
                <div>
                    <span className="font-bold">A tener en cuenta:</span> Si bien las notas son opcionales, es una excelente manera de dejar registro de pequeños detalles que seguramente sean útiles en un futuro. Si usted es el próximo conductor, use este campo como un recordatorio personal de cualquier detalle importante que le gustaría tener en cuenta a la hora de conducir el grupo. Si es un grupo compartido y otro hermano será el próximo conductor, haga lo mismo con el próximo hermano. Sea lo más detallista posible con sus notas, a fin de que se pueda trabajar el territorio de la mejor manera posible <a className="link" href="https://wol.jw.org/es/wol/l/r4/lp-s?q=Mateo+7%3A12" target="_blank">(Mateo 7:12)</a> 
                </div>
            </div>

            {/* Botón de Acción */}
            <div className="pt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={isDateError}
                    className={`px-8 py-3 rounded-lg font-bold text-white transition-all ${
                        isDateError ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
                    }`}
                >
                    <div className="flex items-center justify-center">
                        <IoIosSave size={ 25 } className="mr-2" /> Actualizar Territorio
                    </div>
                </button>
            </div>
        </form>
    )
}
