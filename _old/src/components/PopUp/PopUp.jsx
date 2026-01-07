import { PopUpForm } from './PopUpForm/PopUpForm'
import { PopUpContent } from './PopUpContent/PopUpContent'

export const PopUp = ({ 
    territory, 
    square, 
    state, 
    lastDateDone, 
    notes, 
    editMode,
    toggleEditMode,
    updateContent 
}) => {

    return (
        <div className="tm-popup-content-block">
            <h3>
                Territorio N°{ territory }
            </h3>
            <p>
                Manzana N°{ square }
            </p>
            {
                editMode
                    ? (
                        <PopUpForm
                            id={ `${territory}.${square}` }
                            updateContent={ updateContent }
                            toggleEditMode={ toggleEditMode }
                        />
                    )
                    : (
                        <PopUpContent
                            status={ state }
                            lastDateDone={ lastDateDone }
                            notes={ notes }
                        />
                    )
            }
        </div>
    )
    
}
