import React from 'react';
import { Building } from 'lucide-react';
import { ClinicSettings } from '../../../lib/types';

interface IssuerConfigFormProps {
  billingData: NonNullable<ClinicSettings['billing']>;
  setBillingData: (d: NonNullable<ClinicSettings['billing']>) => void;
}

export const IssuerConfigForm: React.FC<IssuerConfigFormProps> = ({
  billingData,
  setBillingData,
}) => {
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB Limit
        alert('El logo es demasiado grande (Máx 2MB). Intenta con una imagen más pequeña.');
        return;
      }

      // Compression Logic
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 500;
          const MAX_HEIGHT = 500;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress to JPEG 0.7 to save space
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setBillingData({ ...billingData, logoUrl: dataUrl });
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
        <Building size={20} className="text-indigo-600" /> Datos del Emisor
      </h3>
      <p className="text-xs text-slate-500">
        Personaliza los datos de TU empresa para esta factura. Se guardarán para la próxima.
      </p>

      <div className="space-y-4 p-6 border-2 border-dashed border-indigo-100 rounded-xl bg-indigo-50/30">
        {/* LOGO */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            {billingData.logoUrl ? (
              <img
                src={billingData.logoUrl}
                alt="Logo"
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200 shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-400">
                <Building size={24} />
              </div>
            )}
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              Cambiar
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
            </label>
          </div>
          <div className="flex-1">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
              Nombre de Empresa / Autónomo
            </label>
            <input
              className="w-full bg-transparent border-b border-indigo-200 focus:border-indigo-600 font-bold text-indigo-900 outline-none transition-colors"
              placeholder="Ej: Clínica Activa S.L."
              value={billingData.legalName || ''}
              onChange={(e) => setBillingData({ ...billingData, legalName: e.target.value })}
            />
          </div>
        </div>

        {/* FIELDS */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              NIF / CIF
            </label>
            <input
              className="w-full bg-white px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none text-sm font-mono"
              placeholder="B-12345678"
              value={billingData.nif || ''}
              onChange={(e) => setBillingData({ ...billingData, nif: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Email (Opcional)
            </label>
            <input
              className="w-full bg-white px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none text-sm"
              placeholder="facturas@empresa.com"
              value={billingData.email || ''}
              onChange={(e) => setBillingData({ ...billingData, email: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Dirección Fiscal
          </label>
          <textarea
            className="w-full bg-white px-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none text-sm min-h-[60px]"
            placeholder="Dirección completa..."
            value={billingData.address || ''}
            onChange={(e) => setBillingData({ ...billingData, address: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
