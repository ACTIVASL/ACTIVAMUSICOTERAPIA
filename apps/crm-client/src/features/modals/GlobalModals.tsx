import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QuickAppointmentModal } from '../../features/sessions/modals/QuickAppointmentModal';
import { CreateGroupModal } from '../../features/patients/modals/CreateGroupModal';
import { GroupSessionModal } from '../../features/sessions/modals/GroupSessionModal';
import { useUIStore } from '../../stores/useUIStore';
import { Patient, GroupSession } from '../../lib/types';

interface GlobalModalsProps {
  patients: Patient[];
  groupSessions: GroupSession[]; // Although App.tsx passed individual data to GroupSessionModal, it used a specific selected one.
  // Wait, App.tsx logic for GroupSessionModal uses `groupSession` from store which has `data`.
  // App.tsx passed `initialData={groupSession.data}`.

  isCreateGroupOpen: boolean;
  setIsCreateGroupOpen: (open: boolean) => void;
  onSaveGroupSession: (data: GroupSession) => Promise<void>;
  onDeleteGroupSession: (sessionId: string) => Promise<void>;
  onQuickAppointment: (data: {
    date: string;
    time: string;
    name: string;
    mode: 'new' | 'existing';
    patientId?: string | number;
  }) => Promise<void>;
}

export const GlobalModals: React.FC<GlobalModalsProps> = ({
  patients,
  isCreateGroupOpen,
  setIsCreateGroupOpen,
  onSaveGroupSession,
  onDeleteGroupSession,
  onQuickAppointment,
}) => {
  const navigate = useNavigate();
  const quickAppointment = useUIStore((state) => state.quickAppointment);
  const groupSession = useUIStore((state) => state.groupSession);

  return (
    <>
      {quickAppointment.isOpen && (
        <QuickAppointmentModal
          mode={quickAppointment.mode}
          patients={patients}
          onClose={() => quickAppointment.close()}
          onSave={onQuickAppointment}
        />
      )}

      {groupSession.isOpen && (
        <GroupSessionModal
          initialGroupName={groupSession.initialGroupName}
          mode={groupSession.mode}
          initialData={groupSession.data}
          patients={patients}
          onClose={() => groupSession.close()}
          onSave={onSaveGroupSession}
          onDelete={onDeleteGroupSession}
        />
      )}

      {isCreateGroupOpen && (
        <CreateGroupModal
          onClose={() => setIsCreateGroupOpen(false)}
          onSave={(name) => {
            setIsCreateGroupOpen(false);
            navigate(`/groups/${encodeURIComponent(name)}`);
          }}
        />
      )}
    </>
  );
};
