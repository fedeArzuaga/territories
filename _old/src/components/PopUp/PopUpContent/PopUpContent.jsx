import { getState } from "../../../data/getState"

export const PopUpContent = ({ status, lastDateDone, notes }) => {
    return (
        <>
            <ul className="tm-polygon-details">
                <li><b>Estado</b>: { getState[status] }</li>
                {
                    status === "completed" && (
                        <li><b>Última vez completado</b>: { lastDateDone }</li>
                    )
                }
            </ul>
            {
                notes && (
                    <>
                        <h4>Notas:</h4>
                        <p>
                            { notes }
                        </p>
                    </>
                )
            }
        </>
    )
}
