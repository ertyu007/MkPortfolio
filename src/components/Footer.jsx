import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/40 py-12 mt-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} <span className="font-semibold">[ชื่อคุณ]</span> — สร้างด้วย ❤️ และ React + AI
        </p>
        <div className="mt-4 flex justify-center space-x-6 text-indigo-600 dark:text-indigo-400">
          <a href="#" className="hover:scale-110 transition-transform">GitHub</a>
          <a href="#" className="hover:scale-110 transition-transform">LinkedIn</a>
          <a href="#" className="hover:scale-110 transition-transform">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;