import React from 'react';
import { Receipt } from 'lucide-react';
import { BillableSession } from './wizard/wizardTypes';

interface InvoicePreviewProps {
  selectedName: string;
  invoiceDate: string;
  setInvoiceDate: (d: string) => void;
  customInvoiceNumber: string;
  setCustomInvoiceNumber: (n: string) => void;
  selectedSessions: BillableSession[];
  totalAmount: number;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  selectedName,
  invoiceDate,
  setInvoiceDate,
  customInvoiceNumber,
  setCustomInvoiceNumber,
  selectedSessions,
  totalAmount,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
        <Receipt size={20} className="text-slate-400" /> Resumen Factura
      </h3>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">Cliente</p>
            <p className="font-bold text-slate-800 text-lg">{selectedName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 font-bold uppercase">Fecha Emisión</p>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="bg-transparent font-bold text-slate-800 text-right outline-none border-b border-dashed border-slate-300 focus:border-pink-500 w-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs text-slate-400 font-bold uppercase">Número de Factura</label>
          <input
            type="text"
            value={customInvoiceNumber}
            onChange={(e) => setCustomInvoiceNumber(e.target.value)}
            className="w-full bg-white px-3 py-2 rounded-lg border border-slate-200 focus:border-pink-500 outline-none font-mono text-sm font-bold text-slate-700"
            placeholder="INV-000000"
          />
        </div>

        <div className="space-y-2 border-t border-slate-200 pt-4 max-h-48 overflow-y-auto custom-scrollbar">
          {selectedSessions.map((s) => (
            <div key={s.id} className="flex justify-between text-sm">
              <span className="text-slate-600">{s.date} - Sesión</span>
              <span className="font-mono font-medium">{s.price}€</span>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-slate-800 mt-4 pt-4 flex justify-between items-center">
          <span className="font-black text-xl text-slate-900">TOTAL</span>
          <span className="font-black text-2xl text-pink-600">{totalAmount.toFixed(2)}€</span>
        </div>
      </div>
    </div>
  );
};
