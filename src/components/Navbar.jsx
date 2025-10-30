// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, FaCode, FaBriefcase, FaAward, FaNewspaper, 
  FaEnvelope, FaBars, FaTimes, FaMoon, FaSun 
} from 'react-icons/fa';

const Navbar = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [circleOrigin, setCircleOrigin] = useState({ x: 0, y: 0 });
  const { darkMode, toggleDarkMode } = useTheme();

  const navItems = [
    { label: "หน้าแรก", icon: <FaUser />, section: "home" },
    { label: "เกี่ยวกับ", icon: <FaUser />, section: "about" },
    { label: "ทักษะ", icon: <FaCode />, section: "skills" },
    { label: "ผลงาน", icon: <FaBriefcase />, section: "portfolio" },
    { label: "ประกาศนียบัตร", icon: <FaAward />, section: "certificates" },
    { label: "บทความ", icon: <FaNewspaper />, section: "blog" },
    { label: "ติดต่อ", icon: <FaEnvelope />, section: "contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.keyCode === 27 && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    
    // Lock scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleMenuToggle = (event) => {
    if (!isOpen) {
      // Only set origin when opening
      const rect = event.currentTarget.getBoundingClientRect();
      flushSync(() => {
        setCircleOrigin({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      });
    }
    setIsOpen(!isOpen);
  };

  const logoVariants = {
    normal: { scale: 1 },
    scrolled: { scale: 0.95 }
  };

  const navItemVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const underlineVariants = {
    hover: {
      width: "100%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    initial: {
      width: "0%",
      opacity: 0
    }
  };

  // Circle overlay variants
  const overlayVariants = {
    closed: {
      clipPath: `circle(0% at ${circleOrigin.x}px ${circleOrigin.y}px)`,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      clipPath: `circle(150% at ${circleOrigin.x}px ${circleOrigin.y}px)`,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  // Menu content variants
  const menuContentVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.3
      }
    }
  };

  // Menu item variants with stagger
  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const themeButtonVariants = {
    hover: {
      scale: 1.1,
      rotate: 15,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9,
      rotate: -5
    }
  };

  const menuButtonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9
    }
  };

  return (
    <>
      <motion.nav 
        className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 border-white/20 dark:border-gray-700/60 shadow-lg' 
            : 'bg-white/80 dark:bg-gray-900/80 border-white/20 dark:border-gray-700/40'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            {/* Logo */}
            <motion.div 
              className="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent cursor-pointer"
              variants={logoVariants}
              animate={scrolled ? "scrolled" : "normal"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick("home")}
            >
              My Portfolio
            </motion.div>

            {/* Desktop Menu + Theme Toggle */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleNavClick(item.section)}
                  className="relative px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-lg transition-colors"
                  variants={navItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {item.label}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    variants={underlineVariants}
                    initial="initial"
                    whileHover="hover"
                  />
                </motion.button>
              ))}
              
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="ml-4 p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                aria-label="Toggle theme"
                variants={themeButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {darkMode ? (
                  <motion.div
                    initial={{ rotate: 0, scale: 1 }}
                    animate={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <FaSun className="text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotate: 0, scale: 1 }}
                    animate={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <FaMoon />
                  </motion.div>
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                onClick={toggleDarkMode}
                className="p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                aria-label="Toggle theme"
                variants={themeButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
              </motion.button>
              
              <motion.button
                onClick={handleMenuToggle}
                className="p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                variants={menuButtonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaTimes />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaBars />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay - Separate from nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100]"
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Background Overlay with Circle Animation */}
            <motion.div
              className={`absolute inset-0 ${
                darkMode 
                  ? 'bg-gray-900' 
                  : 'bg-white'
              }`}
              variants={overlayVariants}
            />
            
            {/* Menu Content */}
            <motion.div 
              className="relative z-[110] h-full flex items-center justify-center"
              variants={menuContentVariants}
            >
              <motion.div 
                className="py-4 space-y-6 text-center w-full max-w-sm"
                variants={containerVariants}
              >
                {navItems.map((item, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleNavClick(item.section)}
                    className="block w-full text-center px-8 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all rounded-lg hover:bg-white/10"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      x: 8
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-cyan-600 dark:text-cyan-400 text-xl">
                        {item.icon}
                      </span>
                      <span className="text-xl">{item.label}</span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Close Button */}
            <motion.button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-[120] p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes className="text-2xl" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;