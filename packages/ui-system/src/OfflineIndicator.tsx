import { useState, useEffect } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useMutationState } from '@tanstack/react-query';

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Track mutations that are failing or paused (offline queue)
  // 'pending' status covers both active requests and paused (offline) requests.
  const pendingMutations = useMutationState({
    filters: { status: 'pending' },
  });

  const totalQueued = pendingMutations.length;

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 1. OFFLINE STATE (Red/Dark)
  if (!isOnline) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 z-[100] flex items-center justify-center gap-3 animate-in slide-in-from-bottom-full border-t border-slate-700 shadow-xl">
        <WifiOff size={18} className="text-red-400 animate-pulse" />
        <div className="flex flex-col items-center md:items-start">
          <span className="font-bold text-sm">Sin conexión a Internet</span>
          <span className="text-xs text-slate-300">
            {totalQueued > 0
              ? `${totalQueued} cambios guardados localmente (se subirán al reconectar)`
              : 'Modo lectura habilitado'}
          </span>
        </div>
      </div>
    );
  }

  // 2. ONLINE BUT SYNCING (Yellow/Orange)
  if (isOnline && totalQueued > 0) {
    return (
      <div className="fixed bottom-4 right-4 bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-lg shadow-lg z-[100] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 max-w-sm">
        <RefreshCw size={18} className="text-orange-600 animate-spin" />
        <div className="flex flex-col">
          <span className="font-bold text-sm">Sincronizando cambios...</span>
          <span className="text-xs text-orange-600/80">{totalQueued} operaciones pendientes</span>
        </div>
      </div>
    );
  }

  // 3. RECENTLY SYNCED (Optimal feedback loop? Optional logic could go here)
  // For now, we disappear when clean.

  return null;
};
