import React, { useState, useEffect } from 'react';

const WelcomePopup = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // เพิ่ม animation เมื่อ component ถูก mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      title: "ยินดีต้อนรับสู่เว็บพอร์ตโฟลิโอของ ธนภัทร การะจักษ์",
      content: "เว็บนี้ถูกออกแบบมาเพื่อแสดงผลงาน ทักษะ และบทความของผม — ใช้งานง่าย — สวยงาม — ปลอดภัย 100%",
      icon: "👋"
    },
    {
      title: "วิธีใช้งานเว็บ",
      content: "• กดที่ปุ่ม AI Assistant มุมล่างขวา — เพื่อถามคำถามเกี่ยวกับผลงาน\n• ใช้เมนูด้านบน — เพื่อเลื่อนไปยังส่วนต่าง ๆ\n• กด Like/Dislike — เพื่อให้ feedback กับผลงาน",
      icon: "💡"
    },
    {
      title: "นโยบายความเป็นส่วนตัว",
      content: "• เว็บนี้ไม่เก็บข้อมูลส่วนตัวของคุณ\n• AI ทำงานในเบราว์เซอร์ของคุณ — ไม่ส่งข้อมูลออก\n• ข้อมูล Like/Dislike — เก็บเฉพาะจำนวน — ไม่เก็บตัวตน",
      icon: "🔒"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    // รอให้ animation เสร็จสิ้นก่อนเรียก onClose
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSkip = () => {
    handleClose();
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white dark:bg-gray-800 rounded-3xl p-1 sm:p-4 max-w-md w-full shadow-2xl backdrop-blur-xl border border-white/20 dark:border-gray-700/40 transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            {steps[currentStep].icon}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
            {steps[currentStep].content}
          </p>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  index === currentStep ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          <div className="flex space-x-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors text-sm"
              >
                ย้อนกลับ
              </button>
            )}

            <button
              onClick={handleSkip}
              className="px-3 py-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors text-sm"
            >
              ข้าม
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold text-sm"
            >
              {currentStep === steps.length - 1 ? 'เริ่มใช้งาน' : 'ถัดไป'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;