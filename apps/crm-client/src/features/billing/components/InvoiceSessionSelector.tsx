import React from 'react';
import { Calendar } from 'lucide-react';
import { WizardMode, BillableSession } from './wizard/wizardTypes';

interface InvoiceSessionSelectorProps {
  mode: WizardMode;
  billableSessions: BillableSession[];
  selectedSessionIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onChangeSelection: () => void;
}

export const InvoiceSessionSelector: React.FC<InvoiceSessionSelectorProps> = ({
  mode,
  billableSessions,
  selectedSessionIds,
  onSelectionChange,
  onChangeSelection,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-700">Seleccionar Sesiones</h3>
        <button
          onClick={onChangeSelection}
          className="text-xs font-bold text-slate-400 hover:text-slate-600"
        >
          Cambiar Selección
        </button>
      </div>

      {/* SELECT ALL */}
      {billableSessions.length > 0 && (
        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedSessionIds.length === billableSessions.length}
              className="rounded border-slate-300 accent-pink-600"
              onChange={(e) => {
                if (e.target.checked) onSelectionChange(billableSessions.map((s) => String(s.id)));
                else onSelectionChange([]);
              }}
            />
            Seleccionar Todo
          </label>
          <span className="text-xs font-bold text-slate-400">
            Total: {billableSessions.reduce((acc, s) => acc + (Number(s.price) || 0), 0).toFixed(2)}
            €
          </span>
        </div>
      )}

      <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
        {billableSessions.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <p>No hay sesiones pendientes de cobro.</p>
          </div>
        ) : (
          billableSessions.map((session) => (
            <label
              key={session.id}
              className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${selectedSessionIds.includes(String(session.id)) ? 'bg-pink-50 border-pink-200' : 'bg-white border-slate-100 hover:border-slate-200'}`}
            >
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-slate-300 accent-pink-600"
                checked={selectedSessionIds.includes(String(session.id))}
                onChange={(e) => {
                  const sid = String(session.id);
                  if (e.target.checked) {
                    onSelectionChange([...selectedSessionIds, sid]);
                  } else {
                    onSelectionChange(selectedSessionIds.filter((id) => id !== sid));
                  }
                }}
              />
              <div className="flex-1">
                <p className="font-bold text-slate-800 text-sm">
                  {mode === 'GROUP' && session.groupName
                    ? session.groupName
                    : session._type === 'individual'
                      ? 'Sesión Individual'
                      : 'Sesión Grupal'}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar size={12} />
                  {session.date} - {session.time || ''}
                </p>
              </div>
              <div className="font-black text-slate-700">{session.price}€</div>
            </label>
          ))
        )}
      </div>
    </div>
  );
};
