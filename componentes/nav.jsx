'use client';
import { useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const LINKS = [
    { label: "El Abismo",  href: "/" },
    { label: "Galería",    href: "/pagina_galeria" },
    { label: "Formulario",  href: "/pagina_formulario" },
    { label: "pagina sin nombre todavia ", href: "/expediciones" },
    { label: "Acerca de",   href: "/pagina_acercade" },
];

export default function Navbar() {
    const navRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();

    // Entrada suave al montar
    useGSAP(() => {
        gsap.from(navRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        });
    }, { scope: navRef });

    // Fondo que aparece al hacer scroll
    useEffect(() => {
        const nav = navRef.current;
        const onScroll = () => {
            if (window.scrollY > 40) {
                nav.style.background = "rgba(0, 5, 15, 0.85)";
                nav.style.borderBottomColor = "rgba(59, 130, 246, 0.15)";
            } else {
                nav.style.background = "transparent";
                nav.style.backdropFilter = "none";
                nav.style.borderBottomColor = "transparent";
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNavigate = (href) => {
        if (href === pathname) return;

        // Transición de salida antes de navegar
        gsap.to(document.body, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                router.push(href);
                gsap.to(document.body, { opacity: 1, duration: 0.4, ease: "power2.out" });
            }
        });
    };

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 border-b transition-colors duration-500 bg-transparent border-transparent"
           
        >
            <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

                {/* Logo */}
                <button
                    onClick={() => handleNavigate("/pagina_principal")}
                    className="font-mono text-xs tracking-[0.4em] uppercase text-white/80 hover:text-white transition-colors duration-300"
                >
                    EL <span className="text-blue-500">ABISMO</span>
                </button>

                {/* Links */}
                <ul className="flex items-center gap-8">
                    {LINKS.map(link => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <button
                                    onClick={() => handleNavigate(link.href)}
                                    className={`font-mono text-[11px] tracking-[0.3em] uppercase transition-colors duration-300 relative group
                                        ${isActive ? "text-blue-400" : "text-white/40 hover:text-white/80"}`}
                                >
                                    {link.label}
                                    {/* Línea activa */}
                                    <span className={`absolute -bottom-1 left-0 h-1px bg-blue-500 transition-all duration-300
                                        ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                                    />
                                </button>
                            </li>
                        );
                    })}
                </ul>

            </div>
        </nav>
    );
}