'use client'

import { ChangeEvent, useEffect, useState } from "react";
import { IoIosSave } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/Button/Button";

import { squaresData, territoriesData } from "@/data/polygons"; 
import { redirect, useParams } from "next/navigation";
import { CancelTerritoryEditionButton } from "./CancelTerritoryEditionButton";
import { Widget } from "@/components/Widget/Widget";
import { Badge } from "@/components/ui/Badge/Badge";

import { EditTerritoryReferenceImage } from "@/app/dashboard/components/EditTerritoryReferenceImage";

export const EditTerritoryForm = () => {

    const { id } = useParams() || 1

    if ( !id && isNaN(Number(id)) ) {
        redirect('/dashboard/territories')
    }

    const data = territoriesData[Number(id)];
    const squares = data.squareIds.map( squareId => squaresData[squareId] )
    const squaresState = squares.map( square => ({ square: square.square ,state: square.state }) )

    const [squareStates, setSquareStates] = useState( squaresState )

    const [form, setForm] = useState({
        state: data?.territoryState || 'Pendiente',
        leader: data?.lastLeader || '',
        startDate: data?.started || '',
        endDate: data?.finished || '',
        notes: data?.notes || ''
    });

    const { 
        state, 
        leader, 
        startDate, 
        endDate, 
        notes 
    } = form;

    console.log(form)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const handleStatusChange = (newStatus: string) => {
        setForm(prev => ({
            ...prev,
            state: newStatus,
            // Requirements: Clear dates based on behavior
            startDate: newStatus === 'Pendiente' ? '' : prev.startDate,
            endDate: (newStatus === 'Pendiente' || newStatus === 'En progreso') ? '' : prev.endDate
        }));
    };

    const handleSquareStatusChange = ( square: number, newStatus: string ) => {
        setSquareStates( prev => 
            prev.map(item => 
                item.square === square 
                    ? { ...item, state: newStatus } 
                    : item
            )
        );
    }

    useEffect(() => {
        if ( squareStates.every( square => square.state === "Pendiente" ) ) {
            handleStatusChange("Pendiente")
        } else if ( squareStates.every( square => square.state === "Completado" ) ) {
            handleStatusChange("Completado")
        } else {
            handleStatusChange("En progreso")
        }
    }, [squareStates])

    const isDateError = startDate && endDate && (new Date(startDate) > new Date(endDate)) || false;

    return (
        <>
            <div className="mb-8 mt-8 flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                        Territorio N° { id } -&nbsp; 
                        <Badge 
                            type={ 
                                form.state === "Pendiente" 
                                    ? "danger" : 
                                    form.state === "En progreso" 
                                    ? "warning" : 
                                    "success" 
                            } 
                            text={ form.state } 
                        />
                    </h2>
                </div>
                <div className="mt-4 md:mt-0">
                    <CancelTerritoryEditionButton />
                </div>
            </div>

            <Widget title="Información del Territorio" type="default">
                <div className="w-full">
                    <form className="space-y-6 w-full mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Status Selection Buttons */}
                            <div className="flex flex-col col-span-2 xl:col-span-1">
                                <label className="font-bold mb-2">
                                    { squareStates.length > 1 ? "Estado de las manzanas: *" : "Estado de la manzana: *" }
                                </label>
                                <div className="flex flex-col gap-4">
                                    {
                                        squareStates.map( ({ square, state }) => (
                                            <div key={ square } className="flex flex-col xl:flex-row justify-between items-center">
                                                <div className="font-bold mb-1">
                                                    Manzana N° { square }
                                                </div>
                                                <div className="grid grid-cols-3 gap-4 w-full xl:w-auto">
                                                    <Button
                                                        type="button"
                                                        onClickHandler={() => handleSquareStatusChange(square, "Pendiente")}
                                                        cssClasses={`${ state !== "Pendiente" ? 'bg-gray-200 text-gray-800' : '' }`}
                                                        label={"Pendiente"}
                                                        style="danger"
                                                    />
                                                    <Button
                                                        type="button"
                                                        onClickHandler={() => handleSquareStatusChange(square, "En progreso")}
                                                        cssClasses={`${ state !== "En progreso" ? 'bg-gray-200 text-gray-800' : '' }`}
                                                        label={"En progreso"}
                                                        style="warning"
                                                    />
                                                    <Button
                                                        type="button"
                                                        onClickHandler={() => handleSquareStatusChange(square, "Completado")}
                                                        cssClasses={`${ state !== "Completado" ? 'bg-gray-200 text-gray-800' : '' }`}
                                                        label={"Completado"}
                                                        style="success"
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* Leader/Conductor Input */}
                            <div className="flex flex-col col-span-2 xl:col-span-1">
                                <label className="font-bold mb-2">Último conductor: *</label>
                                <input
                                    type="text"
                                    name="leader"
                                    value={leader}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none h-10"
                                    required
                                />
                            </div>

                            <EditTerritoryReferenceImage territoryID={Number(id)} />

                            {/* Date Logic */}
                            {state !== "Pendiente" && (
                                <>
                                    <div className="flex flex-col col-span-2 xl:col-span-1">
                                        <label className="font-bold mb-2">Se comenzó el: *</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={startDate}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none h-10"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col col-span-2 xl:col-span-1">
                                        <label className="font-bold mb-2">Se finalizó el: *</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={endDate}
                                            onChange={handleInputChange}
                                            disabled={state === "En progreso"}
                                            className={`w-full p-2 rounded-md h-10 focus:ring-2 focus:ring-teal-500 outline-none ${
                                                state === "En progreso" ? "bg-gray-100 text-gray-400 cursor-not-allowed border-none" : "bg-white text-black border"
                                            }`}
                                            required={state === "Completado"}
                                        />
                                        {isDateError && (
                                            <span className="text-red-500 text-xs mt-1 font-bold italic">
                                                La fecha de inicio no puede ser establecida luego de la fecha de conclusión.
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="font-bold mb-2">Notes:</label>
                            <textarea
                                name="notes"
                                rows={4}
                                value={notes}
                                onChange={handleInputChange}
                                placeholder="Enter territory notes..."
                                className="w-full p-3 border rounded-md bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none"
                            ></textarea>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 flex gap-3 text-sm text-blue-800">
                            <FaInfoCircle size={20} className="shrink-0" />
                            <div>
                                <span className="font-bold">Conductor:</span> Si bien las notas son opcionales, son un excelente punto de partida para la próxima salida desde el mismo territorio. Si usted será el siguiente conductor, puede usar este espacio como un recordatorio de lo que le gustaría tener presente. Si es otro hermano el que conducirá el grupo, sea lo más detallista posible para que el territorio se trabaje de la mejor manera posible <a className="underline font-bold" href="https://wol.jw.org/es/wol/l/r4/lp-s?q=Mateo+7%3A12" target="_blank">(Mateo 7:12)</a>.
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isDateError || state === ""}
                                className={`px-8 py-3 rounded-lg font-bold text-white transition-all transform active:scale-95 ${
                                    (isDateError || state === "") ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 shadow-md"
                                }`}
                            >
                                <div className="flex items-center justify-center">
                                    <IoIosSave size={25} className="mr-2" /> Actualizar Territorio
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </Widget>
        </>
    );
};