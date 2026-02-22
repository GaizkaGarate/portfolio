import React, { useRef, useEffect } from 'react';

const Contact = () => {
    const contentRef = useRef(null);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="contacto"
            className="py-24 px-6 sm:px-8 flex flex-col justify-center items-center text-center relative overflow-hidden"
            style={{ minHeight: '65vh' }}
        >
            {/* Background glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
                style={{ width: 500, height: 280, background: 'rgba(255,255,255,0.025)', filter: 'blur(100px)' }}
            />

            <div ref={contentRef} className="relative z-10 max-w-2xl mx-auto w-full">
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">¿Hablamos?</p>
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">Contacto</h2>
                <p className="text-lg sm:text-xl text-gray-400 mb-12 leading-relaxed max-w-xl mx-auto">
                    Estoy abierto a nuevas oportunidades, colaboraciones o simplemente charlar sobre tecnología. ¡No dudes en escribirme!
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <a
                        href="mailto:g2004gaizka@gmail.com"
                        className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-white text-black font-semibold text-base sm:text-lg hover:scale-105 transition-all duration-300"
                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(255,255,255,0.22)'}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Enviar Correo
                    </a>
                    <a
                        href="https://www.linkedin.com/in/gaizka-garate-moreno-6329b1374/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full text-white font-semibold text-base sm:text-lg hover:scale-105 transition-all duration-300"
                        style={{ border: '1px solid rgba(255,255,255,0.20)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                    </a>
                </div>

                {/* GitHub */}
                <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300 text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Ver repositorios en GitHub
                </a>
            </div>
        </section>
    );
};

export default Contact;
