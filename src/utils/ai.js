// src/utils/ai.js
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

// ✅ ฟังก์ชันหลัก — ส่ง prompt ไปยัง Groq
export const aiChatResponse = async (prompt, context = "") => {
  if (!GROQ_API_KEY) {
    console.warn("⚠️ ไม่มี REACT_APP_GROQ_API_KEY — ใช้ fallback");
    return fallbackResponse(prompt);
  }

  try {
const fullPrompt = `
คุณคือ "AI Assistant" ผู้ช่วยส่วนตัวของ thanaphat 
- เชี่ยวชาญด้าน React, AI และ Full Stack  
- ตอบสั้น กระชับ ภายใน 1–2 ประโยค  
- โทนเสียง: เป็นมิตร ฉลาด ทันสมัย และเข้าใจง่าย  
- เน้นให้คำตอบที่ตรงประเด็น พร้อมแนวทางปฏิบัติที่ใช้ได้จริง  
- หลีกเลี่ยงการตอบยืดยาวหรือออกนอกประเด็น  

Context:
${context}

คำถาม:
"${prompt}"
`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: fullPrompt }
        ],
        max_tokens: 300,
        temperature: 0.7,
        top_p: 1,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Groq Error:", error);
      throw new Error(`Groq Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (err) {
    console.error("❌ AI Error:", err);
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
  return await aiChatResponse(`สรุปบทความนี้เป็นภาษาไทย ไม่เกิน 3 บรรทัด:\n\n${text}`);
};

// ✅ แนะนำทักษะ
export const aiRecommendation = async (skills) => {
  const skillText = skills.map(s => s.name).join(', ');
  return await aiChatResponse(`จากทักษะ: ${skillText} — ควรเรียนรู้อะไรต่อไป? ตอบเป็นภาษาไทย ไม่เกิน 1 ประโยค`);
};

// ✅ ค้นหาผลงาน — ใช้ keyword matching
export const aiSearch = async (query, projects) => {
  if (!query || !projects?.length) return projects || [];
  return projects.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description?.toLowerCase().includes(query.toLowerCase()) ||
    p.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};