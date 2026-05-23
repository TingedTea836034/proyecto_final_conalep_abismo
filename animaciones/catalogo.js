import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registramos el plugin una sola vez en este núcleo
gsap.registerPlugin(ScrollTrigger);

export const Catalogo = {
  // 1. Herramienta para animar elementos en secuencia (Timelines)
  secuencia: ({ pasos = [], onComplete }) => {
    const tl = gsap.timeline({ onComplete });
    
    // Recorre el arreglo de instrucciones y las ejecuta secuencialmente
    pasos.forEach(({ el, tipo = "to", props, posicion }) => {
      if (el && tl[tipo]) {
        tl[tipo](el, props, posicion);
      }
    });
    return tl;
  },

  // 2. Herramienta para animaciones controladas por Scroll del navegador
  scroll: ({ el, trigger, props, scrollProps }) => {
    return gsap.to(el, {
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        ...scrollProps // Te permite sobreescribir configuraciones de ScrollTrigger
      },
      ...props // Las propiedades visuales de la animación
    });
  }
};