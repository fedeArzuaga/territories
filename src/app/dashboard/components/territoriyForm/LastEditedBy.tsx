import { format } from "date-fns"
import { es } from "date-fns/locale"

import { formatUserRole } from "@/helpers/formatUserRole"
import { User } from "@/types/user"

interface Props {
    user: User,
    date: Date
}

export const LastEditedBy = ({ user, date }: Props) => {

    const {
        image,
        name,
        role
    } = user

    return (
        <div id="profile" className="space-y-3 flex items-center">
            <div className="space-y-1">
                <p className="text-sm text-gray-500">
                    <b>Autor: </b>{ name } ({ formatUserRole( role ) })
                </p>
                <p className="text-sm text-gray-500">
                    <b>Editado el: </b>{ format( date, "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es } ) }
                </p>
            </div>
        </div>
    )
}
