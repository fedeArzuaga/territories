
import './CustomCard.css'

interface Props {
    children: React.ReactNode
}

export const CustomCard = ({ children }: Props) => {
    return (
        <div className='relative p-5 rounded-xl border-2 border-gray-200 hover:border-0 hover:shadow-xl transition-all'>
            { children }
        </div>
    )
}
