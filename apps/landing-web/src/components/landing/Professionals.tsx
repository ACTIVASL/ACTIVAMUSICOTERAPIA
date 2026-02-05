import { ArrowRight, MonitorPlay, GraduationCap, Sparkles } from 'lucide-react';

import academyInterface from '../../assets/images/academy_campus_interface.png';
import crmDesktop from '../../assets/images/hero-desktop.jpg';
import crmTablet from '../../assets/images/hero-tablet.jpg';
import crmMobile from '../../assets/images/hero-mobile.jpg';
// import { RevealSection } from '../ui/RevealSection'; // Unused

interface ProfessionalsProps {
  onOpenModal?: (modal: string, data?: unknown) => void;
}

export const Professionals = ({ onOpenModal }: ProfessionalsProps) => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Ambient Background - Shared (Subtle Light) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] bg-[#EC008C]/5 rounded-full blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[800px] h-[800px] bg-cyan-400/5 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>
      </div>

      {/* SECTION HEADER */}
      <div className="relative z-10 pt-32 pb-16 text-center max-w-4xl mx-auto px-6">
        <h2 className="text-sm font-['Outfit'] font-bold text-[#EC008C] tracking-[0.2em] uppercase mb-4">
          Ecosistema Profesional
        </h2>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-['Outfit'] font-bold text-slate-900 mb-6 leading-tight">
          Herramientas para la <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500">
            Práctica Profesional
          </span>
        </h3>
        <p className="text-lg text-slate-600 font-['Inter'] font-light leading-relaxed">
          Unificamos formación, gestión clínica y divulgación científica en una plataforma integral
          para musicoterapeutas y profesionales de la salud.
        </p>
      </div>

      {/* 2. SOFTWARE ACTIVA (CRM) */}
      <div
        className="relative py-32 border-t border-gray-100 bg-slate-50"
        id="software"
        data-version="titanium-v5-refresh"
      >
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-600">
              <MonitorPlay size={16} />
              <span className="text-xs font-bold tracking-widest uppercase">
                SOFTWARE CLÍNICO CERTIFICADO
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold text-slate-900 leading-tight">
              Elevamos el Estándar de la <br />
              <span className="text-cyan-600">Musicoterapia Profesional</span>
            </h2>

            <p className="text-slate-600 font-['Inter'] text-lg leading-relaxed max-w-xl">
              La herramienta definitiva para validación clínica. Transforma tu metodología con un
              sistema que integra historia clínica, biofeedback y gestión administrativa en una
              única plataforma segura y eficiente.
            </p>

            <ul className="space-y-4">
              {[
                'Cumplimiento Normativo Sanitario (RGPD)',
                'Informes de Evolución Automáticos',
                'Panel de Control Financiero y Citas',
                'Soporte Técnico Especializado',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-sm"></div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://activamusicoterapia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold tracking-wide hover:shadow-lg transition-all transform active:scale-95 duration-200 inline-flex items-center justify-center"
              >
                CONTRATAR LICENCIA (299€)
              </a>
              <button
                onClick={() => onOpenModal?.('lead-magnet', { interest: 'general' })}
                className="px-8 py-4 border border-slate-300 text-slate-700 rounded-full font-bold tracking-wide hover:bg-white hover:border-slate-400 transition-all flex items-center gap-2 transform active:scale-95 duration-200"
              >
                <Sparkles size={20} className="text-cyan-500" /> VERSIÓN CORPORATIVA (3000€)
              </button>
            </div>
          </div>

          {/* Visual: Device Composition (Clean Outline) */}
          <div className="relative z-10 w-full lg:h-[800px] flex items-center justify-center perspective-container py-20 lg:py-0">
            {/* DESKTOP (Back Center) */}
            <div className="relative w-[90%] lg:w-[800px] aspect-[16/10] bg-white rounded-xl shadow-2xl shadow-slate-200 border-[6px] border-slate-800 ring-1 ring-gray-200 z-10 transition-transform duration-700 hover:scale-[1.01] overflow-hidden group/desktop">
              {/* Screen */}
              <div className="w-full h-full bg-slate-100 overflow-hidden relative">
                <img
                  src={crmDesktop}
                  alt="Panel de Control Clínico CRM Método Activa en Escritorio"
                  className="w-full h-full object-cover object-top bg-white"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* Stand */}
              <div className="absolute left-1/2 -bottom-6 w-1/3 h-4 bg-gradient-to-b from-slate-700 to-slate-900 -translate-x-1/2 rounded-b-xl"></div>
            </div>

            {/* TABLET (Bottom Right Overlap) */}
            <div
              className="absolute -bottom-10 right-0 lg:-right-12 lg:bottom-20 w-[60%] lg:w-[450px] aspect-[4/3] bg-white rounded-[1.5rem] shadow-xl border-[8px] border-slate-800 ring-1 ring-gray-200 z-20 animate-float"
              style={{ animationDelay: '1s' }}
            >
              <div className="w-full h-full bg-slate-100 rounded-2xl overflow-hidden relative group/tablet">
                <img
                  src={crmTablet}
                  alt="Gestión de Pacientes en Tablet para Terapeutas"
                  className="w-full h-full object-cover object-top bg-white"
                  loading="lazy"
                />
              </div>
              {/* Camera Dot */}
              <div className="absolute top-1/2 -right-1.5 w-1 h-8 bg-gray-400 rounded-l-md -translate-y-1/2"></div>
            </div>

            {/* MOBILE (Bottom Left Overlap) */}
            <div
              className="absolute -bottom-20 left-4 lg:left-0 lg:bottom-40 w-[35%] lg:w-[240px] aspect-[9/19.5] bg-black rounded-[2.5rem] shadow-xl border-[8px] border-black ring-1 ring-gray-800 z-30 animate-float"
              style={{ animationDelay: '0s' }}
            >
              <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative group/mobile">
                <img
                  src={crmMobile}
                  alt="App Móvil PWA Método Activa para Pacientes"
                  className="w-full h-full object-cover object-top bg-white"
                  loading="lazy"
                />
                {/* Dynamic Notch/Bar */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl z-40"></div>
              </div>
            </div>

            {/* Floating Badge */}
            {/* Floating Badge Removed */}
          </div>
        </div>
      </div>

      {/* 3. ACADEMIA (CAMPUS VIRTUAL) */}
      <div className="relative py-32 border-t border-gray-100" id="academia">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual: Futuristic Interface */}
          <div className="relative perspective-1000 order-2">
            <div className="relative w-full aspect-square md:aspect-[4/3] transform rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-700">
              <div className="absolute inset-0 bg-purple-600 rounded-full blur-[150px] opacity-10"></div>
              <img
                src={academyInterface}
                alt="Interfaz del Campus Virtual Academia Activa"
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
              />
              {/* Floating Elements (CSS Only) */}
            </div>
          </div>

          {/* Content */}
          <div className="order-1 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600">
              <GraduationCap size={16} />
              <span className="text-xs font-bold tracking-widest uppercase">ACADEMIA ACTIVA</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold text-slate-900 leading-tight">
              Campus Virtual de <br />
              <span className="text-purple-600">Alta Especialización</span>
            </h2>

            <div className="space-y-6 text-slate-600 font-['Inter'] text-lg leading-relaxed">
              <p>
                Formamos a la próxima generación de musicoterapeutas y cuidadores profesionales.
                Nuestro campus virtual integra evidencia clínica y práctica real.
              </p>
              <p>
                No solo aprendes el <strong>Método Activa</strong>, aprendes a implementarlo
                tecnológicamente. El curso incluye entrenamiento práctico en nuestro CRM,
                enseñándote a digitalizar evaluaciones, registrar sesiones y medir el progreso del
                paciente con datos objetivos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-gray-100 hover:bg-white hover:shadow-sm transition-colors">
                <h4 className="text-slate-900 font-bold mb-1">Certificación Oficial</h4>
                <p className="text-sm text-slate-500">Avalada por instituciones internacionales.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-gray-100 hover:bg-white hover:shadow-sm transition-colors">
                <h4 className="text-slate-900 font-bold mb-1">Prácticas con CRM</h4>
                <p className="text-sm text-slate-500">
                  Licencia educativa de Software Activa incluida.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenModal?.('course')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-purple-500 text-purple-600 rounded-full font-['Outfit'] font-bold tracking-widest hover:bg-purple-600 hover:text-white transition-all duration-300 group"
            >
              VER PROGRAMA ACADÉMICO
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
