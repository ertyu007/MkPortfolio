import React, { useState, useEffect, useRef } from 'react';
import { aiChatResponse, aiGenerateQuestions } from '../utils/ai';

const BotIcon = () => (
  <img src="/Message-icon.gif" alt="Bot Icon" width="150" height="150" />
);

const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LikeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 9V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V9H7L12 14L17 9H14Z" fill="currentColor" />
    <path d="M19 10V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V10H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DislikeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 15V19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19V15H17L12 10L7 15H10Z" fill="currentColor" />
    <path d="M5 14V4C5 3.46957 5.21071 2.96086 5.58579 2.58579C5.96086 2.21071 6.46957 2 7 2H17C17.5304 2 18.0391 2.21071 18.4142 2.58579C18.7893 2.96086 19 3.46957 19 4V14H5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ✅ Component แนะนำการใช้งาน
const OnboardingTooltip = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <BotIcon />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">ยินดีต้อนรับ!</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            กดที่ปุ่ม <span className="font-semibold">AI Assistant</span> ด้านล่างขวา เพื่อเริ่มถามคำถามเกี่ยวกับผลงานและทักษะของผม!
          </p>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            เข้าใจแล้ว!
          </button>
        </div>
      </div>
    </div>
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

  // ✅ เพิ่ม useEffect สำหรับจัดการแป้นพิมพ์
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.visualViewport) {
      const adjustHeight = () => {
        const viewport = window.visualViewport;
        if (viewport) {
          document.body.style.paddingBottom = `${viewport.height < window.innerHeight ? viewport.height * 0.3 : 0}px`;
        }
      };

      window.visualViewport.addEventListener('resize', adjustHeight);
      adjustHeight();

      return () => {
        window.visualViewport.removeEventListener('resize', adjustHeight);
        document.body.style.paddingBottom = '0';
      };
    }
  }, [isOpen]);

  // ✅ แสดง Onboarding ครั้งแรก
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // ✅ ปิด Onboarding
  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  // ✅ Auto-scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ เปลี่ยน title และ favicon
  useEffect(() => {
    const favicon = document.querySelector("link[rel='shortcut icon']");

    if (isOpen) {
      document.title = "กำลังพูดคุยกับ AI Assistant | ธนภัทร การะจักษ์";
      document.body.style.overflow = "hidden";
      if (favicon) favicon.href = "/chat-icon.png?ver=2";
    } else {
      document.title = "ธนภัทร การะจักษ์ | Network Enthusiast";
      document.body.style.overflow = "unset";
      if (favicon) favicon.href = "/favicon.ico";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.title = "ธนภัทร การะจักษ์ | Network Enthusiast";
      if (favicon) favicon.href = "/favicon.ico";
    };
  }, [isOpen]);

  // ✅ ตั้งค่าเริ่มต้น
  useEffect(() => {
    setMessages([{
      text: "สวัสดีครับ! 😊 ผมคือผู้ช่วย AI ส่วนตัวของ ธนภัทร การะจักษ์ — ถามอะไรก็ได้นะครับ!",
      sender: 'bot'
    }]);
    setSuggestedQuestions([
      "มีผลงานอะไรน่าสนใจบ้าง?",
      "ทักษะหลักของคุณคืออะไร?",
      "แนะนำผลงานที่ใช้ AI หน่อย"
    ]);
  }, []);

  // ✅ ระบบพิมพ์ทีละตัว
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
    }, 30);
  };

  // ✅ ฟังก์ชันตรวจสอบ context type
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
    if (lowerInput.includes('บทความ') || lowerResponse.includes('บทความ') || 
        lowerInput.includes('blog') || lowerResponse.includes('blog')) {
      return 'blog';
    }
    if (lowerInput.includes('การศึกษา') || lowerResponse.includes('การศึกษา') || 
        lowerInput.includes('เรียน') || lowerResponse.includes('เรียน') ||
        lowerInput.includes('มหาวิทยาลัย') || lowerResponse.includes('มหาวิทยาลัย')) {
      return 'education';
    }
    if (lowerInput.includes('เครือข่าย') || lowerResponse.includes('เครือข่าย') ||
        lowerInput.includes('network') || lowerResponse.includes('network')) {
      return 'network';
    }
    return 'general';
  };

  // ✅ ระบบสร้างคำถามแนะนำแบบ AI
  const generateSuggestedQuestions = async (userInput, botResponse) => {
    setIsGeneratingQuestions(true);
    const contextType = detectContextType(userInput, botResponse);
    
    try {
      const questions = await aiGenerateQuestions(userInput, botResponse, contextType);
      setSuggestedQuestions(questions);
    } catch (err) {
      console.error("Failed to generate questions:", err);
      // ไม่ใช้ fallback แต่แสดงสถานะว่าง
      setSuggestedQuestions([]);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // ✅ ฟังก์ชันสร้าง context ที่เฉพาะเจาะจง
  const createSpecificContext = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("ทักษะ") || lowerInput.includes("skill")) {
      return "ผู้ใช้ถามเกี่ยวกับทักษะของธนภัทร — โปรดตอบตามข้อมูลทักษะที่มีอยู่โดยอ้างอิงจากข้อมูลจริง";
    }
    if (lowerInput.includes("ผลงาน") || lowerInput.includes("project")) {
      return "ผู้ใช้ถามเกี่ยวกับผลงานของธนภัทร — โปรดตอบตามข้อมูลผลงานที่มีอยู่โดยอ้างอิงจากข้อมูลจริง";
    }
    if (lowerInput.includes("ประกาศนียบัตร") || lowerInput.includes("certificate") || lowerInput.includes("รางวัล")) {
      return "ผู้ใช้ถามเกี่ยวกับประกาศนียบัตรและรางวัลของธนภัทร — โปรดตอบตามข้อมูลประกาศนียบัตรที่มีอยู่โดยอ้างอิงจากข้อมูลจริง";
    }
    if (lowerInput.includes("บทความ") || lowerInput.includes("blog")) {
      return "ผู้ใช้ถามเกี่ยวกับบทความของธนภัทร — โปรดตอบตามข้อมูลบทความที่มีอยู่โดยอ้างอิงจากข้อมูลจริง";
    }
    if (lowerInput.includes("การศึกษา") || lowerInput.includes("เรียน") || lowerInput.includes("มหาวิทยาลัย")) {
      return "ผู้ใช้ถามเกี่ยวกับการศึกษาของธนภัทร — โปรดตอบตามข้อมูลการศึกษาที่มีอยู่โดยอ้างอิงจากข้อมูลจริง";
    }
    if (lowerInput.includes("เครือข่าย") || lowerInput.includes("network")) {
      return "ผู้ใช้ถามเกี่ยวกับเครือข่าย — โปรดตอบตามข้อมูลทักษะเครือข่ายของธนภัทรโดยอ้างอิงจากข้อมูลจริง";
    }
    
    return `ผู้ใช้ถามเกี่ยวกับ: ${userInput}. โปรดตอบตามข้อมูล portfolio ของธนภัทรที่มีอยู่โดยอ้างอิงจากข้อมูลจริง`;
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
      const context = createSpecificContext(input);
      const response = await aiChatResponse(input, context);
      
      setMessages(prev => [...prev, { text: '', sender: 'bot' }]);
      typeMessage(response, () => {
        setIsTyping(false);
        generateSuggestedQuestions(input, response);
      });
    } catch (err) {
      console.error("AI Error:", err);
      setMessages(prev => [...prev, {
        text: "ขอโทษครับ — เกิดข้อผิดพลาดในการประมวลผล — ลองถามคำถามอื่นดูนะครับ!",
        sender: 'bot'
      }]);
      setIsTyping(false);
      setSuggestedQuestions([]);
    }
  };

  // ✅ ระบบ Like/Dislike
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
    setTimeout(() => {
      const inputElement = document.querySelector('input[type="text"]');
      if (inputElement) inputElement.focus();
    }, 100);
  };

  return (
    <>
      {/* Onboarding Tooltip */}
      <OnboardingTooltip isVisible={showOnboarding} onClose={handleOnboardingClose} />

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl z-50 flex items-center justify-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 animate-pulse"
          style={{ animation: 'pulse 2s infinite' }}
          aria-label="Open AI Assistant"
        >
          <BotIcon />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-4 sm:inset-6 md:inset-8 lg:inset-[10%] bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden z-50 border border-white/20 dark:border-gray-700/40 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <BotIcon />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <p className="text-xs text-indigo-100">ผู้ช่วยส่วนตัวของ ธนภัทร การะจักษ์</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs sm:max-w-sm p-4 rounded-2xl ${msg.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none shadow-lg'
                  : 'bg-white/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm backdrop-blur-sm'
                  }`}>
                  <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>

                  {msg.sender === 'bot' && (
                    <div className="flex items-center space-x-3 mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-600/50">
                      <button
                        onClick={() => handleReaction(i, 'like')}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${msg.reactions?.userLiked
                          ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                      >
                        <LikeIcon />
                        <span className="text-sm font-medium">{msg.reactions?.like || 0}</span>
                      </button>

                      <button
                        onClick={() => handleReaction(i, 'dislike')}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${msg.reactions?.userDisliked
                          ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                      >
                        <DislikeIcon />
                        <span className="text-sm font-medium">{msg.reactions?.dislike || 0}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/80 dark:bg-gray-700/80 p-4 rounded-2xl rounded-bl-none backdrop-blur-sm">
                  <div className="flex space-x-3">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {suggestedQuestions.length > 0 && !isTyping && (
              <div className="p-4 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-semibold">
                  {isGeneratingQuestions ? "กำลังสร้างคำถามแนะนำ..." : "ลองถามคำถามเหล่านี้:"}
                </p>
                {!isGeneratingQuestions && (
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestedQuestion(q)}
                        className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-sm rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-all duration-300 transform hover:scale-105 font-medium"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-1 border-t border-gray-200/20 dark:border-gray-700/40 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="flex space-x-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ถามผมอะไรก็ได้ครับ..."
                className="flex-1 px-2 py-3 sm:py-1 bg-white/70 dark:bg-gray-700/70 border border-gray-300/50 dark:border-gray-600/50 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm sm:text-base font-medium min-h-[48px]"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(99, 102, 241, 0); }
        }
      `}</style>
    </>
  );
};

export default AIChatbot;