'use client';
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

const FOSA_DEPTH = 11034;
const SCALE = 8 / FOSA_DEPTH; // 8 unidades = 11034m

const COMPARACIONES = [
    { id: "eiffel",   label: "Torre Eiffel",         altura: 330,    color: "#c0a060", emoji: "🗼" },
    { id: "liberty",  label: "Estatua de la Libertad", altura: 93,   color: "#7aab8a", emoji: "🗽" },
    { id: "everest",  label: "Monte Everest",          altura: 8849,  color: "#9ca3af", emoji: "⛰️" },
    { id: "burj",     label: "Burj Khalifa",           altura: 828,   color: "#60a5fa", emoji: "🏙️" },
    { id: "avion",    label: "Avión Comercial",        altura: 73,    color: "#e5e7eb", emoji: "✈️" },
    { id: "iss",      label: "Órbita ISS",             altura: 408000, color: "#f59e0b", emoji: "🛸" },
];

// Fosa — caja azul oscura a escala real
function Fosa() {
    const h = FOSA_DEPTH * SCALE;
    return (
        <group position={[-2, 0, 0]}>
            {/* Cuerpo de la fosa */}
            <mesh position={[0, -h / 2, 0]}>
                <boxGeometry args={[1.2, h, 1.2]} />
                <meshPhongMaterial color="#000810" transparent opacity={0.9} emissive="#001529" />
            </mesh>
            {/* Borde superior */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.4, 0.02, 1.4]} />
                <meshBasicMaterial color="#0077b6" />
            </mesh>
            {/* Borde inferior */}
            <mesh position={[0, -h, 0]}>
                <boxGeometry args={[1.4, 0.02, 1.4]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
            </mesh>
            {/* Líneas de profundidad */}
            {[0.25, 0.5, 0.75].map((t, i) => (
                <mesh key={i} position={[0, -h * t, 0]}>
                    <boxGeometry args={[1.3, 0.005, 1.3]} />
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
                </mesh>
            ))}
            {/* Label fosa */}
            <Text position={[0, 0.3, 0]} fontSize={0.2} color="#60a5fa" anchorX="center">
                Fosa de las Marianas
            </Text>
            <Text position={[0, 0.1, 0]} fontSize={0.14} color="#3b82f6" anchorX="center">
                11.034m
            </Text>
        </group>
    );
}

// Objeto de comparación animado
function Objeto({ comparacion, visible }) {
    const ref = useRef();
    const h = Math.min(comparacion.altura, FOSA_DEPTH) * SCALE;
    const color = new THREE.Color(comparacion.color);

    // Entrada animada
    useFrame(() => {
        if (!ref.current) return;
        ref.current.scale.y += (1 - ref.current.scale.y) * 0.08;
    });

    if (!visible) return null;

    return (
        <group ref={ref} position={[1.5, 0, 0]} scale={[1, 0, 1]}>
            {/* Objeto */}
            <mesh position={[0, -h / 2, 0]}>
                <boxGeometry args={[0.8, h, 0.8]} />
                <meshPhongMaterial color={color} transparent opacity={0.85} emissive={color} emissiveIntensity={0.1} />
            </mesh>
            {/* Tope del objeto */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.9, 0.025, 0.9]} />
                <meshBasicMaterial color={comparacion.color} />
            </mesh>
            {/* Base */}
            <mesh position={[0, -h, 0]}>
                <boxGeometry args={[0.9, 0.025, 0.9]} />
                <meshBasicMaterial color={comparacion.color} transparent opacity={0.4} />
            </mesh>

            {/* Labels */}
            <Text position={[0, 0.3, 0]} fontSize={0.18} color={comparacion.color} anchorX="center">
                {comparacion.label}
            </Text>
            <Text position={[0, 0.1, 0]} fontSize={0.13} color="#9ca3af" anchorX="center">
                {comparacion.altura >= 1000
                    ? `${(comparacion.altura / 1000).toFixed(1)}km`
                    : `${comparacion.altura}m`}
            </Text>

            {/* Línea conectora al nivel de la fosa — si el objeto es menor */}
            {comparacion.altura < FOSA_DEPTH && (
                <>
                    <mesh position={[0, -h - (FOSA_DEPTH - comparacion.altura) * SCALE / 2, 0]}>
                        <boxGeometry args={[0.02, (FOSA_DEPTH - comparacion.altura) * SCALE, 0.02]} />
                        <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
                    </mesh>
                    <mesh position={[0, -FOSA_DEPTH * SCALE, 0]}>
                        <boxGeometry args={[0.9, 0.015, 0.9]} />
                        <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
                    </mesh>
                </>
            )}
        </group>
    );
}

