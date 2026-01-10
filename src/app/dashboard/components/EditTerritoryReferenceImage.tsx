import { Button } from '@/components/ui/Button/Button';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

interface Props {
    territoryID: number
}

export const EditTerritoryReferenceImage = ({ territoryID }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <div className="col-span-2">

            {/* Trigger Button */}
            ¿No está seguro de qué manzana editar? Aquí tiene una&nbsp;
            <Button
                label="imagen de referencia"
                style="dark"
                cssClasses="!p-0 bg-inherit !inline font-bold underline"
                onClickHandler={ toggleModal }
            />

            {/* Main Modal Wrapper */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
                    isOpen ? 'visible' : 'invisible pointer-events-none'
                }`}
            >
                <div
                    className={`absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-500 ease-in-out ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={toggleModal}
                />

                <div
                    className={`relative w-full max-w-[1000px] p-8 bg-white rounded-3xl shadow-2xl transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-12 opacity-0'
                    }`}
                >
                     <div className="flex justify-end gap-3 mb-10">
                        <Button
                            onClickHandler={toggleModal}
                            icon={ <IoClose size={20} /> }
                            style="dark"
                            label=""
                        />
                    </div>
                    <div className="mb-6 flex justify-center">
                        <Image 
                            src={`/assets/territories/t${territoryID}.png`}
                            width={600}
                            height={600}
                            alt={`Imagen de referencia del territorio N° ${territoryID}`}
                            className="md:max-w-[800px] h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};