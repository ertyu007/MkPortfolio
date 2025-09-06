// src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-indigo-600 dark:text-indigo-400">สวัสดีครับ!</h1>
        <h2 className="mt-4 text-2xl md:text-3xl">ผมชื่อ [ชื่อคุณ]</h2>
        <p className="mt-4 max-w-lg mx-auto text-lg">Full Stack Developer | AI Enthusiast</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {[
            { label: "เกี่ยวกับฉัน", section: "about" },
            { label: "ผลงาน", section: "portfolio" },
            { label: "ติดต่อ", section: "contact" },
          ].map((btn, idx) => (
            <button
              key={idx}
              onClick={() => {
                const element = document.getElementById(btn.section);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
            >
              {btn.label}
            </button>
          ))}
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-12"
        >
          <FaArrowDown className="text-2xl text-gray-500 dark:text-gray-400" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;