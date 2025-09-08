import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                สวัสดีครับ, ผมชื่อ
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ธนภัทร การะจักษ์
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                นักเรียนที่มีความมุ่งมั่น — ผู้หลงใหลในเทคโนโลยีระบบเครือข่าย — พร้อมก้าวสู่คณะวิศวกรรมศาสตร์ สาขาเครือข่าย
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#about"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                เกี่ยวกับฉัน
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#portfolio"
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300 hover:scale-105"
              >
                ผลงานของฉัน
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">17</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">อายุ (ปี)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">โครงการ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">3+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">ทักษะหลัก</div>
              </div>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-2">Mk</div>
                  <div className="text-xl">Network Enthusiast</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-blue-100 dark:bg-blue-900/30 rounded-3xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl lg:text-3xl italic text-gray-700 dark:text-gray-300 font-light">
            <span className="text-blue-600 dark:text-blue-400">“</span>
            อย่ารอความมั่นใจ จงเริ่มจากความตั้งใจ
            <span className="text-blue-600 dark:text-blue-400">”</span>
          </blockquote>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
            ผมเป็นนักเรียนที่มีความกระตือรือร้นในการแสวงหาความรู้ใหม่ ๆ และมุ่งมั่นที่จะเก็บเกี่ยวประสบการณ์ที่หลากหลายอยู่เสมอ
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;