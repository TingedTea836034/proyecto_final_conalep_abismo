'use client';
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Reemplaza src con tus imágenes reales cuando las tengas
const IMAGES = [
    { id: "0001", src: "/galeria/img1.jpg", title: "Challenger Deep", depth: "11.034m", category: "PAISAJES",     desc: "El punto más profundo conocido del planeta, fotografiado por primera vez en 1960." },
    { id: "0002", src: "/galeria/img2.jpg", title: "Pez Linterna",    depth: "1.000m",  category: "CRIATURAS",    desc: "Produce bioluminiscencia para atraer presas en la oscuridad total de la zona crepuscular." },
    { id: "0003", src: "/galeria/img3.jpg", title: "Descenso",        depth: "4.000m",  category: "EXPEDICIONES", desc: "Imagen captada durante el descenso de la expedición Vescovo en 2019." },
    { id: "0004", src: "/galeria/img4.jpg", title: "Calamar Vampiro", depth: "3.000m",  category: "CRIATURAS",    desc: "Vampyroteuthis infernalis — ni calamar ni pulpo, una especie única que habita las profundidades." },
    { id: "0005", src: "/galeria/img5.jpg", title: "Sedimento Abisal", depth: "6.000m", category: "PAISAJES",     desc: "El fondo marino cubierto de sedimento acumulado durante millones de años." },
    { id: "0006", src: "/galeria/img6.jpg", title: "Batiscafo",       depth: "0m",      category: "EXPEDICIONES", desc: "El Trieste, primer vehículo en alcanzar el fondo de la Fosa de las Marianas en 1960." },
    { id: "0007", src: "/galeria/img7.jpg", title: "Pepino de Mar",   depth: "8.000m",  category: "CRIATURAS",    desc: "Holoturia abisal, uno de los pocos organismos capaces de sobrevivir en la zona hadal." },
    { id: "0008", src: "/galeria/img8.jpg", title: "Fosa desde Arriba", depth: "0m",    category: "PAISAJES",     desc: "Vista satelital de la ubicación de la Fosa de las Marianas en el Océano Pacífico." },
];

const FILTERS = ["TODOS", "CRIATURAS", "PAISAJES", "EXPEDICIONES"];

// Tamaños del grid masonry — alterna para que no sea monótono
const SIZES = [
    "md:col-span-2 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-2 md:row-span-1",
];

