// WelcomePopup.jsx
import React, { useState, useEffect } from 'react';

const WelcomePopup = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(openTimer);
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

  const handleClose = () => {
    if (isClosing) return;
    
    setIsClosing(true);
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

  const handleSkip = () => {
    handleClose();
  };

  if (isClosing) {
    return null;
  }

  return (
    <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-1 sm:p-6 max-w-md w-full shadow-2xl border border-white/30 dark:border-gray-700/50 transform transition-all duration-500 ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}`}>
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg"></div>
        
        <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg animate-float">
              {steps[currentStep].icon}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {steps[currentStep].content}
            </p>
          </div>

          <div className="flex justify-between items-center mt-8">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 scale-125' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <div className="flex space-x-3">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-medium"
                >
                  ย้อนกลับ
                </button>
              )}

              <button
                onClick={handleSkip}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-medium"
              >
                ข้าม
              </button>

              <button
                onClick={handleNext}
                className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold text-sm shadow-md hover:shadow-lg"
              >
                {currentStep === steps.length - 1 ? 'เริ่มใช้งาน' : 'ถัดไป'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomePopup;