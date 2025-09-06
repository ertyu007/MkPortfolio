// src/components/AIChatbot.jsx
import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { aiChatResponse } from '../utils/ai'; // ✅ เปลี่ยนเป็น aiChatResponse

const AIChatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const { projects } = useProjects();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    // ดึงชื่อผลงาน
    const projectTitles = projects?.map(p => `"${p.title}"`).join(', ') || 'ยังไม่มีผลงาน';

    // ✅ สร้าง prompt ให้เหมาะสมกับ GPT-2
    const prompt = `
คุณคือผู้ช่วย AI ของนักพัฒนา "[ชื่อคุณ]"
ผลงาน: ${projectTitles}
คำถาม: "${input}"
คำตอบ:
`;

    try {
      const response = await aiChatResponse(prompt);
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    } catch (err) {
      console.error("AI Chatbot Error:", err);
      setMessages(prev => [...prev, {
        text: `ขอบคุณที่ถามเกี่ยวกับ "${input}" — ฉันกำลังเรียนรู้เพิ่มเติมเพื่อตอบคุณให้ดีที่สุด!`,
        sender: 'bot'
      }]);
    }

    setInput('');
  };

  return (
    <div className="fixed bottom-20 right-5 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
      <div className="bg-indigo-600 text-white p-3 font-bold">AI Assistant</div>
      <div className="h-64 p-3 overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-gray-500 text-sm mb-2">
            สวัสดี! 😊 ฉันคือผู้ช่วย AI ของ [ชื่อคุณ] — ถามอะไรก็ได้นะ!
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded-lg max-w-xs whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-indigo-100 dark:bg-indigo-900/30 ml-auto' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-3 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="เช่น 'สวัสดี', 'มีผลงานอะไรบ้าง?'"
          className="w-full px-3 py-1 border rounded focus:outline-none focus:ring"
        />
      </form>
    </div>
  );
};

export default AIChatbot;