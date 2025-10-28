// AIChatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiChatResponse, aiGenerateQuestions } from '../utils/ai';

// Modern SVG Icons
const BotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 9V7C20 5.35 18.65 4 17 4H7C5.35 4 4 5.35 4 7V9C2.9 9 2 9.9 2 11V16C2 17.1 2.9 18 4 18H5V19C5 19.55 5.45 20 6 20H8C8.55 20 9 19.55 9 19V18H15V19C15 19.55 15.45 20 16 20H18C18.55 20 19 19.55 19 19V18H20C21.1 18 22 17.1 22 16V11C22 9.9 21.1 9 20 9ZM7 6H17C17.55 6 18 6.45 18 7V9H6V7C6 6.45 6.45 6 7 6ZM20 16H4V11H20V16Z" fill="currentColor"/>
    <path d="M8 13H10C10.55 13 11 12.55 11 12V12C11 11.45 10.55 11 10 11H8C7.45 11 7 11.45 7 12V12C7 12.55 7.45 13 8 13Z" fill="currentColor"/>
    <path d="M14 13H16C16.55 13 17 12.55 17 12V12C17 11.45 16.55 11 16 11H14C13.45 11 13 11.45 13 12V12C13 12.55 13.45 13 14 13Z" fill="currentColor"/>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
  </svg>
);

const LikeIcon = ({ filled = false }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
    <path d="M1 21H5V9H1V21ZM23 10C23 8.9 22.1 8 21 8H14.69L15.64 3.43L15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9V19C7 20.1 7.9 21 9 21H18C18.83 21 19.54 20.5 19.84 19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10Z" 
          stroke="currentColor" strokeWidth={filled ? "0" : "1.5"} fill={filled ? "currentColor" : "none"}/>
  </svg>
);

const DislikeIcon = ({ filled = false }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
    <path d="M15 3H9V15H15V3ZM23 14C23 15.1 22.1 16 21 16H14.69L15.64 20.57L15.67 20.89C15.67 21.3 15.5 21.68 15.23 21.95L14.17 23L7.59 16.42C7.22 16.05 7 15.55 7 15V5C7 3.9 7.9 3 9 3H18C18.83 3 19.54 3.5 19.84 4.22L22.86 11.27C22.95 11.5 23 11.74 23 12V14Z" 
          stroke="currentColor" strokeWidth={filled ? "0" : "1.5"} fill={filled ? "currentColor" : "none"}/>
  </svg>
);

const MinimizeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 11H18V13H6V11Z" fill="currentColor"/>
  </svg>
);

const ExpandIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 14H5V19H10V17H7V14ZM5 10H7V7H10V5H5V10ZM17 17H14V19H19V14H17V17ZM14 5V7H17V10H19V5H14Z" fill="currentColor"/>
  </svg>
);

