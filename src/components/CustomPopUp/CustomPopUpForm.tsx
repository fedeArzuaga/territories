
import { ChangeEvent, FormEvent, useState } from "react";

interface FormState {
    state: string,
    lastDateDone: string,
    notes: string
}

const formInitialState: FormState = {
    state: '',
    lastDateDone: '',
    notes: ''
}

export const CustomPopUpForm = () => {

    const handleSaveChanges = ( event: FormEvent<HTMLFormElement> ) => {
        console.log( event.target )
    }

    const [form, setForm] = useState( formInitialState )
    const { state, lastDateDone, notes } = form

    const handleFormChange = ( event: ChangeEvent<HTMLTextAreaElement> ) => {
        setForm( prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleReset = () => {
        setForm( formInitialState )
    }

    return (
        <form onSubmit={ handleSaveChanges }>
                            
            <div className="tm-state-block">
                <label htmlFor="state">Estado:</label>
                <div>
                    <select name="state" id="state">
                        <option value="">- Seleccione estado del territorio -</option>
                        <option value="pending">Pendiente</option>
                        <option value="in-progress">En proceso</option>
                        <option value="completed">Completado</option>
                    </select>
                </div>
            </div>

            {
                state === 'completed' && (
                    <div className="tm-date-block">
                        <label htmlFor="lastDateDone">Fecha de realizado:</label>
                        <div>
                            <input name="lastDateDone" id="lastDateDone" type="date" value={ lastDateDone } required />
                        </div>
                    </div>
                )
            }

            <div className="tm-notes-block">
                <label htmlFor="notes">Notas:</label>
                <div>
                    <textarea onChange={ handleFormChange } name="notes" id="notes" value={ notes }></textarea>
                </div>
            </div>

            <div className="tm-submit-block">
                <input type="submit" value="GUARDAR" className="tm-mr-1" />
                <button onClick={ handleReset } className="tm-btn tm-btn-green tm-ml-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="25" height="25" viewBox="0 0 512 512" data-name="Layer 1" id="Layer_1">
                        <path d="M64,256H34A222,222,0,0,1,430,118.15V85h30V190H355V160h67.27A192.21,192.21,0,0,0,256,64C150.13,64,64,150.13,64,256Zm384,0c0,105.87-86.13,192-192,192A192.21,192.21,0,0,1,89.73,352H157V322H52V427H82V393.85A222,222,0,0,0,478,256Z"/>
                    </svg>
                </button>
            </div>

            {/* {
                updatingData && (
                    <div className="uploading-data-spinner"></div>
                )
            } */}

        </form>
    )
}
