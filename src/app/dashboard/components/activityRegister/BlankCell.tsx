
export const BlankCell = () => {
    return (
        <td className="border border-gray-300 p-0 bg-gray-50/20">
            <div className="flex flex-col h-full opacity-30 min-w-75 w-full">
                <div className="p-2 min-h-11.25"></div>
                <div className="flex flex-1">
                    <div className="flex-1 border-r border-gray-200"></div>
                    <div className="flex-1"></div>
                </div>
            </div>
        </td>
    )
}
