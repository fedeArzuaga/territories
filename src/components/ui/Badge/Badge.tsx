
interface Props {
    type: "danger" | "warning" | "success",
    text: string
}

const colorBasedOnType = {
    danger: 'bg-red-400 hover:bg-red-500',
    warning: 'bg-amber-500 hover:bg-amber-600',
    success: 'bg-green-600 hover:bg-green-700',
}

export const Badge = ({ type, text }: Props) => {
    return (
        <span 
            className={`p-1 px-3 text-white font-bold text-sm transition-colors ${ colorBasedOnType[type] } rounded-full`}
        >
            { text }
        </span>
    )
}
