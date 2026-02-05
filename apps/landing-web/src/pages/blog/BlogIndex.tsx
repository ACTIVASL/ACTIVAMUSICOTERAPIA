import { Helmet } from 'react-helmet-async';
import { Navigation } from '../../components/layout/Navigation';
import { Footer } from '../../components/landing/Footer';
import { RevealSection } from '../../components/ui/RevealSection';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import blogHeader from '../../assets/images/blog_header.png';

export const BlogIndex = () => {
    const posts = [
        {
            title: 'Gestión Clínica 2.0: El Fin del Excel',
            excerpt: 'Descubre por qué las hojas de cálculo son un riesgo de seguridad para tu clínica y cómo la tecnología Titanium blinda tus datos.',
            date: '5 febrero, 2026',
            category: 'Tecnología Clínica',
            image: blogHeader, // Reusing header for tech post
            slug: '/blog/gestion-clinica-digital',
            featured: true
        },
        {
            title: 'Beneficios de la Musicoterapia Clínica',
            excerpt: 'Análisis profundo sobre los beneficios clínicos de la musicoterapia en trastornos neurológicos, emocionales y del desarrollo.',
            date: '4 junio, 2021',
            category: 'Divulgación',
            image: 'https://webycrm-activa.web.app/assets/blog-musicoterapia.jpg', // URL from BenefitsPost fallback
            slug: '/blog/beneficios-musicoterapia',
            featured: false
        }
    ];

    // Using the same header image for the second post if the URL is external/broken? 
    // BenefitsPost used a hardcoded URL: 'https://webycrm-activa.web.app/assets/blog-musicoterapia.jpg' in schema, 
    // but the visual image was `blogHeader` imported locally.
    // I will use `blogHeader` for both for now to ensure no broken images, but ideally they differ.

    return (
        <div className="bg-slate-950 min-h-screen font-sans text-slate-300 selection:bg-brand-primary selection:text-white">
            <Helmet>
                <title>Blog | Activa Musicoterapia</title>
                <meta name="description" content="Artículos sobre musicoterapia clínica, gestión sanitaria y tecnología para terapeutas." />
            </Helmet>

            <Navigation />

            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <RevealSection>
                        <h1 className="text-4xl md:text-6xl font-display font-black text-white leading-tight mb-4">
                            Blog y <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-cyan-400">Recursos</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mb-16">
                            Investigación clínica, novedades del sector y tecnología para terapeutas modernos.
                        </p>
                    </RevealSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, idx) => (
                            <RevealSection key={idx} delay={idx * 100}>
                                <Link to={post.slug} className="group block h-full bg-[#1A2035] rounded-3xl overflow-hidden border border-white/5 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/10">
                                    <div className="aspect-video overflow-hidden relative">
                                        <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                                        <img
                                            src={blogHeader} // Using the local asset for safety
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur text-xs font-bold uppercase tracking-wider text-white border border-white/10">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                        <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-brand-primary transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center text-brand-primary text-sm font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                                            Leer Artículo
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </div>
                                    </div>
                                </Link>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};
