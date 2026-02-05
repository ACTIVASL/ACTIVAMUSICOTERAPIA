import { Helmet } from 'react-helmet-async';
import { useSearchParams, Link } from 'react-router-dom';
import { Navigation } from '../components/layout/Navigation';
import { Footer } from '../components/landing/Footer';
import { RevealSection } from '../components/ui/RevealSection';
import {
    Baby,
    Users,
    School,
    GraduationCap,
    Check,
    ArrowRight,
    Brain
} from 'lucide-react';

interface ProgramItem {
    title: string;
    target: string;
    duration: string;
    price: string;
    period?: string;
    features: string[];
    tag: string;
    highlight?: boolean;
    badge?: string;
}

export const Programs = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentTab = searchParams.get('tab');

    // Validate tab or default to 'infancia'
    const activeTab = (currentTab && ['infancia', 'adultos', 'colegios', 'profesionales', 'consultoria'].includes(currentTab))
        ? (currentTab as 'infancia' | 'adultos' | 'colegios' | 'profesionales' | 'consultoria')
        : 'infancia';

    const tabs = [
        { id: 'infancia', label: 'Infancia y Familia', icon: Baby },
        { id: 'adultos', label: 'Adultos y Mayores', icon: Users },
        { id: 'colegios', label: 'Colegios y Educación', icon: School },
        { id: 'profesionales', label: 'Formación Pro', icon: GraduationCap },
        { id: 'consultoria', label: 'Consultoría', icon: Brain },
    ] as const;

    const content = {
        infancia: {
            title: "Desarrollo y Vínculo",
            subtitle: "Programas diseñados para potenciar el neurodesarrollo y la conexión emocional.",
            items: [
                {
                    title: "Estimulación Musical Temprana",
                    target: "0–3 años",
                    duration: "45–50 min",
                    price: "70–80 €",
                    period: "/ sesión",
                    features: ["Neurodesarrollo infantil", "Juego sensorial", "Regulación emocional"],
                    tag: "Prevención",
                    highlight: false
                },
                {
                    title: "Musicoterapia Clínica TEA",
                    target: "Grupos 4–6 niños",
                    duration: "45–60 min",
                    price: "90–120 €",
                    period: "/ sesión",
                    features: ["Alta especialización", "Atención conjunta", "Gestión de turnos", "Informes trimestrales"],
                    tag: "Alta Demanda",
                    highlight: true,
                    badge: "Más Solicitado"
                },
                {
                    title: "Musicoterapia en Familia",
                    target: "Padres + Hijos",
                    duration: "50–60 min",
                    price: "80–100 €",
                    period: "/ sesión",
                    features: ["Vínculo afectivo", "Comunicación no verbal", "Continuidad en casa"],
                    tag: "Vínculo",
                    highlight: false
                },
                {
                    title: "Terapia Individual",
                    target: "1 niño",
                    duration: "45–50 min",
                    price: "50–60 €",
                    period: "/ sesión",
                    features: ["Adaptación total", "Enfoque preventivo", "Desarrollo del lenguaje"],
                    tag: "Personalizado",
                    highlight: false
                }
            ]
        },
        adultos: {
            title: "Bienestar y Envejecimiento Activo",
            subtitle: "Intervenciones para mantener la vitalidad cognitiva y emocional.",
            items: [
                {
                    title: "Coro Terapéutico",
                    target: "Grupo Vocal",
                    duration: "90 min",
                    price: "70–100 €",
                    period: "/ sesión",
                    features: ["Beneficios respiratorios", "Cohesión social", "Sin experiencia previa"],
                    tag: "Comunidad",
                    highlight: false
                },
                {
                    title: "Estimulación Cognitiva",
                    target: "Alzheimer / Demencias",
                    duration: "60 min",
                    price: "60–80 €",
                    period: "/ sesión",
                    features: ["Memoria musical", "Ritmo y coordinación", "Prevención deterioro", "Apoyo a familias"],
                    tag: "Clínico",
                    highlight: true,
                    badge: "Especialidad"
                },
                {
                    title: "Musicoterapia y Movimiento",
                    target: "Movilidad reducida",
                    duration: "60 min",
                    price: "60–80 €",
                    period: "/ sesión",
                    features: ["Equilibrio y coordinación", "Prevención de caídas", "Adaptable sentado"],
                    tag: "Salud Física",
                    highlight: false
                }
            ]
        },
        colegios: {
            title: "Innovación Educativa",
            subtitle: "Llevamos el Método Activa a las aulas para transformar la convivencia.",
            items: [
                {
                    title: "Talleres de Prevención",
                    target: "Aula completa",
                    duration: "45–60 min",
                    price: "120–150 €",
                    period: "/ sesión",
                    features: ["Regulación emocional", "Mejora de convivencia", "Prevención bullying"],
                    tag: "Puntual",
                    highlight: false
                },
                {
                    title: "Aula de Musicoterapia",
                    target: "Proyecto Estable",
                    duration: "Curso Escolar",
                    price: "400–600 €",
                    period: "/ mes",
                    features: ["Atención a la diversidad", "Recurso fijo en centro", "Coordinación docente", "Marca de Centro Innovador"],
                    tag: "Integral",
                    highlight: true,
                    badge: "Recomendado"
                },
                {
                    title: "Formación a Docentes",
                    target: "Claustro / AMPA",
                    duration: "Seminario",
                    price: "250 €",
                    period: "/ taller",
                    features: ["Música como herramienta", "Gestión de aula", "Recursos prácticos"],
                    tag: "Formación",
                    highlight: false
                }
            ]
        },
        profesionales: {
            title: "Academia y Tecnología",
            subtitle: "Herramientas digitales y formación clínica para impulsar tu carrera.",
            items: [
                {
                    title: "Supervisión de Casos",
                    target: "Mentoría",
                    duration: "1 hora",
                    price: "50–80 €",
                    period: "/ hora",
                    features: ["Análisis clínico", "Seguridad profesional", "Online / Presencial"],
                    tag: "Mentoría",
                    highlight: false
                },
                {
                    title: "Software Gestión Clínica",
                    target: "Centros / Autónomos",
                    duration: "Licencia Vitalicia",
                    price: "299 €",
                    period: "+ 3k Personalización",
                    features: ["Historia Clínica Digital", "Facturación Automatizada", "RGPD Integrado", "Marca Blanca Total"],
                    tag: "Activa Titanium",
                    highlight: true,
                    badge: "Bestseller Tech"
                },
                {
                    title: "Formación Método ACTIVA",
                    target: "Musicoterapeutas",
                    duration: "Taller Intensivo",
                    price: "180 €",
                    period: "/ curso",
                    features: ["Metodología propia", "Casos reales", "Diferenciación de marca"],
                    tag: "Certificación",
                    highlight: false
                }
            ]
        },
        consultoria: {
            title: "Soluciones Corporativas",
            subtitle: "Proyectos de alto impacto social para administración pública y privacidad.",
            items: [
                {
                    title: "Auditoría de Entornos",
                    target: "Residencias / Hospitales",
                    duration: "Consultoría",
                    price: "Desde 500 €",
                    period: "Presupuesto Base",
                    features: ["Análisis acústico", "Diseño de espacios", "Humanización de cuidados"],
                    tag: "Infraestructura",
                    highlight: false
                },
                {
                    title: "Proyectos Salud Social",
                    target: "Instituciones Públicas",
                    duration: "Licitación / Contrato",
                    price: "Desde 3.000 €",
                    period: "Proyecto Piloto",
                    features: ["Soledad no deseada", "Salud Mental Comunitaria", "Justificación Técnica", "Impacto Social Medible"],
                    tag: "Institucional",
                    highlight: true,
                    badge: "Alto Impacto"
                },
                {
                    title: "Conferencias",
                    target: "Eventos / Congresos",
                    duration: "45–90 min",
                    price: "Desde 300 €",
                    period: "/ evento",
                    features: ["Neurociencia musical", "Divulgación científica", "Speaker especializado"],
                    tag: "Visibilidad",
                    highlight: false
                }
            ]
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-800 selection:bg-brand-primary selection:text-white">
            <Helmet>
                <title>Programas y Tarifas | Activa Musicoterapia</title>
                <meta name="description" content="Consulta nuestros programas clínicos, talleres educativos y formación profesional. Método Activa." />
            </Helmet>

            <Navigation />

            <main className="pt-32 pb-24">
                {/* HERO SECTION - STRATEGIC POSITIONING */}
                <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center">
                    <RevealSection>
                        <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 leading-tight mb-6">
                            Invierte en <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-600">
                                Resultados Clínicos
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Intervenciones basadas en el <span className="text-brand-primary font-bold">Método ACTIVA©</span>.
                            Diseñamos programas que transforman vidas, no solo sesiones sueltas.
                        </p>
                    </RevealSection>
                </div>

                {/* TABS NAVIGATION */}
                <div className="sticky top-24 z-50 bg-slate-50/90 backdrop-blur-xl border-y border-slate-200 py-4 mb-16 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="flex overflow-x-auto gap-4 md:justify-center pb-2 md:pb-0 scrollbar-hide">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSearchParams({ tab: tab.id }, { replace: true })}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-brand-primary to-purple-600 text-white border-transparent shadow-lg shadow-brand-primary/25 transform scale-105'
                                        : 'bg-white text-slate-500 border-slate-200 hover:border-brand-primary/30 hover:text-brand-primary'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CONTENT GRID */}
                <div className="max-w-7xl mx-auto px-6 lg:px-12 min-h-[600px]">
                    <RevealSection key={activeTab}>
                        <div className="mb-16 text-center">
                            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">{content[activeTab].title}</h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{content[activeTab].subtitle}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 items-start">
                            {(content[activeTab].items as ProgramItem[]).map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`relative bg-white rounded-[2rem] p-8 border transition-all duration-300 flex flex-col h-full
                                        ${item.highlight
                                            ? 'border-brand-primary/20 shadow-2xl shadow-brand-primary/10 scale-105 z-10'
                                            : 'border-slate-200 shadow-xl shadow-slate-200/50 hover:border-slate-300'
                                        }`}
                                >
                                    {/* PSYCHOLOGICAL BADGE */}
                                    {item.highlight && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-primary to-purple-600 text-white px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                            {item.badge}
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                                                {item.tag}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-display font-bold text-slate-900 leading-tight mb-2">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                            <Users className="w-4 h-4 text-brand-secondary" />
                                            {item.target}
                                        </div>
                                    </div>

                                    {/* PRICE ANCHORING */}
                                    <div className="mb-8 p-6 bg-slate-50 rounded-2xl text-center">
                                        <p className="text-3xl font-bold text-slate-900 tracking-tight">
                                            {item.price}
                                        </p>
                                        <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wide">
                                            {item.period}
                                        </p>
                                    </div>

                                    {/* FEATURES LIST */}
                                    <div className="space-y-4 mb-8 flex-grow">
                                        {item.features.map((feature: string, fIdx: number) => (
                                            <div key={fIdx} className="flex items-start gap-3">
                                                <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                    <Check className="w-3 h-3 text-green-600" />
                                                </div>
                                                <span className="text-slate-600 text-sm font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA BUTTON */}
                                    <Link
                                        to="/#contact"
                                        className={`flex items-center justify-center w-full py-4 rounded-xl font-bold transition-all group-hover:scale-[1.02] shadow-sm
                                            ${item.highlight
                                                ? 'bg-gradient-to-r from-brand-primary to-purple-600 text-white hover:shadow-xl hover:shadow-brand-primary/20'
                                                : 'bg-white text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white'
                                            }`}
                                    >
                                        Solicitar Plaza
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* TRUST & AUTHORITY BANNER */}
                        <div className="mt-20 p-10 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 text-center relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold font-display mb-4 text-slate-900">¿Necesitas una propuesta personalizada?</h3>
                                <p className="text-slate-600 max-w-2xl mx-auto mb-8 text-lg">
                                    Analizamos tu caso clínico o institucional y diseñamos un plan de intervención a medida con objetivos medibles.
                                </p>
                                <a href="mailto:hola@activamusicoterapia.com" className="inline-flex items-center gap-2 px-8 py-3 bg-brand-primary text-white font-bold rounded-full hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/25">
                                    Contactar con Dirección Clínica
                                </a>
                            </div>
                        </div>

                    </RevealSection>
                </div>
            </main>

            <Footer />
        </div>
    );
};