// Lightbox
function Lightbox({ image, images, onClose, onNav }) {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        gsap.from(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
        gsap.from(contentRef.current, { scale: 0.96, opacity: 0, duration: 0.4, ease: "power3.out" });
    });

    const close = () => {
        gsap.to(overlayRef.current, {
            opacity: 0, duration: 0.25, ease: "power2.in",
            onComplete: onClose
        });
    };

    // Cerrar con ESC
    useGSAP(() => {
        const onKey = (e) => { if (e.key === "Escape") close(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    const currentIndex = images.findIndex(img => img.id === image.id);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
            onClick={close}
        >
            <div
                ref={contentRef}
                className="relative max-w-5xl w-full flex flex-col md:flex-row gap-8 items-center"
                onClick={e => e.stopPropagation()}
            >
                {/* Imagen */}
                <div className="relative flex-1 min-h-75 md:min-h-500px rounded overflow-hidden border border-blue-500/20">
                    <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover"
                        style={{ minHeight: "300px" }}
                    />
                    {/* Número de registro */}
                    <span className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-blue-400/60">
                        #{image.id}
                    </span>
                </div>

                {/* Info */}
                <div className="md:w-64 flex flex-col gap-4">
                    <span className="font-mono text-[10px] tracking-[0.4em] text-blue-500/60 uppercase">
                        {image.category}
                    </span>
                    <h3 className="text-white text-2xl font-black tracking-tight">
                        {image.title}
                    </h3>
                    <div className="w-8 h-1px bg-blue-500/40" />
                    <p className="font-mono text-xs text-blue-400/60 tracking-widest">
                        PROF. {image.depth}
                    </p>
                    <p className="text-blue-100/50 text-sm leading-relaxed font-light">
                        {image.desc}
                    </p>

                    {/* Navegación */}
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => onNav(currentIndex - 1)}
                            disabled={currentIndex === 0}
                            className="font-mono text-xs tracking-widest text-blue-400/40 hover:text-blue-400 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                        >
                            ← ANTERIOR
                        </button>
                        <button
                            onClick={() => onNav(currentIndex + 1)}
                            disabled={currentIndex === images.length - 1}
                            className="font-mono text-xs tracking-widest text-blue-400/40 hover:text-blue-400 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                        >
                            SIGUIENTE →
                        </button>
                    </div>
                </div>

                {/* Cerrar */}
                <button
                    onClick={close}
                    className="absolute top-0 right-0 font-mono text-xs tracking-widest text-blue-400/40 hover:text-blue-400 transition-colors"
                >
                    [ ESC ]
                </button>
            </div>
        </div>
    );
}

// Tarjeta de imagen
function ImageCard({ image, index, onClick }) {
    return (
        <div
            className={`gallery-item relative overflow-hidden rounded cursor-pointer group border border-blue-500/10 hover:border-blue-500/30 transition-colors duration-500 ${SIZES[index % SIZES.length]}`}
            style={{ minHeight: "200px" }}
            onClick={onClick}
        >
            {/* Imagen */}
            <img
                src={image.src}
                alt={image.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
            />

            {/* Overlay base sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

            {/* Info visible siempre abajo */}
            <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                <span className="font-mono text-[9px] tracking-widest text-blue-400/60 uppercase block mb-1">
                    #{image.id} — {image.depth}
                </span>
                <h3 className="text-white font-black text-sm tracking-tight">
                    {image.title}
                </h3>
                {/* Descripción — solo en hover */}
                <p className="text-blue-100/50 text-xs leading-relaxed mt-1 font-light
                    max-h-0 overflow-hidden group-hover:max-h-16
                    transition-all duration-500 ease-out">
                    {image.desc}
                </p>
            </div>

            {/* Categoría — esquina superior derecha */}
            <span className="absolute top-4 right-4 font-mono text-[9px] tracking-widest text-blue-400/40 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.category}
            </span>
        </div>
    );
}

export default function Galeria() {
    const pageRef = useRef(null);
    const [filter, setFilter] = useState("TODOS");
    const [lightbox, setLightbox] = useState(null);

    const filtered = filter === "TODOS"
        ? IMAGES
        : IMAGES.filter(img => img.category === filter);

    // Entrada de página
    useGSAP(() => {
        gsap.from(pageRef.current, { opacity: 0, duration: 1, ease: "power2.out" });
    });

    // Animación de tarjetas al hacer scroll
    useGSAP(() => {
        gsap.from(".gallery-item", {
            opacity: 0,
            y: 40,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".gallery-grid",
                start: "top 80%",
            }
        });
    }, { scope: pageRef, dependencies: [filter] });

    const handleNav = (newIndex) => {
        if (newIndex >= 0 && newIndex < filtered.length) {
            setLightbox(filtered[newIndex]);
        }
    };

    return (
        <div
            ref={pageRef}
            className="min-h-screen w-full pt-24 pb-20 px-6"
            style={{
                background: "radial-gradient(ellipse 120% 60% at 50% 0%, #001a33, #000b1e 50%, #000508 100%)",
            }}
        >
            {/* Hero */}
            <header className="max-w-6xl mx-auto mb-16">
                <span className="font-mono text-[10px] tracking-[0.6em] text-blue-500/50 uppercase block mb-4">
                    / Archivo Visual
                </span>
                <div className="flex items-end justify-between flex-wrap gap-4">
                    <h1 className="text-white text-6xl md:text-8xl font-black tracking-tighter leading-none">
                        GALERÍA
                    </h1>
                    <span className="font-mono text-xs text-blue-400/40 tracking-widest">
                        {filtered.length} REGISTROS
                    </span>
                </div>
                <div className="w-full h-[1px] bg-blue-500/10 mt-6" />
            </header>

            {/* Filtros */}
            <div className="max-w-6xl mx-auto mb-12 flex gap-6 flex-wrap">
                {FILTERS.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`font-mono text-[10px] tracking-[0.4em] uppercase transition-colors duration-300
                            ${filter === f ? "text-blue-400" : "text-blue-400/30 hover:text-blue-400/60"}`}
                    >
                        {filter === f ? `[ ${f} ]` : f}
                    </button>
                ))}
            </div>

            {/* Grid masonry */}
            <div className="gallery-grid max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4">
                {filtered.map((image, i) => (
                    <ImageCard
                        key={image.id}
                        image={image}
                        index={i}
                        onClick={() => setLightbox(image)}
                    />
                ))}
            </div>

            {/* Lightbox */}
            {lightbox && (
                <Lightbox
                    image={lightbox}
                    images={filtered}
                    onClose={() => setLightbox(null)}
                    onNav={handleNav}
                />
            )}
        </div>
    );
}