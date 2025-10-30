// AIChatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiChatResponseWithRetry, aiGenerateQuestions, getFallbackResponse } from '../utils/ai';

// SVG Icons Components (คงเดิม)
const BotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 9V7C20 5.35 18.65 4 17 4H7C5.35 4 4 5.35 4 7V9C2.9 9 2 9.9 2 11V16C2 17.1 2.9 18 4 18H5V19C5 19.55 5.45 20 6 20H8C8.55 20 9 19.55 9 19V18H15V19C15 19.55 15.45 20 16 20H18C18.55 20 19 19.55 19 19V18H20C21.1 18 22 17.1 22 16V11C22 9.9 21.1 9 20 9ZM7 6H17C17.55 6 18 6.45 18 7V9H6V7C6 6.45 6.45 6 7 6ZM20 16H4V11H20V16Z" fill="currentColor" />
    <path d="M8 13H10C10.55 13 11 12.55 11 12V12C11 11.45 10.55 11 10 11H8C7.45 11 7 11.45 7 12V12C7 12.55 7.45 13 8 13Z" fill="currentColor" />
    <path d="M14 13H16C16.55 13 17 12.55 17 12V12C17 11.45 16.55 11 16 11H14C13.45 11 13 11.45 13 12V12C13 12.55 13.45 13 14 13Z" fill="currentColor" />
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor" />
  </svg>
);

const LikeIcon = ({ filled = false }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
  </svg>
);

const DislikeIcon = ({ filled = false }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
  </svg>
);

const MinimizeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 11H18V13H6V11Z" fill="currentColor" />
  </svg>
);

const ExpandIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 14H5V19H10V17H7V14ZM5 10H7V7H10V5H5V10ZM17 17H14V19H19V14H17V17ZM14 5V7H17V10H19V5H14Z" fill="currentColor" />
  </svg>
);

const HistoryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 20 10.5 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z" fill="currentColor" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor" />
  </svg>
);

const ClearAllIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
    <path d="M10 10H12V17H10V10ZM14 10H16V17H14V10Z" fill="currentColor"/>
    <path d="M2 10H6V8H2V10ZM22 10H10V8H22V10Z" fill="currentColor"/>
  </svg>
);

