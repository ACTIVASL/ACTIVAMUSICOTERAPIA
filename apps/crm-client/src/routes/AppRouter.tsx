import React, { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppRoutes } from './AppRoutes';
import { useUIStore } from '../stores/useUIStore';
import { Patient, GroupSession, NavigationPayload } from '../lib/types';

// Simple Loader integrated to avoid circular dep or excessive files for now
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-slate-50">
    <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-pink-500 animate-spin" />
  </div>
);

interface AppRouterProps {
  patients: Patient[];
  groupSessions: GroupSession[];
  onNavigate: (view: string, data?: NavigationPayload) => void;
  onUpdatePatient: (updatedPatient: Patient) => Promise<void>;
  onNewPatient: (newPatientData: Partial<Patient>) => Promise<void>;
  setIsCreateGroupOpen: (open: boolean) => void;
}

export const AppRouter: React.FC<AppRouterProps> = ({
  patients,
  groupSessions,
  onNavigate,
  onUpdatePatient,
  onNewPatient,
  setIsCreateGroupOpen,
}) => {
  const quickAppointment = useUIStore((state) => state.quickAppointment);
  const groupSession = useUIStore((state) => state.groupSession);

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <AppRoutes
          patients={patients}
          groupSessions={groupSessions}
          onNavigate={onNavigate}
          onUpdatePatient={onUpdatePatient}
          onNewPatient={onNewPatient}
          onNewGroup={() => setIsCreateGroupOpen(true)}
          onOpenGroupModal={(mode, data) =>
            groupSession.open(data ? undefined : undefined, mode, data)
          }
          onOpenQuickAppointment={(mode) => quickAppointment.open(mode)}
        />
      </AnimatePresence>
    </Suspense>
  );
};
