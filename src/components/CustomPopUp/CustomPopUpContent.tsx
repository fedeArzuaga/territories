import { CgNotes, CgTime } from "react-icons/cg"
import { IoTimeOutline } from "react-icons/io5"

interface Props {
    territoryState: string,
    squareState: string,
    started: Date | null,
    finished: Date | null,
    notes: string | null
}

export const CustomPopUpContent = ({ squareState, territoryState, started, finished, notes }: Props) => {

    console.log( notes )
    
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
                        <b>Último conductor</b>:
                    </p> 
                    <p>
                        Pablo Scigliano
                    </p>
                </div>
                {
                    (territoryState === "En progreso" || territoryState === "Completado") && (
                        <div>
                            <p>
                                <b>Se comenzó el</b>:
                            </p>
                            <p>
                                { started ? new Date(started).toLocaleDateString() : 'No iniciado' }
                            </p>
                        </div>
                    )
                }
                {
                    (territoryState === "En progreso" || territoryState === "Completado") && (
                        <div>
                            <p>
                                <b>Se finalizó el</b>:
                            </p>
                            <p>
                                { finished ? new Date(finished).toLocaleDateString() : 'No finalizado' }
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
            <div className="bg-gray-100 p-2 text-gray-700 rounded mt-3">
                <div className="flex items-center flex-start tm-last-time-done">
                    <CgTime size={15} /> <span className="font-bold ml-1 text-xxs">Se trabajó hace:</span>&nbsp;15 días
                </div>
            </div>
        </>
    )
}
