'use client';
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ZONES = [
    {
        depth: "0m",
        label: "Superficie",
        color: "#0077b6",
        rays: true,
        fact: "El océano cubre el 71% de la superficie terrestre.",
        stats: [
            { value: 361, unit: "M km²", label: "Superficie oceánica" },
            { value: 97,  unit: "%",     label: "Del agua de la Tierra" },
        ],
        detail: "La luz solar penetra hasta 200 metros. Aquí vive el 90% de toda la vida marina conocida. La superficie oceánica regula el clima global absorbiendo CO₂ y calor.",
    },
    {
        depth: "200m",
        label: "Zona Fótica",
        color: "#023e8a",
        rays: true,
        fact: "Aquí termina la luz solar. La temperatura cae a 4°C.",
        stats: [
            { value: 4,  unit: "°C", label: "Temperatura" },
            { value: 90, unit: "%",  label: "Vida marina concentrada aquí" },
        ],
        detail: "La fotosíntesis es imposible más allá de este punto. Los organismos han desarrollado ojos enormes para captar la escasa luz restante.",
    },
    {
        depth: "1.000m",
        label: "Zona Crepuscular",
        color: "#03045e",
        rays: false,
        fact: "La presión equivale a 100 atmósferas. Los huesos humanos se comprimirían.",
        stats: [
            { value: 100, unit: "atm", label: "Presión" },
            { value: 2,   unit: "°C",  label: "Temperatura" },
        ],
        detail: "Algunos animales suben de noche a alimentarse en superficie y bajan de día para evitar depredadores. La bioluminiscencia aparece aquí por primera vez.",
    },
    {
        depth: "4.000m",
        label: "Zona de Medianoche",
        color: "#010b13",
        rays: false,
        fact: "Oscuridad absoluta. Ningún rayo de sol ha llegado jamás aquí.",
        stats: [
            { value: 400, unit: "atm", label: "Presión" },
            { value: 76,  unit: "%",   label: "Del océano es esta zona" },
        ],
        detail: "La bioluminiscencia es la única fuente de luz. El pez linterna y el calamar vampiro producen su propia luz para atraer presas en la oscuridad total.",
    },
    {
        depth: "6.000m",
        label: "Zona Abisal",
        color: "#000810",
        rays: false,
        fact: "La presión es 600 veces mayor que en la superficie.",
        stats: [
            { value: 600, unit: "atm", label: "Presión" },
            { value: 1,   unit: "°C",  label: "Temperatura" },
        ],
        detail: "Los organismos sobreviven sin fotosíntesis, alimentándose de materia orgánica que cae desde arriba — lo que los científicos llaman lluvia marina.",
    },
    {
        depth: "10.000m",
        label: "Zona Hadal",
        color: "#000508",
        rays: false,
        fact: "Menos explorada que la superficie de la Luna.",
        stats: [
            { value: 1100, unit: "atm", label: "Presión" },
            { value: 0.1,  unit: "%",   label: "Del océano es zona hadal" },
        ],
        detail: "Solo existe en fosas oceánicas. En 2019, Victor Vescovo descendió aquí y encontró bolsas de plástico en el punto más profundo del planeta.",
    },
    {
        depth: "11.034m",
        label: "Challenger Deep",
        color: "#000000",
        rays: false,
        fact: "Si el Everest estuviera aquí, aún quedarían 2.185m de agua sobre su cima.",
        stats: [
            { value: 11034, unit: "m",        label: "Profundidad máxima" },
            { value: 3,     unit: "personas", label: "Han llegado al fondo" },
        ],
        detail: "Jacques Piccard y Don Walsh llegaron en 1960. James Cameron en 2012. Victor Vescovo en 2019. Solo tres expediciones en más de 60 años.",
    },
];

const DEPTHS = [0, 200, 1000, 4000, 6000, 10000, 11034];

// Rayos de sol — solo CSS, sin JS
function SunRays() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
                <div key={i} style={{
                    position: "absolute",
                    top: "-10%",
                    left: `${8 + i * 18}%`,
                    width: `${35 + i * 8}px`,
                    height: "120%",
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)",
                    transform: `rotate(${-12 + i * 5}deg)`,
                    transformOrigin: "top center",
                }} />
            ))}
        </div>
    );
}

