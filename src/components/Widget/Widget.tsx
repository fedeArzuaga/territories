
interface Props {
    title?: string,
    children: React.ReactNode,
    type: 'primary' | 'default'
}

export const Widget = ({children, title, type}: Props) => {
    return (
        <div className={`${ type === 'primary' ? 'bg-teal-600 text-white' : 'bg-white' } rounded-2xl p-6 h-full sm:shadow-lg`}>
            {
                title &&
                    (
                        <h3 className="text-3xl font-bold mb-3">
                            { title }
                        </h3>
                    )
            }
            { children }
        </div>
    )
}
