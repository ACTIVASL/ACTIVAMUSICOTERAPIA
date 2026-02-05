import { Instagram, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoPremium from '../../assets/images/logo-footer.jpg';
import qrFooter from '../../assets/images/qr-footer.jpg';

export const Footer = ({
  onOpenModal,
}: {
  onOpenModal?: (type: string, data?: unknown) => void;
}) => {
  return (
    <footer
      id="footer"
      className="bg-brand-dark text-slate-300 border-t border-white/5 py-24 px-6 lg:px-12 text-center relative overflow-hidden"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-[960px] mx-auto flex flex-col gap-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-brand-dark flex items-center justify-center shadow-[0_0_30px_rgba(236,0,140,0.15)] ring-1 ring-white/10 relative overflow-hidden group">
              <img
                src={logoPremium}
                alt="Logotipo Oficial Activa Musicoterapia - Ciencia y Salud"
                className="w-[180%] h-auto object-cover drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shine"></div>
            </div>
            <p className="text-slate-400 text-lg font-body max-w-lg mx-auto font-light leading-relaxed hidden md:block">
              Activa Musicoterapia combina la ciencia, la música y la tecnología para mejorar la
              calidad de vida.
            </p>
          </div>

          {/* QR Code Section - Premium Frame Side-by-Side */}
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 hover:border-brand-primary/30 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={qrFooter}
                alt="Escanea para contacto directo"
                className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-xl relative z-10"
              />
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] opacity-60">
              Escanea para contacto
            </p>
          </div>
        </div>

        {/* LEAD MAGNET / COMMERCIAL CTA */}
        <div className="w-full bg-gradient-to-r from-brand-primary/20 to-purple-900/30 rounded-3xl p-8 mb-12 border border-brand-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-2xl font-display font-bold text-white mb-2">¿Dudas sobre qué programa elegir?</h4>
            <p className="text-slate-400">Habla gratis con un especialista clínico (no un comercial).</p>
          </div>
          <button
            onClick={() => onOpenModal?.('lead-magnet', { interest: 'general' })}
            className="whitespace-nowrap px-8 py-3 bg-gradient-to-r from-brand-primary to-purple-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-brand-primary/20 transition-all shadow-md border border-white/10"
          >
            Solicitar Orientación 5'
          </button>
        </div>

        {/* Mobile Description (Visible only on small screens below stacks) */}
        <p className="md:hidden text-slate-400 text-lg font-body max-w-lg mx-auto font-light leading-relaxed">
          Activa Musicoterapia combina la ciencia, la música y la tecnología para mejorar la
          calidad de vida.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 border-y border-white/5 py-10">
          <Link
            to="/legal/privacy"
            className="text-slate-400 hover:text-white transition-colors font-display font-medium text-sm tracking-wide hover:underline"
          >
            Aviso de Privacidad
          </Link>
          <Link
            to="/legal/terms"
            className="text-slate-400 hover:text-white transition-colors font-display font-medium text-sm tracking-wide hover:underline"
          >
            Términos y Condiciones
          </Link>
          <Link
            to="/legal/data-deletion"
            className="text-slate-400 hover:text-white transition-colors font-display font-medium text-sm tracking-wide hover:underline"
          >
            Eliminación de Datos
          </Link>
          <a
            href="#"
            className="text-slate-400 hover:text-white transition-colors font-display font-medium text-sm tracking-wide hover:underline"
          >
            Mapa del Sitio
          </a>
        </div>
        <div className="flex justify-center gap-8">
          <a
            href="https://www.instagram.com/activa.musicoterapia"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 hover:bg-brand-primary p-4 rounded-2xl text-slate-400 hover:text-white transition-colors transform hover:scale-110 duration-300 border border-white/5 shadow-sm"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100063890972828"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 hover:bg-blue-500 p-4 rounded-2xl text-slate-400 hover:text-white transition-colors transform hover:scale-110 duration-300 border border-white/5 shadow-sm"
          >
            <Facebook size={24} />
          </a>
          <button
            onClick={() => onOpenModal?.('lead-magnet', { interest: 'general' })}
            className="bg-white/5 hover:bg-brand-secondary p-4 rounded-2xl text-slate-400 hover:text-white transition-colors transform hover:scale-110 duration-300 border border-white/5 shadow-sm"
          >
            <Mail size={24} />
          </button>
        </div>



        <div className="text-slate-500 text-sm font-body w-full mt-4">
          <p>© 2026 Activa Musicoterapia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
