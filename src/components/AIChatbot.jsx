// AIChatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiChatResponse, aiGenerateQuestions } from '../utils/ai';

// SVG Icons ใหม่ที่สวยงามและเป็นทางการ
const BotIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LikeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 9V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V9H7L12 14L17 9H14Z" fill="currentColor"/>
    <path d="M19 10V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V10H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DislikeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 15V19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19V15H17L12 10L7 15H10Z" fill="currentColor"/>
    <path d="M5 14V4C5 3.46957 5.21071 2.96086 5.58579 2.58579C5.96086 2.21071 6.46957 2 7 2H17C17.5304 2 18.0391 2.21071 18.4142 2.58579C18.7893 2.96086 19 3.46957 19 4V14H5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Component แนะนำการใช้งาน
const OnboardingTooltip = ({ isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
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
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/30 dark:border-gray-700/50"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, y: -10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white"
              >
                <BotIcon />
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
              >
                ยินดีต้อนรับสู่ AI Assistant
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
              >
                ผมคือผู้ช่วยอัจฉริยะที่พร้อมให้ข้อมูลเกี่ยวกับผลงาน ทักษะ และประสบการณ์ของ ธนภัทร การะจักษ์ 
                คุณสามารถสอบถามข้อมูลใดก็ได้เกี่ยวกับพอร์ตโฟลิโอนี้
              </motion.p>
              
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                เริ่มการสนทนา
              </motion.button>
            </div>
          </motion.div>
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
  const messagesEndRef = useRef(null);

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

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  // ระบบพิมพ์ทีละตัว
  const typeMessage = (fullText, onComplete) => {
    let index = 0;
    const interval = setInterval(() => {
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        newMessages[newMessages.length - 1] = {
          ...lastMessage,
          text: fullText.slice(0, index + 1)
        };
        return newMessages;
      });
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        onComplete();
      }
    }, 20);
  };

  // ฟังก์ชันตรวจสอบ context type
  const detectContextType = (userInput, botResponse) => {
    const lowerInput = userInput.toLowerCase();
    const lowerResponse = botResponse.toLowerCase();
    
    if (lowerInput.includes('ทักษะ') || lowerResponse.includes('ทักษะ') || 
        lowerInput.includes('skill') || lowerResponse.includes('skill')) {
      return 'skills';
    }
    if (lowerInput.includes('ผลงาน') || lowerResponse.includes('ผลงาน') || 
        lowerInput.includes('project') || lowerResponse.includes('project')) {
      return 'projects';
    }
    if (lowerInput.includes('ประกาศนียบัตร') || lowerResponse.includes('ประกาศนียบัตร') || 
        lowerInput.includes('certificate') || lowerResponse.includes('certificate') ||
        lowerInput.includes('รางวัล') || lowerResponse.includes('รางวัล')) {
      return 'certificates';
    }
    return 'general';
  };

  // ระบบสร้างคำถามแนะนำแบบ AI
  const generateSuggestedQuestions = async (userInput, botResponse) => {
    setIsGeneratingQuestions(true);
    const contextType = detectContextType(userInput, botResponse);
    
    try {
      const questions = await aiGenerateQuestions(userInput, botResponse, contextType);
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
    setInput('');
    setIsTyping(true);
    setSuggestedQuestions([]);

    try {
      const context = `ผู้ใช้ถามเกี่ยวกับ: ${input}. โปรดตอบตามข้อมูล portfolio ของธนภัทรที่มีอยู่โดยอ้างอิงจากข้อมูลจริง`;
      const response = await aiChatResponse(input, context);
      
      setMessages(prev => [...prev, { text: '', sender: 'bot' }]);
      typeMessage(response, () => {
        setIsTyping(false);
        generateSuggestedQuestions(input, response);
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
          newReactions = { ...newReactions, like: Math.max(0, current.like - 1), userLiked: false };
        } else {
          newReactions = { ...newReactions, like: current.like + 1, userLiked: true };
          if (current.userDisliked) {
            newReactions = { ...newReactions, dislike: Math.max(0, current.dislike - 1), userDisliked: false };
          }
        }
      } else if (reactionType === 'dislike') {
        if (current.userDisliked) {
          newReactions = { ...newReactions, dislike: Math.max(0, current.dislike - 1), userDisliked: false };
        } else {
          newReactions = { ...newReactions, dislike: current.dislike + 1, userDisliked: true };
          if (current.userLiked) {
            newReactions = { ...newReactions, like: Math.max(0, current.like - 1), userLiked: false };
          }
        }
      }

      return { ...msg, reactions: newReactions };
    }));
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
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
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl z-50 flex items-center justify-center hover:shadow-3xl transition-all duration-300"
          aria-label="เปิด AI Assistant"
        >
          <BotIcon />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="fixed inset-4 sm:inset-8 lg:inset-12 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden z-50 border border-white/30 dark:border-gray-700/50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <BotIcon />
                </div>
                <div>
                  <h3 className="font-bold text-xl">AI Assistant</h3>
                  <p className="text-sm text-indigo-100">ผู้ช่วยอัจฉริยะสำหรับข้อมูลพอร์ตโฟลิโอ</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-all duration-300 p-2 rounded-xl hover:bg-white/10 backdrop-blur-sm"
                aria-label="ปิด"
              >
                <CloseIcon />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50/50 to-white/30 dark:from-gray-900/30 dark:to-gray-800/30">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs sm:max-w-md p-4 rounded-2xl backdrop-blur-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none shadow-lg'
                      : 'bg-white/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm border border-white/50 dark:border-gray-600/50'
                  }`}>
                    <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>

                    {msg.sender === 'bot' && (
                      <div className="flex items-center space-x-3 mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-600/50">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleReaction(i, 'like')}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                            msg.reactions?.userLiked
                              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          <LikeIcon />
                          <span className="text-sm font-medium">{msg.reactions?.like || 0}</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleReaction(i, 'dislike')}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                            msg.reactions?.userDisliked
                              ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          <DislikeIcon />
                          <span className="text-sm font-medium">{msg.reactions?.dislike || 0}</span>
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
                  <div className="bg-white/80 dark:bg-gray-700/80 p-4 rounded-2xl rounded-bl-none backdrop-blur-sm border border-white/50 dark:border-gray-600/50">
                    <div className="flex space-x-2">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="w-2 h-2 bg-indigo-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-indigo-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {suggestedQuestions.length > 0 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/50 dark:border-gray-700/50"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-semibold">
                    {isGeneratingQuestions ? "กำลังสร้างคำถามแนะนำ..." : "คำถามที่คุณอาจสนใจ:"}
                  </p>
                  {!isGeneratingQuestions && (
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((q, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSuggestedQuestion(q)}
                          className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-sm rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-all duration-200 font-medium border border-indigo-200/50 dark:border-indigo-700/50"
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

            {/* Input */}
            <div className="p-6 border-t border-gray-200/30 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="flex space-x-4">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="สอบถามข้อมูลเกี่ยวกับผลงานและทักษะ..."
                  className="flex-1 px-6 py-4 bg-white dark:bg-gray-700 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-base font-medium transition-all duration-300"
                  disabled={isTyping}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-2xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center w-14 h-14"
                >
                  <SendIcon />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;