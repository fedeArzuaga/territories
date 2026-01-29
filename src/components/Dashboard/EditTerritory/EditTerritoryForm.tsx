'use client'

import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { IoIosSave } from "react-icons/io";
import Link from "next/link";
import { FaInfoCircle, FaMapMarkedAlt } from "react-icons/fa";

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
    const [squareStates, setSquareStates] = useState( squaresState )
    const [ isPersonal, setIsPersonal ] = useState( state === "Personal" )
    const [ isModalOpen, setIsModalOpen ] = useState( false )

    // Used to manage pending state on form submission
    const [isPending, startTransition] = useTransition()

    const [form, setForm] = useState<TerritoryData>({
        id: territoryId,
        territoryState: state ?? 'Pendiente',
        lastLeaderName: leaderName ?? '',
        started: startedDate ? new Date(getCurrentDate(startedDate)) : null,
        finished: finishedDate ? new Date(getCurrentDate(finishedDate)) : null,
        notes: territoryNotes ?? '',
        managerId: managerId ?? '',
        updatedAt: new Date(updatedAt) ?? new Date().getTime()
    });

    const { 
        id,
        territoryState, 
        lastLeaderName, 
        started, 
        finished, 
        notes 
    } = form;

    // Add four months by default for personal territory
    const getFinishDate = ( customDate:Date = new Date() ) => {
        const date = customDate ? new Date(customDate) : new Date()
        date.setMonth(date.getMonth() + 4)
        return date
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
        setForm(prev => ({
            ...prev,
            territoryState: newStatus
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {

        event.preventDefault();
        const updatedData = {
            ...form,
            started: (territoryState === 'En progreso' || territoryState === 'Completado') && !started ? new Date() : started,
            finished: (territoryState === 'Pendiente' || territoryState === 'En progreso') ? null : finished,
            managerId: managerId,
            updatedAt: new Date()
        }

        setForm(updatedData);
        
        startTransition( async () => {
            await updateTerritory({
                isPersonal: isPersonal,
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
        setSquareStates( prev => 
            prev.map(item => 
                item.square === square 
                    ? { ...item, state: newStatus } 
                    : item
            )
        );
    }

    // Set dinamically the territory status based on user's interactions
    useEffect(() => {
        if ( !isPersonal ) {
            if ( squareStates.every( square => square.state === "Pendiente" ) ) {
                handleStatusChange("Pendiente")
            } else if ( squareStates.every( square => square.state === "Completado" ) ) {
                handleStatusChange("Completado")
            } else {
                handleStatusChange("En progreso")
            }
        } else {
            handleStatusChange("Personal")
        }
    }, [squareStates, isPersonal])

    useEffect(() => {
        if ( isPersonal ) {
            setSquareStates( prev => 
                prev.map(item => ({
                    ...item,
                    state: "Pendiente"
                }))
            );
            setForm( prev => ({
                ...prev,
                started: started ? getCurrentDate(started) : getCurrentDate(new Date()),
                finished: started ? getFinishDate(new Date(started as Date)) : getFinishDate(new Date())
            }))
        }
    }, [isPersonal])

    useEffect(() => {
        if ( isPersonal ) {
            setForm( prev => ({
                ...prev,
                finished: getFinishDate(new Date(started!))
            }))
        }
    }, [started])
    

    const isDateError = started && finished && (new Date(started).getTime() > new Date(finished).getTime()) || false;
    const areNotesRequired = territoryState === "En progreso" || territoryState === "Completado";

    if ( territoryState === "Personal" && role === "LEADER" ) {
        return (
            <>
                <div className="mb-8 mt-8 flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                            Territorio N° {id} -&nbsp; 
                            <Badge 
                                state={ territoryState }
                            />
                        </h2>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <CancelTerritoryEditionButton />
                    </div>
                </div>

                <Widget title="Información del Territorio" type="default">
                    <div className="p-10 max-w-xl mx-auto">
                        <div className="w-full flex flex-col items-center text-center">
                            <div className="text-9xl p-8 rounded-full mb-10 bg-teal-700 text-white">
                                <TbMapX />
                            </div>
                            <h2 className="text-4xl font-bold mb-6">No tiene permisos suficientes</h2>
                            <p className="text-1xl mb-6">No puede editar territorios personales. Si desea dejar una nota en un territorio personal, comuníquese directamente con un hermano con permisos de administrador.</p>
                            <Button
                                label="Ir a Territorios"
                                action="link"
                                style="primary"
                                icon={ <FaMapMarkedAlt className="mr-2" size={ 25 } /> }
                                href="/dashboard/territories"
                            />
                        </div>
                    </div>
                </Widget>
            </>
        )
    }

    return (
        <>
            <div className="mb-8 mt-8 flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                        Territorio N° {id} -&nbsp; 
                        <Badge 
                            state={ territoryState }
                        />
                    </h2>
                </div>
                <div className="mt-4 md:mt-0">
                    <CancelTerritoryEditionButton />
                </div>
            </div>

            <Widget title="Información del Territorio" type="default">
                {
                    hasAdminPriviliges( role ) && (
                        <>
                            {/* Toggle personal territory section */}
                            <div className="w-full ml-auto flex justify-end items-center">
                                <p className="mr-3 font-bold">Marcar como territorio personal</p>
                                <label htmlFor="hs-basic-usage" className="relative inline-block w-15 h-8 cursor-pointer">
                                    <input 
                                        checked={ isPersonal } 
                                        type="checkbox" 
                                        id="hs-basic-usage" 
                                        className="peer sr-only"
                                        onChange={ () => setIsPersonal( !isPersonal ) }
                                    />
                                    <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-blue-600 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                                    <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-7 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
                                </label>
                            </div>
                        </>
                    )
                }

                <div className="w-full">
                    <form onSubmit={ handleSubmit } className="space-y-8 w-full mt-8">

                        {
                            hasAdminPriviliges( role ) && (
                                <>
                                    {/* SECTION 1: ASSIGNMENT DETAILS (Leader and Dates) */}
                                    <div>
                                        <div className="border-b border-gray-100 pb-2 mb-4">
                                            <label className="font-bold text-gray-700">
                                                Asignación general:
                                            </label>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="flex flex-col">
                                                <label className="font-bold mb-2 text-sm text-gray-600">
                                                    { isPersonal ? "Publicador asignado: *" : "Último conductor: *" }
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastLeaderName"
                                                    value={lastLeaderName as string}
                                                    onChange={handleInputChange}
                                                    placeholder="Ej: Ángel García"
                                                    className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none h-11 transition-all"
                                                    required
                                                />
                                            </div>

                                            {territoryState !== "Pendiente" && (
                                                <>
                                                    <div className="flex flex-col">
                                                        <label className="font-bold mb-2 text-sm text-gray-600">Fecha de inicio: *</label>
                                                        <input
                                                            type="date"
                                                            name="started"
                                                            value={ started ? getCurrentDate(started) : new Date().toISOString().split('T')[0] }
                                                            onChange={handleInputChange}
                                                            className="w-full p-2 border rounded-md bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none h-11"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label className="font-bold mb-2 text-sm text-gray-600">Fecha de fin: *</label>
                                                        <input
                                                            type="date"
                                                            name="finished"
                                                            value={ 
                                                                isPersonal 
                                                                    ? new Date(getFinishDate(started as Date)).toISOString().split('T')[0]
                                                                    : finished ? new Date(finished!).toISOString().split('T')[0]: new Date().toISOString().split('T')[0]
                                                            }
                                                            onChange={handleInputChange}
                                                            disabled={ territoryState === "En progreso" || isPersonal }
                                                            className={`w-full p-2 rounded-md h-11 focus:ring-2 focus:ring-teal-500 outline-none transition-all ${
                                                                territoryState === "En progreso" || isPersonal
                                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-transparent" 
                                                                    : "bg-white text-black border"
                                                            }`}
                                                            required={territoryState === "Completado"}
                                                        />
                                                        {isDateError && (
                                                            <span className="text-red-500 text-[12px] mt-1 font-bold">
                                                                La fecha de inicio no puede ser posterior a la de conclusión.
                                                            </span>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>  

                                    {/* PERSONAL TERRITORY DISCLAIMER */}
                                    {
                                        isPersonal && (
                                            <div className="bg-blue-50 border-l-4 border-blue-900 p-5 rounded-r-xl flex gap-4 text-sm text-blue-900 shadow-sm">
                                                <FaInfoCircle size={22} className="shrink-0 text-blue-900" />
                                                <div className="leading-relaxed">
                                                    <h4 className="text-xl font-bold">Territorio marcado como "Personal"</h4>
                                                    <div>
                                                        En un territorio personal, es la persona asignada a ese territorio quien lleva registro de como decide trabajarlo y demás detalles importantes. Recuerde, que un territorio personal puede estar asignado, como máximo, durante 4 meses. Pasado ese tiempo, puede volver a asignarse al mismo publicador, a otro o bien dejarlo como territorio de congregación.
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }         
                                </>
                            )
                        }
                        
                        {
                            hasAdminPriviliges( role ) && (
                                <>
                                    {/* SECTION 2: PROGRESS BY SQUARE (Full Width for easier reading) */}
                                    {
                                        !isPersonal && (
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
                                        )
                                    }
                                </>
                            )
                        }


                        {/* SECTION 3: NOTES & FOOTER */}
                        {
                            !isPersonal && (
                                <div className="space-y-6">
                                    <div className="flex flex-col w-full">
                                        <div className="flex justify-between items-center">
                                            <label className="font-bold mb-2 text-gray-700">Notas de la última salida: { areNotesRequired && '*' }</label>
                                            {
                                                !hasAdminPriviliges( role ) && (
                                                    <>
                                                        {/* SECTION 2: PROGRESS BY SQUARE (Full Width for easier reading) */}
                                                        {
                                                            !isPersonal && (
                                                                <div className="flex flex-col space-y-4">
                                                                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2 border-b border-gray-100 pb-2">
                                                                        <div className="text-sm p-0 xl:px-3 xl:py-1 rounded-full text-gray-900 font-medium">
                                                                            <EditTerritoryReferenceImage territoryID={Number(id)} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        </div>
                                        <textarea
                                            name="notes"
                                            rows={4}
                                            value={notes ?? ''}
                                            required={ areNotesRequired }
                                            onChange={ handleInputChange }
                                            placeholder="Notas importantes sobre la última salida al territorio"
                                            className="w-full p-4 border rounded-xl bg-white text-black focus:ring-2 focus:ring-teal-500 outline-none shadow-sm transition-all"
                                        ></textarea>
                                    </div>

                                    <div className="bg-blue-50 border-l-4 border-blue-900 p-5 rounded-r-xl flex gap-4 text-sm text-blue-900 shadow-sm">
                                        <FaInfoCircle size={22} className="shrink-0 text-blue-900" />
                                        <div className="leading-relaxed">
                                            <span className="font-bold text-blue-900">Conductor:</span> Las notas son un excelente punto de partida para la próxima salida al servicio del campo. Sea lo más detallista posible para que el territorio se trabaje de la mejor manera <a className="underline font-bold hover:text-blue-900" href="https://wol.jw.org/es/wol/l/r4/lp-s?q=Mateo+7%3A12" target="_blank">(Mateo 7:12)</a>.
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        <div className="space-y-6">
                            <div className={`pt-6 flex flex-col items-start sm:flex-row ${ manager ? 'justify-between' : 'justify-end' } items-center border-t border-gray-100`}>
                                {
                                    manager && (
                                        <div className="">
                                            <p className="font-bold mb-2">Última vez editado por:</p>
                                            <LastEditedBy user={ manager } />
                                        </div>
                                    )
                                }
                                <button
                                    type="submit"
                                    disabled={isDateError || territoryState === "" || isPending}
                                    className={`cursor-pointer w-full sm:w-auto mt-6 px-10 py-4 rounded-xl font-bold text-white transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 ${
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
                </div>
            </Widget>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                maxWidth="max-w-[600px]"
            >
                <div className="text-center">
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

        </>
    );
};