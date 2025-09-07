// src/utils/ai.js

import { retrieveContext } from './embedding';

export const aiChatResponse = async (prompt, projects = []) => {
  try {
    // ✅ ดึง context จาก embedding
    const contextDocs = await retrieveContext(prompt, 3);

    if (contextDocs.length > 0) {
      const contextText = contextDocs.map(doc => {
        if (doc.type === 'project') {
          return `ผลงาน: ${doc.data.title} — ${doc.data.description}`;
        } else if (doc.type === 'skill') {
          return `ทักษะ: ${doc.data.name}`;
        }
        return doc.content;
      }).join('\n');

      // ✅ ตอบตาม context
      if (prompt.toLowerCase().includes("แนะนำ")) {
        return `จากผลงานที่เกี่ยวข้อง: ${contextText.split('\n')[0]} — ลองดูรายละเอียดเพิ่มเติมในส่วน Portfolio ครับ!`;
      }
      if (prompt.toLowerCase().includes("ทักษะ")) {
        return `จากทักษะที่เกี่ยวข้อง: ${contextText} — แนะนำให้เรียนรู้เพิ่มเติมครับ!`;
      }
      if (prompt.toLowerCase().includes("ผลงาน") || prompt.toLowerCase().includes("มีอะไรบ้าง")) {
        const projectList = projects.map(p => p.title).join(', ');
        return `มีผลงานเหล่านี้ครับ: ${projectList} — ดูรายละเอียดเพิ่มเติมในส่วน Portfolio ได้เลย!`;
      }
    }

    // ✅ fallback — ครอบคลุมมากขึ้น
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes("สวัสดี") || lowerPrompt.includes("hi") || lowerPrompt.includes("hello")) {
      return "สวัสดีครับ! 😊 ผมคือผู้ช่วย AI ของ [ชื่อคุณ] — มีอะไรให้ช่วยไหม?";
    }
    if (lowerPrompt.includes("ผลงาน") || lowerPrompt.includes("project")) {
      const projectList = projects.map(p => p.title).join(', ');
      return `มีผลงานเหล่านี้ครับ: ${projectList} — ดูรายละเอียดเพิ่มเติมในส่วน Portfolio ได้เลย!`;
    }
    if (lowerPrompt.includes("ทักษะ") || lowerPrompt.includes("skill")) {
      return "มีทักษะหลากหลาย เช่น JavaScript, React, Node.js, Python — ดูรายละเอียดในส่วน Skills ได้เลย!";
    }
    if (lowerPrompt.includes("แนะนำ") || lowerPrompt.includes("suggest")) {
      return "แนะนำให้ลองดูผลงาน 'ระบบจัดการงานด้วย AI' — ใช้เทคโนโลยีล่าสุด น่าสนใจมาก!";
    }
    if (lowerPrompt.includes("มีอะไรบ้าง") || lowerPrompt.includes("what do you have")) {
      return "มีทั้งผลงาน, ทักษะ, บทความ, และประกาศนียบัตร — เลือกดูจากเมนูด้านบนได้เลยครับ!";
    }

    return "ขอบคุณที่ถามครับ — ผมสามารถช่วยคุณค้นหาผลงาน, แนะนำทักษะ, หรืออธิบายรายละเอียดต่าง ๆ ได้นะ!";
  } catch (err) {
    console.error("❌ AI Error:", err);
    return "ขอโทษครับ — ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง";
  }
};

export const aiSummarize = async (text) => {
  if (!text) return "ไม่มีเนื้อหาให้สรุป";
  const firstSentence = text.split(/[.!?]/)[0];
  return firstSentence ? firstSentence + "。" : text.slice(0, 100) + "...";
};

export const aiRecommendation = async (skills) => {
  const hasReact = skills.some(s => s.name.toLowerCase().includes("react"));
  if (hasReact) {
    return "ลองเรียนรู้ Zustand หรือ React Query เพื่อจัดการ state ให้มีประสิทธิภาพ!";
  }
  return "ลองเรียนรู้ JavaScript ES6+ และ React เพื่อเริ่มต้นเป็นนักพัฒนาเว็บ!";
};

export const aiSearch = async (query, projects) => {
  if (!query || !projects?.length) return projects || [];
  return projects.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description?.toLowerCase().includes(query.toLowerCase()) ||
    p.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};