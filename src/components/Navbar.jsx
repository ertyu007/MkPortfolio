import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "หน้าหลัก", section: "home" },
    { label: "เกี่ยวกับฉัน", section: "about" },
    { label: "ทักษะ", section: "skills" },
    { label: "ผลงาน", section: "portfolio" },
    { label: "บทความ", section: "blog" },
    { label: "ติดต่อ", section: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Portfolio
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const element = document.getElementById(item.section);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700"
          >
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsOpen(false);
                  const element = document.getElementById(item.section);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;