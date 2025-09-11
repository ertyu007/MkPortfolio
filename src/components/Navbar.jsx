import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaUser, FaCode, FaBriefcase, FaAward, FaNewspaper, FaEnvelope, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';

const Navbar = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  const navItems = [
    { label: "เกี่ยวกับ", icon: <FaUser />, section: "about" },
    { label: "ทักษะ", icon: <FaCode />, section: "skills" },
    { label: "ผลงาน", icon: <FaBriefcase />, section: "portfolio" },
    { label: "ประกาศนียบัตร", icon: <FaAward />, section: "certificates" },
    { label: "บทความ", icon: <FaNewspaper />, section: "blog" },
    { label: "ติดต่อ", icon: <FaEnvelope />, section: "contact" },
  ];

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-700/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            My Portfolio
          </div>

          {/* Desktop Menu + Theme Toggle */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.section)}
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all"
              >
                {item.label}
              </button>
            ))}
            {/* ✅ Theme Toggle ใน Navbar */}
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all"
              aria-label="Toggle theme"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all"
              aria-label="Toggle theme"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/20 dark:border-gray-700/40">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.section)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;