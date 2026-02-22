import React, { useEffect, useRef } from 'react';

const Hero = () => {
    const headingRef = useRef(null);
    const subtitleRef = useRef(null);
    const badgeRef = useRef(null);
    const btnsRef = useRef(null);

    useEffect(() => {
        // Staggered fade-in on mount
        const els = [badgeRef.current, headingRef.current, subtitleRef.current, btnsRef.current];
        els.forEach((el, i) => {
            if (!el) return;
            el.style.opacity = '0';
            el.style.transform = 'translateY(28px)';
            el.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
            requestAnimationFrame(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        });
    }, []);

    return (
        <section
            id="perfil"
            className="min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-8 relative overflow-hidden"
        >
            {/* Background glows */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{ width: 600, height: 600, background: 'rgba(255,255,255,0.035)', filter: 'blur(140px)' }}
            />
            <div
                className="absolute top-1/3 left-1/4 rounded-full pointer-events-none"
                style={{ width: 300, height: 300, background: 'rgba(80,120,255,0.04)', filter: 'blur(100px)' }}
            />

            <div className="max-w-4xl relative z-10 mt-20">
                {/* Status badge */}
                <div
                    ref={badgeRef}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-400 mb-8"
                    style={{
                        border: '1px solid rgba(255,255,255,0.10)',
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <span className="w-2 h-2 rounded-full bg-green-400" style={{ animation: 'pulse 2s infinite' }} />
                    Disponible para proyectos
                </div>

                {/* Heading */}
                <h1
                    ref={headingRef}
                    className="font-bold tracking-tight leading-none mb-6"
                    style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
                >
                    Hola, soy{' '}
                    <span
                        style={{
                            background: 'linear-gradient(135deg, #b0b0b0 0%, #ffffff 50%, #c8c8c8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Gaizka Garate
                    </span>
                </h1>

                {/* Role */}
                <p
                    ref={subtitleRef}
                    className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12"
                    style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)' }}
                >
                    Ingeniero Informático por la{' '}
                    <span className="text-gray-200 font-medium">UPNA</span> · Actualmente en prácticas
                    como{' '}
                    <span className="text-gray-200 font-medium">DevOps en Openbravo</span>, integrando
                    CI/CD con herramientas de IA para documentar commits automáticamente.
                </p>

                {/* CTA buttons */}
                <div
                    ref={btnsRef}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="#proyectos"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 rounded-full font-semibold text-black bg-white hover:scale-105 transition-all duration-300 text-base sm:text-lg"
                        style={{ boxShadow: '0 0 0 0 rgba(255,255,255,0)', transition: 'transform 0.3s, box-shadow 0.3s' }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 28px rgba(255,255,255,0.22)'}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                    >
                        Ver Proyectos
                    </a>
                    <a
                        href="#contacto"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 rounded-full font-semibold text-white hover:scale-105 transition-all duration-300 text-base sm:text-lg"
                        style={{ border: '1px solid rgba(255,255,255,0.20)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        Contactar
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                style={{ opacity: 0.4, animation: 'bounce 2s infinite' }}
            >
                <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
                <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                    <rect x="0.5" y="0.5" width="15" height="23" rx="7.5" stroke="white" strokeOpacity="0.5" />
                    <circle cx="8" cy="7" r="2" fill="white" fillOpacity="0.7">
                        <animate attributeName="cy" values="7;14;7" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
