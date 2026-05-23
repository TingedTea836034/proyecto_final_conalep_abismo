'use client';
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const ZONAS = [
    { label: "Superficie",        depth: "0m",       color: "#0077b6" },
    { label: "Zona Fótica",       depth: "200m",      color: "#023e8a" },
    { label: "Zona Crepuscular",  depth: "1.000m",    color: "#03045e" },
    { label: "Zona de Medianoche",depth: "4.000m",    color: "#010b13" },
    { label: "Zona Abisal",       depth: "6.000m",    color: "#000810" },
    { label: "Zona Hadal",        depth: "10.000m",   color: "#000508" },
    { label: "Challenger Deep",   depth: "11.034m",   color: "#000000" },
];

const ESPECIALIDADES = [
    "Biología Marina",
    "Oceanografía",
    "Geología Submarina",
    "Exploración y Expediciones",
    "Otro",
];

// Número de expedición aleatorio
const EXP_ID = `EXP-${Math.floor(1000 + Math.random() * 9000)}`;

// Campo individual con efecto focus
function Field({ label, number, children }) {
    return (
        <div className="relative group">
            <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[10px] text-blue-500/40 tracking-widest">/ {number}</span>
                <span className="font-mono text-[10px] text-blue-400/50 tracking-[0.3em] uppercase">{label}</span>
            </div>
            {children}
        </div>
    );
}

