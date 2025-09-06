// src/context/ThemeContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // ✅ ตรวจสอบว่าอยู่ใน browser ก่อนใช้ localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    // ✅ ตรวจสอบว่า document มีอยู่
    if (typeof document !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    // ✅ บันทึกค่าลง localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode);
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};