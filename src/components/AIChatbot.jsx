import React, { useState, useEffect, useRef } from 'react';
// import { useProjects } from '../hooks/useProjects';
import { aiChatResponse } from '../utils/ai';

// SVG Icons
const BotIcon = () => (
  <svg width="30" height="30" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" strokeDasharray="4 4" >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 32 32"
        to="360 32 32"
        dur="3s"
        repeatCount="indefinite"
      />
    </circle>
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fontWeight="bold" fill="currentColor">AI</text>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LikeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 9V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V9H7L12 14L17 9H14Z" fill="currentColor" />
    <path d="M19 10V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V10H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DislikeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 15V19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19V15H17L12 10L7 15H10Z" fill="currentColor" />
    <path d="M5 14V4C5 3.46957 5.21071 2.96086 5.58579 2.58579C5.96086 2.21071 6.46957 2 7 2H17C17.5304 2 18.0391 2.21071 18.4142 2.58579C18.7893 2.96086 19 3.46957 19 4V14H5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const AIChatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const messagesEndRef = useRef(null);
  // const { projects } = useProjects();

  // ✅ Auto-scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  // ✅ ระบบพิมทีละตัว
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setSuggestedQuestions([]);

    try {
      const response = await aiChatResponse(input);
      setMessages(prev => [...prev, { text: '', sender: 'bot' }]);
      typeMessage(response, () => {
        setIsTyping(false);
        generateSuggestedQuestions(input, response);
      });
    } catch (err) {
      console.error("AI Error:", err);
      setMessages(prev => [...prev, {
        text: "ขอโทษครับ — ผมยังเรียนรู้อยู่ — ลองถามคำถามอื่นดูนะครับ!",
        sender: 'bot'
      }]);
      setIsTyping(false);
      setSuggestedQuestions([
        "เล่าเกี่ยวกับตัวคุณหน่อย?",
        "มีผลงานที่ภูมิใจที่สุดไหม?",
        "เรียนรู้ทักษะพวกนี้มาจากไหน?"
      ]);
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

  // ✅ สร้างคำถามแนะนำ
  const generateSuggestedQuestions = (userInput, botResponse) => {
    const questions = [];
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('ผลงาน') || botResponse.includes('ผลงาน')) {
      questions.push("ผลงานนี้ใช้เทคโนโลยีอะไรบ้าง?", "มีปัญหาอะไรที่เจอระหว่างพัฒนา?", "ผลลัพธ์ที่ได้คืออะไร?");
    }

    if (lowerInput.includes('ทักษะ') || botResponse.includes('ทักษะ')) {
      questions.push("เรียนรู้ทักษะนี้มาจากไหน?", "ใช้ทักษะนี้ในโปรเจกต์ไหนบ้าง?", "มีแผนจะเรียนรู้ทักษะอะไรต่อ?");
    }

    if (lowerInput.includes('react') || botResponse.includes('react')) {
      questions.push("ใช้ React Hooks อะไรบ่อยที่สุด?", "เจอปัญหาอะไรกับ React บ้าง?", "ชอบใช้ library อะไรกับ React?");
    }

    if (questions.length === 0) {
      questions.push(
        "มีผลงานที่ใช้ AI ไหม?",
        "ทักษะที่อยากเรียนรู้ต่อคืออะไร?",
        "มีแผนจะพัฒนาอะไรต่อ?"
      );
    }

    setSuggestedQuestions(questions.slice(0, 3));
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
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-110"
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
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
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
                <div className={`max-w-xs sm:max-w-sm p-3 sm:p-4 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none shadow-lg'
                    : 'bg-white/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm backdrop-blur-sm'
                }`}>
                  <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>

                  {msg.sender === 'bot' && (
                    <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-gray-200/50 dark:border-gray-600/50">
                      <button
                        onClick={() => handleReaction(i, 'like')}
                        className={`flex items-center space-x-1 px-2 py-1 rounded-full transition-all duration-200 ${
                          msg.reactions?.userLiked
                            ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        <LikeIcon />
                        <span className="text-xs font-medium">{msg.reactions?.like || 0}</span>
                      </button>

                      <button
                        onClick={() => handleReaction(i, 'dislike')}
                        className={`flex items-center space-x-1 px-2 py-1 rounded-full transition-all duration-200 ${
                          msg.reactions?.userDisliked
                            ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        <DislikeIcon />
                        <span className="text-xs font-medium">{msg.reactions?.dislike || 0}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/80 dark:bg-gray-700/80 p-3 sm:p-4 rounded-2xl rounded-bl-none backdrop-blur-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {suggestedQuestions.length > 0 && !isTyping && (
              <div className="p-3 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">ลองถามต่อ:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestedQuestion(q)}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-2 border-t border-gray-200/20 dark:border-gray-700/40 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="flex space-x-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ถามผมอะไรก็ได้ครับ..."
                className="flex-1 px-4 py-3 bg-white/70 dark:bg-gray-700/70 border border-gray-300/50 dark:border-gray-600/50 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatbot;