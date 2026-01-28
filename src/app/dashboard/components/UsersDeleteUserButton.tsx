'use client'

import { Button } from '@/components/ui/Button/Button'
import { deleteUserById } from '@/lib/services/deleteUserById'
import { IoTrashOutline } from 'react-icons/io5'

interface Props {
    userId: string
}

export const UsersDeleteUserButton = ({ userId }: Props ) => {

    const handleDeleteUser = async ( userId: string ) => {
        const deletedUser = await deleteUserById( userId )
    }

    return (
        <Button 
            label=""
            style="danger"
            icon={ <IoTrashOutline size={20} /> }
            onClickHandler={ () => handleDeleteUser( userId ) }
        />
    )
}
