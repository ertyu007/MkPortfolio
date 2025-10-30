// Home.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Floating background elements animation
  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    floatReverse: {
      y: [0, 20, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: 10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.5
      }
    }
  };

  const glassVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-cyan-950 dark:to-blue-950 overflow-hidden relative">
      {/* Animated Liquid Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="absolute top-10 left-10 w-72 h-72 bg-cyan-200/40 dark:bg-cyan-700/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="floatReverse"
          className="absolute top-1/3 right-10 w-96 h-96 bg-blue-200/30 dark:bg-blue-700/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="absolute bottom-20 left-1/4 w-80 h-80 bg-sky-200/40 dark:bg-sky-700/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="floatReverse"
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-200/30 dark:bg-teal-700/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-2 sm:py-12 lg:py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]"
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
                <motion.div 
                  variants={itemVariants}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-100/80 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 text-sm font-medium backdrop-blur-sm border border-cyan-200/50 dark:border-cyan-700/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.span 
                    className="w-2 h-2 bg-cyan-500 rounded-full mr-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  นักเรียนมัธยมปลาย | อนาคตวิศวกรเครือข่าย
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                >
                  สวัสดีครับ, ผมคือ
                  <motion.span 
                    className="block mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ธนภัทร การะจักษ์
                  </motion.span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
                >
                  นักเรียนที่มีความมุ่งมั่นและหลงใหลในเทคโนโลยีระบบเครือข่าย
                  พร้อมก้าวสู่คณะวิศวกรรมศาสตร์ สาขาวิชาวิศวกรรมเครือข่ายและความปลอดภัย

                  <motion.span 
                    className='block mt-2 bg-gradient-to-r from-cyan-600 to-blue-400 bg-clip-text text-transparent font-medium'
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                      หากมีอะไรสงสัยสามารถสอบถาม Ai ล่างขวา ได้เลยครับ
                  </motion.span>
                </motion.p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#about"
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm"
                >
                  <motion.span 
                    className="relative z-10 flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    เกี่ยวกับฉัน
                    <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#portfolio"
                  className="px-8 py-4 border-2 border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400 font-semibold rounded-2xl hover:bg-cyan-50 dark:hover:bg-cyan-950/30 transition-all duration-200 backdrop-blur-sm"
                >
                  ผลงานของฉัน
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200/50 dark:border-gray-700/50"
              >
                {[
                  { value: "18", label: "อายุ (ปี)" },
                  { value: "5+", label: "โครงการ" },
                  { value: "3+", label: "ทักษะหลัก" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="text-center p-4 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/50 dark:border-gray-700/50 shadow-sm"
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-cyan-600 dark:text-cyan-400">{stat.value}</div>
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
              <div className="relative z-10 w-80 max-w-md lg:max-w-lg">
                <motion.div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm"
                  variants={glassVariants}
                  whileHover={{ y: -5, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      src="/assets/images/heroImage.jpg"
                      alt="ธนภัทร การะจักษ์"
                      className="object-cover w-full h-full rounded-3xl shadow-lg"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white backdrop-blur-sm">
                    <p className="text-sm sm:text-base">ธนภัทร การะจักษ์ - นักเรียนมัธยมปลาย | อนาคตวิศวกรเครือข่าย</p>
                  </div>
                </motion.div>

                {/* Background decorative element */}
                <motion.div 
                  className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-cyan-100/50 dark:bg-cyan-900/20 rounded-3xl backdrop-blur-sm"
                  variants={floatingVariants}
                  animate="float"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/50 dark:border-gray-700/50"
            whileHover={{ y: -5 }}
          >
            <blockquote className="text-xl sm:text-2xl md:text-3xl text-center italic text-gray-700 dark:text-gray-300 font-light">
              <motion.span 
                className="text-cyan-600 dark:text-cyan-400 text-4xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                "
              </motion.span>
              <motion.span className="relative">
                อย่ารอความมั่นใจ
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-1 bg-cyan-600 dark:bg-cyan-400"
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </motion.span>
              <br />
              <motion.span className="relative">
                จงเริ่มจากความตั้งใจ
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-1 bg-blue-600 dark:bg-blue-400"
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1 }}
                  viewport={{ once: true }}
                />
              </motion.span>
              <motion.span 
                className="text-cyan-600 dark:text-cyan-400 text-4xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                "
              </motion.span>
            </blockquote>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-6 text-center text-gray-600 dark:text-gray-400 text-lg"
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