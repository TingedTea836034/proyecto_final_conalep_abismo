"use client";


import Lenis from "../../componentes/lenis_smoth_scroll.jsx";
import "./globals.css";
import Navbar from "../../componentes/nav.jsx";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";

export default function RootLayout({ children }) {
  const path = usePathname();
  const ref = useRef(null);

  useEffect(() => {
    // Entrada automática en cada cambio de ruta
    gsap.fromTo(ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", clearProps: "all" }
    );
  }, [path]); // se dispara cada vez que cambia la página

  return (
    <html
      lang="es"

    >
      <Navbar />
      <body className="min-h-full flex flex-col">

        <Lenis ref={ref}>{children}</Lenis>

      </body>
    </html>
  );
}
