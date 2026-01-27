import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { format } from 'date-fns';
import { useWindowVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import { Euro, TrendingUp, AlertCircle, CheckCircle, Clock, Plus, Trash2, FileText, Search } from 'lucide-react';
import { Card, Button, Skeleton } from '@monorepo/ui-system';
import { useInvoiceController } from '../../hooks/controllers/useInvoiceController';
import { Invoice, InvoiceStatus } from '@monorepo/shared';
import { useSettingsController } from '../../hooks/controllers/useSettingsController';
import { PdfGenerator } from '../../lib/PdfGenerator';
import { InvoiceWizardModal } from './InvoiceWizardModal';

import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { ClinicSettings } from '../../lib/types';

export const BillingView = () => {
    const { t } = useTranslation();
    const { invoices, updateStatus, deleteInvoice, isLoading } = useInvoiceController();
    const { settings } = useSettingsController(); // TITANIUM SETTINGS
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'ALL'>('ALL');
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    // Calc KPIs
    const stats = useMemo(() => {
        const totalRevenue = invoices.filter(i => i.status === 'PAID').reduce((acc, curr) => acc + curr.total, 0);
        const pendingAmount = invoices.filter(i => i.status === 'PENDING').reduce((acc, curr) => acc + curr.total, 0);
        const currentMonthRevenue = invoices
            .filter(i => i.status === 'PAID' && i.date.startsWith(new Date().toISOString().slice(0, 7)))
            .reduce((acc, curr) => acc + curr.total, 0);
        return { totalRevenue, pendingAmount, currentMonthRevenue };
    }, [invoices]);

    // Filter
    const filteredInvoices = invoices.filter(inv => {
        const matchesSearch = inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || inv.number.toLowerCase().includes(searchTerm.toLowerCase());
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
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t('sidebar.billing.title')}</h1>
                    <p className="text-slate-500">{t('sidebar.billing.subtitle')}</p>
                </div>
                <Button onClick={() => setIsWizardOpen(true)} icon={Plus}>{t('sidebar.billing.actions.new_invoice')}</Button>
            </header>

            {/* KPIs */}
            {/* KPIs - MOBILE: HORIZONTAL SCROLL / DESKTOP: GRID */}
            <div className="flex overflow-x-auto snap-x snap-mandatory pt-2 pb-4 gap-4 -mx-4 px-4 md:grid md:grid-cols-3 md:gap-6 md:mx-0 md:px-0 md:overflow-visible hide-scrollbar">
                <Card className="min-w-[85vw] snap-center md:min-w-0 p-6 border-l-4 border-emerald-500 shadow-sm md:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('sidebar.billing.kpis.revenue_year')}</p>
                            <p className="text-3xl font-black text-emerald-600 tracking-tighter">{stats.totalRevenue.toFixed(2)}€</p>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </Card>
                <Card className="min-w-[85vw] snap-center md:min-w-0 p-6 border-l-4 border-amber-500 shadow-sm md:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('sidebar.billing.kpis.pending')}</p>
                            <p className="text-3xl font-black text-amber-600 tracking-tighter">{stats.pendingAmount.toFixed(2)}€</p>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                            <AlertCircle size={24} />
                        </div>
                    </div>
                </Card>
                <Card className="min-w-[85vw] snap-center md:min-w-0 p-6 border-l-4 border-indigo-500 shadow-sm md:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('sidebar.billing.kpis.month')}</p>
                            <p className="text-3xl font-black text-indigo-600 tracking-tighter">{stats.currentMonthRevenue.toFixed(2)}€</p>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                            <Euro size={24} />
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
                                {status === 'ALL' ? t('sidebar.billing.filters.all') :
                                    status === 'DRAFT' ? t('sidebar.billing.filters.draft') :
                                        status === 'PENDING' ? t('sidebar.billing.filters.pending') :
                                            t('sidebar.billing.filters.paid')}
                            </button>
                        ))}
                    </div>
                </div>

                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-4 p-4 border border-slate-100 rounded-xl bg-white">
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

const BillingListVirtualizer = ({ invoices, onMarkPaid, onDelete, settings, t }: BillingListProps) => {
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
                            className="absolute top-0 left-0 w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm active:scale-[0.99] transition-transform"
                            style={{
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`,
                            }}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="font-mono text-xs font-bold text-slate-500 mb-1">{inv.number}</p>
                                    <h3 className="font-bold text-slate-900 text-lg">{inv.patientName}</h3>
                                    <p className="text-xs text-slate-400">{format(new Date(inv.date), 'dd/MM/yyyy')}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wide border ${inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                                        inv.status === 'PENDING' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                            'bg-slate-100 text-slate-600 border-slate-200'
                                        }`}>
                                        {inv.status === 'PAID' && <CheckCircle size={10} />}
                                        {inv.status === 'PENDING' && <Clock size={10} />}
                                        {inv.status}
                                    </span>
                                    <p className="text-xl font-black text-slate-900 mt-1">{inv.total.toFixed(2)}€</p>
                                </div>
                            </div>

                            {/* ACTIONS PRE-RENDERED FOR PERF */}
                            <div className="flex justify-between gap-2 mt-2 pt-2 border-t border-slate-50">
                                <button onClick={() => settings && PdfGenerator.generateInvoice(inv, settings, settings.billing?.logoUrl)} className="text-xs text-blue-600 font-bold">{t('sidebar.billing.actions.pdf') || 'PDF'}</button>
                                {inv.status === 'PENDING' && <button onClick={() => onMarkPaid(inv)} className="text-xs text-emerald-600 font-bold">{t('sidebar.billing.actions.charge') || 'COBRAR'}</button>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* VIRTUALIZED DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto relative" style={{ minHeight: `${virtualizer.getTotalSize()}px` }}>
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
                                        top: 50 // Header height offset
                                    }}
                                >
                                    <td className="px-6 py-4 w-32">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border ${inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                                            inv.status === 'PENDING' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                                'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono font-bold text-slate-700 w-32">{inv.number}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900 w-64 truncate">{inv.patientName}</td>
                                    <td className="px-6 py-4 text-slate-500 w-32">{format(new Date(inv.date), 'dd/MM/yyyy')}</td>
                                    <td className="px-6 py-4 text-right font-black text-slate-900 w-32">{inv.total.toFixed(2)}€</td>
                                    <td className="px-6 py-4 text-center flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity w-40">
                                        {/* Actions... shortened for brevity in virtualization render */}
                                        <button onClick={() => settings && PdfGenerator.generateInvoice(inv, settings, settings.billing?.logoUrl)} className="text-blue-600"><FileText size={16} /></button>
                                        {inv.status === 'PENDING' && <button onClick={() => onMarkPaid(inv)} className="text-emerald-600"><CheckCircle size={16} /></button>}
                                        <button onClick={() => onDelete(inv.id)} className="text-red-600"><Trash2 size={16} /></button>
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
