'use client';

import { ReactNode, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { Button } from '@/components/ui/Button/Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    maxWidth?: string; // Optional: e.g., 'max-w-[1000px]'
}

export const Modal = ({ isOpen, onClose, children, maxWidth = 'max-w-[1000px]' }: ModalProps) => {
    
    // Prevent scrolling when modal is active
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
                isOpen ? 'visible' : 'invisible pointer-events-none'
            }`}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-500 ease-in-out ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={onClose}
            />

            {/* Modal Content Card */}
            <div
                className={`relative w-full ${maxWidth} p-8 bg-white rounded-3xl shadow-2xl transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-12 opacity-0'
                }`}
            >
                {/* Close Button Header */}
                <div className="flex justify-end mb-4 absolute right-5 top-5">
                    <Button
                        onClickHandler={onClose}
                        icon={<IoClose size={30} />}
                        style="default"
                        label=""
                        cssClasses="hover:bg-slate-100 transition-colors rounded-full p-2"
                    />
                </div>

                {/* Dynamic Content */}
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};