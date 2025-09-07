// src/utils/ai.js

import axios from 'axios';

// ✅ ตั้งค่า DeepSeek API
const DEEPSEEK_API_KEY = process.env.REACT_APP_DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// ✅ ฟังก์ชันหลัก — ส่ง prompt ไปยัง DeepSeek
export const aiChatResponse = async (prompt, context = "") => {
  if (!DEEPSEEK_API_KEY) {
    console.warn("⚠️ ไม่มี REACT_APP_DEEPSEEK_API_KEY — ใช้ fallback");
    return fallbackResponse(prompt);
  }

  try {
    const fullPrompt = `
คุณเป็นผู้ช่วย AI ส่วนตัวของนักพัฒนา "[ชื่อคุณ]" ผู้เชี่ยวชาญด้าน React, AI และ Full Stack
${context}

ให้ตอบคำถามต่อไปนี้อย่างเป็นมิตร สั้นกระชับ ภายใน 1-2 ประโยค:

"${prompt}"
`;

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: fullPrompt }
        ],
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (err) {
    console.error("❌ DeepSeek Error:", err);
    return fallbackResponse(prompt);
  }
};

// ✅ fallback — ใช้เมื่อไม่มี API Key หรือ error
const fallbackResponse = (prompt) => {
  const lowerPrompt = prompt.toLowerCase();
  if (lowerPrompt.includes("สวัสดี")) return "สวัสดีครับ! 😊";
  if (lowerPrompt.includes("ผลงาน")) return "มีผลงานหลายชิ้น เช่น ระบบจัดการงานด้วย AI และแอปจองห้องประชุมครับ!";
  if (lowerPrompt.includes("ทักษะ")) return "มีทักษะหลากหลาย เช่น React, Node.js, Python ครับ!";
  if (lowerPrompt.includes("แนะนำ")) return "ลองดูผลงาน 'ระบบจัดการงานด้วย AI' — น่าสนใจมาก!";
  return "ขอบคุณที่ถามครับ — ฉันกำลังเรียนรู้เพิ่มเติมเพื่อตอบคุณให้ดีขึ้น!";
};

// ✅ สรุปบทความ
export const aiSummarize = async (text) => {
  if (!text) return "ไม่มีเนื้อหาให้สรุป";
  return await aiChatResponse(`สรุปบทความต่อไปนี้เป็นภาษาไทย ไม่เกิน 3 บรรทัด:\n\n${text}`);
};

// ✅ แนะนำทักษะ
export const aiRecommendation = async (skills) => {
  const skillText = skills.map(s => `${s.name}`).join(', ');
  return await aiChatResponse(`จากทักษะ: ${skillText} — ควรเรียนรู้อะไรต่อไป? ตอบเป็นภาษาไทย ไม่เกิน 1 ประโยค`);
};

// ✅ ค้นหาผลงาน
export const aiSearch = async (query, projects) => {
  if (!query || !projects?.length) return projects || [];

  // ใช้ fallback — keyword matching
  return projects.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description?.toLowerCase().includes(query.toLowerCase()) ||
    p.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};