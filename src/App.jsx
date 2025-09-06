// src/App.jsx
import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import AIChatbot from './components/AIChatbot';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Portfolio from './pages/Portfolio';
import Certificates from './pages/Certificates';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const portfolioRef = useRef(null);
  const blogRef = useRef(null);
  const contactRef = useRef(null);
  const certificatesRef = useRef(null);
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar scrollToSection={{ aboutRef, skillsRef, portfolioRef, blogRef, contactRef }} />
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