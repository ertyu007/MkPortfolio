import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../hooks/useProjects';
import { aiChatResponse } from '../utils/ai';

const AIChatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false); // ✅ ตรวจสอบว่าทักทายแล้วหรือยัง
  const { projects } = useProjects();

  // ✅ ทักทายอัตโนมัติครั้งแรก — แล้วพับเก็บ
  useEffect(() => {
    if (!hasGreeted) {
      setIsOpen(true);
      setMessages([{
        text: "สวัสดี! 😊 ฉันคือผู้ช่วย AI ของ [ชื่อคุณ] — ถามอะไรก็ได้นะ!",
        sender: 'bot'
      }]);
      setHasGreeted(true);

      // ✅ พับเก็บอัตโนมัติหลัง 5 วินาที
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasGreeted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    const projectTitles = projects?.map(p => `"${p.title}"`).join(', ') || 'ยังไม่มีผลงาน';
    const context = `มีผลงานเหล่านี้: ${projectTitles}`;

    try {
      const response = await aiChatResponse(input, context);
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    } catch (err) {
      console.error("AI Chatbot Error:", err);
      setMessages(prev => [...prev, {
        text: `ขอบคุณที่ถามเกี่ยวกับ "${input}" — ฉันกำลังเรียนรู้เพิ่มเติมเพื่อตอบคุณให้ดีขึ้น!`,
        sender: 'bot'
      }]);
    }

    setInput('');
  };

  return (
    <>
      {/* ✅ Floating Button — อยู่มุมล่างซ้าย — ไม่บังปุ่มอื่น */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="open-btn"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-5 left-5 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
            aria-label="Open AI Assistant"
          >
            <span className="text-xl">🤖</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ✅ Chatbot Panel — อยู่มุมล่างซ้าย — มี Animation เปิด/ปิด */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot-panel"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-5 left-5 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 border border-white/20 dark:border-gray-700/40"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 font-bold flex justify-between items-center">
              <span>AI Assistant</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="h-64 p-3 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-2 p-2 rounded-lg max-w-xs whitespace-pre-wrap text-sm ${msg.sender === 'user'
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 ml-auto text-indigo-900 dark:text-indigo-100'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm'
                    }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="เช่น 'สวัสดี', 'มีผลงานอะไรบ้าง?'"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;