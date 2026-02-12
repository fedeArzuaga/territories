import { getColorByState } from "@/helpers/getColorByState"

interface Props {
    state: string
}

export const Badge = ({ state }: Props) => {

    // Check what kind of style should the badge be based on current state
    const color = getColorByState( state )

    return (
        <span 
            className={`p-1 px-3 text-white font-bold text-sm transition-colors 
                ${ color === "red" && 'bg-red-400 hover:bg-red-500' }
                ${ color === "yellow" && 'bg-amber-500 hover:bg-amber-600' }
                ${ color === "green" && 'bg-green-600 hover:bg-green-700' }
                ${ color === "blue" && 'bg-blue-500 hover:bg-blue-600' }
             rounded-full`}
        >
            { state === "Personal" ? "Personal" : state }
        </span>
    )
}
