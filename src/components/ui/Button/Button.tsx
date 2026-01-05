import React, { MouseEvent } from 'react'

interface Props {
    label: string,
    type: "primary" | "dark"
    icon?: React.ReactNode,
    cssClasses?: string,
    onClickHandler?: ( event:MouseEvent<HTMLButtonElement> ) => void,
}

export const Button = ({ label, icon, type, cssClasses = "", onClickHandler }: Props) => {
    return (
        <button
            onClick={ onClickHandler }
            className={`
                px-5 py-3 rounded-lg font-bold cursor-pointer
                ${ !cssClasses && type === "primary" && 'text-white bg-teal-600 hover:bg-teal-700' }
                ${ !cssClasses && type === "dark" && 'text-white bg-gray-800 hover:bg-gray-900' }
                ${ cssClasses }   
            `}
        >
            <div className="flex items-center justify-center">
                { icon && icon } { label }
            </div>
        </button>
    )
}