// Modern Welcome Screen
const WelcomeScreen = ({ onStartChat, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 flex flex-col items-center justify-center p-6 z-10"
    >
      <motion.button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <CloseIcon />
      </motion.button>

      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg"
      >
        <BotIcon />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center"
      >
        AI Assistant
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 dark:text-gray-300 mb-8 text-center leading-relaxed max-w-sm"
      >
        สอบถามข้อมูลเกี่ยวกับผลงาน ทักษะ และประสบการณ์ของ ธนภัทร การะจักษ์
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3 w-full max-w-xs"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartChat}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200"
        >
          เริ่มการสนทนา
        </motion.button>

        <div className="grid grid-cols-2 gap-2">
          {["แนะนำตัวหน่อย", "มีทักษะอะไรบ้าง"].map((question, index) => (
            <motion.button
              key={question}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStartChat(question)}
              className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 py-2 px-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border border-blue-100 dark:border-blue-800/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {question}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const AIChatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [, setIsGeneratingQuestions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Show welcome screen on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setShowWelcome(true);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesContainerRef.current && isOpen) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
  };

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

  const handleSubmit = async (e, customInput = null) => {
    e?.preventDefault();
    const userInput = customInput || input;
    
    if (!userInput.trim() || isTyping) return;

    const userMessage = { text: userInput, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setShowWelcome(false);
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

  const handleReaction = (index, reactionType) => {
    setMessages(prev => prev.map((msg, i) => {
      if (i !== index || msg.sender !== 'bot') return msg;

      const current = msg.reactions || { like: 0, dislike: 0, userLiked: false, userDisliked: false };
      let newReactions = { ...current };

      if (reactionType === 'like') {
        newReactions = {
          ...newReactions,
          like: current.userLiked ? current.like - 1 : current.like + 1,
          userLiked: !current.userLiked,
          userDisliked: current.userDisliked ? false : current.userDisliked
        };
      } else if (reactionType === 'dislike') {
        newReactions = {
          ...newReactions,
          dislike: current.userDisliked ? current.dislike - 1 : current.dislike + 1,
          userDisliked: !current.userDisliked,
          userLiked: current.userLiked ? false : current.userLiked
        };
      }

      return { ...msg, reactions: newReactions };
    }));
  };

  const handleSuggestedQuestion = (question) => {
    handleSubmit(null, question);
  };

  const handleStartChat = (customQuestion = null) => {
    setShowWelcome(false);
    if (customQuestion) {
      setTimeout(() => handleSubmit(null, customQuestion), 300);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const quickQuestions = [
    "แนะนำตัวหน่อย",
    "มีทักษะอะไรบ้าง",
    "ผลงานที่น่าสนใจ",
    "ประสบการณ์การทำงาน"
  ];

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl z-50 flex items-center justify-center hover:shadow-3xl transition-all duration-300"
          aria-label="เปิด AI Assistant"
        >
          <BotIcon />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}

      {/* Chat Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            
            {/* Chat Container */}
            <motion.div
              initial={{ 
                scale: 0.8, 
                opacity: 0,
                y: 20
              }}
              animate={{ 
                scale: 1,
                opacity: 1,
                y: 0
              }}
              exit={{ 
                scale: 0.8,
                opacity: 0,
                y: 20
              }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300
              }}
              className={`
                fixed z-50 flex flex-col bg-white dark:bg-gray-900 shadow-2xl
                border border-gray-200 dark:border-gray-700
                /* Responsive sizing */
                ${isFullscreen 
                  ? 'inset-4 rounded-2xl' 
                  : 'bottom-4 right-4 left-4 top-20 rounded-2xl md:bottom-auto md:right-8 md:left-auto md:top-1/2 md:transform md:-translate-y-1/2 md:w-96 md:h-[600px]'
                }
                overflow-hidden
              `}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <BotIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI Assistant</h3>
                    <p className="text-xs text-blue-100">ถามเกี่ยวกับผลงานและทักษะ</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {/* Fullscreen Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFullscreen}
                    className="text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                    aria-label={isFullscreen ? "ย่อ" : "ขยาย"}
                  >
                    {isFullscreen ? <MinimizeIcon /> : <ExpandIcon />}
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                    aria-label="ปิด"
                  >
                    <CloseIcon />
                  </motion.button>
                </div>
              </div>

              {/* Welcome Screen */}
              <AnimatePresence>
                {showWelcome && (
                  <WelcomeScreen 
                    onStartChat={handleStartChat}
                    onClose={() => setShowWelcome(false)}
                  />
                )}
              </AnimatePresence>

              {/* Messages Area */}
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-gray-800/50"
              >
                <div className="p-4 space-y-4">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`
                        relative max-w-[85%] md:max-w-[80%]
                        ${msg.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-md'
                          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-md shadow-sm border border-gray-100 dark:border-gray-700'
                        }
                      `}>
                        <div className="p-4">
                          <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                        </div>

                        {msg.sender === 'bot' && msg.text && (
                          <div className="flex items-center space-x-2 px-4 pb-3">
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleReaction(i, 'like')}
                              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs transition-all ${
                                msg.reactions?.userLiked
                                  ? 'bg-blue-500 text-white shadow-md'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                              }`}
                            >
                              <LikeIcon filled={msg.reactions?.userLiked} />
                              <span>{msg.reactions?.like || 0}</span>
                            </motion.button>

                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleReaction(i, 'dislike')}
                              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs transition-all ${
                                msg.reactions?.userDisliked
                                  ? 'bg-red-500 text-white shadow-md'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                              }`}
                            >
                              <DislikeIcon filled={msg.reactions?.userDisliked} />
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
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-bl-md shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex space-x-2">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                              className="w-2 h-2 bg-blue-500 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {suggestedQuestions.length > 0 && !isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4"
                    >
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-3">
                        คำถามแนะนำ:
                      </p>
                      <div className="space-y-2">
                        {suggestedQuestions.map((q, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSuggestedQuestion(q)}
                            className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all border border-blue-100 dark:border-blue-800/50"
                          >
                            {q}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {!showWelcome && messages.length <= 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-2 gap-2 mt-4"
                    >
                      {quickQuestions.map((question, i) => (
                        <motion.button
                          key={question}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSuggestedQuestion(question)}
                          className="p-3 text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {question}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0 safe-area-padding">
                <form onSubmit={handleSubmit} className="flex space-x-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="พิมพ์ข้อความที่นี่..."
                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white text-sm transition-all duration-200"
                    disabled={isTyping}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center w-12 h-12"
                  >
                    <SendIcon />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .safe-area-padding {
          padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        .dark .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #475569;
        }
        
        .dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </>
  );
};

export default AIChatbot;