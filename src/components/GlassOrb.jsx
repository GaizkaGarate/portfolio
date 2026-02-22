import React, { useEffect, useRef, useCallback } from 'react';

/**
 * GlassOrb – cursor-following glass sphere, visible ONLY in the Hero (#perfil) section.
 * Fades in/out based on scroll position relative to the hero section's boundaries.
 */
const GlassOrb = () => {
    const orbRef = useRef(null);
    const wrapperRef = useRef(null);
    const rafRef = useRef(null);
    const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const SIZE = 160;

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = useCallback(() => {
        posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.08);
        posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.08);

        if (orbRef.current) {
            orbRef.current.style.transform = `translate(${posRef.current.x - SIZE / 2}px, ${posRef.current.y - SIZE / 2}px)`;
        }
        rafRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const onMove = (e) => {
            targetRef.current = { x: e.clientX, y: e.clientY };
        };

        // Show/hide based on how much of the hero section is visible
        const onScroll = () => {
            const hero = document.getElementById('perfil');
            if (!hero || !wrapperRef.current) return;
            const rect = hero.getBoundingClientRect();
            const viewH = window.innerHeight;
            // Visible ratio of the hero section [0..1]
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(viewH, rect.bottom);
            const visibleH = Math.max(0, visibleBottom - visibleTop);
            const ratio = visibleH / viewH;
            // Fade out as hero leaves – scale ratio to [0..1] with a threshold
            const opacity = Math.min(1, ratio * 2.5);
            wrapperRef.current.style.opacity = String(opacity);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('scroll', onScroll, { passive: true });
        rafRef.current = requestAnimationFrame(animate);
        onScroll(); // run once on mount

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(rafRef.current);
        };
    }, [animate]);

    return (
        <>
            {/* SVG displacement filter */}
            <svg style={{ position: 'fixed', width: 0, height: 0, overflow: 'hidden' }}>
                <defs>
                    <filter id="glass-distort" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
                        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>

            {/* Wrapper – controls global opacity for section fade */}
            <div
                ref={wrapperRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transition: 'opacity 0.5s ease',
                }}
            >
                {/* Moving orb */}
                <div
                    ref={orbRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: SIZE,
                        height: SIZE,
                        willChange: 'transform',
                    }}
                >
                    {/* Backdrop refraction layer */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            backdropFilter: 'blur(2px) brightness(1) saturate(1.3)',
                            WebkitBackdropFilter: 'blur(5px) brightness(1.1) saturate(1.3)',
                            filter: 'url(#glass-distort)',
                        }}
                    />

                    {/* Glass sphere surface – lowered opacity for more transparency */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            background: `
                                radial-gradient(circle at 32% 28%, rgba(255,255,255,0.22) 0%, transparent 45%),
                                radial-gradient(circle at 68% 72%, rgba(180,180,220,0.08) 0%, transparent 40%),
                                radial-gradient(circle at 50% 50%, rgba(100,120,200,0.04) 0%, rgba(0,0,0,0.18) 100%)
                            `,
                            boxShadow: `
                                inset 0 0 0 1px rgba(255,255,255,0.10),
                                inset 3px 3px 10px rgba(255,255,255,0.06),
                                inset -3px -3px 10px rgba(0,0,0,0.20),
                                0 6px 30px rgba(0,0,0,0.20)
                            `,
                        }}
                    />

                    {/* Specular highlight – softer */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '18%',
                            left: '24%',
                            width: '22%',
                            height: '18%',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 100%)',
                            filter: 'blur(3px)',
                        }}
                    />

                    {/* Secondary soft highlight */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '60%',
                            left: '58%',
                            width: '28%',
                            height: '20%',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(160,180,255,0.18) 0%, transparent 100%)',
                            filter: 'blur(5px)',
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default GlassOrb;
