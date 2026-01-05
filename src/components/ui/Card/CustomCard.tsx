
import Link from 'next/link'
import { BiSolidEdit } from "react-icons/bi";

import { PolygonData, State } from '@/types/polygon'
import { SimpleTerritoryState } from '@/types/simpleTerritoryStats'
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
    // return (
    //     <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden m-0 tm-custom-table">
    //         <thead className="text-white">
    //             {
    //                 territoryState.map( territory => (
    //                     <tr 
    //                         key={ territory.id } 
    //                         className="bg-teal-400 flex flex-col flex-no wrap md:table-row rounded-l-lg md:rounded-none mb-6 md:mb-0"
    //                     >
    //                         <th className="p-3 text-left flex items-center md:table-cell">Territorio:<br className='md:hidden' /></th>
    //                         <th className="p-3 text-left" >Estado:</th>
    //                         <th className="p-3 text-left">Último conductor:</th>
    //                         <th className="p-3 text-left hidden sm:table-cell">Comenzó - Finalizó</th>
    //                         <th className="p-3 text-center">Editar</th>
    //                     </tr>
    //                 ))
    //             }
    //         </thead>
    //         <tbody className="flex-1 md:flex-none">
    //             {
    //                 territoryState.map( ({ id, territory, square, state, lastLeader, started, finished }) => (
    //                     <tr 
    //                         key={ id }
    //                         className="flex flex-col flex-no wrap md:table-row rounded-r-lg md:rounded-none mb-6 md:mb-0"
    //                     >
    //                         <td className="p-3">
    //                             Territorio N°: { territory }<br />
    //                             Manzana N°: { square }
    //                         </td>
    //                         <td className="p-3 truncate">{ state }</td>
    //                         <td className="p-3 truncate">{ lastLeader }</td>
    //                         <td className="p-3 truncate hidden sm:table-cell">
    //                             { 
    //                                 ( state === 'Completado' ) 
    //                                     ? `${started} - ${finished}` 
    //                                     : ( state === 'En progreso' ) 
    //                                         ? `${started} - En progreso`
    //                                         : 'No inicializado'
    //                                 }
    //                         </td>
    //                         <td className="p-3 truncate">
    //                             <Link
    //                                 href={`/dashboard/territories/${ id }`}
    //                                 className="flex justify-center"
    //                             >
    //                                 <BiSolidEdit size={25} className='hover:text-teal-500' />
    //                             </Link>
    //                         </td>
    //                     </tr>
    //                 ))
    //             }
    //         </tbody>
    //     </table>
    // )
}
