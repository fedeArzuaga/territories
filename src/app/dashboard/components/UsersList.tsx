import { formatUserRole } from "@/helpers/formatUserRole";
import { UsersDeleteUserButton } from "./UsersDeleteUserButton";
import { getUserByActiveSession } from "@/lib/services/getUserByActiveSession";
import { getAllUsersExceptByName } from "@/lib/services/getAllUsersExceptByName";
import { redirect } from "next/navigation";

export const UsersList = async () => {

    const myUser = await getUserByActiveSession()

    if ( myUser.role !== "SUPERUSER" ) redirect('/dashboard/user-profile')

    const data = await getAllUsersExceptByName("Federico Arzuaga")
    const users = data.filter( user => ( user.name !== myUser.name ) && ({ 
        id: user.id,
        name: user.name, 
        email: user.email, 
        role: user.role 
    }))

    return (
        <div className="min-w-full">
            <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb">
                <table className="min-w-full divide-y divide-table-line">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 text-start text-sm font-bold text-muted-foreground-1 uppercase">Nombre</th>
                            <th scope="col" className="px-6 py-3 text-start text-sm font-bold text-muted-foreground-1 uppercase">Email</th>
                            <th scope="col" className="px-6 py-3 text-start text-sm font-bold text-muted-foreground-1 uppercase">Rol</th>
                            <th scope="col" className="px-6 py-3 text-end text-sm font-bold text-muted-foreground-1 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-table-line">
                        {
                            users.map( user => (
                                <tr key={ user.id }>
                                    <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
                                        { user.name }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
                                        { user.email }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
                                        { formatUserRole(user.role) }
                                    </td>                                  
                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-bold">
                                        <UsersDeleteUserButton userId={ user.id } />
                                        &nbsp;&zwj;
                                        &nbsp;&zwj;
                                        &nbsp;&zwj;
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            </div>
    )
}