// Input estilizado
function StyledInput({ type = "text", placeholder, value, onChange, required }) {
    const [focused, setFocused] = useState(false);
    return (
        <div className="relative">
            {/* Indicador lateral */}
            <span className={`absolute left-0 top-1/2 -translate-y-1/2 font-mono text-blue-400 text-xs transition-opacity duration-300 ${focused ? "opacity-100" : "opacity-0"}`}>
                ▸
            </span>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full bg-transparent pl-4 pr-0 py-3 text-white font-light text-sm placeholder:text-blue-200/20 outline-none border-b transition-colors duration-300"
                style={{ borderBottomColor: focused ? "rgba(59,130,246,0.6)" : "rgba(59,130,246,0.1)" }}
            />
            {/* Glow en la línea */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-blue-400 transition-all duration-400"
                style={{
                    width: focused ? "100%" : "0%",
                    boxShadow: focused ? "0 0 8px rgba(59,130,246,0.6)" : "none",
                }}
            />
        </div>
    );
}

// Textarea estilizado
function StyledTextarea({ placeholder, value, onChange, required }) {
    const [focused, setFocused] = useState(false);
    return (
        <div className="relative">
            <span className={`absolute left-0 top-4 font-mono text-blue-400 text-xs transition-opacity duration-300 ${focused ? "opacity-100" : "opacity-0"}`}>
                ▸
            </span>
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                rows={4}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full bg-transparent pl-4 pr-0 py-3 text-white font-light text-sm placeholder:text-blue-200/20 outline-none border-b resize-none transition-colors duration-300"
                style={{ borderBottomColor: focused ? "rgba(59,130,246,0.6)" : "rgba(59,130,246,0.1)" }}
            />
            <div className="absolute bottom-0 left-0 h-[1px] bg-blue-400 transition-all duration-400"
                style={{
                    width: focused ? "100%" : "0%",
                    boxShadow: focused ? "0 0 8px rgba(59,130,246,0.6)" : "none",
                }}
            />
        </div>
    );
}

// Secuencia de transmisión al enviar
function Transmision({ expId, onDone }) {
    const ref = useRef(null);
    const lines = [
        "> PROCESANDO SOLICITUD...",
        "> ENCRIPTANDO DATOS...",
        "> TRANSMITIENDO A BASE SUBMARINA...",
        `> SOLICITUD REGISTRADA. ${expId}`,
    ];

    useGSAP(() => {
        const items = ref.current.querySelectorAll(".t-line");
        gsap.from(items, {
            opacity: 0,
            y: 6,
            stagger: 0.6,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => setTimeout(onDone, 600),
        });
    }, { scope: ref });

    return (
        <div ref={ref} className="flex flex-col gap-3 py-8">
            {lines.map((line, i) => (
                <p key={i} className={`t-line font-mono text-sm tracking-widest ${i === lines.length - 1 ? "text-blue-400" : "text-blue-200/40"}`}>
                    {line}
                </p>
            ))}
        </div>
    );
}

// Confirmación final
function Confirmacion({ expId }) {
    const ref = useRef(null);
    useGSAP(() => {
        gsap.from(ref.current, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" });
    }, { scope: ref });

    return (
        <div ref={ref} className="text-center py-12 flex flex-col items-center gap-6">
            <div className="w-12 h-12 rounded-full border border-blue-500/40 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
            </div>
            <div>
                <p className="font-mono text-[10px] tracking-[0.6em] text-blue-500/50 uppercase mb-2">Acceso Concedido</p>
                <h3 className="text-white text-3xl font-black tracking-tight">Bienvenido al Abismo</h3>
            </div>
            <div className="w-full h-[1px] bg-blue-500/10" />
            <p className="text-blue-200/40 text-sm font-light leading-relaxed max-w-sm">
                Tu solicitud ha sido registrada bajo el código <span className="text-blue-400 font-mono">{expId}</span>. El descenso ha comenzado.
            </p>
        </div>
    );
}

export default function Formulario() {
    const pageRef = useRef(null);
    const [zonaIndex, setZonaIndex] = useState(0);
    const [estado, setEstado] = useState("idle"); // idle | transmitiendo | confirmado
    const [form, setForm] = useState({
        nombre: "", institucion: "", especialidad: "", email: "", motivo: "",
    });

    const set = (key) => (e) => setForm(v => ({ ...v, [key]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setEstado("transmitiendo");
    };

    // Entrada suave
    useGSAP(() => {
        gsap.from(pageRef.current, { opacity: 0, duration: 1, ease: "power2.out" });
        gsap.from(".form-panel", { y: 40, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
    }, { scope: pageRef });

    const zonaActual = ZONAS[zonaIndex];

    return (
        <div
            ref={pageRef}
            className="min-h-screen w-full pt-24 pb-20 px-6 relative overflow-hidden"
            style={{
                background: `radial-gradient(ellipse 120% 60% at 50% 0%, #001a33, #000b1e 50%, #000508 100%)`,
            }}
        >
            {/* Rayos de luz fijos — decorativos, sin animación */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(4)].map((_, i) => (
                    <div key={i} style={{
                        position: "absolute", top: "-10%",
                        left: `${15 + i * 22}%`,
                        width: `${30 + i * 8}px`,
                        height: "80%",
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

            <div className="relative z-10 max-w-2xl mx-auto">

                {/* Header */}
                <header className="mb-12">
                    <span className="font-mono text-[10px] tracking-[0.6em] text-blue-500/50 uppercase block mb-4">
                        / Acceso Restringido
                    </span>
                    <div className="flex items-end justify-between flex-wrap gap-4">
                        <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-none">
                            SOLICITUD<br />
                            <span className="text-blue-600">DE DESCENSO</span>
                        </h1>
                        <span className="font-mono text-xs text-blue-400/30 tracking-widest">{EXP_ID}</span>
                    </div>
                    <div className="w-full h-[1px] bg-blue-500/10 mt-6" />
                </header>

                {/* Panel del formulario */}
                <div
                    className="form-panel relative border border-blue-500/10 rounded p-8"
                    style={{ background: "rgba(0,11,30,0.6)", backdropFilter: "blur(8px)" }}
                >
                    {/* Esquinas decorativas */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500/40" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-500/40" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-500/40" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-500/40" />

                    {estado === "idle" && (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                            <Field label="Nombre del Investigador" number="01">
                                <StyledInput placeholder="Tu nombre completo" value={form.nombre} onChange={set("nombre")} required />
                            </Field>

                            <Field label="Institución" number="02">
                                <StyledInput placeholder="Escuela o institución de procedencia" value={form.institucion} onChange={set("institucion")} required />
                            </Field>

                            <Field label="Área de Especialización" number="03">
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {ESPECIALIDADES.map(esp => (
                                        <button
                                            key={esp}
                                            type="button"
                                            onClick={() => setForm(v => ({ ...v, especialidad: esp }))}
                                            className={`font-mono text-[10px] tracking-widest uppercase px-3 py-2 border rounded transition-all duration-300
                                                ${form.especialidad === esp
                                                    ? "border-blue-500/60 text-blue-400 bg-blue-500/10"
                                                    : "border-blue-500/10 text-blue-400/30 hover:border-blue-500/30 hover:text-blue-400/60"
                                                }`}
                                        >
                                            {esp}
                                        </button>
                                    ))}
                                </div>
                            </Field>

                            <Field label="Zona de Interés" number="04">
                                <div className="mt-2">
                                    {/* Slider */}
                                    <input
                                        type="range"
                                        min={0}
                                        max={ZONAS.length - 1}
                                        value={zonaIndex}
                                        onChange={e => setZonaIndex(Number(e.target.value))}
                                        className="w-full accent-blue-500 cursor-pointer"
                                    />
                                    {/* Zona activa */}
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="font-mono text-xs text-white/80 tracking-widest">
                                            {zonaActual.label}
                                        </span>
                                        <span className="font-mono text-[10px] text-blue-400/50 tracking-widest">
                                            {zonaActual.depth}
                                        </span>
                                    </div>
                                    {/* Barra de color de zona */}
                                    <div className="w-full h-[2px] mt-2 rounded transition-colors duration-500"
                                        style={{ backgroundColor: zonaActual.color === "#000000" ? "#1a1a2e" : zonaActual.color, boxShadow: `0 0 8px ${zonaActual.color}` }}
                                    />
                                </div>
                            </Field>

                            <Field label="Correo de Contacto" number="05">
                                <StyledInput type="email" placeholder="tu@correo.com" value={form.email} onChange={set("email")} required />
                            </Field>

                            <Field label="Motivo de la Expedición" number="06">
                                <StyledTextarea placeholder="Describe el propósito de tu interés en la fosa..." value={form.motivo} onChange={set("motivo")} required />
                            </Field>

                            {/* Submit */}
                            <div className="flex justify-end mt-4">
                                <button
                                    type="submit"
                                    className="group relative px-8 py-4 bg-transparent border border-blue-500/30 rounded-sm transition-all duration-300 hover:border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.05)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] cursor-pointer"
                                >
                                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-blue-500 group-hover:border-blue-400 transition-colors duration-300" />
                                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-blue-500 group-hover:border-blue-400 transition-colors duration-300" />
                                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-blue-500 group-hover:border-blue-400 transition-colors duration-300" />
                                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-blue-500 group-hover:border-blue-400 transition-colors duration-300" />
                                    <span className="font-mono text-xs tracking-[0.4em] uppercase text-white group-hover:text-blue-400 transition-colors duration-300">
                                        [ INICIAR DESCENSO ]
                                    </span>
                                </button>
                            </div>

                        </form>
                    )}

                    {estado === "transmitiendo" && (
                        <Transmision expId={EXP_ID} onDone={() => setEstado("confirmado")} />
                    )}

                    {estado === "confirmado" && (
                        <Confirmacion expId={EXP_ID} />
                    )}
                </div>
            </div>
        </div>
    );
}