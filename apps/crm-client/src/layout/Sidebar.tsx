import React, { useState, useCallback, memo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Users,
  Calendar,
  Activity,
  Settings,
  LogOut,
  X,
  Sparkles,
  FileText,
  ChevronLeft,
  ChevronRight,
  Fingerprint,
  Receipt,
  User,
  Baby,
  Contact,
  LucideIcon,
} from 'lucide-react';
import { useFirebaseAuthState as useAuth } from '@monorepo/engine-auth';
import { useTranslation } from 'react-i18next';

import logoCircular from '../assets/logo-alpha.png';
import { SidebarAgenda } from './SidebarAgenda';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userEmail?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onLogout?: () => void;
  events?: Array<{
    date: string;
    time: string;
    type: 'individual' | 'group';
    patientName?: string;
  }>;
}

// --- VISUAL COMPONENTS (MEMOIZED) ---

interface SidebarItemProps {
  id: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onClick: (id: string) => void;
  onPrefetch: (id: string) => void;
  customColor?: string;
}

const SidebarItem = memo(({
  id,
  icon: Icon,
  label,
  isActive,
  isCollapsed,
  isMobileOpen,
  onClick,
  onPrefetch,
  customColor
}: SidebarItemProps) => {
  const handleClick = useCallback(() => onClick(id), [id, onClick]);
  const handleMouseEnter = useCallback(() => onPrefetch(id), [id, onPrefetch]);

  const showLabel = !isCollapsed || isMobileOpen;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`
        w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 group relative
        ${isActive
          ? 'bg-slate-100 text-pink-600 font-bold'
          : 'text-slate-500 hover:bg-slate-50'
        }
        ${isCollapsed && !isMobileOpen ? 'justify-center px-0' : ''}
      `}
      title={isCollapsed ? label : undefined}
    >
      <Icon
        size={18}
        strokeWidth={1.5}
        className={isActive ? (customColor || 'text-pink-500') : 'text-slate-400'}
      />
      {showLabel && <span className="text-sm">{label}</span>}
    </button>
  );
});

SidebarItem.displayName = 'SidebarItem';

// --- MAIN COMPONENT ---

