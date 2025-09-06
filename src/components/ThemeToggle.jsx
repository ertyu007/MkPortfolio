// src/components/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-5 right-5 p-3 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg z-50"
      aria-label="Toggle theme"
    >
      {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
    </button>
  );
};

export default ThemeToggle;