// AIChatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiChatResponse, aiGenerateQuestions } from '../utils/ai';

// SVG Icons (ไม่เปลี่ยนแปลง)
const BotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
    <path d="M9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9C10.34 9 9 10.34 9 12Z" fill="currentColor"/>
    <path d="M16 2C17.1 2 18 2.9 18 4C18 5.1 17.1 6 16 6C14.9 6 14 5.1 14 4C14 2.9 14.9 2 16 2Z" fill="currentColor"/>
    <path d="M15 12C15 13.66 16.34 15 18 15C19.66 15 21 13.66 21 12C21 10.34 19.66 9 18 9C16.34 9 15 10.34 15 12Z" fill="currentColor"/>
    <path d="M16 8C16 6.9 16.9 6 18 6C19.1 6 20 6.9 20 8C20 9.1 19.1 10 18 10C16.9 10 16 9.1 16 8Z" fill="currentColor"/>
    <path d="M22 12C22 13.1 21.1 14 20 14C18.9 14 18 13.1 18 12C18 10.9 18.9 10 20 10C21.1 10 22 10.9 22 12Z" fill="currentColor"/>
    <path d="M6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10C6.9 10 6 9.1 6 8Z" fill="currentColor"/>
    <path d="M4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10C4.9 10 4 10.9 4 12Z" fill="currentColor"/>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LikeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 10v12M7 10l4-4 4 4V6a4 4 0 0 0-8 0v4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DislikeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 14V2M17 14l-4 4-4-4V18a4 4 0 0 0 8 0v-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MinimizeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 12h8M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Component แนะนำการใช้งาน (ไม่เปลี่ยนแปลง)
