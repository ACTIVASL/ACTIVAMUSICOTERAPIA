import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
    Brain,
    Music
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Programs = () => {
    const [activeTab, setActiveTab] = useState<'infancia' | 'adultos' | 'colegios' | 'profesionales' | 'consultoria'>('infancia');

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
                    price: "70–80 € / sesión",
                    features: ["Enfoque neurodesarrollo", "Juego sensorial", "Regulación emocional"],
                    tag: "Prevención"
                },
                {
                    title: "Musicoterapia en Familia",
                    target: "Padres + Hijos",
                    duration: "50–60 min",
                    price: "80–100 € / sesión",
                    features: ["Refuerzo del vínculo afectivo", "Comunicación no verbal", "Continuidad en casa"],
                    tag: "Vínculo"
                },
                {
                    title: "Musicoterapia Clínica TEA",
                    target: "Grupos 4–6 niños",
                    duration: "45–60 min",
                    price: "90–120 € / sesión",
                    features: ["Alta especialización", "Atención conjunta", "Gestión de turnos"],
                    tag: "Clínico"
                },
                {
                    title: "Terapia Individual Infantil",
                    target: "1 niño",
                    duration: "45–50 min",
                    price: "50–60 € / sesión",
                    features: ["Adaptación total", "Enfoque preventivo", "Desarrollo del lenguaje"],
                    tag: "Personalizado"
                }
            ]
        },
        adultos: {
            title: "Bienestar y Envejecimiento Activo",
            subtitle: "Intervenciones para mantener la vitalidad cognitiva y emocional.",
            items: [
                {
                    title: "Estimulación Cognitiva (Memoria)",
                    target: "Centros de día / Asociaciones",
                    duration: "60 min",
                    price: "60–80 € / sesión",
                    features: ["Recuperación de memoria musical", "Ritmo y coordinación", "Prevención deterioro"],
                    tag: "Alzheimer"
                },
                {
                    title: "Coro Terapéutico",
                    target: "Grupo Vocal",
                    duration: "60–90 min",
                    price: "70–100 € / sesión",
                    features: ["Beneficios respiratorios", "Cohesión social", "Sin experiencia previa"],
                    tag: "Comunidad"
                },
                {
                    title: "Musicoterapia y Movimiento",
                    target: "Movilidad reducida",
                    duration: "60 min",
                    price: "60–80 € / sesión",
                    features: ["Equilibrio y coordinación", "Prevención de caídas", "Adaptable sentado"],
                    tag: "Salud Física"
                },
                {
                    title: "Terapia Individual Adulto",
                    target: "1 persona",
                    duration: "45–50 min",
                    price: "60 € / sesión",
                    features: ["Bienestar emocional", "Gestión de estrés", "Expresión profunda"],
                    tag: "Clínico"
                }
            ]
        },
        colegios: {
            title: "Innovación Educativa",
            subtitle: "Llevamos el Método Activa a las aulas para transformar la convivencia.",
            items: [
                {
                    title: "Prevención Emocional",
                    target: "Aula completa",
                    duration: "45–60 min",
                    price: "120–150 € / sesión",
                    features: ["Regulación emocional", "Mejora de convivencia", "Prevención bullying"],
                    tag: "Educativo"
                },
                {
                    title: "Aula de Musicoterapia",
                    target: "Proyecto Estable",
                    duration: "Semanal",
                    price: "400–600 € / mes",
                    features: ["Atención a la diversidad", "Recurso fijo en centro", "Coordinación docente"],
                    tag: "Integral"
                },
                {
                    title: "Formación a Docentes",
                    target: "Claustro / AMPA",
                    duration: "Seminario",
                    price: "150–250 € / formación",
                    features: ["Música como herramienta", "Gestión de aula", "Recursos prácticos"],
                    tag: "Formación"
                }
            ]
        },
        profesionales: {
            title: "Academia Activa",
            subtitle: "Eleva tu práctica clínica con la metodología líder en el sector.",
            items: [
                {
                    title: "Formación Método ACTIVA",
                    target: "Musicoterapeutas",
                    duration: "Taller Intensivo",
                    price: "180–300 €",
                    features: ["Metodología propia", "Casos reales", "Diferenciación de marca"],
                    tag: "Certificación"
                },
                {
                    title: "Supervisión de Casos",
                    target: "Mentoría",
                    duration: "1 hora",
                    price: "50–80 €",
                    features: ["Análisis clínico", "Seguridad profesional", "Online / Presencial"],
                    tag: "Mentoría"
                },
                {
                    title: "Supervisión de Casos",
                    target: "Mentoría",
                    duration: "1 hora",
                    price: "50–80 €",
                    features: ["Análisis clínico", "Seguridad profesional", "Online / Presencial"],
                    tag: "Mentoría"
                }
            ]
        },
        consultoria: {
            title: "Soluciones Corporativas e Institucionales",
            subtitle: "Asesoramiento estratégico para implantar programas de musicoterapia de alto impacto.",
            items: [
                {
                    title: "Diseño de Proyectos y Licitaciones",
                    target: "Ayuntamientos / ONGs",
                    duration: "Por proyecto",
                    price: "60–100 € / hora",
                    features: ["Estructura técnica", "Viabilidad económica", "Justificación clínica"],
                    tag: "Estratégico"
                },
                {
                    title: "Auditoría de Entornos",
                    target: "Residencias / Hospitales",
                    duration: "Consultoría",
                    price: "Bajo Presupuesto",
                    features: ["Análisis acústico", "Diseño de espacios", "Recomendación de material"],
                    tag: "Infraestructura"
                },
                {
                    title: "Conferencias y Divulgación",
                    target: "Eventos / Congresos",
                    duration: "45–90 min",
                    price: "Desde 300 €",
                    features: ["Neurociencia musical", "Impacto social", "Speaker especializado"],
                    tag: "Visibilidad"
                }
            ]
        }
    };

    return (
        <div className="bg-slate-950 min-h-screen font-sans text-slate-300 selection:bg-brand-primary selection:text-white">
            <Helmet>
                <title>Programas y Tarifas | Activa Musicoterapia</title>
                <meta name="description" content="Consulta nuestros programas clínicos, talleres educativos y formación profesional. Método Activa." />
            </Helmet>

            <Navigation />

            <main className="pt-32 pb-24">
                {/* HERO SECTION - STRATEGIC POSITIONING */}
                <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20 text-center">
                    <RevealSection>
                        <h1 className="text-4xl md:text-6xl font-display font-black text-white leading-tight mb-6">
                            Más que Sesiones, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-cyan-400">
                                Programas de Vida
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            No vendemos tiempo, generamos <strong>Prevención, Bienestar e Inclusión</strong>.
                            Nuestra intervención clínica está basada en el <span className="text-white font-bold">Método ACTIVA©</span>,
                            garantizando impacto emocional y social medible.
                        </p>
                    </RevealSection>
                </div>
                {/* TABS NAVIGATION */}
                <div className="sticky top-24 z-50 bg-slate-950/80 backdrop-blur-xl border-y border-white/5 py-4 mb-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="flex overflow-x-auto gap-4 md:justify-center pb-2 md:pb-0 scrollbar-hide">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as 'infancia' | 'adultos' | 'colegios' | 'profesionales' | 'consultoria')}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
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
                        <div className="mb-12">
                            <h2 className="text-3xl font-display font-bold text-white mb-2">{content[activeTab].title}</h2>
                            <p className="text-lg text-slate-400">{content[activeTab].subtitle}</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {content[activeTab].items.map((item, idx) => (
                                <div key={idx} className="group relative bg-[#1A2035] rounded-3xl p-8 border border-white/5 hover:border-brand-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/10 flex flex-col">
                                    {/* Tag */}
                                    <div className="absolute top-6 right-6">
                                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#EC008C] text-xs font-bold uppercase tracking-wider">
                                            {item.tag}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-display font-bold text-white mb-2 pr-8">{item.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-cyan-400 font-medium mb-6">
                                        <Users className="w-4 h-4" /> {item.target}
                                    </div>

                                    <div className="space-y-4 mb-8 flex-grow">
                                        {item.features.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-green-400 shrink-0" />
                                                <span className="text-slate-300 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6 border-t border-white/10">
                                        <div className="flex justify-between items-end mb-4">
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Inversión</p>
                                                <p className="text-xl font-bold text-white">{item.price}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Duración</p>
                                                <p className="text-sm font-medium text-slate-300">{item.duration}</p>
                                            </div>
                                        </div>

                                        <Link
                                            to="/#contact" // Ideally opens a modal
                                            className="flex items-center justify-center w-full py-3 rounded-xl bg-white/5 hover:bg-brand-primary text-white font-bold transition-all group-hover:scale-105"
                                        >
                                            Más Información
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* STRATEGIC CONSIDERATIONS SECTION */}
                        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-brand-primary/20 to-purple-900/40 border border-brand-primary/20 text-center relative overflow-hidden">
                            <div className="relative z-10">
                                <Music className="w-12 h-12 text-white mx-auto mb-4 opacity-80" />
                                <h3 className="text-2xl font-bold text-white mb-2">¿Buscas estabilidad y resultados?</h3>
                                <p className="text-slate-300 max-w-2xl mx-auto mb-6">
                                    Recomendamos nuestros <strong>Bonos Trimestrales</strong> para asegurar la adherencia al tratamiento y maximizar los resultados neuro-cognitivos.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400 uppercase tracking-widest mt-4">
                                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-cyan-400" /> Desplazamiento incluido</span>
                                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-cyan-400" /> Material clínico propio</span>
                                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-cyan-400" /> Seguro RC Sanitario</span>
                                </div>
                                <div className="mt-8">
                                    <a href="mailto:hola@activamusicoterapia.com" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-brand-dark font-bold rounded-full hover:bg-cyan-400 transition-colors">
                                        Solicitar Propuesta Personalizada
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* STRATEGIC BANNER */}
                        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-brand-primary/20 to-purple-900/40 border border-brand-primary/20 text-center relative overflow-hidden">
                            <div className="relative z-10">
                                <Music className="w-12 h-12 text-white mx-auto mb-4 opacity-80" />
                                <h3 className="text-2xl font-bold text-white mb-2">¿Buscas un Proyecto a Medida?</h3>
                                <p className="text-slate-300 max-w-2xl mx-auto mb-6">
                                    Diseñamos intervenciones específicas para ayuntamientos, hospitales y grandes colectivos.
                                    El Método ACTIVA es escalable y adaptable.
                                </p>
                                <a href="mailto:hola@activamusicoterapia.com" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-brand-dark font-bold rounded-full hover:bg-cyan-400 transition-colors">
                                    Contactar Coordinación
                                    <ArrowRight className="w-4 h-4" />
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
