import React from 'react';
import { FaUser, FaCode, FaBriefcase, FaNewspaper, FaEnvelope, FaAward } from 'react-icons/fa'; // ✅ เพิ่ม FaAward

const Navbar = ({ scrollToSection }) => {
  const navItems = [
    { label: "เกี่ยวกับ", icon: <FaUser />, ref: scrollToSection.aboutRef },
    { label: "ทักษะ", icon: <FaCode />, ref: scrollToSection.skillsRef },
    { label: "ผลงาน", icon: <FaBriefcase />, ref: scrollToSection.portfolioRef },
    { label: "ประกาศนียบัตร", icon: <FaAward />, ref: scrollToSection.certificatesRef }, // ✅ ใช้ได้แล้ว
    { label: "บทความ", icon: <FaNewspaper />, ref: scrollToSection.blogRef },
    { label: "ติดต่อ", icon: <FaEnvelope />, ref: scrollToSection.contactRef },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">My Portfolio</div>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => item.ref?.current?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                aria-label={item.label}
              >
                <span>{item.icon}</span>
                <span className="hidden lg:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;