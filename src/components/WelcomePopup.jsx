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
  const [, setIsVisible] = useState(false);

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
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "แนวทางการใช้งานเว็บไซต์",
      content: "• ใช้งาน AI Assistant สำหรับสอบถามข้อมูลเพิ่มเติม\n• สำรวจส่วนต่าง ๆ ผ่านเมนูนำทางด้านบน\n• ให้คะแนนผลงานผ่านระบบ Like/Dislike\n• เปิดดูรายละเอียดโดยคลิกที่ผลงานหรือประกาศนียบัตร",
      icon: <GuideIcon />,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "ความปลอดภัยและความเป็นส่วนตัว",
      content: "• ไม่มีการเก็บรวบรวมข้อมูลส่วนบุคคล\n• AI Assistant ทำงานภายในเบราว์เซอร์เท่านั้น\n• ข้อมูลการประเมินผลงานไม่เชื่อมโยงกับตัวผู้ใช้\n• ออกแบบด้วยมาตรฐานความปลอดภัยระดับสูง",
      icon: <SecurityIcon />,
      color: "from-indigo-500 to-purple-500"
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

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const [direction, setDirection] = useState(0);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      handleNext();
    } else {
      handleBack();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-lg z-[100] flex items-center justify-center p-4"
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
          className="bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/50 dark:border-gray-700/50 relative overflow-hidden backdrop-blur-xl"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
            />
          </div>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors z-10"
          >
            <CloseIcon />
          </motion.button>

          {/* Content */}
          <div className="relative z-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300
                }}
                className="text-center space-y-6"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 200,
                    delay: 0.2
                  }}
                  className={`mx-auto w-20 h-20 rounded-2xl bg-gradient-to-r ${steps[currentStep].color} flex items-center justify-center text-white shadow-lg`}
                >
                  {steps[currentStep].icon}
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  {steps[currentStep].title}
                </motion.h3>

                {/* Content */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line"
                >
                  {steps[currentStep].content}
                </motion.div>

                {/* Progress Dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center space-x-2"
                >
                  {steps.map((_, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStep
                          ? `bg-gradient-to-r ${steps[currentStep].color}`
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-between items-center mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(-1)}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                ย้อนกลับ
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(1)}
                className={`px-8 py-3 rounded-xl font-medium bg-gradient-to-r ${steps[currentStep].color} text-white shadow-lg hover:shadow-xl transition-all`}
              >
                {currentStep === steps.length - 1 ? 'เริ่มต้นใช้งาน' : 'ถัดไป'}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomePopup;