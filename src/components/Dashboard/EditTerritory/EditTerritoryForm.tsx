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
    const squaresState = squares.map( square => ({ square: square.squareNumber ,state: square.state }) )

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
                        Territorio N° {id} -&nbsp; 
                        <Badge 
                            type={form.state === "Pendiente" ? "danger" : form.state === "En progreso" ? "warning" : "success"} 
                            text={form.state} 
                        />
                    </h2>
                </div>
                <div className="mt-4 md:mt-0">
                    <CancelTerritoryEditionButton />
                </div>
            </div>

            <Widget title="Información del Territorio" type="default">
                <div className="w-full">
                    <form className="space-y-8 w-full mt-8">
                        
                        {/* SECTION 1: ASSIGNMENT DETAILS (Leader and Dates) */}
                        <div>
                            <div className="border-b border-gray-100 pb-2 mb-4">
                                <label className="font-bold text-gray-700">
                                    Asignación general:
                                </label>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col">
                                    <label className="font-bold mb-2 text-sm text-gray-600">Último conductor: *</label>
                                    <input
                                        type="text"
                                        name="leader"
                                        value={leader}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none h-11 transition-all"
                                        required
                                    />
                                </div>

                                {state !== "Pendiente" && (
                                    <>
                                        <div className="flex flex-col">
                                            <label className="font-bold mb-2 text-sm text-gray-600">Fecha de inicio: *</label>
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={startDate}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none h-11"
                                                required
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="font-bold mb-2 text-sm text-gray-600">Fecha de fin: *</label>
                                            <input
                                                type="date"
                                                name="endDate"
                                                value={endDate}
                                                onChange={handleInputChange}
                                                disabled={state === "En progreso"}
                                                className={`w-full p-2 rounded-md h-11 focus:ring-2 focus:ring-teal-500 outline-none transition-all ${
                                                    state === "En progreso" ? "bg-gray-100 text-gray-400 cursor-not-allowed border-transparent" : "bg-white text-black border"
                                                }`}
                                                required={state === "Completado"}
                                            />
                                            {isDateError && (
                                                <span className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-wider italic">
                                                    La fecha de inicio no puede ser posterior a la de conclusión.
                                                </span>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* SECTION 2: PROGRESS BY SQUARE (Full Width for easier reading) */}
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2 border-b border-gray-100 pb-2">
                                <label className="font-bold text-gray-700">
                                    {squareStates.length > 1 ? "Estado de las manzanas: *" : "Estado de la manzana: *"}
                                </label>
                                <div className="text-sm p-0 xl:px-3 xl:py-1 rounded-full text-gray-900 font-medium">
                                    <EditTerritoryReferenceImage territoryID={Number(id)} />
                                </div>
                            </div>
                            
                            <div className={`grid grid-cols-1 ${ squareStates.length > 1 && 'xl:grid-cols-2' } gap-4`}>
                                {squareStates.map(({ square, state }) => (
                                    <div key={square} className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center p-4 border rounded-xl bg-white shadow-sm transition-colors">
                                        <span className="font-bold text-gray-800">Manzana {square}</span>
                                        <div className="grid grid-cols-3 gap-2 shrink-0">
                                            <Button
                                                type="button"
                                                onClickHandler={() => handleSquareStatusChange(square, "Pendiente")}
                                                cssClasses={`py-2 px-3 text-xs min-w-[90px] ${state !== "Pendiente" ? 'bg-gray-100 text-gray-400 grayscale' : 'bg-red-400 text-white'}`}
                                                label={"Pendiente"}
                                                style="danger"
                                            />
                                            <Button
                                                type="button"
                                                onClickHandler={() => handleSquareStatusChange(square, "En progreso")}
                                                cssClasses={`py-2 px-3 text-xs min-w-[90px] ${state !== "En progreso" ? 'bg-gray-100 text-gray-400 grayscale' : 'bg-orange-400 text-white'}`}
                                                label={"En progreso"}
                                                style="warning"
                                            />
                                            <Button
                                                type="button"
                                                onClickHandler={() => handleSquareStatusChange(square, "Completado")}
                                                cssClasses={`py-2 px-3 text-xs min-w-[90px] ${state !== "Completado" ? 'bg-gray-100 text-gray-400 grayscale' : 'bg-green-600 text-white'}`}
                                                label={"Completado"}
                                                style="success"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 3: NOTES & FOOTER */}
                        <div className="space-y-6">
                            <div className="flex flex-col w-full">
                                <label className="font-bold mb-2 text-gray-700">Notas de la última salida:</label>
                                <textarea
                                    name="notes"
                                    rows={4}
                                    value={notes}
                                    onChange={handleInputChange}
                                    placeholder="Enter territory notes..."
                                    className="w-full p-4 border rounded-xl bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none shadow-sm transition-all"
                                ></textarea>
                            </div>

                            <div className="bg-blue-50 border-l-4 border-blue-900 p-5 rounded-r-xl flex gap-4 text-sm text-blue-900 shadow-sm">
                                <FaInfoCircle size={22} className="shrink-0 text-blue-900" />
                                <div className="leading-relaxed">
                                    <span className="font-bold text-blue-900">Conductor:</span> Si bien las notas son opcionales, son un excelente punto de partida. Sea lo más detallista posible para que el territorio se trabaje de la mejor manera <a className="underline font-bold hover:text-blue-900" href="https://wol.jw.org/es/wol/l/r4/lp-s?q=Mateo+7%3A12" target="_blank">(Mateo 7:12)</a>.
                                </div>
                            </div>

                            <div className="pt-6 flex justify-end border-t border-gray-100">
                                <button
                                    type="submit"
                                    disabled={isDateError || state === ""}
                                    className={`px-10 py-4 rounded-xl font-bold text-white transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 ${
                                        (isDateError || state === "") ? "bg-gray-300 cursor-not-allowed shadow-none" : "bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-100"
                                    }`}
                                >
                                    <div className="flex items-center justify-center">
                                        <IoIosSave size={25} className="mr-2" /> Actualizar Territorio
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Widget>
        </>
    );
};