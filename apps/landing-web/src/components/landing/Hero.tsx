import { HeartPulse, Stethoscope } from 'lucide-react';
import { RevealSection } from '../ui/RevealSection';
import heroBg from '../../assets/images/hero-bg-fluid.png';

// ... (props interface)
interface HeroProps {
  onOpenModal: (type: 'clinic' | 'course') => void;
}

export const Hero = ({ onOpenModal }: HeroProps) => {
  return (
    <div
      className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden"
      itemScope
      itemType="https://schema.org/MedicalClinic"
    >
      {/* SYMPHONY OF LIGHT: Living Image Engine */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* LAYER 1: The Image (Motion) */}
        <div className="absolute inset-0 mix-blend-overlay opacity-60">
          <img
            src={heroBg}
            alt="Background Neurociencia y Arte"
            className="w-full h-full object-cover object-center animate-flow-deep transform-gpu will-change-transform scale-110 origin-center"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* LAYER 2: The ''Breathing'' Atmosphere - DARK BASE */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark opacity-90"></div>

        {/* LAYER 3: Volumetric Light Beams */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/10 to-transparent skew-x-12 translate-x-[-50%] animate-shift-light mix-blend-overlay"></div>
      </div>

      <div className="relative z-20 max-w-[1600px] mx-auto px-6 flex flex-col items-center text-center mt-20">
        <RevealSection>
          {/* SUPER-BADGE: MUSICOTERAPIA */}
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10 group hover:bg-white/10 transition-all duration-500 cursor-default shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary"></span>
            </span>
            <span className="text-slate-300 text-xs font-display font-bold tracking-[0.3em] uppercase group-hover:text-white transition-colors">
              CIENCIA + ARTE
            </span>
          </div>

          {/* MASSIVE HEADLINE (UPDATED SLOGAN) */}
          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-display font-black tracking-tighter text-white leading-[0.9] mb-8 drop-shadow-2xl">
            EL ARTE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-primary animate-pulse-slow">
              ES SALUD.
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-slate-400 font-body font-light max-w-3xl mx-auto mb-16 leading-relaxed text-balance">
            Activa Musicoterapia aplica un método probado que utiliza el arte como herramienta de
            rehabilitación, conectando a las personas consigo mismas y con sus pacientes.
          </p>

          {/* MAGNETIC ACTION BUTTONS - Updated Palette */}
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
            <button
              onClick={() => onOpenModal('clinic')}
              className="group relative h-16 sm:h-20 px-12 rounded-full bg-slate-800 text-white text-lg font-display font-bold tracking-wide shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-4 overflow-hidden border border-white/20 hover:bg-slate-700"
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
              <span className="relative z-10">Soy Paciente</span>
              <HeartPulse className="w-6 h-6 relative z-10 group-hover:animate-pulse" />
            </button>

            <button
              onClick={() => onOpenModal('course')}
              className="group relative h-16 sm:h-20 px-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-lg font-display font-bold tracking-wide shadow-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-4"
            >
              <span>Soy Profesional</span>
              <Stethoscope className="w-6 h-6 text-brand-accent group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </RevealSection>
      </div>
    </div>
  );
};
