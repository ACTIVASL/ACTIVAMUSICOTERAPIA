import React from 'react';
import { Modal } from '@monorepo/ui-system';
import { SignaturePad } from '@monorepo/ui-system';
import type { ForensicMetadata } from '@monorepo/shared';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signature: { dataUrl: string; metadata: ForensicMetadata }) => void;
  title?: string;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title = 'Consentimiento Informado',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-100">
          <strong>Términos legales:</strong> Mediante la firma de este documento, el paciente (o
          tutor legal) acepta el tratamiento de datos personales y la intervención musicoterapéutica
          según la Ley Orgánica de Protección de Datos (LOPD) y el RGPD vigente.
        </p>
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
            Panel de Firma
          </label>
          <SignaturePad
            onSave={(sig) => {
              onSave(sig);
              onClose();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
