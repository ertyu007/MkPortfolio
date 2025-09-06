import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import AIChatbot from './components/AIChatbot';
import CursorFollower from './components/CursorFollower'; // ✅ เพิ่ม Cursor Follower

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Portfolio from './pages/Portfolio';
import Certificates from './pages/Certificates';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  const aboutRef = React.useRef(null);
  const skillsRef = React.useRef(null);
  const portfolioRef = React.useRef(null);
  const certificatesRef = React.useRef(null);
  const blogRef = React.useRef(null);
  const contactRef = React.useRef(null);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
        <CursorFollower position={cursorPosition} />
        <Navbar scrollToSection={{ aboutRef, skillsRef, portfolioRef, certificatesRef, blogRef, contactRef }} />
        <ThemeToggle />

        <main>
          <Home />
          <div ref={aboutRef} id="about"><About /></div>
          <div ref={skillsRef} id="skills"><Skills /></div>
          <div ref={portfolioRef} id="portfolio"><Portfolio /></div>
          <div ref={certificatesRef} id="certificates"><Certificates /></div>
          <div ref={blogRef} id="blog"><Blog /></div>
          <div ref={contactRef} id="contact"><Contact /></div>
        </main>

        <AIChatbot />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;