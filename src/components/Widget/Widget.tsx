import { FaExclamationCircle, FaInfoCircle } from "react-icons/fa"

interface Props {
    title?: string,
    children: React.ReactNode,
    type: 'primary' | 'default' | 'info' | 'danger' | 'personalTerritory' | 'congregationalTerritory'
}

export const Widget = ({children, title, type}: Props) => {

    const cssClasses = {
        primary: 'bg-teal-600 text-white',
        default: 'bg-white',
        info: 'bg-blue-50 text-blue-900 border-l-4 border-blue-900',
        danger: 'bg-red-50 text-red-900 border-l-4 border-red-900',
        personalTerritory: 'bg-white border-t-10 border-t-blue-600',
        congregationalTerritory: 'bg-white border-t-10 border-t-teal-500'
    }

    return (
        <div className={`${ cssClasses[type] } rounded-2xl p-6 h-full sm:shadow-lg`}>
            <div className="flex items-center mb-3">
                {
                    type === 'info' && title && (
                        <FaInfoCircle size={30} className="shrink-0 mr-2" />
                    )
                }
                {
                    type === 'danger' && title && (
                        <FaExclamationCircle size={30} className="shrink-0 mr-2 text-red-900" />
                    )
                }
                {
                    title &&
                        (   
                            <h3 className="text-3xl font-bold">
                                { title }
                            </h3>
                        )
                }
            </div>
            { children }
        </div>
    )
}