const OnboardingTooltip = ({ isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          {/* ... (โค้ดเดิม) */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AIChatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // แสดง Onboarding ครั้งแรก
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenAIAssistant');
    if (!hasSeenOnboarding) {
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // ปิด Onboarding
  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenAIAssistant', 'true');
  };

  // Auto-scroll - แก้ไขให้ทำงานถูกต้อง
  useEffect(() => {
    if (messagesContainerRef.current && !isMinimized) {
      const scrollToBottom = () => {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      };
      
      // ใช้ requestAnimationFrame เพื่อให้แน่ใจว่า DOM อัพเดทแล้ว
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
  }, [messages, isTyping, isMinimized]);

  // ป้องกันการ scroll ของ body เมื่อเปิด chatbot - แก้ไขให้ถูกต้อง
  useEffect(() => {
    if (isOpen) {
      // บันทึกค่า scroll ปัจจุบัน
      const scrollY = window.scrollY;
      
      // ล็อคการ scroll ของ body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      // คืนค่าการ scroll ของ body
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      
      // คืนค่า scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // Cleanup เมื่อ component unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ตั้งค่าเริ่มต้น
  useEffect(() => {
    setMessages([{
      text: "สวัสดีครับ! ผมคือผู้ช่วย AI ส่วนตัวของ ธนภัทร การะจักษ์ — ยินดีให้บริการข้อมูลเกี่ยวกับผลงาน ทักษะ และประสบการณ์ต่าง ๆ ครับ",
      sender: 'bot'
    }]);
    setSuggestedQuestions([
      "สามารถบอกข้อมูลเกี่ยวกับทักษะหลักของคุณได้ไหม?",
      "มีผลงานใดที่น่าสนใจเป็นพิเศษบ้าง?",
      "ขอข้อมูลเกี่ยวกับประกาศนียบัตรและรางวัล"
    ]);
  }, []);

  // ระบบพิมพ์ทีละตัว - แก้ไขให้ทำงานเสถียร
  const typeMessage = (fullText, onComplete) => {
    let index = 0;
    const newMessageIndex = messages.length;
    
    const interval = setInterval(() => {
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[newMessageIndex]) {
          newMessages[newMessageIndex] = {
            ...newMessages[newMessageIndex],
            text: fullText.slice(0, index + 1)
          };
        }
        return newMessages;
      });
      index++;
      
      if (index >= fullText.length) {
        clearInterval(interval);
        onComplete();
      }
    }, 20);

    // Cleanup function
    return () => clearInterval(interval);
  };

  // ฟังก์ชันสร้างคำถามแนะนำ
  const generateSuggestedQuestions = async (userInput, botResponse) => {
    setIsGeneratingQuestions(true);
    try {
      const questions = await aiGenerateQuestions(userInput, botResponse, 'general');
      setSuggestedQuestions(questions);
    } catch (err) {
      console.error("Failed to generate questions:", err);
      setSuggestedQuestions([]);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsTyping(true);
    setSuggestedQuestions([]);

    try {
      const context = `ผู้ใช้ถามเกี่ยวกับ: ${userInput}. โปรดตอบตามข้อมูล portfolio ของธนภัทรที่มีอยู่โดยอ้างอิงจากข้อมูลจริง`;
      const response = await aiChatResponse(userInput, context);
      
      setMessages(prev => [...prev, { text: '', sender: 'bot' }]);
      typeMessage(response, () => {
        setIsTyping(false);
        generateSuggestedQuestions(userInput, response);
      });
    } catch (err) {
      console.error("AI Error:", err);
      setMessages(prev => [...prev, {
        text: "ขออภัยครับ เกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหม่อีกครั้ง",
        sender: 'bot'
      }]);
      setIsTyping(false);
      setSuggestedQuestions([]);
    }
  };

  // ระบบ Like/Dislike
  const handleReaction = (index, reactionType) => {
    setMessages(prev => prev.map((msg, i) => {
      if (i !== index || msg.sender !== 'bot') return msg;

      const current = msg.reactions || { like: 0, dislike: 0, userLiked: false, userDisliked: false };
      let newReactions = { ...current };

      if (reactionType === 'like') {
        if (current.userLiked) {
          newReactions = { 
            ...newReactions, 
            like: Math.max(0, current.like - 1), 
            userLiked: false 
          };
        } else {
          newReactions = { 
            ...newReactions, 
            like: current.like + 1, 
            userLiked: true 
          };
          if (current.userDisliked) {
            newReactions = { 
              ...newReactions, 
              dislike: Math.max(0, current.dislike - 1), 
              userDisliked: false 
            };
          }
        }
      } else if (reactionType === 'dislike') {
        if (current.userDisliked) {
          newReactions = { 
            ...newReactions, 
            dislike: Math.max(0, current.dislike - 1), 
            userDisliked: false 
          };
        } else {
          newReactions = { 
            ...newReactions, 
            dislike: current.dislike + 1, 
            userDisliked: true 
          };
          if (current.userLiked) {
            newReactions = { 
              ...newReactions, 
              like: Math.max(0, current.like - 1), 
              userLiked: false 
            };
          }
        }
      }

      return { ...msg, reactions: newReactions };
    }));
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
    // Auto focus ไปที่ input
    setTimeout(() => {
      const inputElement = document.querySelector('input[type="text"]');
      if (inputElement) {
        inputElement.focus();
        // Move cursor to end
        inputElement.setSelectionRange(question.length, question.length);
      }
    }, 100);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Onboarding Tooltip */}
      <OnboardingTooltip isVisible={showOnboarding} onClose={handleOnboardingClose} />

      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl z-40 flex items-center justify-center md:bottom-8 md:right-8 md:w-16 md:h-16 hover:shadow-3xl transition-all duration-300"
          aria-label="เปิด AI Assistant"
        >
          <BotIcon />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop สำหรับทุกอุปกรณ์ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
            />
            
            {/* Chat Container - แก้ไขโครงสร้างหลัก */}
            <motion.div
              initial={{ 
                y: '100%', 
                opacity: 0
              }}
              animate={{ 
                y: 0, 
                opacity: 1
              }}
              exit={{ 
                y: '100%', 
                opacity: 0
              }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300
              }}
              className={`
                fixed z-[100] flex flex-col bg-white dark:bg-gray-800 shadow-2xl
                /* Mobile - ครอบคลุมทั้งหน้าจอ */
                inset-0
                /* Desktop */
                md:inset-auto md:top-[18rem] md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2
                md:rounded-3xl md:w-auto md:h-[32rem] md:max-w-[90vw] md:max-h-[80vh]
                ${isMinimized ? 'md:h-16 md:min-h-0' : ''}
                overflow-hidden
              `}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center md:rounded-t-3xl flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <BotIcon />
                  </div>
                  <div className={isMinimized ? 'hidden md:block' : ''}>
                    <h3 className="font-bold text-lg">AI Assistant</h3>
                    <p className="text-xs text-indigo-100">ถามเกี่ยวกับผลงานและทักษะ</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Minimize Button - Desktop Only */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleMinimize}
                    className="hidden md:flex text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                    aria-label={isMinimized ? "ขยาย" : "ย่อ"}
                  >
                    <MinimizeIcon />
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                    aria-label="ปิด"
                  >
                    <CloseIcon />
                  </motion.button>
                </div>
              </div>

              {/* Messages Area - Hidden when minimized */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col min-h-0"
                  >
                    <div 
                      ref={messagesContainerRef}
                      className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50 dark:bg-gray-900/50"
                    >
                      {messages.map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`
                            p-3 rounded-2xl max-w-[85%] md:max-w-[80%]
                            ${msg.sender === 'user'
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none shadow-lg'
                              : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm border border-gray-200 dark:border-gray-600'
                            }
                          `}>
                            <p className="text-sm leading-relaxed break-words">{msg.text}</p>

                            {msg.sender === 'bot' && msg.text && (
                              <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-gray-200/50 dark:border-gray-600/50">
                                <motion.button
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleReaction(i, 'like')}
                                  className={`flex items-center space-x-1 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                                    msg.reactions?.userLiked
                                      ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                                  }`}
                                >
                                  <LikeIcon />
                                  <span>{msg.reactions?.like || 0}</span>
                                </motion.button>

                                <motion.button
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleReaction(i, 'dislike')}
                                  className={`flex items-center space-x-1 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                                    msg.reactions?.userDisliked
                                      ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                                  }`}
                                >
                                  <DislikeIcon />
                                  <span>{msg.reactions?.dislike || 0}</span>
                                </motion.button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}

                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 dark:border-gray-600">
                            <div className="flex space-x-1.5">
                              <motion.div
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity }}
                                className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
                              />
                              <motion.div
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
                              />
                              <motion.div
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {suggestedQuestions.length > 0 && !isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50"
                        >
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">
                            {isGeneratingQuestions ? "กำลังสร้างคำถาม..." : "คำถามแนะนำ:"}
                          </p>
                          {!isGeneratingQuestions && (
                            <div className="flex flex-col gap-1.5">
                              {suggestedQuestions.map((q, i) => (
                                <motion.button
                                  key={i}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleSuggestedQuestion(q)}
                                  className="text-left px-3 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-xs rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors border border-indigo-100 dark:border-indigo-800/50"
                                >
                                  {q}
                                </motion.button>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Area - Hidden when minimized */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 safe-area-padding flex-shrink-0"
                  >
                    <form onSubmit={handleSubmit} className="flex space-x-3">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="พิมพ์ข้อความที่นี่..."
                        className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm transition-all duration-200"
                        disabled={isTyping}
                        autoFocus
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center w-12 h-12 hover:shadow-xl transition-all duration-200"
                      >
                        <SendIcon />
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* ป้องกันการ scroll ของ body เมื่อ chatbot เปิด */
        body.chatbot-open {
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
        }
        
        /* Safe area padding สำหรับ iPhone */
        .safe-area-padding {
          padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
        }
        
        /* ปรับปรุง scroll behavior สำหรับมือถือ */
        .overflow-y-auto {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
};

export default AIChatbot;