import { formatToLocalDateString } from "@/helpers/formatToLocalDateString"
import { getLastEditedTerritory } from "@/lib/services/getLastEditedTerritory"

export const LastEditedTerritory = async () => {

    const lastEditedTerritory = await getLastEditedTerritory()

    return (
        <>
            <p className="text-xl font-bold">
                Territorio N° { lastEditedTerritory?.id }
            </p>
            <p className="mt-0 font-bold">
                Manzana N° 2
            </p>
            <div className="mt-3">
                <p>
                    <b>Último conductor:</b> { lastEditedTerritory?.lastLeaderName }
                </p>
                <p>
                    <b>Estado:</b> { lastEditedTerritory?.territoryState }
                </p>
                {
                    lastEditedTerritory?.territoryState !== "Pendiente" &&
                    lastEditedTerritory?.started && (
                        <>
                            <p>
                                <b>Fecha de inicio:</b> { formatToLocalDateString(lastEditedTerritory.started) }
                            </p>
                            {
                                lastEditedTerritory.territoryState === "En progreso"
                                    ? (
                                        <p>
                                            <b>Fecha de finalizado:</b> No finalizado
                                        </p>
                                    ) 
                                    : (
                                        <>
                                            {
                                                lastEditedTerritory?.finished && (
                                                    <p>
                                                        <b>
                                                            {
                                                                lastEditedTerritory.territoryState === "Personal" 
                                                                    ? 'Fecha de vencimiento:'
                                                                    : 'Fecha de finalizado:'
                                                            }
                                                        </b> { formatToLocalDateString(lastEditedTerritory.finished) }
                                                    </p>
                                                )
                                            }
                                        </>
                                    )
                            }
                        </>
                    )
                }
            </div>
        </>
    )
}