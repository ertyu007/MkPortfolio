// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // เอฟเฟกต์การแสดงผลแบบเป็นขั้นตอน
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 blur-xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
          >
            {/* Content */}
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              <motion.div
                className="space-y-6"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                  นักเรียนมัธยมปลาย | อนาคตวิศวกรเครือข่าย
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                >
                  สวัสดีครับ, ผมคือ
                  <span className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    ธนภัทร การะจักษ์
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
                >
                  นักเรียนที่มีความมุ่งมั่นและหลงใหลในเทคโนโลยีระบบเครือข่าย
                  พร้อมก้าวสู่คณะวิศวกรรมศาสตร์ สาขาวิชาวิศวกรรมเครือข่ายและความปลอดภัย
                </motion.p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#about"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    เกี่ยวกับฉัน
                    <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#portfolio"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300"
                >
                  ผลงานของฉัน
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800"
              >
                {[
                  { value: "17", label: "อายุ (ปี)" },
                  { value: "5+", label: "โครงการ" },
                  { value: "3+", label: "ทักษะหลัก" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-sm"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image/Visual */}
            <motion.div
              variants={imageVariants}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative z-10 w-full max-w-md">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-square bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      // src="/assets/images/heroImage.jpg"
                      src="https://picsum.photos/seed/picsum/200/300"
                      alt="ธนภัทร การะจักษ์"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                    <p className="text-sm sm:text-base">ธนภัทร การะจักษ์ - นักเรียนมัธยมปลาย | อนาคตวิศวกรเครือข่าย</p>  
                  </div>
                </div>

                {/* Background decorative element */}
                <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-blue-100 dark:bg-blue-900/30 rounded-2xl"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <blockquote className="text-xl sm:text-2xl md:text-3xl text-center italic text-gray-700 dark:text-gray-300 font-light">
              <span className="text-blue-600 dark:text-blue-400 text-4xl">"</span>
              <span className="relative">
                อย่ารอความมั่นใจ
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-blue-600 dark:bg-blue-400 transition-all duration-1000 hover:w-full"></span>
              </span>
              <br />
              <span className="relative">
                จงเริ่มจากความตั้งใจ
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-indigo-600 dark:bg-indigo-400 transition-all duration-1000 hover:w-full delay-300"></span>
              </span>
              <span className="text-blue-600 dark:text-blue-400 text-4xl">"</span>
            </blockquote>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 text-center text-gray-600 dark:text-gray-400 text-lg"
            >
              ผมเป็นนักเรียนที่มีความกระตือรือร้นในการแสวงหาความรู้ใหม่ ๆ
              และมุ่งมั่นที่จะเก็บเกี่ยวประสบการณ์ที่หลากหลายอยู่เสมอ
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;