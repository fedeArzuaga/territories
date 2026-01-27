import { formatToLocalDateString } from "@/helpers/formatToLocalDateString";
import { getDaysDistanceFromCurrentDate } from "@/helpers/datesFunctions";
import { CgNotes, CgTime } from "react-icons/cg"

interface Props {
    territoryState: string,
    squareState: string,
    lastLeaderName: string,
    started: Date | null,
    finished: Date | null,
    notes: string | null,
    updatedAt: Date
}

export const CustomPopUpContent = ({ squareState, territoryState, lastLeaderName, started, finished, notes, updatedAt }: Props) => {


    
    return (
        <>
            <div className="tm-polygon-details mt-3 grid grid-cols-2 gap-2">
                <div>
                    <p>
                        <b>Estado</b>:
                    </p>
                    <p>
                        { squareState }
                    </p>
                </div>
                <div>
                    <p>
                        <b>
                            { territoryState === "Personal" ? "Asignado a" : "Último conductor" }
                        </b>:
                    </p> 
                    <p>
                        { lastLeaderName || 'No asignado' }
                    </p>
                </div>
                {
                    (territoryState === "En progreso" || territoryState === "Completado" || territoryState === "Personal") && (
                        <div>
                            <p>
                                <b>
                                    { territoryState === "Personal" ? "Fecha de asignación" : "Se comenzó el" }
                                    
                                </b>:
                            </p>
                            <p>
                                { started ? formatToLocalDateString(started) : 'No iniciado' }
                            </p>
                        </div>
                    )
                }
                {
                    (territoryState === "En progreso" || territoryState === "Completado" || territoryState === "Personal") && (
                        <div>
                            <p>
                                <b>
                                    { territoryState === "Personal" ? "Fecha de vencimiento" : "Se finalizó el" }
                                </b>:
                            </p>
                            <p>
                                { finished ? formatToLocalDateString(finished) : 'No finalizado' }
                            </p>
                        </div>
                    )
                }
            </div>
            {
                notes && (
                    <div className="bg-blue-100 p-2 text-blue-950 rounded mt-3 whitespace-pre-wrap">
                        <div className="flex items-center flex-start mb-1">
                            <CgNotes size={15} /> <span className="font-bold ml-1 tm-text-1xl">Notas:</span>
                        </div>
                        <p className="mt-0 tm-notes">
                            { notes }
                        </p>
                    </div>
                )
            }
            {
                updatedAt && (
                    <div className="bg-gray-100 p-2 text-gray-700 rounded mt-3">
                        <div className="flex items-center flex-start tm-last-time-done">
                            <CgTime size={15} /> 
                            <span className="font-bold ml-1 text-xxs">
                                Última actualización:
                            </span>&nbsp;
                            { 
                                getDaysDistanceFromCurrentDate( updatedAt ) === 0
                                    ? 'hoy'
                                    : getDaysDistanceFromCurrentDate( updatedAt ) === 1
                                        ? '1 día atrás'
                                        : `${ getDaysDistanceFromCurrentDate( updatedAt ) } días atrás`
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}
