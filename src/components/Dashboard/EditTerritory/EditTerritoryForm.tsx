'use client'

import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { IoIosSave } from "react-icons/io";
import Link from "next/link";
import { FaCheckCircle, FaInfoCircle, FaMapMarkedAlt } from "react-icons/fa";

import { Button } from "@/components/ui/Button/Button";
import { CancelTerritoryEditionButton } from "./CancelTerritoryEditionButton";
import { Widget } from "@/components/Widget/Widget";
import { Badge } from "@/components/ui/Badge/Badge";
import { EditTerritoryReferenceImage } from "@/app/dashboard/components/EditTerritoryReferenceImage";
import { TerritoryData, TerritoryDataWithSquaresAndManager } from "@/types/territory";
import { updateTerritory } from "@/lib/services/updateTerritory";
import { Spinner } from "@/components/ui/Spinner/Spinner";
import { getCurrentDate } from "@/helpers/getCurrentDate";
import { hasAdminPriviliges } from "@/helpers/hasAdminPriviliges";
import { LastEditedBy } from "@/app/dashboard/components/territoriyForm/LastEditedBy";
import { TbMapX } from "react-icons/tb";
import { Modal } from "@/components/ui/Modal/Modal";
import { AnimatedCheckmark } from "@/components/ui/CheckMark/CheckMark";
import { revalidateMyPath } from "@/lib/services/revalidateMyPath";

interface Props {
    territory: TerritoryDataWithSquaresAndManager,
    managerId: string,
    role: string
}

