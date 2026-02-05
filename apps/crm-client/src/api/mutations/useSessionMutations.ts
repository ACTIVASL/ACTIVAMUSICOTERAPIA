import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SessionRepository } from '../../data/repositories/SessionRepository';
import { Session } from '../../lib/types';
import { queryKeys } from '../queryKeys';

// TITANIUM STANDARD: TRUTH OVER SPEED
// We prioritized optimistic updates previously, which caused UI/DB desync ("Ghost Data").
// The new strategy is "Invalidate & Refetch". We wait for the DB to confirm, then we show it.

export function useUpdateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      patientId: string;
      sessionId: string;
      data: Partial<Session>;
    }) => {
      // 1. Perform the Dual-Write / Auto-Heal operation
      await SessionRepository.update(payload.patientId, payload.sessionId, payload.data);
      return payload;
    },
    onError: (error) => {
      console.error('[Titanium] Update Failed:', error);
      // No rollback needed because we didn't optimistic update.
      // Just ensure we are in sync.
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
    },
    onSuccess: () => {
      // 2. Force Hard Refresh
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { patientId: string; session: Omit<Session, 'id'> }) => {
      const tempId = Date.now().toString();
      const sessionWithId = { ...payload.session, id: tempId };

      // 1. Perform Dual-Write
      await SessionRepository.create(payload.patientId, sessionWithId);

      return { ...sessionWithId, patientId: payload.patientId };
    },
    onError: (error) => {
      console.error('[Titanium] Create Failed:', error);
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
    onSuccess: () => {
      // 2. Force Hard Refresh
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { patientId: string; sessionId: string }) => {
      await SessionRepository.delete(payload.patientId, payload.sessionId);
      return payload;
    },
    onError: (error) => {
      console.error('[Titanium] Delete Failed:', error);
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
    onSuccess: () => {
      // 2. Force Hard Refresh
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
  });
}
