 import { useRef } from "react";

import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hoyo from "./hoyo_inmersivo";


gsap.registerPlugin(ScrollTrigger);


export default function Hero() {

    const container = useRef(null);


    useGSAP(() => {

        const mm = gsap.matchMedia();


        // Configuramos dos comportamientos distintos

        mm.add({

            isDesktop: "(min-width: 800px)",

            isMobile: "(max-width: 799px)"

        }, (context) => {

            let { isDesktop } = context.conditions;


            // Intro común (rápida y ligera)

            gsap.from(".rev", { y: 20, opacity: 0, stagger: 0.05, duration: 0.8 });


            // Timeline Independiente

            gsap.timeline({

                scrollTrigger: {

                    trigger: container.current, 

                    start: "top top",

                    // En móvil el scroll es más corto para que no canse

                    end: isDesktop ? "+=1200" : "+=800",

                    scrub: isDesktop ? 1 : 0.5, // Menos scrub en móvil para evitar lag

                    pin: true,

                    pinSpacing: true,

                    invalidateOnRefresh: true, // Recalcula si giras el teléfono

                }

            })

            .to(".zoom", {

                // Zoom más agresivo en desktop, más controlado en móvil

                scale: 3,

                opacity: 0,

                ease: "power2.inOut",

                

            })

            .to(".bg-h", { opacity: 0 }, "<");


            return () => ScrollTrigger.getAll().forEach(t => t.kill());

        });

    }, { scope: container });


    return (

        <section ref={container} className="relative h-screen w-full bg-[#000b1e] overflow-hidden">

            <div className="bg-h absolute inset-0 opacity-50 z-0">

                <Hoyo isActive={true}/>

            </div>


            <div className="zoom relative z-10 h-full flex flex-col items-center justify-center text-center uppercase font-black pointer-events-none px-4">

                <h1 className="text-6xl md:text-[12rem] leading-none text-white break-words">

                    <span className="rev block">EL</span>

                    <span className="flex items-center justify-center">

                        <span className="rev text-blue-600">ABISMO</span>

                        

                    </span>

                </h1>

                <div className="rev w-16 md:w-20 h-1 bg-blue-500 my-6 md:my-8 shadow-[0_0_20px_#3b82f6]" />

                <p className="rev font-mono text-[10px] md:text-xs tracking-[0.5em] text-blue-200/40">chingas a tu madre jerson</p>

            </div>

        </section>

    );

} 