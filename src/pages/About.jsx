// About.jsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  // ใช้ useMemo เพื่อ optimize animations
  const animations = useMemo(() => ({
    floatingVariants: {
      float: {
        y: [0, -8, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },

    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08
        }
      }
    },

    itemVariants: {
      hidden: { y: 15, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 16,
          mass: 0.8
        }
      }
    }
  }), []);

  const interests = useMemo(() => [
    {
      title: "คอมพิวเตอร์และระบบปฏิบัติการ",
      description: "ศึกษาและทดลองใช้งานระบบปฏิบัติการต่างๆ",
      color: "cyan"
    },
    {
      title: "ระบบเครือข่ายอินเทอร์เน็ต",
      description: "วางระบบและแก้ไขปัญหาเครือข่าย",
      color: "blue"
    },
    {
      title: "เทคโนโลยีและนวัตกรรมสมัยใหม่",
      description: "ติดตามและทดลองใช้งานเทคโนโลยีใหม่ๆ",
      color: "indigo"
    }
  ], []);

  const personalInfo = useMemo(() => [
    { label: "ชื่อ–นามสกุล", value: "ธนภัทร การะจักษ์" },
    { label: "ชื่อเล่น", value: "Mk" },
    { label: "วันเกิด", value: "24 ตุลาคม 2550" },
    { label: "อายุ", value: "18 ปี" },
    { label: "ที่อยู่", value: "จังหวัดอำนาจเจริญ ประเทศไทย" }
  ], []);

  return (
    <div className="bg-gradient-to-br from-white via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-cyan-950 dark:to-blue-950 py-16 relative overflow-hidden">
      {/* Floating Background Elements - ลดจำนวนและเพิ่ม will-change */}
      <motion.div
        variants={animations.floatingVariants}
        animate="float"
        className="absolute top-10 left-10 w-32 h-32 bg-cyan-200/30 dark:bg-cyan-700/20 rounded-full blur-3xl"
        style={{ willChange: 'transform' }}
      />
      <motion.div
        variants={animations.floatingVariants}
        animate="float"
        transition={{ delay: 1.5 }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/20 dark:bg-blue-700/20 rounded-full blur-3xl"
        style={{ willChange: 'transform' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">เกี่ยวกับฉัน</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">ข้อมูลส่วนตัวและเป้าหมายในชีวิต</p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-3 gap-8"
          variants={animations.containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Personal Info Card */}
          <div className="lg:col-span-1">
            <motion.div
              variants={animations.itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sticky top-20 border border-white/50 dark:border-gray-700/50 shadow-2xl"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              style={{ willChange: 'transform' }}
            >
              {/* Profile Image */}
              <motion.div 
                className="mt-6 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ willChange: 'transform' }}
              >
                <img
                  src="/assets/images/aboutImage.jpg"
                  alt="Profile"
                  className="rounded-3xl mx-auto w-40 h-52 object-cover shadow-lg"
                />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">ข้อมูลส่วนบุคคล</h3>
              <div className="space-y-3">
                {personalInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {info.label}
                    </div>
                    <div className="flex-1 text-gray-900 dark:text-white text-sm">
                      {info.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Statement */}
            <motion.div
              variants={animations.itemVariants}
              className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-200/50 dark:border-cyan-800/50 shadow-2xl"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              style={{ willChange: 'transform' }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">คำแนะนำตัว</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                ผมเป็นนักเรียนที่มีความกระตือรือร้นในการแสวงหาความรู้ใหม่ ๆ และมุ่งมั่นที่จะเก็บเกี่ยวประสบการณ์ที่หลากหลายอยู่เสมอ โดยเชื่อว่าการเรียนรู้ไม่ได้จำกัดเพียงในห้องเรียน แต่ยังรวมถึงการลงมือปฏิบัติจริงในสถานการณ์ต่าง ๆ ปัจจุบันผมกำลังมองหาโอกาสใหม่ ๆ เพื่อพัฒนาตนเองและต่อยอดสู่เส้นทางอาชีพที่มุ่งหวัง
              </p>
            </motion.div>

            {/* Life Goal */}
            <motion.div
              variants={animations.itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/50 dark:border-gray-700/50"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              style={{ willChange: 'transform' }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">เป้าหมายในชีวิต</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                ผมมีความมุ่งมั่นที่จะพัฒนาทักษะด้าน <strong className="text-cyan-600 dark:text-cyan-400">วิศวกรรมเครือข่าย</strong> เพื่อสร้างความมั่นคงให้แก่ครอบครัว เนื่องจากผมเติบโตมาท่ามกลางความยากลำบาก จึงตระหนักถึงความสำคัญของความมั่นคงในชีวิต และเชื่อมั่นว่า "การศึกษา" คือกุญแจสำคัญในการเปลี่ยนแปลงอนาคต
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                เป้าหมายหลักของผมคือการสอบเข้าศึกษาต่อใน <strong className="text-cyan-600 dark:text-cyan-400">คณะวิศวกรรมศาสตร์ สาขาเครือข่าย</strong> เพื่อสานต่อความสนใจด้านเทคโนโลยีระบบเครือข่ายและโครงสร้างพื้นฐานทางอินเทอร์เน็ต ซึ่งเป็นอาชีพที่มีความสำคัญต่อโลกยุคดิจิทัลและสามารถสร้างความมั่นคงได้ในระยะยาว
              </p>
            </motion.div>

            {/* Motto */}
            <motion.div
              variants={animations.itemVariants}
              className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ willChange: 'transform' }}
            >
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">คติประจำใจ</h3>
              <blockquote className="text-2xl italic text-gray-900 dark:text-white">
                <span className="text-cyan-600 dark:text-cyan-400">"</span>
                ไม่มีคำว่าสาย สำหรับผู้ที่มีความตั้งใจที่จะเริ่มต้นอย่างแท้จริง
                <span className="text-cyan-600 dark:text-cyan-400">"</span>
              </blockquote>
            </motion.div>

            {/* Interests */}
            <motion.div
              variants={animations.itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/50 dark:border-gray-700/50"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              style={{ willChange: 'transform' }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">ความสนใจ</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <motion.div 
                    key={index}
                    className={`p-4 bg-${interest.color}-50/80 dark:bg-${interest.color}-900/20 rounded-2xl border border-${interest.color}-200/50 dark:border-${interest.color}-800/50 backdrop-blur-sm`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ willChange: 'transform' }}
                  >
                    <h4 className={`font-semibold text-${interest.color}-600 dark:text-${interest.color}-400 mb-2`}>
                      {interest.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{interest.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;