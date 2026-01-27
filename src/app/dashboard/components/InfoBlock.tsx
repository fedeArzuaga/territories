import { FaInfoCircle } from "react-icons/fa"

interface Props {
    title: string,
    type: "info" | "success" | "danger",
    children: React.ReactNode
}

export const InfoBlock = ({ title, type, children }: Props) => {

    // Set style based on the type got by Props
    const cssClasses = {
        info: {
            container: 'bg-blue-50 border-l-4 border-blue-900 text-blue-900',
        },
        success: {
            container: 'bg-blue-50 border-l-4 border-blue-900 text-blue-900',
        },
        danger: {
            container: 'bg-blue-50 border-l-4 border-blue-900 text-blue-900',
        }
    }

    return (
        <div className={`${ cssClasses[type].container } p-5 rounded-r-xl flex gap-4 text-sm shadow-sm`}>
            <FaInfoCircle size={22} className="shrink-0 mt-1" />
            <div className="leading-relaxed">
                <h4 className="text-xl font-bold mb-2">
                    { title }
                </h4>
                <div>
                    { children }
                </div>
            </div>
        </div>
    )
}
