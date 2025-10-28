// WelcomePopup.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Icons ที่สวยงามและเป็นทางการ
const WelcomeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const GuideIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SecurityIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WelcomePopup = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      title: "ยินดีต้อนรับสู่พอร์ตโฟลิโอของ ธนภัทร การะจักษ์",
      content: "แหล่งรวบรวมผลงาน ทักษะ และประสบการณ์ด้านเทคโนโลยีเครือข่ายและการพัฒนาซอฟต์แวร์ — ออกแบบมาเพื่อประสบการณ์การใช้งานที่ราบรื่นและน่าประทับใจ",
      icon: <WelcomeIcon />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "แนวทางการใช้งานเว็บไซต์",
      content: "• ใช้งาน AI Assistant สำหรับสอบถามข้อมูลเพิ่มเติม\n• สำรวจส่วนต่าง ๆ ผ่านเมนูนำทางด้านบน\n• ให้คะแนนผลงานผ่านระบบ Like/Dislike\n• เปิดดูรายละเอียดโดยคลิกที่ผลงานหรือประกาศนียบัตร",
      icon: <GuideIcon />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "ความปลอดภัยและความเป็นส่วนตัว",
      content: "• ไม่มีการเก็บรวบรวมข้อมูลส่วนบุคคล\n• AI Assistant ทำงานภายในเบราว์เซอร์เท่านั้น\n• ข้อมูลการประเมินผลงานไม่เชื่อมโยงกับตัวผู้ใช้\n• ออกแบบด้วยมาตรฐานความปลอดภัยระดับสูง",
      icon: <SecurityIcon />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ 
            type: "spring",
            damping: 25,
            stiffness: 300
          }}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/30 dark:border-gray-700/50 relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full translate-y-12 -translate-x-12"></div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <CloseIcon />
          </button>

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              key={`icon-${currentStep}`}
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                damping: 15,
                stiffness: 200
              }}
              className={`w-20 h-20 bg-gradient-to-r ${steps[currentStep].color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg`}
            >
              {steps[currentStep].icon}
            </motion.div>

            {/* Content */}
            <motion.div
              key={`content-${currentStep}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line text-base">
                {steps[currentStep].content}
              </p>
            </motion.div>

            {/* Progress Dots */}
            <div className="flex justify-center space-x-2 mb-8">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: index === currentStep ? 1.2 : 1 }}
                  transition={{ duration: 0.2 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? `bg-gradient-to-r ${steps[currentStep].color}` 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <div>
                {currentStep > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBack}
                    className="px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl font-medium"
                  >
                    ย้อนกลับ
                  </motion.button>
                )}
              </div>

              <div className="flex space-x-3">
                {currentStep < steps.length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className="px-6 py-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl font-medium"
                  >
                    ข้าม
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className={`px-8 py-3 bg-gradient-to-r ${steps[currentStep].color} text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold shadow-md`}
                >
                  {currentStep === steps.length - 1 ? 'เริ่มสำรวจ' : 'ถัดไป'}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomePopup;