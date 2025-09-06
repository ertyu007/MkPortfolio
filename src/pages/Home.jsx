import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 -z-10"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          สวัสดีครับ!
        </h1>
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
          ผมชื่อ <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">[ชื่อคุณ]</span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Full Stack Developer & AI Enthusiast — ผู้หลงใหลในการสร้างสิ่งใหม่ ๆ ที่มีประโยชน์
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {[
            { label: "เกี่ยวกับฉัน", section: "about" },
            { label: "ผลงาน", section: "portfolio" },
            { label: "ติดต่อ", section: "contact" },
          ].map((btn, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById(btn.section);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-glow"
            >
              {btn.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;