import { useState, useEffect, useCallback } from 'react';
import { Download, X, Share, PlusSquare } from 'lucide-react';
import { Button } from '@monorepo/ui-system';

// Define the BeforeInstallPromptEvent interface
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PwaInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Detect if already installed (standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return;

    // Android / Desktop Chrome Handler
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Wait a bit before showing to not be annoying immediately on load
      setTimeout(() => setIsVisible(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // For iOS, check if it's not standalone and show prompt after a delay
    if (isIosDevice && !isStandalone) {
      // Check if we've shown it recently to avoid spam (localStorage)
      const lastShown = localStorage.getItem('pwa_prompt_shown');
      const now = Date.now();
      if (!lastShown || now - Number(lastShown) > 1000 * 60 * 60 * 24 * 7) { // 7 days
        setTimeout(() => setIsVisible(true), 3000);
      }
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) return;

    setIsVisible(false);
    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      // Log removed for production
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('pwa_prompt_shown', Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 p-5 rounded-2xl shadow-2xl flex flex-col gap-4 text-white relative overflow-hidden">
        {/* Glossy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

        <div className="flex justify-between items-start gap-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-lg shrink-0">
              <img src="/pwa-192x192.png" alt="App Icon" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Activa CRM</h3>
              <p className="text-slate-400 text-sm">Instala la App Oficial</p>
            </div>
          </div>
          <button onClick={handleDismiss} className="text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {isIOS ? (
          <div className="bg-slate-800/50 rounded-xl p-3 text-xs text-slate-300 space-y-2">
            <p className="flex items-center gap-2">
              1. Pulsa el botón <Share size={14} className="text-blue-400" /> <b>Compartir</b>
            </p>
            <p className="flex items-center gap-2">
              2. Selecciona <PlusSquare size={14} className="text-slate-200" /> <b>Añadir a Inicio</b>
            </p>
          </div>
        ) : (
          <Button
            onClick={handleInstallClick}
            className="w-full bg-[#EC008C] hover:bg-[#D1007A] text-white border-none shadow-lg shadow-pink-900/50"
            icon={Download}
          >
            Instalar Aplicación
          </Button>
        )}
      </div>
    </div>
  );
};
