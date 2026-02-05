import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { Search, Plus } from 'lucide-react';
import { Button } from '@monorepo/ui-system';
import { Card } from '@monorepo/ui-system';

import { PatientAvatar } from '@monorepo/ui-system';
import { Patient } from '../../lib/types'; // Updated import
import { PATHOLOGY_MAP } from '../../lib/patientUtils';
import { EditProfileModal } from './modals/EditProfileModal';
import { useFirebaseAuthState as useAuth } from '@monorepo/engine-auth';
import { PaywallModal } from '@monorepo/ui-system';
// import { BirthdayRadar } from '@monorepo/ui-system';

interface PatientsDirectoryProps {
  patients: Patient[];

  onSelectPatient: (patient: Patient) => void;
  // onNavigate removed (unused)

  onNewPatient: (data: Omit<Patient, 'id'>) => void;
  initialFilter?: 'all' | 'adults' | 'kids';
  demoMode?: boolean; // Added missing prop
}

export const PatientsDirectory: React.FC<PatientsDirectoryProps> = ({
  patients,
  onSelectPatient,
  onNewPatient,
  initialFilter = 'all',
  demoMode = false, // Default to false
}) => {
  // const [activeTab, setActiveTab] = useState<'individual' | 'groups'>('individual');
  // Removed groups tab logic as requested
  const [search, setSearch] = useState('');
  const [filterPathology, setFilterPathology] = useState('all');
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const { isPremium } = useAuth(); // Destructure isPremium from useAuth()

  // Business Rule: Free tier allows up to 2 patients.
  // TITANIUM DEMO RULE: "Después de ingresar dos pacientes sale la opción"
  // Seeds: 5. Allow 2 New Creations. Total: 7.
  const FREE_LIMIT = 2;
  const DEMO_LIMIT = 7; // 5 Seeds + 2 New Creations = 7. 8th triggers paywall.

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'new') {
      setIsAdmissionOpen(true);
      // Optional: Clear param to avoid re-opening on refresh?
      // For now, keep it simple. User might want to refresh if it failed.
    }
  }, [location.search]);

  const handleNewPatientClick = () => {
    const currentLimit = demoMode ? DEMO_LIMIT : FREE_LIMIT;
    const isOverLimit = patients.length >= currentLimit;

    if (!isPremium && isOverLimit) {
      setShowPaywall(true);
      return;
    }
    setIsAdmissionOpen(true);
  };

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.diagnosis.toLowerCase().includes(search.toLowerCase());

      const matchesPathology = filterPathology === 'all' || p.pathologyType === filterPathology;

      let matchesAge = true;
      if (initialFilter === 'adults') matchesAge = (p.age as number) >= 15;
      // Teens removed. Children is strictly < 15
      if (initialFilter === 'kids') matchesAge = (p.age as number) < 15;

      return matchesSearch && matchesPathology && matchesAge;
    });
  }, [patients, search, filterPathology, initialFilter]);

  // VIRTUALIZATION LOGIC
  // VIRTUALIZATION LOGIC
  // moved to top

  // Helper for responsive grid columns
  const useColumns = () => {
    const [cols, setCols] = useState(1);
    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        if (width >= 1280)
          setCols(4); // xl
        else if (width >= 1024)
          setCols(3); // lg
        else if (width >= 768)
          setCols(2); // md
        else setCols(1);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return cols;
  };

  const columns = useColumns();
  const parentRef = useRef<HTMLDivElement>(null);

  // Calculate rows for grid
  const rowCount = Math.ceil(filteredPatients.length / columns);

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 400, // Balanced spacing
    overscan: 5,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
  });

  // ... inside component render, before header or tabs
  return (
    <div ref={parentRef} className="space-y-6 animate-in fade-in max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Directorio de Pacientes
          </h1>
          <p className="text-slate-500 font-medium">Gestión clínica y administrativa</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleNewPatientClick} icon={Plus} variant="primary">
            Nueva Admisión
          </Button>
        </div>
      </div>

      {/* Tabs & Filters */}
      <Card className="p-1">
        <div className="flex flex-col md:flex-row gap-4 p-2">
          {/* Main Tabs */}

          <div className="h-8 w-px bg-slate-200 hidden md:block self-center" />

          {/* Search */}
          <div className="flex-1 relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar por nombre, diagnóstico..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg font-medium text-slate-900 focus:ring-2 focus:ring-pink-500/20 transition-all outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Pathology Filter (Always visible now) */}
          <select
            className="bg-slate-50 font-bold text-sm text-slate-600 rounded-lg border-none focus:ring-2 focus:ring-pink-500/20 py-2 pl-4 pr-8 cursor-pointer outline-none"
            value={filterPathology}
            onChange={(e) => setFilterPathology(e.target.value)}
          >
            <option value="all">Todas las Patologías</option>
            <option value="dementia">Demencias</option>
            <option value="neuro">Neurodesarrollo</option>
            <option value="mood">Salud Mental</option>
            <option value="other">Otros</option>
          </select>
        </div>
      </Card>

      {/* VIRTUALIZED CONTENT */}
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columns;
          const rowPatients = filteredPatients.slice(startIndex, startIndex + columns);

          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`,
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 pb-8"
            >
              {rowPatients.map((p) => (
                <Card
                  key={p.id}
                  hoverable
                  onClick={() => onSelectPatient(p)}
                  className="cursor-pointer group relative overflow-hidden border border-slate-200 h-full"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <div className="flex flex-col items-center text-center">
                    <PatientAvatar name={p.name} photo={p.photo} size="lg" />
                    <h3 className="font-bold text-slate-900 mt-4 text-lg group-hover:text-pink-600 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded-md mt-2">
                      {PATHOLOGY_MAP[p.diagnosis] || p.diagnosis}
                    </p>

                    <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-6 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                          Edad
                        </p>
                        <p className="font-bold text-slate-700">{p.age} años</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                          Sesiones
                        </p>
                        <p className="font-bold text-slate-700">{p.sessions?.length || 0}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          );
        })}
      </div>

      {isAdmissionOpen && (
        <EditProfileModal
          onClose={() => setIsAdmissionOpen(false)}
          onSave={(data) => {
            onNewPatient(data as Omit<Patient, 'id'>);
            setIsAdmissionOpen(false);
          }}
        />
      )}

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        limitType="patient"
      />
    </div>
  );
};
