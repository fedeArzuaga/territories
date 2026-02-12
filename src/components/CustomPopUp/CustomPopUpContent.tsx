import { formatToLocalDateString } from "@/helpers/formatToLocalDateString";
import { CgNotes, CgTime } from "react-icons/cg"
import { TerritoryData } from "@/types/territory";
import { format } from "date-fns/format";
import { es } from "date-fns/locale/es";
import { FaUser } from "react-icons/fa";

interface Props {
    squareState: string,
    territory: TerritoryData
}

export const CustomPopUpContent = ({ 
    squareState,
    territory
}: Props) => {
    
    return (
        <>
            <div className="tm-polygon-details mt-3 grid grid-cols-2 gap-2">
                <div>
                    <p>
                        <b>Estado</b>:
                    </p>
                    <p>
                        { territory.category === "Personal" ? territory.territoryState : squareState }
                    </p>
                </div>
                <div>
                    <p>
                        <b>
                            { territory.category === "Personal" ? "Asignado a" : "Último conductor" }
                        </b>:
                    </p> 
                    <p>
                        { territory.lastLeaderName || 'No asignado' }
                    </p>
                </div>
                {
                    (territory.territoryState === "En progreso" || territory.territoryState === "Completado" || territory.category === "Personal") && (
                        <div>
                            <p>
                                <b>
                                    { territory.category === "Personal" ? "Fecha de asignación" : "Se comenzó el" }
                                    
                                </b>:
                            </p>
                            <p>
                                { territory.started ? formatToLocalDateString(territory.started) : 'No iniciado' }
                            </p>
                        </div>
                    )
                }
                {
                    (territory.territoryState === "En progreso" || territory.territoryState === "Completado" || territory.category === "Personal") && (
                        <div>
                            <p>
                                <b>
                                    { territory.category === "Personal" ? "Fecha de vencimiento" : "Se finalizó el" }
                                </b>:
                            </p>
                            <p>
                                { territory.finished ? formatToLocalDateString(territory.finished) : 'No finalizado' }
                            </p>
                        </div>
                    )
                }
            </div>

            {
                territory.notes && (
                    <div className="bg-blue-100 p-2 text-blue-950 rounded mt-3 whitespace-pre-wrap">
                        <div className="flex items-center flex-start mb-1">
                            <CgNotes size={15} /> <span className="font-bold ml-1 tm-text-1xl">Notas:</span>
                        </div>
                        <p className="mt-0 tm-notes">
                            { territory.notes }
                        </p>
                    </div>
                )
            }

            {territory.updatedAt && (
                <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col gap-1.5">
                    <div className="flex flex-col flex-wrap items-start gap-x-4 gap-y-1">
                        <div className="flex items-center text-xs text-gray-600">
                            <FaUser size={12} className="mr-1.5 text-gray-400" />
                            <span className="text-gray-400 mr-1">Editado por:</span>
                            <span className="font-semibold">{territory.manager?.name || 'No asignado'}</span>
                        </div>

                        <div className="flex items-center text-xs text-gray-600">
                            <CgTime size={12} className="mr-1.5 text-gray-400" />
                            <span className="text-gray-400 mr-1">Cuándo:</span>
                            <span className="font-semibold">
                                {format(territory.updatedAt, "dd MMM, HH:mm", { locale: es })}
                            </span>
                        </div>
                    </div>
                </div>
            )}
            
        </>
    )
}
