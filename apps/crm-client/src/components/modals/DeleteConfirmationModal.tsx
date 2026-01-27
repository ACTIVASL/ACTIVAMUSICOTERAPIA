import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@monorepo/ui-system';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    isDeleting?: boolean;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = '¿Eliminar Documento?',
    description = 'Esta acción no se puede deshacer. El archivo desaparecerá permanentemente.',
    isDeleting = false,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-red-100">
                <div className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500 mb-4">
                        <Trash2 size={32} />
                    </div>

                    <h3 className="text-xl font-black text-slate-800">{title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        {description}
                    </p>

                    <div className="pt-4 flex gap-3 justify-center">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            disabled={isDeleting}
                            className="w-32"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => {
                                onConfirm();
                            }}
                            className="w-32 bg-red-600 hover:bg-red-700 text-white border-red-700"
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Eliminando...' : 'Sí, Eliminar'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
