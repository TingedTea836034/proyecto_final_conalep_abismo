'use client';
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeLayout() {
    const masterContainer = useRef(null);
    const overlayRef = useRef(null);
    const overlayTextRef = useRef(null);
    const overlayLineRef = useRef(null);
    const router = useRouter();

    const handleNavigate = () => {
        const tl = gsap.timeline({
            onComplete: () => router.push("/pagina_principal")
        });

        tl
        // 1. El overlay negro aparece
        .to(overlayRef.current, {
            opacity: 1,
            duration: 1,
            ease: "power2.in"
        })
        // 2. La línea azul se expande de centro hacia afuera
        .from(overlayLineRef.current, {
            scaleX: 0,
            duration: 0.6,
            ease: "power3.inOut"
        })
        // 3. El texto aparece con glitch
        .from(overlayTextRef.current, {
            opacity: 0,
            y: 10,
            letterSpacing: "1em",
            duration: 1,
            ease: "power3.out"
        }, "<0.2")
        // 4. Flash final antes de navegar
        .to(overlayTextRef.current, {
            opacity: 0.3,
            duration: 0.5,
            repeat: 3,
            yoyo: true,
        })
     
    };

    useGSAP(() => {
        gsap.from(".rev", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" });

        gsap.timeline({
            scrollTrigger: {
                trigger: masterContainer.current,
                start: "top top",
                end: "+=2000",
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true
            }
        })
        .to(".zoom", { scale: 15, opacity: 0, filter: "blur(20px)", ease: "power2.in" }, 0)
        .from(".desc-inner", { y: 80, opacity: 0, filter: "blur(15px)", duration: 1.5, ease: "power3.out" }, ">-0.5")
        .from(".line-reveal", { width: 0, stagger: 0.2, duration: 1, ease: "power2.inOut" }, "<")
        .from("#btn-fixed", { opacity: 0, y: 20, duration: 0.5 }, ">-0.2");

    }, { scope: masterContainer });

    return (
        <>
            {/* Overlay de transición */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-[#000b1e] opacity-0 flex flex-col items-center justify-center pointer-events-none"
                style={{ zIndex: 99999 }}
            >
                <p
                    ref={overlayTextRef}
                    className="font-mono text-xs tracking-[0.8em] uppercase text-blue-400 mb-6"
                >
                    DESCENDIENDO
                </p>
                <div
                    ref={overlayLineRef}
                    className="w-48 h-[1px] bg-blue-500 origin-center shadow-[0_0_12px_#3b82f6]"
                />
            </div>

            <div id="btn-fixed" style={{ position: "fixed", bottom: "10vh", left: "50%", transform: "translateX(-50%)", zIndex: 9999, pointerEvents: "auto" }}>
                <button
                    onClick={handleNavigate}
                    type="button"
                    className="group relative px-8 py-4 bg-[#000b1e] border border-blue-500/30 rounded-sm inline-block transition-all duration-300 hover:border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] cursor-pointer"
                >
                    IR A LA PAGINA
                </button>
            </div>

            <div ref={masterContainer} className="relative w-full bg-[#000b1e] overflow-hidden">
                <section className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10">
                    <div className="zoom pointer-events-none relative z-10 text-center uppercase font-black px-4">
                        <h1 className="text-6xl md:text-[12rem] leading-none text-white break-words">
                            <span className="rev block">EL</span>
                            <span className="flex items-center justify-center">
                                <span className="rev text-blue-600">ABISM</span>
                                <span className="rev ml-2">O</span>
                            </span>
                        </h1>
                        <div className="rev w-16 md:w-20 h-1 bg-blue-500 mx-auto my-6 md:my-8 shadow-[0_0_20px_#3b82f6]" />
                        <p className="rev font-mono text-[10px] md:text-xs tracking-[0.5em] text-blue-200/40">Deep Data</p>
                    </div>
                </section>

                <section className="absolute inset-0 h-screen w-full flex flex-col items-center justify-center px-6 z-40 pointer-events-none">
                    <div className="desc-inner max-w-5xl w-full flex flex-col items-center relative z-50">
                        <header className="mb-16 w-full">
                            <span className="text-blue-500 font-mono text-xs tracking-[0.6em] uppercase">/ 01 Descripción</span>
                            <h2 className="text-white text-5xl md:text-7xl font-light mt-6 tracking-tighter leading-none">
                                Un entorno <span className="text-blue-600 italic">minimalista</span> para <br />
                                <span className="font-black">datos complejos.</span>
                            </h2>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full mb-16">
                            <div className="relative">
                                <div className="line-reveal w-full h-[1px] bg-blue-500/30 mb-8" />
                                <p className="text-blue-200/50 text-lg leading-relaxed font-light">Esta plataforma elimina el ruido visual. Basándonos en el concepto del abismo, creamos un espacio donde el rendimiento técnico se fusiona con una estética pura y directa.</p>
                            </div>
                            <div className="relative">
                                <div className="line-reveal w-full h-[1px] bg-blue-500/30 mb-8" />
                                <p className="text-blue-200/50 text-lg leading-relaxed font-light">Cada transición y cada píxel están optimizados para ofrecer una respuesta inmediata, permitiendo una navegación intuitiva y una inmersión total en la información.</p>
                            </div>
                        </div>
                        <div className="h-30" />
                    </div>
                </section>
            </div>
        </>
    );
}