// Línea horizontal de comparación entre fosa y objeto
function LineaComparacion({ comparacion, visible }) {
    if (!visible || comparacion.altura >= FOSA_DEPTH) return null;
    const h = comparacion.altura * SCALE;

    return (
        <group>
            {/* Línea al nivel del tope del objeto */}
            <mesh position={[-0.4, -h, 0]}>
                <boxGeometry args={[3, 0.008, 0.01]} />
                <meshBasicMaterial color="#60a5fa" transparent opacity={0.25} />
            </mesh>
            {/* Label diferencia */}
            <Text position={[0.3, -h - 0.2, 0]} fontSize={0.12} color="#60a5fa" anchorX="center">
                {`↑ tope a ${comparacion.altura}m`}
            </Text>
            <Text position={[0.3, -FOSA_DEPTH * SCALE / 2 - h / 2, 0]} fontSize={0.11} color="#3b82f6" anchorX="left">
                {`${(FOSA_DEPTH - comparacion.altura).toLocaleString("es-MX")}m más`}
            </Text>
        </group>
    );
}

export default function Comparador() {
    const [seleccion, setSeleccion] = useState(null);

    const comp = COMPARACIONES.find(c => c.id === seleccion);
    const veces = comp ? Math.floor(FOSA_DEPTH / comp.altura) : 0;

    return (
        <div className="relative w-full h-screen bg-[#000b1e] overflow-hidden">

            {/* Header */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
                <p className="font-mono text-[10px] tracking-[0.6em] text-blue-500/50 uppercase mb-2">
                    / Comparador de Escala 3D
                </p>
                <h2 className="text-white text-3xl font-black tracking-tight">
                    ¿QUÉ TAN PROFUNDO ES?
                </h2>
            </div>

            {/* Dato de cuántas veces cabe */}
            {comp && (
                <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
                    <p className="font-mono text-[10px] tracking-widest text-blue-400/40 uppercase mb-1">
                        Cabrían
                    </p>
                    <p className="font-mono text-5xl font-black text-white">
                        {veces > 999
                            ? `+${Math.floor(veces / 1000)}k`
                            : veces}
                        <span className="text-blue-400 text-2xl ml-2">veces</span>
                    </p>
                    <p className="font-mono text-xs text-blue-400/40 mt-1 tracking-widest">
                        {comp.emoji} {comp.label} dentro de la fosa
                    </p>
                </div>
            )}

            {/* Selector de comparaciones */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3 flex-wrap justify-center px-4">
                {COMPARACIONES.map(c => (
                    <button
                        key={c.id}
                        onClick={() => setSeleccion(prev => prev === c.id ? null : c.id)}
                        className={`font-mono text-[10px] tracking-widest uppercase px-4 py-2 border rounded-sm transition-all duration-300
                            ${seleccion === c.id
                                ? "border-blue-500/60 text-blue-400 bg-blue-500/10"
                                : "border-blue-500/10 text-blue-400/30 hover:border-blue-500/30 hover:text-blue-400/60"
                            }`}
                    >
                        {c.emoji} {c.label}
                    </button>
                ))}
            </div>

            {/* Instrucción */}
            {!seleccion && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                    <p className="font-mono text-[10px] tracking-widest text-blue-400/30 uppercase animate-pulse">
                        Selecciona un objeto para comparar · Arrastra para rotar
                    </p>
                </div>
            )}

            <Canvas camera={{ position: [0, -3, 12], fov: 50 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />
                <pointLight position={[-5, -5, 5]} intensity={0.3} color="#0077b6" />

                <OrbitControls enablePan={false} minDistance={6} maxDistance={20} />

                <Fosa />

                {comp && (
                    <>
                        <Objeto comparacion={comp} visible={true} />
                        <LineaComparacion comparacion={comp} visible={true} />
                    </>
                )}
            </Canvas>
        </div>
    );
}