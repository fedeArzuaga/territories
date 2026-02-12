
interface Props {
    children: React.ReactNode,
    cssClasses?: string
}

export const CustomCard = ({ children, cssClasses }: Props) => {
    return (
        <div className={`relative p-5 rounded-xl border-2 border-t-8 hover:shadow-xl transition-all h-full ${ cssClasses ?? '' }`}>
            { children }
        </div>
    )
}
