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
          <p className="text-slate-400 text-lg font-body max-w-lg mx-auto font-light leading-relaxed">
            Activa Musicoterapia combina la ciencia, la música y la tecnología para mejorar la
            calidad de vida.
          </p>
        </div>

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

        {/* QR Code Section */}
        <div className="flex flex-col items-center gap-4 mt-8 opacity-80 hover:opacity-100 transition-opacity">
          <div className="p-3 bg-white rounded-xl shadow-lg border-4 border-white/10 group hover:scale-105 transition-transform duration-300">
            <img
              src={qrFooter}
              alt="Escanea para contactar"
              className="w-32 h-32 object-contain rounded-lg"
            />
          </div>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
            Escanea para contacto directo
          </p>
        </div>

        <div className="text-slate-500 text-sm font-body w-full mt-4">
          <p>© 2026 Activa Musicoterapia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
