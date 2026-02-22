import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('Perfil');
    // Track clicks so scroll observer doesn't immediately override a manual click
    const clickedRef = useRef(false);
    const clickTimerRef = useRef(null);

    const links = ['Perfil', 'Proyectos', 'Conocimientos', 'Contacto'];

    useEffect(() => {
        // Map each nav link to its section id
        const sectionIds = links.map(l => l.toLowerCase());

        // Use IntersectionObserver to find which section is most visible
        const visibilityMap = {};

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    visibilityMap[entry.target.id] = entry.intersectionRatio;
                });

                // Don't override right after a manual click
                if (clickedRef.current) return;

                // Find the section with the highest visibility ratio
                let maxRatio = 0;
                let mostVisible = null;
                sectionIds.forEach(id => {
                    if ((visibilityMap[id] ?? 0) > maxRatio) {
                        maxRatio = visibilityMap[id];
                        mostVisible = id;
                    }
                });

                if (mostVisible) {
                    // Capitalize first letter to match links array
                    const label = mostVisible.charAt(0).toUpperCase() + mostVisible.slice(1);
                    setActiveLink(label);
                }
            },
            {
                // Fire at multiple thresholds for smooth detection
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
            }
        );

        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (e, link) => {
        e.preventDefault();
        setActiveLink(link);
        // Block the scroll observer from overriding for ~1 second after click
        clickedRef.current = true;
        clearTimeout(clickTimerRef.current);
        clickTimerRef.current = setTimeout(() => {
            clickedRef.current = false;
        }, 1000);
        const section = document.getElementById(link.toLowerCase());
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="nav-wrap">
            <div className="bubble active"></div>
            <div className="bubble hover"></div>
            <nav className="nav">
                {links.map((link) => (
                    <a
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        className={activeLink === link ? 'active' : ''}
                        onClick={(e) => handleClick(e, link)}
                    >
                        {link}
                    </a>
                ))}
            </nav>
        </div>
    );
};

export default Navbar;
