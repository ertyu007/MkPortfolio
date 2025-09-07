import React, { useState, useEffect, useRef } from 'react';
import { useProjects } from '../hooks/useProjects';
import { aiChatResponse } from '../utils/ai';
import { initializeEmbeddings } from '../utils/embedding';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const AIChatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const messagesEndRef = useRef(null);
  const { projects } = useProjects();

  // ✅ Auto-scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ ใช้ projects ใน useEffect — เพื่อสร้าง embeddings
  useEffect(() => {
    const initEmbeddings = async () => {
      const storedEmbeddings = localStorage.getItem('embeddings');
      if (!storedEmbeddings && projects.length > 0) { // ✅ ใช้ projects ตรงนี้
        const skills = [
          { name: "JavaScript", level: 90 },
          { name: "React", level: 85 },
          { name: "Node.js", level: 75 },
          { name: "Python", level: 80 },
          { name: "PostgreSQL", level: 70 },
          { name: "Tailwind CSS", level: 85 },
          { name: "AI/ML", level: 60 },
        ];
        await initializeEmbeddings(projects, skills, []);
      }
    };
    initEmbeddings();
  }, [projects]); // ✅ dependencies ถูกต้อง

  // ✅ Initialize AI
  useEffect(() => {
    const initAI = async () => {
      const storedEmbeddings = localStorage.getItem('embeddings');
      if (!storedEmbeddings) {
        setMessages([{
          text: "🧠 กำลังโหลดโมเดล AI... โปรดรอสักครู่",
          sender: 'bot',
          type: 'system'
        }]);
        await initializeEmbeddings();
        setMessages([{
          text: "สวัสดีครับ! 😊 ผมคือผู้ช่วย AI ส่วนตัวของ [ชื่อคุณ]",
          sender: 'bot',
          reactions: { like: 0, dislike: 0, userLiked: false, userDisliked: false } // ✅ เพิ่ม reactions
        }]);
        setSuggestedQuestions([
          "มีผลงานอะไรน่าสนใจบ้าง?",
          "ทักษะหลักของคุณคืออะไร?",
          "แนะนำผลงานที่ใช้ AI หน่อย"
        ]);
      } else {
        setMessages([{
          text: "สวัสดีครับ! 😊 ผมพร้อมช่วยตอบคำถามแล้ว",
          sender: 'bot',
          reactions: { like: 0, dislike: 0, userLiked: false, userDisliked: false } // ✅ เพิ่ม reactions
        }]);
        setSuggestedQuestions([
          "ผลงานล่าสุดคืออะไร?",
          "ใช้เทคโนโลยีอะไรในโปรเจกต์?",
          "มีบทความแนะนำไหม?"
        ]);
      }
    };
    initAI();
  }, []);

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
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: response,
          sender: 'bot',
          reactions: { like: 0, dislike: 0, userLiked: false, userDisliked: false } // ✅ เพิ่ม reactions
        }]);
        setIsTyping(false);

        // ✅ สร้างคำถามแนะนำตาม context
        generateSuggestedQuestions(input, response);
      }, 1000);
    } catch (err) {
      console.error("AI Error:", err);
      setMessages(prev => [...prev, {
        text: "ขอโทษครับ — ผมยังเรียนรู้อยู่ — ลองถามคำถามอื่นดูนะครับ!",
        sender: 'bot',
        reactions: { like: 0, dislike: 0, userLiked: false, userDisliked: false } // ✅ เพิ่ม reactions
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
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 group animate-bounce"
          style={{ animation: 'bounce 2s infinite' }}
          aria-label="Open AI Assistant"
        >
          <span className="text-2xl">💬</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden z-50 border border-white/20 dark:border-gray-700/40 flex flex-col h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <p className="text-xs text-indigo-100">ผู้ช่วยส่วนตัวของ [ชื่อคุณ]</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-4 rounded-3xl ${msg.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none shadow-lg'
                  : 'bg-white/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm backdrop-blur-sm'
                  }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>

                  {msg.sender === 'bot' && (
                    <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-600/50">
                      {/* Like Button */}
                      <button
                        onClick={() => handleReaction(i, 'like')}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-all duration-200 ${msg.reactions?.userLiked
                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                      >
                        <FaThumbsUp className="text-xs" />
                        <span className="text-xs font-medium">{msg.reactions?.like || 0}</span>
                      </button>

                      {/* Dislike Button */}
                      <button
                        onClick={() => handleReaction(i, 'dislike')}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-all duration-200 ${msg.reactions?.userDisliked
                          ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                      >
                        <FaThumbsDown className="text-xs" />
                        <span className="text-xs font-medium">{msg.reactions?.dislike || 0}</span>
                      </button>
                    </div>
                  )}

                  {msg.sender === 'bot' && msg.type !== 'system' && (
                    <div className="flex items-center space-x-1 mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">ตอบเมื่อวันนี้</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/80 dark:bg-gray-700/80 p-4 rounded-3xl rounded-bl-none backdrop-blur-sm">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
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
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200/20 dark:border-gray-700/40 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ถามผมอะไรก็ได้ครับ..."
                className="flex-1 px-4 py-3 bg-white/70 dark:bg-gray-700/70 border border-gray-300/50 dark:border-gray-600/50 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white backdrop-blur-sm"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              AI นี้ทำงานในเบราว์เซอร์ของคุณ — ไม่ส่งข้อมูลออก — ปลอดภัย 100%
            </p>
          </form>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
};

export default AIChatbot;