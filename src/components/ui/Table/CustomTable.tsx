
import Link from 'next/link'
import { BiSolidEdit } from "react-icons/bi";

import { State } from '@/types/polygon'
import { SimpleTerritoryState } from '@/types/simpleTerritoryStats'
import './CustomTable.css'

interface Props {
    territoryState: SimpleTerritoryState[]
}

export const CustomTable = ({ territoryState }: Props) => {
    return (
        <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden m-0">
            <thead className="text-white">
                {
                    territoryState.map( territory => (
                        <tr 
                            key={ crypto.randomUUID() } 
                            className="bg-teal-400 flex flex-col flex-no wrap md:table-row rounded-l-lg md:rounded-none mb-2 md:mb-0"
                        >
                            <th className="p-3 text-left">Territorio:</th>
                            <th className="p-3 text-left" >Estado:</th>
                            <th className="p-3 text-left">Último conductor:</th>
                            <th className="p-3 text-left">Comenzó - Finalizó</th>
                            <th className="p-3 text-center">Editar</th>
                        </tr>
                    ))
                }
            </thead>
            <tbody className="flex-1 md:flex-none">
                {
                    territoryState.map( ({ territory, square, state, lastLeader, started, finished }) => (
                        <tr 
                            key={ crypto.randomUUID() } 
                            className="flex flex-col flex-no wrap md:table-row mb-2 md:mb-0"
                        >
                            <td className="p-3">
                                Territorio N°: { territory }<br />
                                Manzana N°: { square }
                            </td>
                            <td className="p-3 truncate">{ state }</td>
                            <td className="p-3 truncate">{ lastLeader }</td>
                            <td className="p-3 truncate">
                                { 
                                    ( state === 'Completado' ) 
                                        ? `${started} - ${finished}` 
                                        : ( state === 'En progreso' ) 
                                            ? `${started} - En progreso`
                                            : 'No inicializado'
                                    }
                            </td>
                            <td className="p-3 truncate">
                                <Link
                                    href='/dashboard/territories'
                                    className="flex justify-center"
                                >
                                    <BiSolidEdit size={25} className='hover:text-teal-500' />
                                </Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
