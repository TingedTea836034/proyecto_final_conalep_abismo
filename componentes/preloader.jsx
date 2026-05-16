'use client';
//esta pagina sera para la animacion que dara entrada a la web
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader({setFinished}) {
    const percentRef = useRef(null);
    const barRef = useRef(null);
    const containerRef = useRef(null);
    const textRef = useRef(null);

useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (setFinished) {setFinished(true);}
            }
       
        });


        // 1. Animación del texto de carga (Aparece primero)
        tl.from(textRef.current, {
            opacity: 0,
            y: 10,
            duration: 1,
            ease: "power2.out"
        })

        // 2. Contador y Barra (Corren al mismo tiempo gracias al position parameter "<")
        tl.to(percentRef.current, {
            innerText: 100,
            duration: 3,
            snap: { innerText: 1 },
            ease: "power1.inOut",
        }, "<") // Empezar junto con la animación anterior

        .to(barRef.current, {
            scaleX: 1,
            duration: 3,
            ease: "power1.inOut",
        }, "<")

        // 3. Efecto de "Flash" final antes de salir
        .to([percentRef.current, textRef.current], {
            opacity: 0.4,
            duration: 0.2,
            repeat: 3,
            yoyo: true,
        })

        // 4. Salida cinematográfica (Se levanta la pantalla)
        .to(containerRef.current, {
            opacity: 0,
            duration: 1.5,
            ease: "power1.inOut",
            yoyo: true,
        })

        

       

    }, { scope: containerRef }, [setFinished]); // Muy importante para React

    

    

    return (

        <div ref={containerRef} className="fixed inset-0 z-1 bg-black flex flex-col items-center justify-center text-white font-mono">
            <div className="relative">
                <h2 ref={textRef} className="text-sm tracking-[0.3em] mb-4 text-blue-500 uppercase">Iniciando protocolo de descenso</h2>
                <div className="text-9xl font-black italic text-center">
                    <span ref={percentRef}  >0</span>%
                </div>
                {/* Barra de progreso minimalista */}
                <div className="w-full h-0.5 bg-white/10 mt-4">
                    <div ref={barRef} className="w-full h-full bg-blue-600 origin-left scale-x-0"></div>
                </div>
            </div>
           
        </div>




















    )
}