export const Sidebar: React.FC<SidebarProps> = memo(({
  currentView,
  onNavigate,
  userEmail,
  isOpen = false,
  onClose,
  onLogout,
}) => {
  const { user, demoMode } = useAuth();
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const queryClient = useQueryClient();

  // --- HANDLERS ---

  const handleNavigate = useCallback((id: string) => {
    onNavigate(id);
    if (onClose) onClose();
  }, [onNavigate, onClose]);

  const handlePrefetch = useCallback(async (id: string) => {
    const uid = user?.uid;
    const baseContext = { demoMode, uid };

    try {
      if (id.startsWith('patients')) {
        const { PatientRepository } = await import('../data/repositories/PatientRepository');
        const { queryKeys } = await import('../api/queryKeys');
        queryClient.prefetchQuery({
          queryKey: [...queryKeys.patients.all, baseContext],
          queryFn: () => PatientRepository.getAll(),
          staleTime: 1000 * 60 * 5
        });
      }
      else if (id === 'group-sessions' || id === 'groups') {
        const { GroupSessionRepository } = await import('../data/repositories/GroupSessionRepository');
        queryClient.prefetchQuery({
          queryKey: ['groupSessions', baseContext],
          queryFn: () => GroupSessionRepository.getAll(),
          staleTime: 1000 * 60 * 5
        });
      }
      else if (id === 'calendar' || id === 'sessions') {
        // Reuse Logic
        const { PatientRepository } = await import('../data/repositories/PatientRepository');
        const { queryKeys } = await import('../api/queryKeys');
        queryClient.prefetchQuery({
          queryKey: [...queryKeys.patients.all, baseContext],
          queryFn: () => PatientRepository.getAll(),
          staleTime: 1000 * 60 * 5
        });
      }
    } catch (e) {
      console.warn('Prefetch failed silently', e);
    }
  }, [queryClient, user?.uid, demoMode]);

  const toggleCollapse = useCallback(() => setCollapsed(prev => !prev), []);

  const showLabels = !collapsed || isOpen;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`
            fixed md:sticky top-0 h-screen transition-all duration-300 ease-out z-50
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            ${collapsed ? 'md:w-24' : 'w-72 md:w-80'}
            flex flex-col border-r border-slate-200
            bg-white/90 backdrop-blur-xl shadow-2xl
        `}
      >
        {/* Glossy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-slate-100/20 pointer-events-none"></div>

        {/* Header */}
        <div className={`p-6 flex items-center ${collapsed ? 'justify-center' : 'justify-between'} border-b border-slate-200/60 relative z-10`}>
          <div className={`flex items-center gap-3 transition-all duration-300 ${collapsed ? 'scale-90' : ''} group cursor-pointer`}>
            {/* Logo Logic */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-pink-500/20 to-transparent flex items-center justify-center shadow-md shadow-pink-500/10 ring-1 ring-white overflow-hidden bg-white">
                <img src={logoCircular} alt="Activa Logo" className="w-full h-full object-cover rounded-full" width="48" height="48" />
              </div>
            </div>
            {!collapsed && (
              <div className="flex flex-col justify-center animate-in fade-in slide-in-from-left-2 duration-500">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5 flex items-center gap-1">
                  Clínica <ChevronRight size={10} className="rotate-90" />
                </span>
                <span className="text-sm font-black tracking-tight text-slate-800 leading-none group-hover:text-pink-600 transition-colors">
                  ACTIVA
                </span>
              </div>
            )}
          </div>

          <button
            onClick={toggleCollapse}
            className="hidden md:flex w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 items-center justify-center text-slate-400 hover:text-slate-600 transition-colors border border-slate-200 shadow-sm"
          >
            {collapsed ? <ChevronRight size={14} strokeWidth={1.5} /> : <ChevronLeft size={14} strokeWidth={1.5} />}
          </button>

          <button
            onClick={onClose}
            className="md:hidden w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 active:bg-slate-200"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto custom-scrollbar relative z-10">

          {/* DASHBOARD (Special Styling) */}
          <button
            onClick={() => handleNavigate('dashboard')}
            onMouseEnter={() => handlePrefetch('dashboard')}
            className={`
                w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative
                ${currentView === 'dashboard'
                ? 'bg-gradient-to-r from-slate-100 to-white text-[#EC008C] shadow-md shadow-slate-200 border border-slate-200'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent'
              }
                ${collapsed && !isOpen ? 'justify-center px-0' : ''}
            `}
          >
            {currentView === 'dashboard' && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-[#EC008C] rounded-r-full shadow-[0_0_8px_#EC008C]"></div>
            )}
            <Activity
              size={20}
              strokeWidth={1.5}
              className={`transition-transform duration-300 ${currentView === 'dashboard' ? 'scale-110 drop-shadow-sm text-pink-600' : 'group-hover:scale-110 text-slate-400'}`}
            />
            {showLabels && (
              <span className={`font-medium text-sm tracking-wide ${currentView === 'dashboard' ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                {t('sidebar.nav.dashboard')}
              </span>
            )}
          </button>

          {/* SECTION: DEMOGRAPHICS */}
          <div className="pt-4 pb-2">
            {showLabels && (
              <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:block hidden">
                {t('sidebar.nav.patients.section')}
              </p>
            )}
            <SidebarItem id="patients" icon={Contact} label={t('sidebar.nav.patients.all')} isActive={currentView === 'patients'} isCollapsed={collapsed} isMobileOpen={isOpen} onClick={handleNavigate} onPrefetch={handlePrefetch} />
            <SidebarItem id="patients-adults" icon={User} label={t('sidebar.nav.patients.adults')} isActive={currentView === 'patients-adults'} isCollapsed={collapsed} isMobileOpen={isOpen} onClick={handleNavigate} onPrefetch={handlePrefetch} />
            <SidebarItem id="patients-kids" icon={Baby} label={t('sidebar.nav.patients.kids')} isActive={currentView === 'patients-kids'} isCollapsed={collapsed} isMobileOpen={isOpen} onClick={handleNavigate} onPrefetch={handlePrefetch} />
            <SidebarItem id="groups" icon={Users} label="Grupos" isActive={currentView === 'groups'} isCollapsed={collapsed} isMobileOpen={isOpen} onClick={handleNavigate} onPrefetch={handlePrefetch} />
          </div>

          {/* SECTION: MANAGEMENT */}
          <div className="pt-2 pb-2">
            {showLabels && (
              <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:block hidden">
                {t('sidebar.nav.management.section')}
              </p>
            )}
            <SidebarItem id="calendar" icon={Calendar} label="Agenda" isActive={currentView === 'calendar'} isCollapsed={collapsed} isMobileOpen={isOpen} onClick={handleNavigate} onPrefetch={handlePrefetch} />
            <SidebarItem id="sessions" icon={Sparkles} label="Individual" isActive={currentView === 'sessions'} isCollapsed={collapsed} isMobileOpen={isOpen} onClick={handleNavigate} onPrefetch={handlePrefetch} />
            <SidebarItem id="group-sessions" icon={Users} label="Grupal" isActive={currentView === 'group-sessions'} isCollapsed={collapsed} isMobileOpen={isOpen} onClick={handleNavigate} onPrefetch={handlePrefetch} />
          </div>

          {/* SECTION: TOOLS */}
          <div className="pt-2 pb-2">
            {showLabels && (
              <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:block hidden">
                {t('sidebar.nav.tools.section')}
              </p>
            )}
            <SidebarItem id="resources" icon={FileText} label={t('sidebar.nav.tools.resources')} isActive={currentView === 'resources'} isCollapsed={collapsed} isMobileOpen={isOpen} onClick={handleNavigate} onPrefetch={handlePrefetch} />
            <SidebarItem id="settings" icon={Settings} label={t('sidebar.nav.tools.settings')} isActive={currentView === 'settings'} isCollapsed={collapsed} isMobileOpen={isOpen} onClick={handleNavigate} onPrefetch={handlePrefetch} />
            <SidebarItem id="billing" icon={Receipt} label="Facturación" isActive={currentView === 'billing'} isCollapsed={collapsed} isMobileOpen={isOpen} onClick={handleNavigate} onPrefetch={handlePrefetch} />
          </div>
        </nav>

        {/* Agenda Widget */}
        <div className={`md:${collapsed ? 'hidden' : 'block'}`}>
          <SidebarAgenda />
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-200/60 relative z-10">
          <div className={`flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-200/50 ${collapsed ? 'md:justify-center md:p-2' : ''}`}>
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 shadow-inner ring-2 ring-white">
                {userEmail?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>

            {showLabels && (
              <div className={`flex-1 overflow-hidden md:${collapsed ? 'hidden' : 'block'}`}>
                <p className="text-xs font-bold text-slate-700 truncate tracking-wide">
                  {userEmail?.split('@')[0]}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Fingerprint size={10} strokeWidth={1.5} className="text-emerald-500" />
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    {t('sidebar.user.verified')}
                  </span>
                </div>
                <div className="mt-0.5 ml-0.5">
                  <span className="text-[8px] text-slate-400 font-mono opacity-60">v5.1.0</span>
                </div>
              </div>
            )}

            {showLabels && (
              <button
                onClick={onLogout}
                className={`p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-red-500 transition-all md:${collapsed ? 'hidden' : 'block'}`}
                title="Cerrar Sesión"
              >
                <LogOut size={16} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </aside >
    </>
  );
});

Sidebar.displayName = 'Sidebar';
