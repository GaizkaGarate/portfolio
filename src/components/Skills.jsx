import React, { useState, useEffect, useRef } from 'react';

const skillGroups = [
    {
        id: 'all',
        label: 'Todo',
    },
    {
        id: 'languages',
        label: 'Lenguajes',
        skills: [
            { name: 'Python', level: 90 },
            { name: 'Java', level: 75 },
            { name: 'C', level: 70 },
            { name: 'C# (Unity)', level: 45 },
            { name: 'JavaScript', level: 40 },
        ],
    },
    {
        id: 'web',
        label: 'Web & Tools',
        skills: [
            { name: 'React', level: 40 },
            { name: 'HTML & CSS', level: 70 },
            { name: 'Node.js', level: 40 },
            { name: 'Tailwind CSS', level: 40 },
            { name: 'Git / GitHub', level: 70 },
        ],
    },
    {
        id: 'devops',
        label: 'DevOps',
        skills: [
            { name: 'Jenkins', level: 60 },
            { name: 'CI/CD Pipelines', level: 60 },
            { name: 'Linux', level: 80 },
            { name: 'Docker', level: 40 },
        ],
    },
    {
        id: 'ai',
        label: 'IA & Automation',
        skills: [
            { name: 'AI Integration', level: 90 },
            { name: 'Automatización', level: 95 },
            { name: 'AI Pipelines', level: 95 },
        ],
    },
];

const allSkills = skillGroups
    .filter(g => g.id !== 'all')
    .flatMap(g => g.skills);

function SkillBar({ name, level, delay = 0, visible }) {
    return (
        <div
            className="mb-5"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
            }}
        >
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white/80">{name}</span>
                <span className="text-xs text-gray-500">{level}%</span>
            </div>
            <div className="h-1.5 bg-white/6 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                    className="h-full rounded-full"
                    style={{
                        width: visible ? `${level}%` : '0%',
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.8))',
                        transition: `width 0.8s cubic-bezier(0.4,0,0.2,1) ${delay + 0.1}s`,
                        boxShadow: '0 0 8px rgba(255,255,255,0.3)',
                    }}
                />
            </div>
        </div>
    );
}

const Skills = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    // Intersection observer to trigger animations on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Reset visible briefly when tab changes for re-animation
    const handleTab = (id) => {
        setVisible(false);
        setActiveTab(id);
        setTimeout(() => setVisible(true), 50);
    };

    const currentSkills =
        activeTab === 'all'
            ? allSkills
            : skillGroups.find(g => g.id === activeTab)?.skills ?? [];

    return (
        <section
            id="conocimientos"
            ref={sectionRef}
            className="min-h-screen py-24 px-6 sm:px-8 flex flex-col justify-center"
            style={{ background: '#080808' }}
        >
            <div className="max-w-5xl mx-auto w-full">
                {/* Header */}
                <div className="mb-12 text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Mi stack técnico</p>
                    <h2 className="text-4xl md:text-5xl font-bold">Conocimientos</h2>
                </div>

                {/* Tab bar */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {skillGroups.map((g) => (
                        <button
                            key={g.id}
                            onClick={() => handleTab(g.id)}
                            className="relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none"
                            style={{
                                background: activeTab === g.id ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.05)',
                                color: activeTab === g.id ? '#000' : 'rgba(255,255,255,0.6)',
                                border: activeTab === g.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
                                transform: activeTab === g.id ? 'scale(1.05)' : 'scale(1)',
                                boxShadow: activeTab === g.id ? '0 0 20px rgba(255,255,255,0.2)' : 'none',
                            }}
                        >
                            {g.label}
                        </button>
                    ))}
                </div>

                {/* Skill bars grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {currentSkills.map((skill, i) => (
                        <SkillBar
                            key={`${activeTab}-${skill.name}`}
                            name={skill.name}
                            level={skill.level}
                            delay={i * 0.06}
                            visible={visible}
                        />
                    ))}
                </div>

                {/* Education card */}
                <div
                    className="mt-14 p-6 rounded-2xl relative overflow-hidden"
                    style={{
                        background: '#111',
                        border: '1px solid rgba(255,255,255,0.07)',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(24px)',
                        transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
                    }}
                >
                    <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
                    />
                    <div className="flex items-start gap-5">
                        <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Formación académica</p>
                            <h4 className="text-lg font-semibold text-white mb-1">Grado en Ingeniería Informática</h4>
                            <p className="text-gray-400 text-sm">Universidad Pública de Navarra (UPNA)</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
