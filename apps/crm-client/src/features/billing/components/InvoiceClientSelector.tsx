import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';
import { WizardMode } from './wizard/wizardTypes';
import { Patient } from '../../../lib/types';
import { Session } from '@monorepo/shared';

interface InvoiceClientSelectorProps {
  mode: WizardMode;
  patients: Patient[];
  availableGroups: string[];
  onSelectPatient: (id: string) => void;
  onSelectGroup: (name: string) => void;
  onChangeMode: () => void;
}

export const InvoiceClientSelector: React.FC<InvoiceClientSelectorProps> = ({
  mode,
  patients,
  availableGroups,
  onSelectPatient,
  onSelectGroup,
  onChangeMode,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredGroups = availableGroups.filter((g) =>
    g.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-700">
          {mode === 'INDIVIDUAL' ? 'Seleccionar Paciente' : 'Seleccionar Grupo'}
        </h3>
        <button
          onClick={onChangeMode}
          className="text-xs font-bold text-slate-400 hover:text-slate-600"
        >
          Cambiar Modo
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 ring-pink-500 font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto custom-scrollbar">
        {mode === 'INDIVIDUAL'
          ? filteredPatients.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPatient(String(p.id))}
                className="flex items-center gap-3 p-3 hover:bg-pink-50 rounded-xl border border-transparent hover:border-pink-100 group transition-all text-left"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 group-hover:bg-pink-100 group-hover:text-pink-600">
                  {p.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-800">{p.name}</p>
                  <p className="text-xs text-slate-500">
                    {p.sessions?.filter((s: Session) => !s.paid)?.length || 0} pendientes
                  </p>
                </div>
              </button>
            ))
          : filteredGroups.map((g) => (
              <button
                key={g}
                onClick={() => onSelectGroup(g)}
                className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl border border-transparent hover:border-blue-100 group transition-all text-left"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600">
                  <Users size={16} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{g}</p>
                  <p className="text-xs text-slate-500">Facturación Grupal</p>
                </div>
              </button>
            ))}
      </div>
    </div>
  );
};
