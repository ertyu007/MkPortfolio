// src/utils/ai.js
let genAI, model;

// ✅ ตั้งค่า Gemini ถ้ามี API Key
if (process.env.REACT_APP_GEMINI_API_KEY) {
  try {
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("✅ Gemini API พร้อมใช้งาน");
  } catch (err) {
    console.error("❌ โหลด @google/generative-ai ไม่ได้:", err);
  }
} else {
  console.warn("⚠️ ไม่มี REACT_APP_GEMINI_API_KEY — ใช้โหมด fallback");
}

// ✅ ฟังก์ชันหลัก — ใช้ Gemini ถ้ามี — ไม่งั้นใช้ fallback
export const aiChatResponse = async (prompt, context = "") => {
  if (model) {
    try {
      const fullPrompt = `
คุณเป็นผู้ช่วย AI ส่วนตัวของนักพัฒนา "[ชื่อคุณ]" ผู้เชี่ยวชาญด้าน React, AI และ Full Stack
${context}

ให้ตอบคำถามต่อไปนี้อย่างเป็นมิตร สั้นกระชับ ภายใน 1-2 ประโยค:

"${prompt}"
`;

      const result = await model.generateContent(fullPrompt);
      const response = result.response;
      return response.text().trim();
    } catch (err) {
      console.error("❌ Gemini Error:", err);
      return enhancedFallback(prompt);
    }
  } else {
    return enhancedFallback(prompt);
  }
};

// ✅ fallback ที่ฉลาดขึ้น — ตอบตามคำถามจริง
const enhancedFallback = (prompt) => {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes("สวัสดี") || lowerPrompt.includes("hi") || lowerPrompt.includes("hello")) {
    return "สวัสดีครับ! 😊 ผมคือผู้ช่วย AI ของ [ชื่อคุณ] — มีอะไรให้ช่วยไหม?";
  }

  if (lowerPrompt.includes("น่าสนใจ") || lowerPrompt.includes("interesting") || lowerPrompt.includes("แนะนำ")) {
    return "ลองดูผลงาน 'ระบบจัดการงานด้วย AI' — ใช้ React + OpenAI API ช่วยวิเคราะห์งานอัตโนมัติ น่าสนใจมาก!";
  }

  if (lowerPrompt.includes("ผลงาน") || lowerPrompt.includes("project")) {
    return "มีผลงานหลายชิ้น เช่น 'ระบบจัดการงานด้วย AI' และ 'แอปจองห้องประชุม' — กดดูในส่วน Portfolio ได้เลย!";
  }

  if (lowerPrompt.includes("ทักษะ") || lowerPrompt.includes("skill")) {
    return "มีทักษะหลากหลาย เช่น React, Node.js, Python — ดูรายละเอียดในส่วน Skills ได้เลย!";
  }

  if (lowerPrompt.includes("react") || lowerPrompt.includes("เรียน")) {
    return "แนะนำเริ่มจาก React Docs + ทำโปรเจกต์เล็ก ๆ อย่าง Todo List — ฝึกบ่อย ๆ จะเก่งเอง!";
  }

  return "ขอบคุณที่ถามครับ — ผมกำลังเรียนรู้เพิ่มเติมเพื่อตอบคุณให้ดีขึ้น!";
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