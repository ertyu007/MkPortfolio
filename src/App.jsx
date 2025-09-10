import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Portfolio from './pages/Portfolio';
import Certificates from './pages/Certificates';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import { ThemeProvider } from './context/ThemeContext';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import WelcomePopup from './components/WelcomePopup';


const App = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const portfolioRef = useRef(null);
  const CertificatesRef = useRef(null);
  const blogRef = useRef(null);
  const contactRef = useRef(null);

  const [showWelcome, setShowWelcome] = useState(false);


  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });

    // ✅ แสดง WelcomePopup ครั้งแรก
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar
          scrollToSection={{
            home: homeRef,
            about: aboutRef,
            skills: skillsRef,
            portfolio: portfolioRef,
            blog: blogRef,
            contact: contactRef
          }}
        />
        <AIChatbot />

        <main>
          <div ref={homeRef} id="home"><Home /></div>
          <div ref={aboutRef} id="about"><About /></div>
          <div ref={skillsRef} id="skills"><Skills /></div>
          <div ref={portfolioRef} id="portfolio"><Portfolio /></div>
          <div ref={CertificatesRef} id="blog"><Certificates /></div>
          <div ref={blogRef} id="blog"><Blog /></div>
          <div ref={contactRef} id="contact"><Contact /></div>
        </main>

        <Footer />

        {showWelcome && <WelcomePopup onClose={handleWelcomeClose} />}
      </div>
    </ThemeProvider>
  );
};

export default App;