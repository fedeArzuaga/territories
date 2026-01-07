
interface Props {
    cssClasses: string,
    children: React.ReactNode
}

export const CustomGrid = ({ cssClasses, children }: Props) => {
    return (
        <div
            className={ cssClasses }
        >
            { children }
        </div>
    )
}
