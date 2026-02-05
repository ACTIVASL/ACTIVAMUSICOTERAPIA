import { useState } from 'react';
import { BookOpen, HeartPulse, GraduationCap, X } from 'lucide-react';
import { Navigation } from '../components/layout/Navigation';
import { Hero } from '../components/landing/Hero';
import Services from '../components/landing/Services';
import { Professionals } from '../components/landing/Professionals';
import { FAQ } from '../components/landing/FAQ';
import { Testimonials } from '../components/landing/Testimonials';
import { About } from '../components/landing/About';
import { Footer } from '../components/landing/Footer';
// import { Preloader } from '../components/ui/Preloader'; // Unused
import { BookModal } from '../components/modals/BookModal';
import { ClinicModal } from '../components/modals/ClinicModal';
import { CourseModal } from '../components/modals/CourseModal';
import { LeadCaptureModal } from '../components/modals/LeadCaptureModal';
import { SeoHead } from '../components/shared/SeoHead';

export const Home = () => {
  interface ModalData {
    interest?: string;
    [key: string]: unknown; // Keep flexible but explicit
  }
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [formStep, setFormStep] = useState(0);

  const openModal = (type: string, data?: unknown) => {
    setActiveModal(type);
    setModalData(data as ModalData);
    setFormStep(0);
  };
  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  const modalConfig: Record<
    string,
    {
      title: string;
      icon: JSX.Element;
      content: JSX.Element;
      className?: string;
      hideTitle?: boolean;
    }
  > = {
    book: {
      title: 'Método Activa: El Libro',
      icon: <BookOpen className="text-brand-primary" size={32} />,
      content: <BookModal />,
    },
    clinic: {
      title: 'Reserva tu Sesión',
      icon: <HeartPulse className="text-brand-primary" size={32} />,
      content: <ClinicModal formStep={formStep} setFormStep={setFormStep} />,
    },
    course: {
      title: 'Certificación Método Activa',
      icon: <GraduationCap className="text-brand-primary" size={32} />,
      content: <CourseModal />,
    },
    'lead-magnet': {
      title: 'Solicitud de Información',
      icon: <BookOpen className="text-brand-primary" size={32} />,
      content: <LeadCaptureModal initialInterest={modalData?.interest} />,
      className: 'p-0',
      hideTitle: true,
    },
  };

  const schema = {
    // ... schema remains same
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Activa Musicoterapia',
    alternateName: 'Método Activa',
    url: 'https://webycrm-activa.web.app',
    logo: 'https://webycrm-activa.web.app/logo-premium.png',
    description:
      'Centro líder en Neuro-Rehabilitación y Musicoterapia. Especialistas en Alzheimer, Autismo y Daño Cerebral Adquirido.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle de la Innovación 12',
      addressLocality: 'Madrid',
      postalCode: '28010',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.4168,
      longitude: -3.7038,
    },
    telephone: '+34910000000',
    priceRange: '$$',
    medicalSpecialty: ['Neurology', 'Psychiatry', 'Rehabilitation', 'Geriatrics'],
    availableService: [
      {
        '@type': 'MedicalTherapy',
        name: 'Musicoterapia Neurológica',
        description: 'Tratamiento basado en evidencia para recuperación cognitiva y motora.',
      },
      {
        '@type': 'MedicalTherapy',
        name: 'Rehabilitación Alzheimer',
        description: 'Estimulación cognitiva avanzada para frenar el deterioro.',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/activamusicoterapia',
      'https://www.instagram.com/activa.musicoterapia',
      'https://www.facebook.com/profile.php?id=100063890972828',
    ],
    founder: {
      '@type': 'Person',
      name: 'Aurora Del Río',
      jobTitle: 'Directora Clínica',
      image: 'https://webycrm-activa.web.app/assets/aurora-profile.jpg',
      description: 'Musicoterapeuta Neurológica con más de 20 años de experiencia.',
      alumniOf: 'Máster Europeo de Musicoterapia',
    },
  };

  return (
    <>
      <SeoHead schema={schema} />

      {/* CLINCAL DEEP VOID THEME WRAPPER */}
      <div className="font-sans antialiased selection:bg-brand-primary selection:text-white bg-brand-dark text-slate-300 min-h-screen relative overflow-x-hidden">
        {/* AMBIENT BACKGROUND LIGHTING (AURORA) */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-brand-primary/10 blur-[120px] rounded-full opacity-60 mix-blend-screen animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vh] bg-brand-secondary/20 blur-[100px] rounded-full opacity-40"></div>
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-10">
          {/* MODAL COMPONENT */}

          <Navigation />

          <main className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <Hero onOpenModal={openModal} />
            <Services onOpenModal={openModal} />
            <Professionals onOpenModal={openModal} />
            <FAQ />
            <Testimonials />
            <About />
          </main>
        </div>
        <Footer onOpenModal={openModal} />
      </div>
      {/* MODAL COMPONENT - ROOT LEVEL PORTAL SIMULATION */}
      {activeModal && modalConfig[activeModal] && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 modal-overlay font-sans">
          <div
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-xl transition-opacity"
            onClick={closeModal}
          ></div>
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden modal-content border border-white/20 ring-1 ring-black/5 transform transition-all scale-100 animate-fade-in-up">
            <div
              className={`bg-white border-b border-gray-100 flex justify-between items-center z-20 relative sticky top-0 ${modalConfig[activeModal].hideTitle ? 'p-4 border-none absolute right-0 bg-transparent' : 'p-8'}`}
            >
              {!modalConfig[activeModal].hideTitle && (
                <div className="flex items-center gap-5">
                  <div className="bg-pink-50 p-3.5 rounded-2xl shadow-sm border border-brand-primary/10 text-brand-primary">
                    {modalConfig[activeModal].icon}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-brand-dark leading-none tracking-tight">
                    {modalConfig[activeModal].title}
                  </h3>
                </div>
              )}
              <button
                onClick={closeModal}
                className={`text-gray-400 hover:text-brand-dark transition-colors p-2.5 rounded-full hover:bg-gray-50 ${modalConfig[activeModal].hideTitle ? 'bg-white/80 shadow-sm' : ''}`}
              >
                <X size={24} />
              </button>
            </div>
            <div
              className={`${modalConfig[activeModal].className || 'p-8'} max-h-[80vh] overflow-y-auto`}
            >
              {modalConfig[activeModal].content}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
