// src/utils/ai.js
// ✅ ใช้โมเดลที่ไม่ต้อง Token — รองรับภาษาไทย — ตอบเป็นธรรมชาติ

export const callHuggingFace = async (model, inputs, options = {}) => {
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HF_API_KEY}` // ✅ ต้องใส่ token
      },
      body: JSON.stringify({ inputs, ...options }),

    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error("❌ Hugging Face Error:", error);
    throw new Error(`Hugging Face Error: ${error.error || response.statusText}`);
  }

  return await response.json();
};

// ✅ ปรับปรุงคำตอบ — ใช้ mT5 — รองรับภาษาไทยดี
export const aiChatResponse = async (prompt, context = "") => {
  try {
    const fullPrompt = `
คุณเป็นผู้ช่วย AI ส่วนตัวของนักพัฒนา "[ชื่อคุณ]" ผู้เชี่ยวชาญด้าน React, AI และ Full Stack
${context}

"${prompt}"

โปรดตอบเป็นภาษาไทย สั้นกระชับ ภายใน 1-2 ประโยค — เป็นมิตร — เป็นธรรมชาติ
`;

    const result = await callHuggingFace(
      "csebuetnlp/mT5_multilingual_XLSum",
      fullPrompt,
      { parameters: { max_new_tokens: 100, temperature: 0.7 } }
    );

    if (Array.isArray(result) && result[0]?.generated_text) {
      let answer = result[0].generated_text.trim();
      // ตัดประโยคแรก — ให้กระชับ
      answer = answer.split(/[.!?]/)[0] + "!";
      return answer.length > 200 ? answer.slice(0, 200) + "..." : answer;
    }

    return fallbackResponse(prompt);
  } catch (err) {
    console.error("❌ Chat Error:", err);
    return fallbackResponse(prompt);
  }
};

// ✅ fallback — ตอบแบบ rule-based — ถ้า API error
const fallbackResponse = (prompt) => {
  const lowerPrompt = prompt.toLowerCase();
  if (lowerPrompt.includes("สวัสดี") || lowerPrompt.includes("hi")) {
    return "สวัสดีครับ! 😊 ผมคือผู้ช่วย AI ของ [ชื่อคุณ] — มีอะไรให้ช่วยไหม?";
  }
  if (lowerPrompt.includes("ผลงาน") || lowerPrompt.includes("project")) {
    return "มีผลงานเด่น ๆ เช่น 'ระบบจัดการงานด้วย AI' และ 'แอปจองห้องประชุม' — กดดูในส่วน Portfolio ได้เลยครับ!";
  }
  if (lowerPrompt.includes("ทักษะ") || lowerPrompt.includes("skill")) {
    return "มีทักษะหลากหลายครับ — ทั้ง React, Node.js, Python และ AI/ML — ดูรายละเอียดในส่วน Skills ได้นะครับ!";
  }
  if (lowerPrompt.includes("react") || lowerPrompt.includes("เรียน")) {
    return "แนะนำเริ่มจาก React Docs + ทำโปรเจกต์เล็ก ๆ อย่าง Todo List — ฝึกบ่อย ๆ จะเก่งเองครับ!";
  }
  if (lowerPrompt.includes("แนะนำ") || lowerPrompt.includes("suggest")) {
    return "ลองดูผลงาน 'ระบบจัดการงานด้วย AI' — ใช้เทคโนโลยีล่าสุด — น่าสนใจมากครับ!";
  }
  return "ขอบคุณที่ถามครับ — ผมกำลังเรียนรู้เพิ่มเติมเพื่อตอบคุณให้ดีขึ้น!";
};

// ✅ สรุปบทความ — ใช้ bart
export const aiSummarize = async (text) => {
  if (!text) return "ไม่มีเนื้อหาให้สรุป";

  try {
    const result = await callHuggingFace(
      "facebook/bart-large-cnn",
      text.slice(0, 1024),
      { parameters: { max_length: 50 } }
    );

    if (Array.isArray(result) && result[0]?.summary_text) {
      return result[0].summary_text;
    }

    // fallback — ตัดประโยคแรก
    return text.split(/[.!?]/)[0] + "。";
  } catch (err) {
    console.error("❌ Summarize Error:", err);
    return text.slice(0, 100) + "...";
  }
};

// ✅ แนะนำทักษะ — ใช้ context + mT5
export const aiRecommendation = async (skills) => {
  if (!skills?.length) return "ลองเรียนรู้ TypeScript, Next.js หรือ Docker เพื่อพัฒนาทักษะขั้นสูง!";

  const skillText = skills.map(s => `${s.name} (${s.level}%)`).join(', ');
  const prompt = `
จากทักษะเหล่านี้: ${skillText}

ควรเรียนรู้ทักษะอะไรต่อไปเพื่อเติบโตในสายงาน Full Stack + AI?

ตอบเป็นภาษาไทย — สั้น — ภายใน 1 ประโยค
`;

  try {
    const result = await aiChatResponse(prompt);
    return result;
  } catch (err) {
    console.error("❌ Recommendation Error:", err);
    const hasReact = skills.some(s => s.name.toLowerCase().includes("react"));
    if (hasReact) {
      return "ลองเรียนรู้ Zustand หรือ React Query เพื่อจัดการ state ให้มีประสิทธิภาพ!";
    }
    return "ลองเรียนรู้ JavaScript ES6+ และ React เพื่อเริ่มต้นเป็นนักพัฒนาเว็บ!";
  }
};

// ✅ ค้นหาผลงาน — ใช้ semantic search แบบง่าย
export const aiSearch = async (query, projects) => {
  if (!query || !projects?.length) return projects || [];

  // ใช้ keyword matching — ง่ายแต่ได้ผล
  return projects.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description?.toLowerCase().includes(query.toLowerCase()) ||
    p.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};