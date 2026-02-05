import React from 'react';
import { User, Users } from 'lucide-react';
import { WizardMode } from './wizardTypes';

interface WizardStep1Props {
  onSelectMode: (mode: WizardMode) => void;
}

export const WizardStep1_Mode: React.FC<WizardStep1Props> = ({ onSelectMode }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-slate-700 text-center">¿A quién vas a facturar?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => onSelectMode('INDIVIDUAL')}
          className="p-8 rounded-2xl border-2 border-slate-100 hover:border-pink-500 hover:bg-pink-50 transition-all group text-center space-y-4"
        >
          <div className="w-16 h-16 bg-white rounded-full shadow-sm mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
            <User size={32} className="text-slate-400 group-hover:text-pink-500" />
          </div>
          <div>
            <h4 className="font-black text-xl text-slate-800">Paciente Individual</h4>
            <p className="text-sm text-slate-400 mt-2">
              Crear factura para un único paciente basada en sus sesiones.
            </p>
          </div>
        </button>

        <button
          onClick={() => onSelectMode('GROUP')}
          className="p-8 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all group text-center space-y-4"
        >
          <div className="w-16 h-16 bg-white rounded-full shadow-sm mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users size={32} className="text-slate-400 group-hover:text-blue-500" />
          </div>
          <div>
            <h4 className="font-black text-xl text-slate-800">Institución / Grupo</h4>
            <p className="text-sm text-slate-400 mt-2">
              Facturar un grupo completo o institución (Ej: Taller Memoria).
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
