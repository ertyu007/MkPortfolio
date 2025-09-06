// src/utils/ai.js

export const callHuggingFace = async (model, inputs, options = {}) => {
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs, ...options }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error("Hugging Face Error:", error);
    throw new Error(`Hugging Face Error: ${error.error || response.statusText}`);
  }

  return await response.json();
};

// ✅ ใช้โมเดลที่ไม่ต้อง Token — สำหรับสรุปบทความ
export const aiSummarize = async (text) => {
  if (!text) return "ไม่มีเนื้อหาให้สรุป";

  try {
    // ✅ ใช้โมเดลที่ไม่ต้อง Token — สำหรับภาษาอังกฤษ
    const result = await callHuggingFace(
      "sshleifer/distilbart-cnn-12-6",
      text.slice(0, 1024),
      { parameters: { max_length: 50 } }
    );

    if (Array.isArray(result) && result[0]?.summary_text) {
      return result[0].summary_text;
    }

    return "บทความนี้มีเนื้อหาที่น่าสนใจ — แนะนำให้อ่านเต็ม ๆ ครับ!";
  } catch (err) {
    console.error("Summarize Error:", err);
    // ✅ fallback — ไม่ใช้ AI
    return text.split('。')[0] + "。" || text.slice(0, 100) + "...";
  }
};

// ✅ ใช้ fallback แบบง่าย — สำหรับ Chatbot และ Recommendation
export const aiChatResponse = async (prompt) => {
  // ✅ ไม่ใช้ Hugging Face — ใช้ rule-based แทน
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes("สวัสดี") || lowerPrompt.includes("hi") || lowerPrompt.includes("hello")) {
    return "สวัสดีครับ! 😊 ฉันคือผู้ช่วย AI — มีอะไรให้ช่วยไหม?";
  }

  if (lowerPrompt.includes("ทำอะไรได้บ้าง") || lowerPrompt.includes("ความสามารถ")) {
    return "ฉันช่วยตอบคำถามเกี่ยวกับผลงาน เทคโนโลยี และให้คำแนะนำเบื้องต้นครับ!";
  }

  if (lowerPrompt.includes("react") || lowerPrompt.includes("เรียน")) {
    return "แนะนำเริ่มจาก React Docs + ทำโปรเจกต์เล็ก ๆ อย่าง Todo List ครับ!";
  }

  if (lowerPrompt.includes("ผลงาน") || lowerPrompt.includes("project")) {
    return "มีผลงานหลายชิ้น เช่น ระบบจัดการงานด้วย AI และแอปจองห้องประชุมครับ!";
  }

  return "ขอบคุณที่ถามครับ — ฉันกำลังเรียนรู้เพิ่มเติมเพื่อตอบคุณให้ดีขึ้น!";
};

// ✅ ใช้ fallback — สำหรับแนะนำทักษะ
export const aiRecommendation = async (skills) => {
  if (!skills?.length) return "ลองเรียนรู้ TypeScript, Next.js หรือ Docker เพื่อพัฒนาทักษะขั้นสูง!";

  const hasReact = skills.some(s => s.name.toLowerCase().includes("react"));
  const hasNode = skills.some(s => s.name.toLowerCase().includes("node"));

  if (hasReact && hasNode) {
    return "แนะนำให้เรียนรู้ Next.js หรือ NestJS เพื่อพัฒนา Full Stack ขั้นสูง!";
  }

  if (hasReact) {
    return "ลองเรียนรู้ Zustand หรือ React Query เพื่อจัดการ state ให้มีประสิทธิภาพ!";
  }

  return "ลองเรียนรู้ JavaScript ES6+ และ React เพื่อเริ่มต้นเป็นนักพัฒนาเว็บ!";
};

// ✅ ใช้ keyword matching — สำหรับค้นหาผลงาน
export const aiSearch = async (query, projects) => {
  if (!query || !projects?.length) return projects || [];

  return projects.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description?.toLowerCase().includes(query.toLowerCase()) ||
    p.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};