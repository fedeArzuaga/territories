'use client'

import { redirect } from 'next/navigation'
import { MdCancel } from 'react-icons/md'

import { Button } from '@/components/ui/Button/Button'

export const CancelTerritoryEditionButton = () => {
    return (
        <Button
            label="Cancelar"
            type="dark"
            icon={ <MdCancel size={ 25 } className="mr-2" /> }
            onClickHandler={ () => redirect('/dashboard/territories') }
        />
    )
}