// Welcome Screen Component (คงเดิม)
const WelcomeScreen = ({ onStartChat, onClose, sectionRefs }) => {
  const quickLinks = [
    { text: "หน้าแรก", link: "home" },
    { text: "แนะนำตัวหน่อย", link: "about" },
    { text: "มีทักษะอะไรบ้าง", link: "skills" },
    { text: "ดูผลงาน", link: "portfolio" },
    { text: "ประกาศนียบัตร", link: "certificates" }
  ];

  const handleLinkClick = (link) => {
    console.log('Welcome screen link clicked:', link);
    onClose();
    setTimeout(() => {
      const sectionKey = link || 'home';
      const sectionRef = sectionRefs[sectionKey];
      
      if (sectionRef?.current) {
        sectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // Fallback
        const element = document.getElementById(sectionKey);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    }, 300);
  };

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
          onClick={() => onStartChat()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200"
        >
          เริ่มการสนทนา
        </motion.button>

        <div className="grid grid-cols-2 gap-2">
          {quickLinks.map((item, index) => (
            <motion.button
              key={item.text}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLinkClick(item.link)}
              className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 py-2 px-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border border-blue-100 dark:border-blue-800/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {item.text}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Query History Panel Component (ลดความซับซ้อน)
const QueryHistoryPanel = ({ 
  showHistory, 
  userQueryHistory, 
  onQuestionClick, 
  onRemoveQuery, 
  onClearAll 
}) => {
  if (!showHistory || userQueryHistory.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute right-0 top-14 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-10 max-h-80 overflow-hidden"
    >
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HistoryIcon />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            ประวัติคำถาม ({userQueryHistory.length})
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearAll}
          className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 transition-colors bg-red-50 dark:bg-red-900/20 rounded-lg"
          title="ล้างประวัติคำถามทั้งหมด"
        >
          <ClearAllIcon />
        </motion.button>
      </div>

      <div className="max-h-64 overflow-y-auto p-2">
        {userQueryHistory.map((query, index) => (
          <motion.div
            key={`${query}-${index}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 mb-1"
          >
            <button
              onClick={() => {
                onQuestionClick(query);
              }}
              className="flex-1 text-left text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 truncate pr-2 transition-colors"
              title={query}
            >
              "{query}"
            </button>
            <button
              onClick={() => onRemoveQuery(query)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1"
              title="ลบคำถามนี้"
            >
              <DeleteIcon />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Clear Confirmation Dialog Component (ลดความซับซ้อน)
const ClearConfirmationDialog = ({ showClearConfirm, onConfirm, onCancel }) => {
  if (!showClearConfirm) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-2xl"><ClearAllIcon /></div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">ล้างประวัติคำถาม</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
          คุณแน่ใจหรือไม่ว่าต้องการล้างประวัติคำถามทั้งหมด? การกระทำนี้ไม่สามารถย้อนกลับได้
        </p>
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors font-medium"
          >
            ล้างทั้งหมด
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Message Component (คงเดิม)
const Message = ({ msg, onReaction, formatMessageWithLinks }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
  >
    <div className={`
      relative max-w-[85%] p-3 rounded-2xl
      ${msg.sender === 'user'
        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-md shadow-sm border border-gray-200 dark:border-gray-700'
      }
    `}>
      <div className="text-sm leading-relaxed break-words">
        {msg.sender === 'bot' ? formatMessageWithLinks(msg.text) : msg.text}
      </div>

      {msg.sender === 'bot' && msg.text && (
        <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onReaction(msg.id, 'like')}
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-all ${
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
            onClick={() => onReaction(msg.id, 'dislike')}
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-all ${
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
);

// Typing Indicator Component (คงเดิม)
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-start"
  >
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-bl-md shadow-sm border border-gray-200 dark:border-gray-700">
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
);

// Suggested Questions Component (คงเดิม)
const SuggestedQuestions = ({ questions, onQuestionClick, isGenerating }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4"
  >
    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-3">
      คำถามแนะนำ:
    </p>
    <div className="space-y-2">
      {questions.map((q, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onQuestionClick(q)}
          className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all border border-blue-100 dark:border-blue-800/50"
        >
          {q}
        </motion.button>
      ))}
    </div>
  </motion.div>
);

// Main Component (ลดความซับซ้อน)
const AIChatbot = ({ sectionRefs }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userQueryHistory, setUserQueryHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  const messagesContainerRef = useRef(null);

  // Constants (คงเดิม)
  const QUICK_QUESTIONS = [
    "แนะนำตัวหน่อย",
    "มีทักษะอะไรบ้าง",
    "ผลงานที่น่าสนใจ",
    "ประสบการณ์การทำงาน"
  ];

  const LINK_MAP = {
    'home': 'หน้าแรก',
    'about': 'เกี่ยวกับฉัน',
    'portfolio': 'ผลงาน',
    'skills': 'ทักษะ',
    'certificates': 'ประกาศนียบัตร',
    'blog': 'บทความ',
    'contact': 'ติดต่อ'
  };

  // Helper Functions (คงเดิม)
  const getLinkText = (path) => LINK_MAP[path] || path;

  const handleLinkClick = (path) => {
    console.log('Attempting to navigate to:', path);
    
    setIsOpen(false);
    
    setTimeout(() => {
      const sectionKey = path || 'home';
      const sectionRef = sectionRefs[sectionKey];
      
      if (sectionRef?.current) {
        sectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        const element = document.getElementById(sectionKey);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          window.location.hash = sectionKey;
        }
      }
    }, 300);
  };

  const formatMessageWithLinks = (text) => {
    if (!text) return text;
    
    const linkRegex = /\[\[\/([a-zA-Z0-9-_]*)\]\]/g;
    const parts = text.split(linkRegex);
    
    if (parts.length === 1) return text;

    const result = [];
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        result.push(parts[i]);
      } else {
        const path = parts[i];
        const linkText = getLinkText(path);
        result.push(
          <motion.span
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLinkClick(path)}
            className="inline-flex items-center px-2 py-1 mx-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-200 border border-blue-200 dark:border-blue-700 text-sm font-medium"
          >
            {linkText}
          </motion.span>
        );
      }
    }
    
    return result;
  };

  // Effects (ลดความซับซ้อน - เอาการบันทึก localStorage ออก)
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

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

  // Core Functions (คงเดิม)
  const typeMessage = (fullText, onComplete) => {
    let index = 0;
    const botMessageId = Date.now();

    setMessages(prev => [...prev, {
      text: '',
      sender: 'bot',
      id: botMessageId
    }]);

    const interval = setInterval(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMessageId
            ? { ...msg, text: fullText.slice(0, index + 1) }
            : msg
        )
      );

      index++;

      if (index >= fullText.length) {
        clearInterval(interval);
        setTimeout(onComplete, 100);
      }
    }, 20);

    return () => clearInterval(interval);
  };

  const addToQueryHistory = (query) => {
    if (query?.trim()) {
      setUserQueryHistory(prev => {
        const filtered = prev.filter(q => 
          q.toLowerCase() !== query.toLowerCase().trim()
        );
        return [query.trim(), ...filtered].slice(0, 15);
      });
    }
  };

  const generateSuggestedQuestions = async (userInput, botResponse) => {
    if (!userInput || !botResponse) return;
    
    setIsGeneratingQuestions(true);
    try {
      const questions = await aiGenerateQuestions(userInput, botResponse, 'general');
      if (Array.isArray(questions) && questions.length > 0) {
        setSuggestedQuestions(questions);
      } else {
        setSuggestedQuestions([]);
      }
    } catch (err) {
      console.error("Failed to generate questions:", err);
      setSuggestedQuestions([]);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleSubmit = async (e, customInput = null) => {
    if (e?.preventDefault) e.preventDefault();

    const userInput = customInput ?? input;
    if (!userInput?.trim() || isTyping) return;

    const userMessage = {
      text: userInput.trim(),
      sender: 'user',
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    addToQueryHistory(userInput.trim());

    if (customInput === null) setInput('');
    setIsTyping(true);
    setShowWelcome(false);
    setSuggestedQuestions([]);
    setShowHistory(false);

    try {
      const context = messages.length > 0 
        ? `บทสนทนาก่อนหน้า: ${messages.slice(-3).map(m => `${m.sender}: ${m.text}`).join(' | ')}`
        : '';

      const response = await aiChatResponseWithRetry(userInput.trim(), context);
      
      if (!response?.trim()) throw new Error('Empty response from AI');

      typeMessage(response.trim(), () => {
        setIsTyping(false);
        generateSuggestedQuestions(userInput.trim(), response.trim());
      });
      
    } catch (err) {
      console.error("AI Error:", err);
      
      const fallbackResponse = getFallbackResponse(userInput.trim());
      
      setMessages(prev => [...prev, {
        text: fallbackResponse,
        sender: 'bot',
        id: Date.now(),
        timestamp: new Date().toISOString()
      }]);
      
      setIsTyping(false);
      setSuggestedQuestions([]);
    }
  };

  const handleSuggestedQuestion = (question) => {
    if (question?.trim()) {
      handleSubmit(null, question.trim());
    }
  };

  const handleStartChat = (customQuestion = null) => {
    setShowWelcome(false);
    setShowHistory(false);
    if (customQuestion?.trim()) {
      setTimeout(() => handleSubmit(null, customQuestion.trim()), 100);
    }
  };

  const handleReaction = (messageId, reactionType) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id !== messageId || msg.sender !== 'bot') return msg;

      const current = msg.reactions || { 
        like: 0, dislike: 0, userLiked: false, userDisliked: false 
      };

      let newReactions = { ...current };

      if (reactionType === 'like') {
        newReactions = {
          like: current.userLiked ? current.like - 1 : current.like + 1,
          dislike: current.userDisliked ? current.dislike - 1 : current.dislike,
          userLiked: !current.userLiked,
          userDisliked: false
        };
      } else if (reactionType === 'dislike') {
        newReactions = {
          like: current.userLiked ? current.like - 1 : current.like,
          dislike: current.userDisliked ? current.dislike - 1 : current.dislike + 1,
          userLiked: false,
          userDisliked: !current.userDisliked
        };
      }

      return { ...msg, reactions: newReactions };
    }));
  };

  // History Management (ลดความซับซ้อน)
  const clearQueryHistory = () => {
    setUserQueryHistory([]);
  };

  const removeQueryFromHistory = (queryToRemove) => {
    setUserQueryHistory(prev => prev.filter(query => query !== queryToRemove));
  };

  // UI Handlers (ลดความซับซ้อน)
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const toggleHistory = () => setShowHistory(!showHistory);
  const handleCloseChat = () => {
    setIsOpen(false);
    setShowHistory(false);
  };

  const handleClearAll = () => {
    setShowClearConfirm(true);
  };

  const confirmClear = () => {
    clearQueryHistory();
    setShowClearConfirm(false);
  };

  const cancelClear = () => {
    setShowClearConfirm(false);
  };

  return (
    <>
      {/* Floating Action Button (คงเดิม) */}
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
              onClick={handleCloseChat}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* Chat Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`
                fixed z-50 flex flex-col bg-white dark:bg-gray-900 shadow-2xl
                border border-gray-200 dark:border-gray-700
                ${isFullscreen
                  ? 'inset-2 sm:inset-4 rounded-xl md:rounded-2xl'
                  : 'bottom-2 top-2 left-2 right-2 sm:bottom-4 sm:top-4 sm:left-4 sm:right-4 md:bottom-auto md:right-6 md:left-auto md:top-[14%] md:w-96 md:h-[80vh] max-h-[700px]'
                }
                overflow-hidden
              `}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center flex-shrink-0 relative">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <BotIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI Assistant</h3>
                    <p className="text-xs opacity-90">ถามอะไรก็ได้เกี่ยวกับผลงานของฉัน</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* History Button */}
                  {userQueryHistory.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleHistory}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors relative"
                      title="ประวัติคำถาม"
                    >
                      <HistoryIcon />
                      {userQueryHistory.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 text-white text-xs rounded-full flex items-center justify-center">
                          {userQueryHistory.length > 9 ? '9+' : userQueryHistory.length}
                        </span>
                      )}
                    </motion.button>
                  )}

                  {/* Fullscreen Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title={isFullscreen ? "ย่อขนาด" : "ขยายเต็มหน้าจอ"}
                  >
                    {isFullscreen ? <MinimizeIcon /> : <ExpandIcon />}
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCloseChat}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="ปิดแชท"
                  >
                    <CloseIcon />
                  </motion.button>
                </div>
              </div>

              {/* Messages Area */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative"
              >
                <AnimatePresence>
                  {showWelcome && (
                    <WelcomeScreen
                      onStartChat={handleStartChat}
                      onClose={() => setShowWelcome(false)}
                      sectionRefs={sectionRefs}
                    />
                  )}
                </AnimatePresence>

                {!showWelcome && (
                  <>
                    {messages.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-8"
                      >
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                          <BotIcon />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          สวัสดีครับ!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                          ผมคือ AI Assistant ที่จะช่วยตอบคำถามเกี่ยวกับผลงานและทักษะของ ธนภัทร การะจักษ์
                        </p>
                        <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                          {QUICK_QUESTIONS.map((q, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleSuggestedQuestion(q)}
                              className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 py-2 px-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border border-blue-100 dark:border-blue-800/50"
                            >
                              {q}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    <AnimatePresence>
                      {messages.map((msg) => (
                        <Message
                          key={msg.id}
                          msg={msg}
                          onReaction={handleReaction}
                          formatMessageWithLinks={formatMessageWithLinks}
                        />
                      ))}
                    </AnimatePresence>

                    {isTyping && <TypingIndicator />}

                    {suggestedQuestions.length > 0 && !isTyping && (
                      <SuggestedQuestions
                        questions={suggestedQuestions}
                        onQuestionClick={handleSuggestedQuestion}
                        isGenerating={isGeneratingQuestions}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Input Area */}
              {!showWelcome && (
                <form
                  onSubmit={handleSubmit}
                  className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0"
                >
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="พิมพ์คำถามของคุณที่นี่..."
                      className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      disabled={isTyping}
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isTyping || !input.trim()}
                      className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
                    >
                      <SendIcon />
                    </motion.button>
                  </div>
                </form>
              )}

              {/* Query History Panel */}
              <QueryHistoryPanel
                showHistory={showHistory}
                userQueryHistory={userQueryHistory}
                onQuestionClick={handleStartChat}
                onRemoveQuery={removeQueryFromHistory}
                onClearAll={handleClearAll}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Clear Confirmation Dialog */}
      <ClearConfirmationDialog
        showClearConfirm={showClearConfirm}
        onConfirm={confirmClear}
        onCancel={cancelClear}
      />
    </>
  );
};

export default AIChatbot;