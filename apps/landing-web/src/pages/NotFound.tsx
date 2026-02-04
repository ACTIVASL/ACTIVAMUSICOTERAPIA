import { Link } from 'react-router-dom';
import { Navigation } from '../components/layout/Navigation';
import { Footer } from '../components/landing/Footer';
import { SeoHead } from '../components/shared/SeoHead';

export const NotFound = () => {
    return (
        <>
            <SeoHead title="Página no encontrada | Activa Musicoterapia" />
            <Navigation />
            <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-20 font-sans">
                <span className="text-brand-primary font-bold text-6xl font-display mb-4">404</span>
                <h1 className="text-4xl font-display font-bold text-brand-dark mb-6">Esta nota no suena...</h1>
                <p className="text-xl text-gray-600 max-w-md mb-10">
                    La página que buscas no existe o ha sido movida. Regresa al inicio para continuar tu sesión.
                </p>
                <Link to="/" className="inline-flex items-center justify-center h-14 px-10 rounded-2xl bg-brand-dark text-white text-base font-display font-bold hover:bg-blue-500 transition-colors shadow-xl">
                    Volver al Inicio
                </Link>
            </main>
            <Footer />
        </>
    );
};
