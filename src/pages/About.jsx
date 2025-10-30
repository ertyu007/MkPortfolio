// About.jsx
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  // Floating animation
  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        damping: 12
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-cyan-950 dark:to-blue-950 py-20 relative overflow-hidden">
      {/* Floating Background Elements */}
      <motion.div
        variants={floatingVariants}
        animate="float"
        className="absolute top-10 left-10 w-32 h-32 bg-cyan-200/30 dark:bg-cyan-700/20 rounded-full blur-3xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 2 }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/20 dark:bg-blue-700/20 rounded-full blur-3xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 1 }}
        className="absolute top-1/2 left-1/3 w-28 h-28 bg-indigo-200/20 dark:bg-indigo-700/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">เกี่ยวกับฉัน</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">ข้อมูลส่วนตัวและเป้าหมายในชีวิต</p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Personal Info Card */}
          <div className="lg:col-span-1">
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 sticky top-20 border border-white/50 dark:border-gray-700/50 shadow-2xl"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Profile Image */}
              <motion.div 
                className="mt-8 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/assets/images/aboutImage.jpg"
                  alt="Profile"
                  className="rounded-3xl mx-auto w-48 h-58 object-cover shadow-lg"
                />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">ข้อมูลส่วนบุคคล</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">ชื่อ–นามสกุล</div>
                  <div className="flex-1 text-gray-900 dark:text-white">ธนภัทร การะจักษ์</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">ชื่อเล่น</div>
                  <div className="flex-1 text-gray-900 dark:text-white">Mk</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">วันเกิด</div>
                  <div className="flex-1 text-gray-900 dark:text-white">24 ตุลาคม 2550</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">อายุ</div>
                  <div className="flex-1 text-gray-900 dark:text-white">18 ปี</div>
                </div>
                <div className="flex items-start">
                  <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">ที่อยู่</div>
                  <div className="flex-1 text-gray-900 dark:text-white">จังหวัดอำนาจเจริญ ประเทศไทย</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Personal Statement */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 backdrop-blur-xl rounded-2xl p-8 border border-cyan-200/50 dark:border-cyan-800/50 shadow-2xl"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">คำแนะนำตัว</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                ผมเป็นนักเรียนที่มีความกระตือรือร้นในการแสวงหาความรู้ใหม่ ๆ และมุ่งมั่นที่จะเก็บเกี่ยวประสบการณ์ที่หลากหลายอยู่เสมอ โดยเชื่อว่าการเรียนรู้ไม่ได้จำกัดเพียงในห้องเรียน แต่ยังรวมถึงการลงมือปฏิบัติจริงในสถานการณ์ต่าง ๆ ปัจจุบันผมกำลังมองหาโอกาสใหม่ ๆ เพื่อพัฒนาตนเองและต่อยอดสู่เส้นทางอาชีพที่มุ่งหวัง
              </p>
            </motion.div>

            {/* Life Goal */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">เป้าหมายในชีวิต</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                ผมมีความมุ่งมั่นที่จะพัฒนาทักษะด้าน <strong className="text-cyan-600 dark:text-cyan-400">วิศวกรรมเครือข่าย</strong> เพื่อสร้างความมั่นคงให้แก่ครอบครัว เนื่องจากผมเติบโตมาท่ามกลางความยากลำบาก จึงตระหนักถึงความสำคัญของความมั่นคงในชีวิต และเชื่อมั่นว่า “การศึกษา” คือกุญแจสำคัญในการเปลี่ยนแปลงอนาคต
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                เป้าหมายหลักของผมคือการสอบเข้าศึกษาต่อใน <strong className="text-cyan-600 dark:text-cyan-400">คณะวิศวกรรมศาสตร์ สาขาเครือข่าย</strong> เพื่อสานต่อความสนใจด้านเทคโนโลยีระบบเครือข่ายและโครงสร้างพื้นฐานทางอินเทอร์เน็ต ซึ่งเป็นอาชีพที่มีความสำคัญต่อโลกยุคดิจิทัลและสามารถสร้างความมั่นคงได้ในระยะยาว
              </p>
            </motion.div>

            {/* Motto */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">คติประจำใจ</h3>
              <blockquote className="text-2xl italic text-gray-900 dark:text-white">
                <span className="text-cyan-600 dark:text-cyan-400">“</span>
                ไม่มีคำว่าสาย สำหรับผู้ที่มีความตั้งใจที่จะเริ่มต้นอย่างแท้จริง
                <span className="text-cyan-600 dark:text-cyan-400">”</span>
              </blockquote>
            </motion.div>

            {/* Interests */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">ความสนใจ</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div 
                  className="p-6 bg-cyan-50/80 dark:bg-cyan-900/20 rounded-2xl border border-cyan-200/50 dark:border-cyan-800/50 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-2">คอมพิวเตอร์และระบบปฏิบัติการ</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">ศึกษาและทดลองใช้งานระบบปฏิบัติการต่างๆ</p>
                </motion.div>
                <motion.div 
                  className="p-6 bg-blue-50/80 dark:bg-blue-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">ระบบเครือข่ายอินเทอร์เน็ต</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">วางระบบและแก้ไขปัญหาเครือข่าย</p>
                </motion.div>
                <motion.div 
                  className="p-6 bg-indigo-50/80 dark:bg-indigo-900/20 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">เทคโนโลยีและนวัตกรรมสมัยใหม่</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">ติดตามและทดลองใช้งานเทคโนโลยีใหม่ๆ</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;