// Stat con contador animado al entrar
function AnimatedStat({ value, unit, label, active }) {
    const ref = useRef(null);

    useEffect(() => {
        if (!active || !ref.current) return;
        const isDecimal = value % 1 !== 0;
        gsap.fromTo(ref.current,
            { innerText: 0 },
            {
                innerText: value,
                duration: 1.5,
                ease: "power2.out",
                snap: { innerText: isDecimal ? 0.1 : 1 },
                onUpdate() {
                    const v = parseFloat(ref.current.innerText);
                    ref.current.innerText = isDecimal
                        ? v.toFixed(1)
                        : Math.round(v).toLocaleString("es-MX");
                }
            }
        );
    }, [active, value]);

    return (
        <div className="group text-center px-6 py-4 border border-blue-500/10 rounded hover:border-blue-500/30 transition-colors duration-300 cursor-default">
            <p className="font-mono text-2xl md:text-3xl font-black text-white mb-1">
                <span ref={ref}>0</span>
                <span className="text-blue-400 text-lg ml-1">{unit}</span>
            </p>
            <p className="font-mono text-[10px] tracking-widest text-blue-400/40 uppercase group-hover:text-blue-400/70 transition-colors duration-300">
                {label}
            </p>
        </div>
    );
}

function DepthIndicator() {
    const ref = useRef(null);

    useEffect(() => {
        ZONES.forEach((_, i) => {
            ScrollTrigger.create({
                trigger: `.zone-${i}`,
                start: "top center",
                end: "bottom center",
                onUpdate: (self) => {
                    const from = DEPTHS[i];
                    const to = DEPTHS[i + 1] ?? DEPTHS[i];
                    const depth = Math.round(from + (to - from) * self.progress);
                    if (ref.current) ref.current.textContent = `${depth.toLocaleString("es-MX")}m`;
                }
            });
        });
    }, []);

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
            <span className="font-mono text-[10px] tracking-widest text-blue-400/60 uppercase">Prof.</span>
            <div className="w-[1px] h-24 bg-blue-500/20" />
            <span ref={ref} className="font-mono text-xs text-blue-400 tabular-nums">0m</span>
        </div>
    );
}

function Zone({ zone, i }) {
    const [active, setActive] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {
        ScrollTrigger.create({
            trigger: `.zone-${i}`,
            start: "top 60%",
            onEnter: () => setActive(true),
            onLeaveBack: () => setActive(false),
        });
    }, [i]);

    return (
        <section
            className={`zone-${i} relative h-screen w-full flex items-center justify-center overflow-hidden`}
            style={{ backgroundColor: zone.color }}
        >
            {/* Rayos de sol — solo zonas con luz */}
            {zone.rays && <SunRays />}

            {/* Viñeta lateral para dar profundidad */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 45%, rgba(0,0,0,0.5) 100%)"
            }} />

            {/* Fusión entre secciones */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Contenido */}
            <div className={`zone-content-${i} relative z-10 text-center px-6 max-w-3xl w-full`}>
                <p className="font-mono text-xs tracking-[0.5em] text-blue-400/60 uppercase mb-4">
                    {zone.depth}
                </p>
                <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter mb-6">
                    {zone.label}
                </h2>
                <div className="w-12 h-[1px] bg-blue-500/40 mx-auto mb-6" />

                {/* Dato — click expande detalle */}
                <p
                    className="text-blue-100/50 font-light text-lg leading-relaxed mb-8 cursor-pointer hover:text-blue-100/80 transition-colors duration-300"
                    onClick={() => setShowDetail(v => !v)}
                >
                    {zone.fact}
                    <span className="ml-2 font-mono text-[10px] text-blue-500/40">{showDetail ? "▲" : "▼"}</span>
                </p>

                {/* Detalle expandible — CSS transition, sin JS */}
                <div style={{
                    maxHeight: showDetail ? "120px" : "0px",
                    opacity: showDetail ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s ease, opacity 0.3s ease",
                    marginBottom: showDetail ? "2rem" : "0",
                }}>
                    <p className="text-blue-200/40 text-sm leading-relaxed font-light border-l-2 border-blue-500/20 pl-4 text-left">
                        {zone.detail}
                    </p>
                </div>

                {/* Stats con contador */}
                <div className="flex gap-4 justify-center flex-wrap">
                    {zone.stats.map((stat, j) => (
                        <AnimatedStat key={j} {...stat} active={active} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function PaginaPrincipal() {
    const pageRef = useRef(null);

    useGSAP(() => {
        gsap.from(pageRef.current, { opacity: 0, duration: 1, ease: "power2.out" });
    });

    useGSAP(() => {
        ZONES.forEach((_, i) => {
            gsap.from(`.zone-content-${i}`, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: `.zone-${i}`,
                    start: "top 65%",
                    toggleActions: "play none none reverse",
                }
            });
        });
    }, { scope: pageRef });

    return (
        <div ref={pageRef} id="parallax-container">
            <DepthIndicator />
            {ZONES.map((zone, i) => (
                <Zone key={i} zone={zone} i={i} />
            ))}
        </div>
    );
}