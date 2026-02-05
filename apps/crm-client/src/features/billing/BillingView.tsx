import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { format } from 'date-fns';
import { useWindowVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import {
  Euro,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Trash2,
  FileText,
  Search,
  Download,
} from 'lucide-react';
import { Card, Button, Skeleton } from '@monorepo/ui-system';
import { useInvoiceController } from '../../hooks/controllers/useInvoiceController';
import { Invoice, InvoiceStatus } from '@monorepo/shared';
import { useSettingsController } from '../../hooks/controllers/useSettingsController';
import { PdfGenerator } from '../../lib/PdfGenerator';
import { InvoiceWizardModal } from './InvoiceWizardModal';
import { BatchBillingModal } from './components/BatchBillingModal';

import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { ClinicSettings } from '../../lib/types';

export const BillingView = () => {
  const { t } = useTranslation();
  const { invoices, updateStatus, deleteInvoice, isLoading, error } = useInvoiceController();
  const { settings } = useSettingsController(); // TITANIUM SETTINGS
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'ALL'>('ALL');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isBatchOpen, setIsBatchOpen] = useState(false); // NEW STATE

  // Calc KPIs
  const stats = useMemo(() => {
    const totalRevenue = invoices
      .filter((i) => i.status === 'PAID')
      .reduce((acc, curr) => acc + curr.total, 0);
    const pendingAmount = invoices
      .filter((i) => i.status === 'PENDING')
      .reduce((acc, curr) => acc + curr.total, 0);
    const currentMonthRevenue = invoices
      .filter((i) => i.status === 'PAID' && i.date.startsWith(new Date().toISOString().slice(0, 7)))
      .reduce((acc, curr) => acc + curr.total, 0);
    return { totalRevenue, pendingAmount, currentMonthRevenue };
  }, [invoices]);

  // Filter
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleMarkPaid = async (inv: Invoice) => {
    if (confirm(`¿Marcar factura ${inv.number} como PAGADA?`)) {
      await updateStatus({ id: inv.id, status: 'PAID', paidAt: new Date().toISOString() });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {t('sidebar.billing.title')}
          </h1>
          <p className="text-slate-500">{t('sidebar.billing.subtitle')}</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            onClick={() => setIsBatchOpen(true)}
            icon={TrendingUp}
            variant="secondary"
            className="flex-1 md:flex-none bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-200"
          >
            Piloto Automático
          </Button>
          <Button
            onClick={() => setIsWizardOpen(true)}
            icon={Plus}
            className="flex-1 md:flex-none text-center justify-center"
          >
            {t('sidebar.billing.actions.new_invoice')}
          </Button>
        </div>
      </header>

      {/* KPIs */}
      {/* KPIs - MOBILE: HORIZONTAL SCROLL / DESKTOP: GRID */}
      {/* KPIs - CORPORATE FINANCIAL STYLE */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6">
        <Card className="p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">
                {t('sidebar.billing.kpis.revenue_year')}
              </p>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">
                {stats.totalRevenue.toFixed(2)}€
              </p>
            </div>
            <div className="p-2 bg-emerald-50/50 rounded-lg text-emerald-600 border border-emerald-100">
              <TrendingUp size={20} />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">
                {t('sidebar.billing.kpis.pending')}
              </p>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">
                {stats.pendingAmount.toFixed(2)}€
              </p>
            </div>
            <div className="p-2 bg-amber-50/50 rounded-lg text-amber-600 border border-amber-100">
              <AlertCircle size={20} />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">
                {t('sidebar.billing.kpis.month')}
              </p>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">
                {stats.currentMonthRevenue.toFixed(2)}€
              </p>
            </div>
            <div className="p-2 bg-indigo-50/50 rounded-lg text-indigo-600 border border-indigo-100">
              <Euro size={20} />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters & List */}
      <Card>
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 w-full md:w-80 focus-within:ring-2 ring-indigo-100 transition-all shadow-sm">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder={t('sidebar.billing.filters.search_placeholder')}
              className="bg-transparent border-none outline-none text-sm w-full font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 px-1 -mx-1 scrollbar-hide">
            {(['ALL', 'DRAFT', 'PENDING', 'PAID'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap active:scale-95 ${statusFilter === status
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-500 border border-slate-200'
                  }`}
              >
                {status === 'ALL'
                  ? t('sidebar.billing.filters.all')
                  : status === 'DRAFT'
                    ? t('sidebar.billing.filters.draft')
                    : status === 'PENDING'
                      ? t('sidebar.billing.filters.pending')
                      : t('sidebar.billing.filters.paid')}
              </button>
            ))}
          </div>
        </div>

        {error ? (
          <div className="p-6 border border-red-100 rounded-xl bg-red-50 flex items-start gap-4 text-red-700 mb-6">
            <AlertCircle className="shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-lg mb-1">Error cargando facturas</h3>
              <p className="text-sm opacity-90 mb-2">
                {error instanceof Error ? error.message : 'Error desconocido'}
              </p>
              <p className="text-xs font-mono bg-red-100 p-2 rounded">
                Possible Missing Index: Run 'firebase deploy --only firestore:indexes'
              </p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row gap-4 p-4 border border-slate-100 rounded-xl bg-white"
              >
                <Skeleton className="h-6 w-24" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
              <FileText size={32} className="text-slate-300" />
            </div>
            <p>{t('sidebar.billing.empty')}</p>
          </div>
        ) : (
          <BillingListVirtualizer
            invoices={filteredInvoices}
            onMarkPaid={handleMarkPaid}
            onDelete={deleteInvoice}
            settings={settings}
            t={t}
          />
        )}
      </Card>

      <InvoiceWizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
      <BatchBillingModal isOpen={isBatchOpen} onClose={() => setIsBatchOpen(false)} />
    </div>
  );
};

// Subcomponent used to render virtualized list to avoid hook rules in main component loop or complexity

interface BillingListProps {
  invoices: Invoice[];
  onMarkPaid: (inv: Invoice) => void;
  onDelete: (id: string) => void;
  settings: ClinicSettings | undefined; // Relaxed to allow undefined
  t: TFunction; // Correct type from i18next
}

const BillingListVirtualizer = ({
  invoices,
  onMarkPaid,
  onDelete,
  settings,
  t,
}: BillingListProps) => {
  const parentRef = useRef<HTMLTableElement>(null); // For table
  const mobileParentRef = useRef<HTMLDivElement>(null); // For mobile div

  const [tableTopOffset, setTableTopOffset] = useState(0);

  useLayoutEffect(() => {
    if (parentRef.current) {
      setTableTopOffset(parentRef.current.offsetTop);
    }
  }, []);

  // We use window virtualizer as the main scroll is usually window
  const virtualizer = useWindowVirtualizer({
    count: invoices.length,
    estimateSize: () => 80, // Avg row height
    overscan: 10,
    scrollMargin: tableTopOffset,
  });

  return (
    <div ref={mobileParentRef}>
      {/* VIRTUALIZED MOBILE VIEW */}
      <div className="md:hidden relative" style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map((virtualRow: VirtualItem) => {
          const inv = invoices[virtualRow.index];
          return (
            <div
              key={inv.id}
              className="absolute top-0 left-0 w-full bg-white border border-slate-200 rounded-lg p-4 shadow-sm active:scale-[0.99] transition-transform"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`,
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-mono text-xs font-bold text-slate-500 mb-1">{inv.number}</p>
                  <h3 className="font-bold text-slate-900 text-lg">{inv.patientName}</h3>
                  <p className="text-xs text-slate-400">
                    {format(new Date(inv.date), 'dd/MM/yyyy')}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border ${inv.status === 'PAID'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : inv.status === 'PENDING'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                  >
                    {inv.status === 'PAID' && <CheckCircle size={10} />}
                    {inv.status === 'PENDING' && <Clock size={10} />}
                    {inv.status === 'PAID'
                      ? 'PAGADO'
                      : inv.status === 'PENDING'
                        ? 'PENDIENTE'
                        : inv.status}
                  </span>
                  <p className="text-xl font-black text-slate-900 mt-1">{inv.total.toFixed(2)}€</p>
                </div>
              </div>

              {/* ACTIONS PRE-RENDERED FOR PERF */}
              <div className="flex justify-between gap-2 mt-2 pt-2 border-t border-slate-50">
                <button
                  onClick={() =>
                    settings &&
                    PdfGenerator.generateInvoice(inv, settings, settings.billing?.logoUrl)
                  }
                  className="flex items-center justify-center gap-2 text-slate-600 px-3 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-xs active:scale-95 transition-transform touch-manipulation min-h-[44px]"
                >
                  <Download size={16} />
                  {t('sidebar.billing.actions.pdf') || 'PDF'}
                </button>
                {inv.status === 'PENDING' && (
                  <button
                    onClick={() => onMarkPaid(inv)}
                    className="flex-1 text-xs text-center bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-sm active:scale-95 transition-transform touch-manipulation min-h-[44px]"
                  >
                    {t('sidebar.billing.actions.charge') || 'COBRAR'}
                  </button>
                )}
                <button
                  onClick={() => onDelete(inv.id)}
                  className="text-red-400 p-3 rounded-md active:bg-red-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  title="Eliminar"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* VIRTUALIZED DESKTOP TABLE */}
      <div
        className="hidden md:block overflow-x-auto relative"
        style={{ minHeight: `${virtualizer.getTotalSize()}px` }}
      >
        <table ref={parentRef} className="w-full text-sm text-left table-fixed">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 w-32">Estado</th>
              <th className="px-6 py-4 w-32">Número</th>
              <th className="px-6 py-4 w-64">Cliente</th>
              <th className="px-6 py-4 w-32">Fecha</th>
              <th className="px-6 py-4 w-32 text-right">Total</th>
              <th className="px-6 py-4 w-40 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {virtualizer.getVirtualItems().map((virtualRow: VirtualItem) => {
              const inv = invoices[virtualRow.index];
              return (
                <tr
                  key={inv.id}
                  className="hover:bg-slate-50/50 transition-colors group absolute w-full flex items-center border-b border-slate-50"
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`, // Adjust for header offset if needed
                    top: 50, // Header height offset
                  }}
                >
                  <td className="px-6 py-4 w-32">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide shadow-sm ${inv.status === 'PAID'
                        ? 'bg-emerald-500 text-white border border-emerald-600'
                        : inv.status === 'PENDING'
                          ? 'bg-amber-400 text-amber-900 border border-amber-500'
                          : 'bg-slate-200 text-slate-600 border border-slate-300'
                        }`}
                    >
                      {inv.status === 'PAID'
                        ? 'PAGADO'
                        : inv.status === 'PENDING'
                          ? 'PENDIENTE'
                          : inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-700 w-32">
                    {inv.number}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 w-64 truncate">
                    {inv.patientName}
                  </td>
                  <td className="px-6 py-4 text-slate-500 w-32">
                    {format(new Date(inv.date), 'dd/MM/yyyy')}
                  </td>
                  <td className="px-6 py-4 text-right font-black text-slate-900 w-32">
                    {inv.total.toFixed(2)}€
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2 w-40">
                    {/* Actions Always Visible */}
                    <button
                      onClick={() =>
                        settings &&
                        PdfGenerator.generateInvoice(inv, settings, settings.billing?.logoUrl)
                      }
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                      title={t('sidebar.billing.actions.pdf') || 'Descargar'}
                    >
                      <FileText size={18} />
                    </button>

                    {inv.status === 'PENDING' ? (
                      <button
                        onClick={() => onMarkPaid(inv)}
                        className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition-colors"
                        title={t('sidebar.billing.actions.charge') || 'Cobrar'}
                      >
                        <CheckCircle size={18} />
                      </button>
                    ) : inv.status === 'PAID' ? (
                      <div className="text-emerald-300 p-2" title="Cobrado">
                        <CheckCircle size={18} />
                      </div>
                    ) : null}

                    <button
                      onClick={() => onDelete(inv.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