export const EditTerritoryForm = ({ territory, managerId, role }: Props) => {

    const {
        id: territoryId,
        territoryState: state,
        lastLeaderName: leaderName,
        notes: territoryNotes,
        squares,
        started: startedDate,
        finished: finishedDate,
        updatedAt,
        manager
    } = territory;

    const squaresState = squares.map( square => ({ square: square.squareNumber ,state: square.state }) )
    const [ squareStates, setSquareStates ] = useState( squaresState )
    const [ category, setCategory ] = useState( territory.category || "Congregación" )
    const [ isModalOpen, setIsModalOpen ] = useState( false )

    const [isPending, startTransition] = useTransition()

    const getCurrentTerritoryState = ( arrayOfSquares: { square: number, state: string }[] ) => {
        if ( arrayOfSquares.every( square => square.state === "Pendiente") ) return "Pendiente"
        if ( arrayOfSquares.every( square => square.state === "Completado") ) return "Completado"
        return "En progreso"
    }

    const [form, setForm] = useState<TerritoryData>({
        id: territoryId,
        territoryState: state ?? getCurrentTerritoryState( squareStates ),
        lastLeaderName: leaderName ?? '',
        started: startedDate ? new Date(getCurrentDate(startedDate)) : null,
        finished: finishedDate ? new Date(getCurrentDate(finishedDate)) : null,
        notes: territoryNotes ?? '',
        managerId: managerId ?? '',
        updatedAt: new Date(updatedAt) ?? new Date().getTime()
    });

    const { id, territoryState, lastLeaderName, started, finished, notes } = form;

    const setAllSquaresAsPending = () => {
        setSquareStates( prev => prev.map( square => ({ ...square, state: "Pendiente" })) )
    }

    const setFinishDateForPersonalTerritory = () => {
        setForm( prev => ({ ...prev, finished: getFinishDate(new Date(started ?? '')) }))
    }

    const getFinishDate = ( customDate:Date = new Date() ) => {
        const date = customDate ? new Date(customDate) : new Date()
        date.setMonth(date.getMonth() + 4)
        return date
    }

    const handleCompletePersonalTerritory = () => {
        const isClosing = territoryState !== "Completado";
        handleStatusChange(isClosing ? "Completado" : "En progreso");
        
        if (isClosing) {
            // Use your helper to ensure consistency across the form
            const today = getCurrentDate(new Date().toISOString());
            setForm(prev => ({ ...prev, finished: today }));
        }
    };

    const handleChangeCategory = ( newCategory: string ) => {
        setCategory(newCategory)
        handleStatusChange( newCategory === "Personal" ? "En progreso" : "Pendiente" )
        if ( newCategory === "Personal" ) {
            setAllSquaresAsPending()
            setFinishDateForPersonalTerritory()
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({
            ...prev,
            [event.target.name]: event.target.name === 'started' || event.target.name === 'finished'
                ? getCurrentDate(event.target.value)
                : event.target.value
        }));
    };

    const handleStatusChange = (newStatus: string) => {
        setForm(prev => ({ ...prev, territoryState: newStatus }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const updatedData = {
            ...form,
            category: category,
            started: started,
            finished: finished,
            managerId: managerId,
            updatedAt: new Date()
        }
        
        startTransition( async () => {
            await updateTerritory({
                data: {
                    ...updatedData,
                    squares: squareStates.map( square => ({
                        id: squares.find( s => s.squareNumber === square.square )?.id || '',
                        squareNumber: square.square,
                        state: square.state,
                        territoryId: territoryId
                    }))
                }
            })
            setIsModalOpen(true)
            revalidateMyPath(`/dashboard/territories/${territoryId}`)
        })
    }

    const handleSquareStatusChange = ( square: number, newStatus: string ) => {
        const updatedSquareStates = squareStates.map(item => item.square === square ? { ...item, state: newStatus } : item);
        setSquareStates( updatedSquareStates );

        // Updating territory state based on the new squares states
        handleStatusChange( getCurrentTerritoryState( updatedSquareStates ) )
    }
    
    const isDateError = started && finished && (new Date(started).getTime() > new Date(finished).getTime()) || false;

    const areNotesRequired = territoryState === "En progreso" || territoryState === "Completado";

    // View for restricted access
    if ( territoryState === "Personal" && role === "LEADER" ) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl text-gray-800 flex items-center gap-3">
                            Territorio N° {id} - <Badge state={ territoryState } />
                        </h2>
                    </div>
                    <CancelTerritoryEditionButton />
                </div>
                <Widget title="Información del Territorio" type="default">
                    <div className="p-10 text-center flex flex-col items-center">
                        <div className="text-9xl p-8 rounded-full mb-10 bg-teal-700 text-white"><TbMapX /></div>
                        <h2 className="text-4xl font-bold mb-6">No tiene permisos suficientes</h2>
                        <p className="text-xl mb-8 max-w-lg">No puede editar territorios personales. Si desea dejar una nota, comuníquese con un administrador.</p>
                        <Button
                            label="Ir a Territorios"
                            action="link"
                            style="primary"
                            icon={ <FaMapMarkedAlt className="mr-2" size={ 25 } /> }
                            href="/dashboard/territories"
                        />
                    </div>
                </Widget>
            </div>
        )
    }

    return (
        <div className="mx-auto mt-12">
            {/* TOP HEADER SECTION */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">
                <div>
                    <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-4">
                        Territorio N° {id} - <Badge state={ territoryState } />
                    </h2>
                </div>
                <div className="flex items-center gap-4">
                    <EditTerritoryReferenceImage territoryID={Number(id)} />
                    <CancelTerritoryEditionButton />
                </div>
            </div>

            <Widget title={`Actualizar territorio (${category})`} type={ category === "Personal" ? "personalTerritory" : "congregationalTerritory" }>
                <form onSubmit={ handleSubmit } className="space-y-12 py-4">

                    {/* SECTION 1: CATEGORY SELECTION (ADMIN) */}
                    {hasAdminPriviliges( role ) && (
                        <div className="bg-gray-50 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h3 className="font-bold text-gray-700">Categoría del Territorio</h3>
                                <p className="text-sm text-gray-500">Determine si se está trabajando el territorio de manera personal o como congregación.</p>
                            </div>
                            <div className="flex items-center bg-gray-200 p-1 rounded-full">
                                <Button 
                                    type="button"
                                    onClickHandler={() => { handleChangeCategory("Congregación"); }}
                                    cssClasses={`py-2 px-6 text-sm !rounded-full font-bold transition-all ${ category === "Congregación" ? "bg-teal-600 text-white shadow-md" : "text-gray-600" }`}
                                    label={"Congregación"}
                                    style={"default"}
                                />
                                <Button 
                                    type="button"
                                    onClickHandler={() => { handleChangeCategory("Personal"); }}
                                    cssClasses={`py-2 px-6 text-sm !rounded-full font-bold transition-all ${ category === "Personal" ? "bg-blue-600 text-white shadow-md" : "text-gray-600" }`}
                                    label={"Personal"}
                                    style={"default"}
                                />
                            </div>
                        </div>
                    )}

                    {/* SECTION 2: ASSIGNMENT CORE INFO */}
                    {hasAdminPriviliges( role ) && (
                        <div className="space-y-6">
                            <label className="font-bold text-gray-700 block mb-6">Asignación general:</label>
                            <div className={`grid grid-cols-1 ${category === "Personal" ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-8`}>
                                <div className="flex flex-col space-y-2">
                                    <label className="font-bold text-sm text-gray-600">{ category === "Personal" ? "Publicador asignado *" : "Último conductor *" }</label>
                                    <input
                                        type="text"
                                        name="lastLeaderName"
                                        value={lastLeaderName as string}
                                        onChange={handleInputChange}
                                        placeholder="Nombre completo"
                                        className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-teal-500 outline-none h-12 transition-all"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="font-bold text-sm text-gray-600">Fecha de inicio *</label>
                                    <input
                                        type="date"
                                        name="started"
                                        value={ started ? getCurrentDate(started) : new Date().toISOString().split('T')[0] }
                                        onChange={handleInputChange}
                                        className={`w-full p-3 rounded-xl h-12 transition-all border ${ 
                                            territoryState === "Pendiente" && category !== "Personal"
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-transparent" 
                                                : "bg-white focus:ring-2 focus:ring-teal-500"
                                        }`}
                                        required={ territoryState !== "Pendiente" }
                                        disabled={ territoryState === "Pendiente" && category !== "Personal" }
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="font-bold text-sm text-gray-600">Fecha de fin *</label>
                                    <input
                                        type="date"
                                        name="finished"
                                        value={ finished ? new Date(finished).toISOString().split('T')[0] : '' }
                                        onChange={handleInputChange}
                                        className={`w-full p-3 rounded-xl h-12 transition-all border ${ 
                                            territoryState === "Pendiente" || territoryState === "En progreso"
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-transparent" 
                                                : "bg-white focus:ring-2 focus:ring-teal-500"
                                        }`}
                                        required={ territoryState === "Completado" }
                                        disabled={ territoryState === "Pendiente" || territoryState === "En progreso" }
                                    />
                                </div>

                                {
                                    category === "Personal" && (
                                        <div className="flex flex-col space-y-2">
                                            <label className="font-bold text-sm text-gray-600">¿Finalizó?</label>
                                            <button
                                                type="button"
                                                onClick={ handleCompletePersonalTerritory }
                                                className={`cursor-pointer h-12 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border-2 ${
                                                    territoryState === "Completado" 
                                                    ? "bg-green-600 border-green-600 text-white shadow-sm" 
                                                    : "bg-white border-blue-500 text-blue-600 hover:border-blue-500 hover:text-blue-600"
                                                }`}
                                            >
                                                {territoryState === "Completado" ? (
                                                    <>
                                                        <FaCheckCircle size={20} />
                                                        Completado
                                                    </>
                                                ) : (
                                                    "Marcar como terminado"
                                                )}
                                            </button>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    )}

                    {isDateError && <p className="text-red-500 text-sm font-bold">- La fecha de inicio no puede ser posterior a la de conclusión.</p>}

                    {/* SECTION 3: PROGRESS TRACKING (SQUARES) */}
                    { category === "Congregación" && hasAdminPriviliges(role) && (
                        <div className="space-y-6">
                            <label className="font-bold text-gray-700 flex items-center gap-2">
                                Estado de las Manzanas:
                            </label>
                            <div className={`grid grid-cols-1 ${ squareStates.length > 1 ? 'xl:grid-cols-2' : '' } gap-4`}>
                                {squareStates.map(({ square, state }) => (
                                    <div key={square} className="flex flex-col sm:flex-row justify-between items-center p-5 border rounded-2xl bg-white shadow-sm gap-4">
                                        <span className="font-bold text-gray-800">Manzana {square}</span>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                onClickHandler={() => handleSquareStatusChange(square, "Pendiente")}
                                                cssClasses={`py-2 px-4 text-xs !rounded-lg font-bold min-w-[100px] ${state === "Pendiente" ? 'bg-red-400 text-white' : 'bg-gray-100 text-gray-400 grayscale'}`}
                                                label="Pendiente"
                                                style="danger"
                                            />
                                            <Button
                                                type="button"
                                                onClickHandler={() => handleSquareStatusChange(square, "En progreso")}
                                                cssClasses={`py-2 px-4 text-xs !rounded-lg font-bold min-w-[100px] ${state === "En progreso" ? 'bg-orange-400 text-white' : 'bg-gray-100 text-gray-400 grayscale'}`}
                                                label="En progreso"
                                                style="warning"
                                            />
                                            <Button
                                                type="button"
                                                onClickHandler={() => handleSquareStatusChange(square, "Completado")}
                                                cssClasses={`py-2 px-4 text-xs !rounded-lg font-bold min-w-[100px] ${state === "Completado" ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400 grayscale'}`}
                                                label="Completado"
                                                style="success"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SECTION 4: NOTES & ALERTS */}
                    <div className="space-y-6">
                        { category === "Personal" ? (
                            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-2xl flex gap-4 text-sm text-blue-900 shadow-sm">
                                <FaInfoCircle size={24} className="shrink-0" />
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Territorio Personal</h4>
                                    <p>Este territorio está categorizado como "Personal", lo que significa que es el hermano asignado quien lleva registro del progreso del mismo. El plázo máximo para un territorio personal es de 4 meses.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-6">
                                <label className="font-bold text-gray-700">Notas de la última salida {areNotesRequired && '*'}</label>
                                <textarea
                                    name="notes"
                                    rows={4}
                                    value={notes ?? ''}
                                    required={areNotesRequired}
                                    onChange={handleInputChange}
                                    placeholder="Escriba aquí los detalles relevantes para el próximo grupo..."
                                    className="w-full p-4 border rounded-2xl bg-white focus:ring-2 focus:ring-teal-500 outline-none shadow-sm transition-all"
                                ></textarea>
                                <div className="bg-blue-50 border-l-4 border-blue-900 p-5 rounded-r-xl flex gap-4 text-sm text-blue-900 shadow-sm">
                                    <FaInfoCircle size={22} className="shrink-0 text-blue-900" />
                                    <div className="leading-relaxed">
                                        <span className="font-bold text-blue-900">Conductor:</span> Las notas son un excelente punto de partida para la próxima salida al servicio del campo. Sea lo más detallista posible para que el territorio se trabaje de la mejor manera <a className="underline font-bold hover:text-blue-900" href="https://wol.jw.org/es/wol/l/r4/lp-s?q=Mateo+7%3A12" target="_blank">(Mateo 7:12)</a>.
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* FORM FOOTER */}
                    <div className="pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6">
                        {manager && (
                            <div className="flex flex-col items-start w-full md:w-auto">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Última edición</p>
                                <LastEditedBy user={ manager } />
                            </div>
                        )}
                        
                        <div className="w-full md:w-auto">
                            <button
                                type="submit"
                                disabled={isDateError || territoryState === "" || isPending}
                                className={`cursor-pointer w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-white transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 ${
                                    (isDateError || territoryState === "") ? "bg-gray-300 cursor-not-allowed shadow-none" : "bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-100"
                                }`}
                            >
                                <div className="flex items-center justify-center">
                                    {
                                        isPending
                                            ? (
                                                <>
                                                    <Spinner /> Actualizando...
                                                </>
                                            ) 
                                            : (
                                                <>
                                                    <IoIosSave size={25} className="mr-2" /> Actualizar Territorio
                                                </>
                                            )
                                    }
                                    
                                </div>
                            </button>
                        </div>
                    </div>

                </form>
            </Widget>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="max-w-[500px]">
                <div className="text-center p-4">
                    <AnimatedCheckmark trigger={ isModalOpen } />
                    <h2 className="text-4xl font-bold mb-4">Territorio Actualizado</h2>
                    <p className="text-lg">El territorio se ha actualizado correctamente.</p>
                    <Link
                        href="/map"
                        className="py-3 px-5 inline-block rounded-lg font-bold cursor-pointer text-white bg-teal-600 hover:bg-teal-700 mt-4"
                    >
                        <div className="flex items-center justify-center">
                            <FaMapMarkedAlt size={ 25 } className="mr-3" /> Ver el mapa
                        </div>
                    </Link>
                </div>
            </Modal>
        </div>
    );
};