'use client';
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EQUIPO = [
    { id: "01", nombre: "Nombre Apellido", rol: "Desarrollo Frontend", area: "Arquitectura & Animaciones" },
    { id: "02", nombre: "Nombre Apellido", rol: "Diseño UI/UX",        area: "Experiencia de Usuario" },
    { id: "03", nombre: "Nombre Apellido", rol: "Desarrollo Web",      area: "Estructura & Componentes" },
];

const TECNOLOGIAS = [
    { nombre: "Next.js",    desc: "Framework de React para producción" },
    { nombre: "GSAP",       desc: "Animaciones de alto rendimiento" },
    { nombre: "Tailwind",   desc: "Estilos utilitarios CSS" },
    { nombre: "React",      desc: "Biblioteca de interfaces de usuario" },
];

const FUENTES = [
    { autor: "NOAA",                titulo: "Ocean Facts — Mariana Trench",           año: "2023" },
    { autor: "National Geographic", titulo: "The Deepest Place on Earth",             año: "2022" },
    { autor: "Schmidt Ocean",       titulo: "Challenger Deep Expedition Reports",     año: "2021" },
    { autor: "Woods Hole",          titulo: "Hadal Zone Research & Documentation",    año: "2023" },
];

// Sección con animación de entrada al hacer scroll
function Section({ className, children, delay = 0 }) {
    const ref = useRef(null);

    useGSAP(() => {
        gsap.from(ref.current, {
            opacity: 0,
            y: 40,
            duration: 1,
            delay,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
        });
    }, { scope: ref });

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

export default function AcercaDe() {
    const pageRef = useRef(null);

   

    return (
        <div
            ref={pageRef}
            className="min-h-screen w-full pt-24 pb-20 px-6 relative overflow-hidden"
            style={{
                background: "radial-gradient(ellipse 120% 60% at 50% 0%, #001a33, #000b1e 50%, #000508 100%)",
            }}
        >
            {/* Rayos de luz decorativos */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(4)].map((_, i) => (
                    <div key={i} style={{
                        position: "absolute", top: "-10%",
                        left: `${15 + i * 22}%`,
                        width: `${30 + i * 8}px`,
                        height: "60%",
                        background: "linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)",
                        transform: `rotate(${-10 + i * 5}deg)`,
                        transformOrigin: "top center",
                    }} />
                ))}
            </div>

            {/* Viñeta */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)"
            }} />

            <div className="relative z-10 max-w-5xl mx-auto">

                {/* Hero */}
                <header className="hero-content mb-24">
                    <span className="font-mono text-[10px] tracking-[0.6em] text-blue-500/50 uppercase block mb-4">
                        / Sobre el Proyecto
                    </span>
                    <h1 className="text-white text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                        EL <span className="text-blue-600">ABISMO</span>
                    </h1>
                    <div className="w-full h-[1px] bg-blue-500/10 mb-8" />
                    <p className="text-blue-100/40 font-light text-lg leading-relaxed max-w-2xl">
                        Proyecto final de la Carrera Técnica en Informática. Una experiencia web inmersiva
                        sobre la Fosa de las Marianas — el lugar más profundo y menos explorado del planeta.
                    </p>
                </header>

                {/* Objetivo */}
                <Section className="mb-24">
                    <div className="flex gap-6 items-start">
                        <div className="flex-1 border border-blue-500/10 rounded p-8 relative"
                            style={{ background: "rgba(0,11,30,0.5)", backdropFilter: "blur(8px)" }}>
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500/40" />
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-500/40" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-500/40" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-500/40" />
                            <span className="font-mono text-[10px] tracking-[0.5em] text-blue-500/50 uppercase block mb-4">/ 01 Objetivo</span>
                            <h2 className="text-white text-3xl font-black tracking-tight mb-6">
                                ¿Por qué este proyecto?
                            </h2>
                            <p className="text-blue-100/40 font-light leading-relaxed mb-4">
                                El Abismo nace como respuesta a un reto técnico y creativo: demostrar que la web puede ser
                                un medio de divulgación científica inmersivo, accesible y de alto rendimiento.
                            </p>
                            <p className="text-blue-100/40 font-light leading-relaxed">
                                La Fosa de las Marianas representa lo desconocido — un territorio que la humanidad
                                ha explorado menos que la superficie lunar. Esta plataforma busca cambiar eso,
                                acercando sus profundidades a cualquier persona con un navegador.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Equipo */}
                <Section className="mb-24">
                    <span className="font-mono text-[10px] tracking-[0.5em] text-blue-500/50 uppercase block mb-8">/ 02 Equipo</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {EQUIPO.map(m => (
                            <div key={m.id}
                                className="group border border-blue-500/10 rounded p-6 hover:border-blue-500/30 transition-colors duration-500 relative"
                                style={{ background: "rgba(0,11,30,0.5)", backdropFilter: "blur(8px)" }}
                            >
                                <span className="font-mono text-[10px] text-blue-500/30 tracking-widest block mb-4">#{m.id}</span>
                                <h3 className="text-white font-black text-lg tracking-tight mb-1 group-hover:text-blue-400 transition-colors duration-300">
                                    {m.nombre}
                                </h3>
                                <p className="font-mono text-[10px] tracking-widest text-blue-400/50 uppercase mb-3">
                                    {m.rol}
                                </p>
                                <div className="w-6 h-[1px] bg-blue-500/30 mb-3" />
                                <p className="text-blue-200/30 text-xs font-light">{m.area}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Tecnologías */}
                <Section className="mb-24">
                    <span className="font-mono text-[10px] tracking-[0.5em] text-blue-500/50 uppercase block mb-8">/ 03 Tecnologías</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {TECNOLOGIAS.map((t, i) => (
                            <div key={i}
                                className="group border border-blue-500/10 rounded p-5 hover:border-blue-500/30 transition-colors duration-500 text-center"
                                style={{ background: "rgba(0,11,30,0.5)" }}
                            >
                                <h3 className="text-white font-black text-xl tracking-tight mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                    {t.nombre}
                                </h3>
                                <p className="text-blue-200/30 text-xs font-light leading-relaxed">{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Fuentes */}
                <Section>
                    <span className="font-mono text-[10px] tracking-[0.5em] text-blue-500/50 uppercase block mb-8">/ 04 Fuentes</span>
                    <div className="flex flex-col gap-3">
                        {FUENTES.map((f, i) => (
                            <div key={i} className="flex items-center justify-between py-4 border-b border-blue-500/10 group">
                                <div className="flex items-center gap-6">
                                    <span className="font-mono text-[10px] text-blue-500/30 tracking-widest w-6">{i + 1}</span>
                                    <div>
                                        <p className="text-white/70 text-sm font-light group-hover:text-white transition-colors duration-300">
                                            {f.titulo}
                                        </p>
                                        <p className="font-mono text-[10px] text-blue-400/40 tracking-widest mt-1">
                                            {f.autor}
                                        </p>
                                    </div>
                                </div>
                                <span className="font-mono text-[10px] text-blue-400/30 tracking-widest">{f.año}</span>
                            </div>
                        ))}
                    </div>
                </Section>

            </div>
        </div>
    );
}