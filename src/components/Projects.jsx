import React, { useEffect, useRef } from 'react';

const projects = [
    {
        title: 'AI + DevOps Pipeline',
        desc: 'Integración de Jenkins CI con herramientas de IA para documentar automáticamente los commits de cada instancia de CI durante mis prácticas en Openbravo.',
        tags: ['Python', 'Gitlab', 'CI/CD', 'AI', 'DevOps'],
        badge: 'En desarrollo',
        badgeColor: 'rgba(59,130,246,0.15)',
        badgeTextColor: '#93c5fd',
        badgeBorder: 'rgba(59,130,246,0.25)',
        topLineTint: 'rgba(59,130,246,0.18)',
    },
    {
        title: 'Gitlab-Pipeline-editor',
        desc: 'Editor de pipelines de Gitlab para facilitar la creación y gestión de pipelines de CI/CD. Pagina web https://gitlab-pipeline-editor.vercel.app/',
        tags: ['React', 'Gitlab', 'CI/CD', 'AI', 'DevOps'],
        badge: 'En desarrollo',
        badgeColor: 'rgba(59,130,246,0.15)',
        badgeTextColor: '#93c5fd',
        badgeBorder: 'rgba(59,130,246,0.25)',
        topLineTint: 'rgba(59,130,246,0.18)',
    },
    {
        title: 'Herramientas IA para Productividad',
        desc: 'Integración de distintas herramientas de IA para automatizar flujos de trabajo y aumentar la eficiencia significativamente en tareas repetitivas.',
        tags: ['Python', 'AI Integration', 'Automatización'],
        badge: 'Completado',
        badgeColor: 'rgba(34,197,94,0.12)',
        badgeTextColor: '#86efac',
        badgeBorder: 'rgba(34,197,94,0.22)',
        topLineTint: 'rgba(34,197,94,0.15)',
    },
    {
        title: 'Portfolio Personal',
        desc: 'Este mismo sitio web. Diseñado y desarrollado con React, Tailwind CSS y Vite. Interfaz moderna, minimalista y responsiva.',
        tags: ['React', 'Tailwind CSS', 'Vite', 'JavaScript'],
        badge: 'Completado',
        badgeColor: 'rgba(34,197,94,0.12)',
        badgeTextColor: '#86efac',
        badgeBorder: 'rgba(34,197,94,0.22)',
        topLineTint: 'rgba(255,255,255,0.06)',
    },
    {
        title: 'Aplicacion de Lista Compra',
        desc: 'Una aplicacion para la gestion de listas de la compra usando Firebase para que varios usuarios puedan compartir listas y Flutter como tecnologia principal.',
        tags: ['Flutter', 'Firebase', 'Dart'],
        badge: 'Completado',
        badgeColor: 'rgba(34,197,94,0.12)',
        badgeTextColor: '#86efac',
        badgeBorder: 'rgba(34,197,94,0.22)',
        topLineTint: 'rgba(255,255,255,0.06)',
    },
    {
        title: 'Juego 3D',
        desc: 'Un juego 3D desarrollado con Unity como proyecto de universidad, donde el objetivo es ver un museo lleno de vida y arte.',
        tags: ['Unity', 'C#', '3D'],
        badge: 'Completado',
        badgeColor: 'rgba(34,197,94,0.12)',
        badgeTextColor: '#86efac',
        badgeBorder: 'rgba(34,197,94,0.22)',
        topLineTint: 'rgba(255,255,255,0.06)',
    },
];

function ProjectCard({ project, index }) {
    const cardRef = useRef(null);
    const sceneRef = useRef(null);

    // Scroll-triggered reveal
    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(32px)';
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.transition = `opacity 0.65s ease ${index * 0.12}s, transform 0.65s ease ${index * 0.12}s`;
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [index]);

    // Subtle 3D tilt on hover
    const handleMouseMove = (e) => {
        const rect = sceneRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
        sceneRef.current.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
    };
    const handleMouseLeave = () => {
        if (sceneRef.current) sceneRef.current.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
    };

    return (
        <div ref={cardRef}>
            <div
                ref={sceneRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="h-full flex flex-col"
                style={{
                    transition: 'transform 0.2s ease',
                    transformStyle: 'preserve-3d',
                    background: '#111',
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.06)',
                    padding: '28px',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Top accent line */}
                <div
                    style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                        background: `linear-gradient(90deg, transparent, ${project.topLineTint}, transparent)`,
                    }}
                />

                <div className="flex items-start justify-between mb-4">
                    <span
                        style={{
                            fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
                            padding: '4px 12px', borderRadius: 999,
                            background: project.badgeColor,
                            color: project.badgeTextColor,
                            border: `1px solid ${project.badgeBorder}`,
                        }}
                    >
                        {project.badge}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{project.desc}</p>

                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span
                            key={tag}
                            style={{
                                fontSize: 11, padding: '4px 10px', borderRadius: 999,
                                background: 'rgba(255,255,255,0.05)',
                                color: 'rgba(255,255,255,0.65)',
                                border: '1px solid rgba(255,255,255,0.08)',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

const Projects = () => {
    const titleRef = useRef(null);

    useEffect(() => {
        const el = titleRef.current;
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                observer.disconnect();
            }
        }, { threshold: 0.2 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="proyectos" className="min-h-screen py-24 px-6 sm:px-8 flex flex-col justify-center">
            <div className="max-w-6xl mx-auto w-full">
                <div ref={titleRef} className="mb-14 text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Lo que he construido</p>
                    <h2 className="text-4xl md:text-5xl font-bold">Proyectos Destacados</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
