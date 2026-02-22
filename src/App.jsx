import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import GlassOrb from './components/GlassOrb';

function App() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Glass orb that follows the cursor */}
      <GlassOrb />

      {/* Navbar – untouched */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center">
        <Navbar />
      </div>

      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <footer className="py-8 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()}{' '}
          <span className="text-gray-500">Gaizka Garate</span> · Construido con React &amp; Tailwind CSS
        </p>
      </footer>
    </div>
  );
}

export default App;
