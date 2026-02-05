import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  UserPlus,
  Users,
  Activity,
  MonitorPlay,
  GraduationCap,
  LucideIcon,
} from 'lucide-react';
import logoPremium from '../../assets/images/activa-logo-new.png';

const CRM_URL = 'https://app-activamusicoterapia.web.app/auth/login';

// Premium Spotlight Dropdown (Light Glass)
const NavDropdown = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string; icon: LucideIcon }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group h-full flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1.5 px-5 py-2 text-sm font-display font-medium text-slate-600 group-hover:text-brand-primary transition-all duration-300 tracking-wide relative z-10">
        {title}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-500 ease-out ${isOpen ? 'rotate-180 text-brand-primary' : 'text-slate-400'}`}
        />
        {/* Glow Element - Subtle Pink */}
        <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      </button>

      {/* Ultra-Premium Glass Menu - Light */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 p-2 bg-white/95 backdrop-blur-3xl border border-slate-200/60 rounded-2xl shadow-2xl transition-all duration-300 origin-top overflow-hidden ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-4 invisible'}`}
      >
        <div className="relative flex flex-col gap-1 z-10">
          {items.map((item) =>
            item.href.startsWith('#') ? (
              <a
                key={item.label}
                href={item.href}
                className="group/item flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-100 relative overflow-hidden"
              >
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 group-hover/item:border-brand-primary/30 group-hover/item:bg-brand-primary/5 transition-colors shadow-sm">
                  <item.icon className="w-4 h-4 text-slate-500 group-hover/item:text-brand-primary transition-colors" />
                </div>
                <span className="text-sm font-display font-normal text-slate-600 group-hover/item:text-slate-900 tracking-wide">
                  {item.label}
                </span>
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                viewTransition
                className="group/item flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-100 relative overflow-hidden"
              >
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 group-hover/item:border-brand-primary/30 group-hover/item:bg-brand-primary/5 transition-colors shadow-sm">
                  <item.icon className="w-4 h-4 text-slate-500 group-hover/item:text-brand-primary transition-colors" />
                </div>
                <span className="text-sm font-display font-normal text-slate-600 group-hover/item:text-slate-900 tracking-wide">
                  {item.label}
                </span>
              </Link>
            ),
          )}
        </div>
      </div>

      {/* Invisible bridge */}
      <div className={`absolute -bottom-6 left-0 w-full h-8 ${isOpen ? 'block' : 'hidden'}`}></div>
    </div>
  );
};

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const clinicaItems = [
    { label: 'Programas y Tarifas', href: '/programas', icon: Activity },
    { label: 'Individual', href: '/programas', icon: Users }, // Redirect to programs tab logic? For now simple link
  ];

  const profesionalesItems = [
    { label: 'Software Activa', href: '#software', icon: MonitorPlay },
    { label: 'Academia', href: '#academia', icon: GraduationCap },
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

            {/* CENTER: Premium Glass Menu - Light Pill */}
            <div className="hidden lg:flex lg:col-span-6 items-center justify-center h-full">
              <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-100/50 border border-white/50 shadow-sm backdrop-blur-md">
                <NavDropdown title="CLÍNICA" items={clinicaItems} />
                <NavDropdown title="PROFESIONALES" items={profesionalesItems} />

                <div className="w-[1px] h-4 bg-slate-300 mx-2"></div>

                <Link
                  to="/blog"
                  viewTransition
                  className="px-5 py-2 text-sm font-display font-medium text-slate-600 hover:text-brand-primary transition-colors relative group"
                >
                  BLOG
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-primary group-hover:w-1/2 transition-all duration-300"></span>
                </Link>
                <a
                  href="#faq"
                  className="px-5 py-2 text-sm font-display font-medium text-slate-600 hover:text-brand-primary transition-colors relative group"
                >
                  PREGUNTAS
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-primary group-hover:w-1/2 transition-all duration-300"></span>
                </a>
                <a
                  href="#nosotros"
                  className="px-5 py-2 text-sm font-display font-medium text-slate-600 hover:text-brand-primary transition-colors relative group"
                >
                  NOSOTROS
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-primary group-hover:w-1/2 transition-all duration-300"></span>
                </a>
              </div>
            </div>

            {/* RIGHT: Actions */}
            <div className="flex lg:col-span-4 items-center justify-end gap-4">
              {/* AREA PROFESIONALES REMOVED BY USER REQUEST */}

              {/* INICIAR SESION CTA */}
              <a
                href={CRM_URL}
                className="hidden lg:flex items-center gap-3 px-8 py-3 rounded-full bg-slate-800 text-white shadow-[0_0_15px_-3px_rgba(30,41,59,0.3)] hover:shadow-[0_0_25px_-5px_rgba(30,41,59,0.4)] hover:bg-slate-700 transition-all transform hover:scale-105 active:scale-95 group relative overflow-hidden border border-slate-700/50"
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
          <div className="lg:hidden absolute top-[90px] left-0 w-full h-[calc(100vh-90px)] bg-slate-50/95 backdrop-blur-xl border-t border-slate-200 z-50 overflow-y-auto">
            <div className="px-6 pt-10 pb-12 space-y-8">
              {/* Mobile Links */}
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-xs font-display font-bold text-brand-primary uppercase tracking-[0.2em] pl-2 border-l-2 border-brand-primary ml-1">
                    Clínica
                  </p>
                  <a
                    href="#individual"
                    className="block text-2xl font-display font-light text-slate-600 pl-4 hover:text-brand-primary transition-colors"
                  >
                    Individual
                  </a>
                  <a
                    href="#grupal"
                    className="block text-2xl font-display font-light text-slate-600 pl-4 hover:text-brand-primary transition-colors"
                  >
                    Grupal
                  </a>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-display font-bold text-brand-accent uppercase tracking-[0.2em] pl-2 border-l-2 border-brand-accent ml-1">
                    Profesionales
                  </p>

                  <a
                    href="#software"
                    className="block text-2xl font-display font-light text-slate-600 pl-4 hover:text-brand-primary transition-colors"
                  >
                    Software
                  </a>
                  <a
                    href="#academia"
                    className="block text-2xl font-display font-light text-slate-600 pl-4 hover:text-brand-primary transition-colors"
                  >
                    Academia
                  </a>
                </div>
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <a
                    href="#blog"
                    className="block text-lg font-medium text-slate-500 pl-2 hover:text-brand-primary"
                  >
                    Blog
                  </a>
                  <a
                    href="#faq"
                    className="block text-lg font-medium text-slate-500 pl-2 hover:text-brand-primary"
                  >
                    Preguntas
                  </a>
                  <a
                    href="#nosotros"
                    className="block text-lg font-medium text-slate-500 pl-2 hover:text-brand-primary"
                  >
                    Nosotros
                  </a>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="pt-8 border-t border-slate-200 space-y-4">
                <a
                  href={CRM_URL}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-slate-800 text-white font-bold uppercase tracking-wider shadow-lg border border-slate-700"
                >
                  <UserPlus className="w-5 h-5" />
                  Iniciar Sesión
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
