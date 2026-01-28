import Link from 'next/link'
import React, { MouseEvent } from 'react'

interface Props {
    label: string,
    type?: "button" | "submit"
    style: "primary" | "dark" | "danger" | "warning" | "success" | "default"
    icon?: React.ReactNode,
    cssClasses?: string,
    action?: "link" | "button",
    href?: string,
    onClickHandler?: ( event:MouseEvent<HTMLButtonElement> ) => void,
}

export const Button = ({ label, type = "button", icon, style, action = "button", href, cssClasses = "", onClickHandler }: Props) => {
    return (
        <>
            {
                action === "button" && (
                    <button
                        onClick={ onClickHandler }
                        type={ type }
                        className={`
                            p-2 rounded-lg font-bold cursor-pointer
                            ${ (!cssClasses && style === "primary") ? 'text-white bg-teal-600 hover:bg-teal-700' : '' }
                            ${ (!cssClasses && style === "dark") ? 'text-white bg-gray-800 hover:bg-gray-900' : '' }
                            ${ (!cssClasses && style === "danger") ? 'text-white bg-red-600 hover:bg-red-700' : '' }
                            ${ (!cssClasses && style === "warning") ? 'text-white bg-amber-500 hover:bg-amber-600' : '' }
                            ${ (!cssClasses && style === "success") ? 'text-white bg-green-600 hover:bg-green-700' : '' }
                            ${ (!cssClasses && style === "default") ? 'text-gray-700 bg-white hover:bg-teal-600' : '' }
                            ${ cssClasses }   
                        `}
                    >
                        <div className="flex items-center justify-center">
                            { icon && icon } { label }
                        </div>
                    </button>
                )
            }
            {
                action === "link" && (
                    <Link
                        href={ href ?? '/' }
                        className={`
                            p-3 rounded-lg font-bold cursor-pointer
                            ${ !cssClasses && style === "primary" && 'text-white bg-teal-600 hover:bg-teal-700' }
                            ${ !cssClasses && style === "dark" && 'text-white bg-gray-800 hover:bg-gray-900' }
                            ${ cssClasses }   
                        `}
                    >
                        <div className="flex items-center justify-center">
                            { icon && icon } { label }
                        </div>
                    </Link>
                )
            }
        </>
    )
}
