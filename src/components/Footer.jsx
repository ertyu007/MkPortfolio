import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-12">
      <div className="text-center text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} [ชื่อคุณ] — สร้างด้วย ❤️ และ React + AI
      </div>
    </footer>
  );
};

export default Footer;