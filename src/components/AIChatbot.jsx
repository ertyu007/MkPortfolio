import React, { useState, useEffect, useRef } from 'react';
import { useProjects } from '../hooks/useProjects';
import { aiChatResponse } from '../utils/ai';
import { initializeEmbeddings } from '../utils/embedding';
// import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

// SVG Icons
const BotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
    <path d="M12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8C14 6.9 13.1 6 12 6ZM12 18C14.71 18 17.1 16.63 18.4 14.5H5.6C6.9 16.63 9.29 18 12 18Z" fill="currentColor"/>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
  </svg>
);

const LikeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 9V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V9H7L12 14L17 9H14Z" fill="currentColor"/>
    <path d="M19 10V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V10H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DislikeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 15V19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19V15H17L12 10L7 15H10Z" fill="currentColor"/>
    <path d="M5 14V4C5 3.46957 5.21071 2.96086 5.58579 2.58579C5.96086 2.21071 6.46957 2 7 2H17C17.5304 2 18.0391 2.21071 18.4142 2.58579C18.7893 2.96086 19 3.46957 19 4V14H5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

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

  // ✅ Initialize Embeddings
  useEffect(() => {
    const initEmbeddings = async () => {
      const storedEmbeddings = localStorage.getItem('embeddings');
      if (!storedEmbeddings && projects.length > 0) {
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
  }, [projects]);

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
          text: "สวัสดีครับ! ผมคือผู้ช่วย AI ส่วนตัวของ ธนภัทร การะจักษ์",
          sender: 'bot',
          reactions: { like: 0, dislike: 0, userLiked: false, userDisliked: false }
        }]);
        setSuggestedQuestions([
          "มีผลงานอะไรน่าสนใจบ้าง?",
          "ทักษะหลักของคุณคืออะไร?",
          "แนะนำผลงานที่ใช้ AI หน่อย"
        ]);
      } else {
        setMessages([{
          text: "สวัสดีครับ! ผมพร้อมช่วยตอบคำถามแล้ว",
          sender: 'bot',
          reactions: { like: 0, dislike: 0, userLiked: false, userDisliked: false }
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
          reactions: { like: 0, dislike: 0, userLiked: false, userDisliked: false }
        }]);
        setIsTyping(false);
        generateSuggestedQuestions(input, response);
      }, 1000);
    } catch (err) {
      console.error("AI Error:", err);
      setMessages(prev => [...prev, {
        text: "ขอโทษครับ — ผมยังเรียนรู้อยู่ — ลองถามคำถามอื่นดูนะครับ!",
        sender: 'bot',
        reactions: { like: 0, dislike: 0, userLiked: false, userDisliked: false }
      }]);
      setIsTyping(false);
      setSuggestedQuestions([
        "เล่าเกี่ยวกับตัวคุณหน่อย?",
        "มีผลงานที่ภูมิใจที่สุดไหม?",
        "เรียนรู้ทักษะพวกนี้มาจากไหน?"
      ]);
    }
  };

  // ✅ ระบบ Like/Dislike — สมบูรณ์
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
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-110 group animate-bounce"
          style={{ animation: 'bounce 2s infinite' }}
          aria-label="Open AI Assistant"
        >
          <BotIcon />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden z-50 border border-white/20 dark:border-gray-700/40 flex flex-col h-[600px]">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <BotIcon />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <p className="text-xs text-blue-100">ผู้ช่วยส่วนตัวของ ธนภัทร การะจักษ์</p>
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

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-4 rounded-3xl ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none shadow-lg'
                    : 'bg-white/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm backdrop-blur-sm'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>

                  {msg.sender === 'bot' && (
                    <div className="flex items-center space-x-3 mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-600/50">
                      <button
                        onClick={() => handleReaction(i, 'like')}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-all duration-200 ${
                          msg.reactions?.userLiked
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        <LikeIcon />
                        <span className="text-xs font-medium">{msg.reactions?.like || 0}</span>
                      </button>

                      <button
                        onClick={() => handleReaction(i, 'dislike')}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-all duration-200 ${
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
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
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
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200/20 dark:border-gray-700/40 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ถามผมอะไรก็ได้ครับ..."
                className="flex-1 px-4 py-3 bg-white/70 dark:bg-gray-700/70 border border-gray-300/50 dark:border-gray-600/50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white backdrop-blur-sm"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <SendIcon />
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