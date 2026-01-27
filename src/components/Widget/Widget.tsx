import { FaInfoCircle } from "react-icons/fa"

interface Props {
    title?: string,
    children: React.ReactNode,
    type: 'primary' | 'default' | 'info'
}

export const Widget = ({children, title, type}: Props) => {

    const cssClasses = {
        primary: 'bg-teal-600 text-white',
        default: 'bg-white',
        info: 'bg-blue-50 text-blue-900 border-l-4 border-blue-900'
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
