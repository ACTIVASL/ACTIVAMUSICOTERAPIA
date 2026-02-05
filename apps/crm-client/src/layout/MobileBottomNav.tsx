import React, { memo, useCallback } from 'react';
import { Activity, Users, Calendar, Menu, PlusCircle, LucideIcon } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useHaptic } from '../hooks/useHaptic';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenMenu: () => void;
  onNewAction: () => void; // Central "FAB" action
  isMenuOpen: boolean;
}

// --- SUB COMPONENTS ---

const FABButton = memo(({ onClick }: { onClick: () => void }) => (
  <div className="relative -top-10 group">
    <div className="absolute inset-0 bg-pink-500 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity rounded-full" />
    <button
      onClick={onClick}
      className="relative bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-600 text-white rounded-full p-5 shadow-2xl shadow-pink-900/50 border-[6px] border-slate-100/10 ring-2 ring-pink-400/50 active:scale-95 active:rotate-90 transition-all duration-300"
    >
      <PlusCircle size={36} strokeWidth={2} className="drop-shadow-lg" />
    </button>
  </div>
));
FABButton.displayName = 'FABButton';

const MenuButton = memo(({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center w-16 h-full gap-2 text-slate-400 active:text-white transition-colors relative group"
  >
    <div className="absolute inset-0 bg-white/5 opacity-0 group-active:opacity-100 rounded-2xl transition-opacity scale-75" />
    <Menu size={28} strokeWidth={2} />
    <span className="text-[11px] font-bold tracking-wide opacity-80">{label}</span>
  </button>
));
MenuButton.displayName = 'MenuButton';

const NavButton = memo(
  ({
    id,
    icon: Icon,
    label,
    isActive,
    onClick,
  }: {
    id: string;
    icon: LucideIcon;
    label: string;
    isActive: boolean;
    onClick: (id: string) => void;
  }) => {
    const handleClick = useCallback(() => onClick(id), [id, onClick]);

    return (
      <button
        onClick={handleClick}
        className={`flex flex-col items-center justify-center w-16 h-full gap-2 transition-all relative ${isActive ? 'text-white' : 'text-slate-400 active:text-white'}`}
      >
        {/* Active Glow Indicator */}
        {isActive && (
          <div className="absolute -top-1 w-10 h-1.5 bg-pink-500 rounded-b-full shadow-[0_0_15px_rgba(236,72,153,1)] animate-in fade-in duration-300" />
        )}

        {/* Icon Background for Active State */}
        <div
          className={`p-2 rounded-2xl transition-all ${isActive ? 'bg-white/15 shadow-inner backdrop-blur-md' : 'bg-transparent'}`}
        >
          <Icon
            size={28}
            strokeWidth={isActive ? 2.5 : 2}
            className={isActive ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]' : ''}
          />
        </div>

        <span
          className={`text-[11px] font-medium tracking-wide ${isActive ? 'font-black text-pink-200' : 'opacity-80'}`}
        >
          {label}
        </span>
      </button>
    );
  },
);
NavButton.displayName = 'NavButton';

// --- MAIN COMPONENT ---

export const MobileBottomNav: React.FC<MobileBottomNavProps> = memo(
  ({ currentView, onNavigate, onOpenMenu, onNewAction, isMenuOpen }) => {
    const haptics = useHaptic();
    const scrollDirection = useScrollDirection('main-content');
    const isHidden = scrollDirection === 'down' || isMenuOpen;

    const navItems = [
      { id: 'dashboard', icon: Activity, label: 'Inicio' },
      { id: 'patients', icon: Users, label: 'Pacientes' },
      { id: 'fab', icon: PlusCircle, label: '' },
      { id: 'calendar', icon: Calendar, label: 'Agenda' },
      { id: 'menu', icon: Menu, label: 'Menú' },
    ];

    const handleFABClick = useCallback(() => {
      haptics.trigger('medium');
      onNewAction();
    }, [haptics, onNewAction]);

    const handleMenuClick = useCallback(() => {
      haptics.trigger('light');
      onOpenMenu();
    }, [haptics, onOpenMenu]);

    const handleNavClick = useCallback(
      (id: string) => {
        haptics.trigger('light');
        onNavigate(id);
      },
      [haptics, onNavigate],
    );

    return (
      <div
        className={`md:hidden fixed bottom-6 left-2 right-2 z-50 transition-transform duration-300 pointer-events-none ${isHidden ? 'translate-y-[200%]' : 'translate-y-0'}`}
      >
        <nav className="pointer-events-auto bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-between px-4 h-[85px] safe-bottom relative ring-1 ring-white/30">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {navItems.map((item) => {
            if (item.id === 'fab') {
              return <FABButton key={item.id} onClick={handleFABClick} />;
            }
            if (item.id === 'menu') {
              return <MenuButton key={item.id} onClick={handleMenuClick} label={item.label} />;
            }

            const isActive =
              currentView === item.id ||
              (item.id === 'patients' && currentView.startsWith('patients'));

            return (
              <NavButton
                key={item.id}
                id={item.id}
                icon={item.icon}
                label={item.label}
                isActive={isActive}
                onClick={handleNavClick}
              />
            );
          })}
        </nav>
      </div>
    );
  },
);

MobileBottomNav.displayName = 'MobileBottomNav';
