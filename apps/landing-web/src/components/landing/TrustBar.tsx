import { Users, Building, Award, Globe } from 'lucide-react';
import { RevealSection } from '../ui/RevealSection';

export const TrustBar = () => {
    const stats = [
        { icon: Users, value: "+500", label: "Pacientes Atendidos" },
        { icon: Building, value: "15+", label: "Centros Colaboradores" },
        { icon: Globe, value: "100%", label: "Cobertura Nacional" },
        { icon: Award, value: "Top 1", label: "Método Clínico ACTIVA©" },
    ];

    return (
        <div className="w-full bg-slate-950/50 border-y border-white/5 backdrop-blur-sm relative z-30 -mt-20 sm:-mt-32 lg:-mt-20 mb-20">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <RevealSection>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center text-center group cursor-default">
                                <div className="flex items-center gap-3 mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <stat.icon className="w-5 h-5 text-brand-primary" />
                                    <span className="text-3xl font-display font-black text-white">{stat.value}</span>
                                </div>
                                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </RevealSection>
            </div>
        </div>
    );
};
