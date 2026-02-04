import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PatientRepository } from '../data/repositories/PatientRepository';
import { SettingsRepository } from '../data/repositories/SettingsRepository';
import { auth } from '@monorepo/engine-auth';
import { Patient, ClinicSettings } from '../lib/types';
import { INITIAL_PATIENTS } from '../lib/seeds';
// import { PatientSchema as _PatientSchema } from '@monorepo/shared';
// Removed unused import to satisfy linter.
import { queryKeys } from './queryKeys';

// -- HOOKS --

export function usePatients(demoMode: boolean) {
    const uid = auth.currentUser?.uid;
    const email = auth.currentUser?.email; // TITANIUM CHECK
    // Force Demo Mode at Data Level if email matches
    const effectiveDemoMode = demoMode || email === 'demo@activamusicoterapia.com';

    return useQuery({
        queryKey: [...queryKeys.patients.all, { demoMode: effectiveDemoMode, uid }],
        queryFn: async () => {
            if (effectiveDemoMode) {
                // TITANIUM DEMO PERSISTENCE (LocalStorage)
                const stored = localStorage.getItem('demo_patients');
                if (stored) {
                    try {
                        const parsed = JSON.parse(stored);
                        if (Array.isArray(parsed) && parsed.length > 0) return parsed as Patient[];
                    } catch (e) {
                        console.warn("Corrupt demo data, resetting.", e);
                    }
                }
                // Initialize if empty
                localStorage.setItem('demo_patients', JSON.stringify(INITIAL_PATIENTS));
                return INITIAL_PATIENTS;
            }
            const rawData = await PatientRepository.getAll();

            // TITANIUM OPTIMIZATION: Removed heavy runtime validation loop.
            // Trusting DB data for read performance ("Fluidity First").
            // Validation happens strictly on WRITE (Mutations).
            return rawData as Patient[];
        },
        enabled: true,
        staleTime: 0, // TITANIUM REALTIME: Always fresh
    });
}

export function useSettings(demoMode: boolean) {
    const uid = auth.currentUser?.uid;
    return useQuery({
        queryKey: [...queryKeys.settings.all, { demoMode, uid }],
        queryFn: async () => {
            if (demoMode) {
                return {
                    name: 'Mi Clínica',
                    address: '',
                    phone: '',
                    email: '',
                    website: '',
                    cif: 'DEMO-123',
                    legalText: 'Modo demostración.',
                } as ClinicSettings;
            }
            if (!uid) return {} as ClinicSettings;
            return await SettingsRepository.get(uid);
        },
        enabled: true,
    });
}

// -- MUTATIONS --

type CreatePatientPayload = Omit<Patient, 'id'>;

export function useCreatePatient(demoMode: boolean) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: CreatePatientPayload) => {
            if (demoMode) {
                // TITANIUM DEMO PERSISTENCE
                const newPatient = { id: Date.now().toString(), ...payload } as Patient;
                const stored = localStorage.getItem('demo_patients');
                const current = stored ? JSON.parse(stored) : INITIAL_PATIENTS;
                const updated = [...current, newPatient];
                localStorage.setItem('demo_patients', JSON.stringify(updated));
                return newPatient;
            }
            // TITANIUM ACID TRANSACTION
            const newId = await PatientRepository.create(payload);
            return { id: newId, ...payload } as Patient;
        },
        onSuccess: (newPatient) => {
            // Optimistic Update or Invalidation
            queryClient.setQueryData(queryKeys.patients.all, (old: Patient[] | undefined) => {
                return old ? [...old, newPatient] : [newPatient];
            });
            queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
        },
    });
}

export function useUpdatePatient(demoMode: boolean) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (patient: Patient) => {
            if (demoMode) return patient;
            if (!patient.id) throw new Error("ID de paciente requerido");
            // PatientRepository.update returns void, so we just await it and return the input patient
            await PatientRepository.update(String(patient.id), patient);
            return patient;
        },
        // ⚡ TITANIUM OPTIMISTIC UI ⚡
        onMutate: async (newPatient) => {
            // 1. Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: queryKeys.patients.all });

            // 2. Snapshot the previous value
            const previousPatients = queryClient.getQueryData<Patient[]>(queryKeys.patients.all);

            // 3. Optimistically update to the new value
            queryClient.setQueryData(queryKeys.patients.all, (old: Patient[] | undefined) => {
                return old ? old.map(p => String(p.id) === String(newPatient.id) ? { ...p, ...newPatient } : p) : [];
            });

            // 4. Return a context object with the snapshotted value
            return { previousPatients };
        },
        onError: (_err, _newPatient, context) => {
            // 5. Rollback on error
            if (context?.previousPatients) {
                queryClient.setQueryData(queryKeys.patients.all, context.previousPatients);
            }
        },
        onSettled: () => {
            // 6. Always refetch after error or success to ensure synchronization
            queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
        },
    });
}

export function useUpdateSettings(demoMode: boolean) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (settings: ClinicSettings) => {
            const uid = auth.currentUser?.uid;
            if (demoMode) return { success: true };
            if (!uid) throw new Error("No user");
            await SettingsRepository.update(uid, settings);
            return { success: true };
        },
        onSuccess: (_, newSettings) => {
            queryClient.setQueryData(queryKeys.settings.all, newSettings);
            queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
        },
    });
}

export function useDeletePatient(demoMode: boolean) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            if (demoMode) return { success: true };
            await PatientRepository.delete(id);
            return { success: true };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
        },
    });
}
