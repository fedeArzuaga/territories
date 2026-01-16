import { formatToLocalDateString } from "@/helpers/formatToLocalDateString";
import { CgNotes, CgTime } from "react-icons/cg"

interface Props {
    territoryState: string,
    squareState: string,
    started: Date | null,
    finished: Date | null,
    notes: string | null,
    updatedAt: Date
}

const getUpdatedDaysDistance = ( date: Date ): number => {
    const lastEditedDate = new Date( date )

    // Adding four hours to got date due to hours gap
    lastEditedDate.setHours( date.getHours() + 4 )
    const currentDate = new Date().getDate()

    // Return the days distance between two dates
    return currentDate - lastEditedDate.getDate()
}

export const CustomPopUpContent = ({ squareState, territoryState, started, finished, notes, updatedAt }: Props) => {


    
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
                                { started ? formatToLocalDateString(started) : 'No iniciado' }
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
                                getUpdatedDaysDistance( updatedAt ) === 0
                                    ? 'hoy'
                                    : getUpdatedDaysDistance( updatedAt ) === 1
                                        ? '1 día atrás'
                                        : `${ getUpdatedDaysDistance( updatedAt ) } días atrás`
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}
