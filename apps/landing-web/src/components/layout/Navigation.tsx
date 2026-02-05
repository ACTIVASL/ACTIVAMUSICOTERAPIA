import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  UserPlus,
  Users,
  Activity,
  MonitorPlay,
  GraduationCap,
} from 'lucide-react';
import logoPremium from '../../assets/images/activa-logo-new.png';

const CRM_URL = 'https://app-activamusicoterapia.web.app/auth/login';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'CLÍNICA', href: '/programas?tab=infancia', icon: Activity },
    { label: 'PROFESIONALES', href: '/programas?tab=profesionales', icon: GraduationCap },
    { label: 'BLOG', href: '/blog', icon: MonitorPlay },
    { label: 'PREGUNTAS', href: '/#faq', icon: Users },
    { label: 'NOSOTROS', href: '/#nosotros', icon: Users },
  ];

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-slate-50/90 backdrop-blur-xl border-b border-white/40 shadow-sm py-4 transition-all duration-500 ease-in-out">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-12 items-center gap-4">
            {/* LEFT: Logo Premium (Activa) */}
            <div className="lg:col-span-2 flex items-center justify-start">
              <Link to="/" className="flex items-center gap-4 group cursor-pointer">
                {/* FORCED CIRCULAR FIT - LIGHT MODE GLOW */}
                <div className="relative w-[42px] h-[42px] rounded-full p-[1.5px] bg-gradient-to-tr from-brand-primary via-slate-300 to-brand-accent shadow-[0_0_15px_rgba(236,0,140,0.2)] group-hover:shadow-[0_0_25px_rgba(236,0,140,0.4)] transition-all duration-500">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden">
                    <img
                      src={logoPremium}
                      alt="Activa Logo"
                      className="w-full h-full object-cover rounded-full relative z-10 hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* CENTER: Premium Tabs Menu */}
            <div className="hidden lg:flex lg:col-span-8 items-center justify-center h-full">
              <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-slate-100/50 border border-white/50 shadow-sm backdrop-blur-md">
                {menuItems.map((item) => (
                  item.href.startsWith('#') || item.href.includes('#') ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="px-5 py-2 text-sm font-display font-bold text-slate-600 hover:text-brand-primary hover:bg-white rounded-full transition-all duration-300 relative group tracking-wider"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="px-5 py-2 text-sm font-display font-bold text-slate-600 hover:text-brand-primary hover:bg-white rounded-full transition-all duration-300 relative group tracking-wider"
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* RIGHT: Actions */}
            <div className="flex lg:col-span-2 items-center justify-end gap-4">
              {/* INICIAR SESION CTA */}
              <a
                href={CRM_URL}
                className="hidden lg:flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-primary to-purple-600 text-white shadow-lg hover:shadow-brand-primary/25 transition-all transform hover:scale-105 active:scale-95 group relative overflow-hidden border border-transparent"
              >
                <UserPlus className="w-4 h-4 text-white relative z-10" />
                <span className="text-xs font-display font-bold uppercase tracking-widest relative z-10">
                  INICIAR SESIÓN
                </span>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 text-slate-600 bg-white/50 border border-slate-200 rounded-full hover:bg-white transition-colors"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown - Light Glass */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-slate-50/95 backdrop-blur-xl border-t border-slate-200 z-50 overflow-y-auto">
            <div className="px-6 pt-10 pb-12 space-y-8">
              {/* Mobile Links */}
              <div className="space-y-6">
                {menuItems.map((item) => (
                  item.href.startsWith('#') || item.href.includes('#') ? (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-2xl font-display font-medium text-slate-800 hover:text-brand-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-2xl font-display font-medium text-slate-800 hover:text-brand-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="pt-8 border-t border-slate-200 space-y-4">
                <a
                  href={CRM_URL}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-brand-primary to-purple-600 text-white font-bold uppercase tracking-wider shadow-lg"
                >
                  <UserPlus className="w-5 h-5" />
                  INICIAR SESIÓN
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
