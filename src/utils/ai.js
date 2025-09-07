// src/utils/ai.js
import { portfolioContext } from '../data/context';
import { hybridSearch } from './hybridSearch';

export const aiChatResponse = async (prompt) => {
  try {
    console.log(`💬 ได้รับคำถาม: ${prompt}`);
    
    // ✅ ใช้ Hybrid Search — แทนที่ retrieveContext เดิม
    const contextDocs = await hybridSearch(prompt, portfolioContext, 3);
    const lowerPrompt = prompt.toLowerCase();

    // ✅ ตอบคำถามทั่วไป
    if (isGeneralQuestion(lowerPrompt)) {
      return await handleGeneralQuestion(prompt, lowerPrompt);
    }

    // ✅ ตอบตาม context
    if (contextDocs.length > 0) {
      return await handleContextResponse(prompt, contextDocs, lowerPrompt);
    }

    // ✅ ตอบ fallback
    return await handleFallbackResponse(prompt);
  } catch (err) {
    console.error("❌ AI Error:", err);
    return getDynamicErrorResponse(prompt);
  }
};

// ✅ ตรวจสอบคำถามทั่วไป
const isGeneralQuestion = (prompt) => {
  const generalKeywords = [
    'สวัสดี', 'hi', 'hello', 'hey', 'หวัดดี', 'how are you',
    'ทำอะไรได้บ้าง', 'ความสามารถ', 'ทำอะไร', 'what can you do',
    'แนะนำตัว', 'เกี่ยวกับคุณ', 'คุณคือใคร', 'who are you',
    'ติดต่อ', 'contact', 'email', 'โทร', 'phone',
    'ขอบคุณ', 'thank', 'ขอบใจ', 'thanks', 'appreciate',
    'ลาก่อน', 'bye', 'goodbye', 'บ๊ายบาย', 'see you',
    'ช่วย', 'help', 'support', 'assist'
  ];
  return generalKeywords.some(keyword => prompt.includes(keyword));
};

// ✅ ตอบคำถามทั่วไป — หลากหลายรูปแบบ
const handleGeneralQuestion = async (originalPrompt, lowerPrompt) => {
  const responses = {
    greeting: [
      `สวัสดีครับ! 😊 ผมคือผู้ช่วย AI ของ [ชื่อคุณ] — วันนี้มีอะไรให้ช่วยไหมครับ?`,
      `สวัสดี! 🤖 ยินดีที่ได้รู้จัก — ผมพร้อมช่วยตอบคำถามเกี่ยวกับผลงานและทักษะของ [ชื่อคุณ]`,
      `สวัสดีครับ! 👋 ดูเหมือนคุณกำลังสนใจ portfolio ของ [ชื่อคุณ] — ถามมาได้เลยครับ!`,
      `สวัสดี! 😄 วันนี้อากาศดี — เหมาะกับการพูดคุยเกี่ยวกับเทคโนโลยี — อยากให้ผมช่วยเรื่องอะไรดีครับ?`
    ],
    capabilities: [
      `ผมสามารถช่วยอธิบายรายละเอียดของทุกโปรเจกต์ — ตั้งแต่เทคโนโลยีที่ใช้ ปัญหาที่เจอ ไปจนถึงผลลัพธ์ที่ได้ครับ!`,
      `ไม่ว่าจะเป็นคำถามเกี่ยวกับโค้ด เทคโนโลยี หรือ even แนวคิดเบื้องหลังการออกแบบ — ผมตอบได้หมดครับ!`,
      `อยากรู้ว่าใช้ React ยังไงในโปรเจกต์? หรือทำไมถึงเลือก Node.js? — ถามมาได้เลยครับ — ผมมีคำตอบ!`,
      `ผมไม่ใช่แค่ bot ธรรมดา — ผมเข้าใจ context ของ portfolio นี้อย่างลึกซึ้ง — ถามอะไรก็ตอบได้ครับ!`
    ],
    about: [
      `ผมคือ AI ที่ถูกฝึกมาเฉพาะสำหรับ portfolio นี้ — ใช้เทคโนโลยี Transformers.js ทำงานในเบราว์เซอร์ของคุณ — ปลอดภัย 100%!`,
      `เป็นผู้ช่วยส่วนตัวที่เข้าใจ [ชื่อคุณ] ดีที่สุด — เพราะผมถูกสร้างจากข้อมูลจริงของผลงานและทักษะทั้งหมดครับ!`,
      `ไม่ใช่แค่ chatbot — แต่เป็นผู้ช่วยที่เข้าใจบริบท — ตอบคำถามได้เจาะจง — และเรียนรู้เพิ่มเติมทุกวันครับ!`,
      `ผมใช้ระบบ embedding และ retrieval — วิเคราะห์คำถามแล้วตอบแบบเฉพาะเจาะจง — ไม่ใช่แค่ template ครับ!`
    ],
    contact: [
      `สนใจติดต่องาน? — ส่งข้อความผ่าน Contact Form ได้เลยครับ — ผมจะส่งต่อให้ [ชื่อคุณ] ทันที!`,
      `ดูช่องทางการติดต่อทั้งหมดในส่วน Contact — มีทั้ง Email, LinkedIn, GitHub — เลือกช่องทางที่คุณสะดวกที่สุดครับ!`,
      `อยากพูดคุยเรื่อง collaboration? — ส่ง email มาที่ [อีเมล] — [ชื่อคุณ] จะตอบกลับภายใน 24 ชม. ครับ!`,
      `ติดต่อ [ชื่อคุณ] ได้หลายช่องทาง — แต่ถ้าอยากได้คำตอบเร็วที่สุด — ใช้ Contact Form ในเว็บนี้เลยครับ!`
    ],
    thanks: [
      `ยินดีครับ! 😊 — ขอบคุณที่แวะมาเยี่ยมชม — หวังว่าคุณจะได้ไอเดียดีๆ ไปใช้นะครับ!`,
      `ไม่เป็นไรเลยครับ! 🙏 — ดีใจที่ได้ช่วย — ถ้ามีอะไรสงสัยอีก — ผมอยู่ตรงนี้เสมอครับ!`,
      `ขอบคุณที่ให้โอกาสผมช่วยตอบคำถามครับ! — ถ้ามีโปรเจกต์น่าสนใจ — อย่าลืมติดต่อ [ชื่อคุณ] นะครับ!`,
      `ขอบคุณครับ! 🤗 — คุณทำให้วันนี้ของผมมีความหมาย — ไว้เจอกันใหม่นะครับ!`
    ],
    goodbye: [
      `ลาก่อนครับ! 👋 — ขอบคุณที่แวะมา — ไว้เจอกันใหม่นะครับ!`,
      `บ๊ายบาย! 😊 — ถ้ามีอะไรให้ช่วย — กลับมาหาผมได้เสมอนะครับ!`,
      `ขอบคุณที่พูดคุยกับผมวันนี้ครับ! — ไว้เจอกันใหม่ครั้งหน้านะครับ! 🤖`,
      `โชคดีนะครับ! 🌟 — หวังว่าเราจะได้พูดคุยกันอีก — สวัสดีครับ!`
    ],
    help: [
      `มีอะไรให้ช่วยไหมครับ? — ไม่ว่าจะเป็นคำถามเกี่ยวกับโปรเจกต์ เทคโนโลยี หรือแม้แต่คำแนะนำด้านการพัฒนา — ผมพร้อมช่วยครับ!`,
      `อยากรู้เรื่องไหนเป็นพิเศษไหมครับ? — ผมมีข้อมูลละเอียดเกี่ยวกับทุกโปรเจกต์และทักษะ — ถามมาได้เลย!`,
      `ไม่แน่ใจว่าจะถามอะไรดี? — ลองถามว่า "แนะนำผลงานที่น่าสนใจ" หรือ "ทักษะไหนที่ควรเรียนรู้ต่อ" — ผมมีคำตอบดีๆ ให้ครับ!`,
      `ผมพร้อมช่วยเสมอครับ! — ไม่ว่าจะเป็นคำถามง่ายๆ หรือซับซ้อน — ผมจะพยายามตอบให้ดีที่สุดครับ!`
    ]
  };

  // ✅ เลือกคำตอบแบบสุ่ม
  if (lowerPrompt.includes('สวัสดี') || lowerPrompt.includes('hi') || lowerPrompt.includes('hello')) {
    return getRandomResponse(responses.greeting);
  }
  if (lowerPrompt.includes('ทำอะไรได้บ้าง') || lowerPrompt.includes('ความสามารถ')) {
    return getRandomResponse(responses.capabilities);
  }
  if (lowerPrompt.includes('แนะนำตัว') || lowerPrompt.includes('เกี่ยวกับคุณ')) {
    return getRandomResponse(responses.about);
  }
  if (lowerPrompt.includes('ติดต่อ') || lowerPrompt.includes('contact')) {
    return getRandomResponse(responses.contact);
  }
  if (lowerPrompt.includes('ขอบคุณ') || lowerPrompt.includes('thank')) {
    return getRandomResponse(responses.thanks);
  }
  if (lowerPrompt.includes('ลาก่อน') || lowerPrompt.includes('bye')) {
    return getRandomResponse(responses.goodbye);
  }
  if (lowerPrompt.includes('ช่วย') || lowerPrompt.includes('help')) {
    return getRandomResponse(responses.help);
  }

  return getDynamicErrorResponse(originalPrompt);
};

// ✅ ตอบตาม context — ใช้ข้อมูลจริงจาก projects/skills
const handleContextResponse = async (originalPrompt, contextDocs, lowerPrompt) => {
  const doc = contextDocs[0];
  let responses = [];

  if (doc.type === 'project') {
    responses = generateProjectResponses(doc.data, originalPrompt, lowerPrompt);
  } else if (doc.type === 'skill') {
    responses = generateSkillResponses(doc.data, originalPrompt, lowerPrompt);
  } else if (doc.type === 'blog') {
    responses = generateBlogResponses(doc.data, originalPrompt, lowerPrompt);
  }

  const baseResponse = responses.length > 0 ? getRandomResponse(responses) : getDefaultContextResponse(doc);

  // ✅ เพิ่มคำถามต่อท้ายแบบสุ่ม
  const followUpQuestions = [
    `สนใจให้ผมเล่าเพิ่มเติมเกี่ยวกับ ${doc.data.title || doc.data.name} ไหมครับ?`,
    `อยากรู้เรื่องไหนเป็นพิเศษเกี่ยวกับ ${doc.data.title || doc.data.name} ครับ?`,
    `มีอะไรให้ผมอธิบายเพิ่มเติมเกี่ยวกับ ${doc.data.title || doc.data.name} ไหมครับ?`,
    `อยากให้ผมแชร์ lesson learned จาก ${doc.data.title || doc.data.name} ไหมครับ?`
  ];

  return `${baseResponse}\n\n${getRandomResponse(followUpQuestions)}`;
};

// ✅ สร้างคำตอบสำหรับ project
const generateProjectResponses = (project, originalPrompt, lowerPrompt) => {
  const responses = [];

  if (lowerPrompt.includes('เทคนิค') || lowerPrompt.includes('เทคโนโลยี') || lowerPrompt.includes('tech')) {
    const skills = project.relatedSkills || []; // ✅ guard
    responses.push(
      `ใน "${project.title}" ผมใช้ ${skills.join(', ')} — โดยเฉพาะ ${skills[0] || 'เทคโนโลยีหลัก'} ที่ช่วยให้ระบบทำงานได้อย่างมีประสิทธิภาพ!`,
      `เทคโนโลยีหลัก: ${skills.join(', ')} — เลือกใช้เพราะ ${getRandomReason()} — ทำให้ได้ผลลัพธ์ที่ดีมาก!`,
      `Stack ที่ใช้: ${skills.join(', ')} — ออกแบบมาเพื่อ ${getRandomPurpose()} — และแก้ปัญหา ${project.challenges?.[0] || 'ปัญหาทั่วไป'} ได้อย่างมีประสิทธิภาพ!`
    );
  }

  if (lowerPrompt.includes('ปัญหา') || lowerPrompt.includes('อุปสรรค') || lowerPrompt.includes('challenge')) {
    if (project.challenges && project.challenges.length > 0) {
      responses.push(
        `เจอปัญหา ${project.challenges[0]} — เลยใช้ ${project.solutions[0]} — ทำให้ ${project.outcomes[0]}!`,
        `อุปสรรคหลัก: ${project.challenges[0]} — แก้ไขโดย ${project.solutions[0]} — ผลลัพธ์: ${project.outcomes[0]}!`,
        `ปัญหาที่ท้าทาย: ${project.challenges[0]} — แต่เราแก้ได้ด้วย ${project.solutions[0]} — และได้ผลลัพธ์ที่น่าภูมิใจ: ${project.outcomes[0]}!`
      );
    }
  }

  if (lowerPrompt.includes('ผลลัพธ์') || lowerPrompt.includes('outcome') || lowerPrompt.includes('result')) {
    if (project.outcomes && project.outcomes.length > 0) {
      responses.push(
        `ผลลัพธ์: ${project.outcomes[0]} — ลูกค้าพอใจมาก — และนำไปใช้งานจริงแล้ว!`,
        `${project.outcomes[0]} — นี่คือสิ่งที่ภูมิใจที่สุดในโปรเจกต์นี้!`,
        `ภูมิใจกับผลลัพธ์: ${project.outcomes[0]} — ทำให้ ${getRandomImpact()} — คุ้มค่ากับความพยายามที่ลงทุน!`
      );
    }
  }

  if (lowerPrompt.includes('ทำไม') || lowerPrompt.includes('why')) {
    responses.push(
      `เลือกทำ "${project.title}" เพราะ ${getRandomMotivation()} — และเชื่อว่า ${getRandomBelief()} — จึงทุ่มเทกับโปรเจกต์นี้!`,
      `เหตุผลที่พัฒนา "${project.title}": ${getRandomMotivation()} — อยากแก้ปัญหา ${project.challenges?.[0] || 'ทั่วไป'} ให้กับผู้ใช้งาน!`,
      `ทำไมถึงเลือก "${project.title}"? — เพราะ ${getRandomMotivation()} — และใช้ ${project.relatedSkills?.[0] || 'เทคโนโลยีที่เหมาะสม'} เพราะ ${getRandomReason()}!`
    );
  }

  // ✅ คำตอบทั่วไปเกี่ยวกับ project
  responses.push(
    `"${project.title}" — โปรเจกต์นี้สอนผมเรื่อง ${getRandomLesson()} — และมีเรื่องราวที่น่าสนใจมาก!`,
    `สนใจ "${project.title}" ใช่ไหมครับ? — ผมมีเทคนิคและบทเรียนที่ได้จากโปรเจกต์นี้ — ถามมาได้เลย!`,
    `"${project.title}" — ไม่ใช่แค่โปรเจกต์ — แต่เป็น journey การเรียนรู้ที่น่าจดจำ — อยากให้ผมเล่าเรื่องไหนเป็นพิเศษไหมครับ?`
  );

  return responses;
};

// ✅ สร้างคำตอบสำหรับ skill
const generateSkillResponses = (skill, originalPrompt, lowerPrompt) => {
  const responses = [];

  if (lowerPrompt.includes('ประสบการณ์') || lowerPrompt.includes('level')) {
    responses.push(
      `ใช้ ${skill.name} มา ${skill.level}% — ในโปรเจกต์จริง ${skill.relatedProjects.length} โปรเจกต์ — ได้แก่ ${skill.relatedProjects.join(', ')}!`,
      `ประสบการณ์กับ ${skill.name}: ${skill.level}% — ใช้ใน ${skill.relatedProjects[0]} — แก้ปัญหา ${getRandomProblem()} ได้จริง!`,
      `${skill.name} — ทักษะนี้ใช้ประจำ — โดยเฉพาะใน ${skill.relatedProjects[0]} — ได้ผลดีมาก!`
    );
  }

  if (lowerPrompt.includes('เรียน') || lowerPrompt.includes('learn') || lowerPrompt.includes('how to')) {
    const resources = skill.learningResources || []; // ✅ guard
    if (resources.length > 0) {
      responses.push(
        `อยากเรียน ${skill.name}? — เริ่มจาก ${resources[0]} — แล้วลองทำ ${getRandomProject()} — จะเห็นผลเร็ว!`,
        `แนะนำ: ${resources[0]} — แล้วฝึกทำโปรเจกต์ ${getRandomProject()} — จะเรียนรู้ได้เร็วขึ้นครับ!`,
        `ทรัพยากร: ${resources.join(' หรือ ')} — เน้น ${getRandomFocus()} — จะเรียนรู้ได้เร็วขึ้นครับ!`
      );
    }
  }

  if (lowerPrompt.includes('ยาก') || lowerPrompt.includes('difficult')) {
    responses.push(
      `${skill.name} อาจดูยากตอนแรก — แต่ถ้าเริ่มจาก ${skill.learningResources?.[0] || 'เอกสารพื้นฐาน'} — และทำ ${getRandomProject()} — จะเข้าใจเร็วขึ้นครับ!`,
      `ไม่ยากครับ — ถ้าเรียน ${skill.name} อย่างเป็นระบบ — เริ่มจาก ${skill.learningResources?.[0] || 'แหล่งเรียนรู้ที่ดี'} — แล้วค่อยๆ เพิ่มความยาก!`,
      `${skill.name} สนุกมากครับ — เมื่อเริ่มเข้าใจ — ลองทำ ${getRandomProject()} — จะรู้สึกว่าไม่ยากอย่างที่คิด!`
    );
  }

  // ✅ คำตอบทั่วไปเกี่ยวกับ skill
  responses.push(
    `"${skill.name}" — ไม่ใช่แค่ทฤษฎี — ใช้จริงใน ${skill.relatedProjects.join(', ')} — แก้ปัญหาได้จริงครับ!`,
    `เกี่ยวกับ "${skill.name}" — ${getRandomApplication(skill)} — สนใจอยากให้ขยายความส่วนไหนเป็นพิเศษไหมครับ?`,
    `"${skill.name}" — ทักษะนี้สำคัญสำหรับ ${getRandomField()} — ผมใช้ใน ${skill.relatedProjects[0]} — ได้ผลดีมากครับ!`
  );

  return responses;
};

// ✅ สร้างคำตอบสำหรับ blog
const generateBlogResponses = (blog, originalPrompt, lowerPrompt) => {
  const responses = [];

  if (lowerPrompt.includes('สรุป') || lowerPrompt.includes('summary')) {
    responses.push(
      `บทความ "${blog.title}" — ${blog.content} — อ่านเต็มๆ ในส่วน Blog ครับ!`,
      `สรุป "${blog.title}": ${blog.content.slice(0, 100)}... — ดูฉบับเต็มใน Blog นะครับ!`,
      `ใจความสำคัญ: ${blog.content.split('.')[0]} — อ่านต่อได้ใน Blog ครับ!`
    );
  }

  if (lowerPrompt.includes('เขียน') || lowerPrompt.includes('author')) {
    responses.push(
      `เขียนโดย [ชื่อคุณ] — จากประสบการณ์จริงใน ${blog.targetAudience ? blog.targetAudience[0] : 'โปรเจกต์ต่างๆ'} — หวังว่าจะมีประโยชน์ครับ!`,
      `"${blog.title}" — ถ่ายทอดจากประสบการณ์จริง — โดย [ชื่อคุณ] — ผู้ที่คลุกคลีกับ ${blog.keyPoints ? blog.keyPoints[0] : 'เทคโนโลยีนี้'} มานาน!`,
      `ผู้เขียนคือ [ชื่อคุณ] — เขียนเพื่อแบ่งปันความรู้ให้กับ ${blog.targetAudience ? blog.targetAudience.join(' และ ') : 'ผู้สนใจ'} — ชอบบทความนี้ไหมครับ?`
    );
  }

  if (lowerPrompt.includes('ชอบ') || lowerPrompt.includes('interesting')) {
    responses.push(
      `บทความ "${blog.title}" — เป็นบทความที่ผมชอบมาก — เพราะ ${getRandomReason()} — คุณคิดว่าไงครับ?`,
      `"${blog.title}" — มีเทคนิคที่น่าสนใจมาก — โดยเฉพาะเรื่อง ${blog.keyPoints ? blog.keyPoints[0] : 'หัวข้อหลัก'} — ลองอ่านดูนะครับ!`,
      `ชอบ "${blog.title}" ใช่ไหมครับ? — ผมก็ชอบเหมือนกัน — เพราะ ${getRandomReason()} — มีบทความอื่นที่คล้ายกันใน Blog ด้วยนะครับ!`
    );
  }

  // ✅ คำตอบทั่วไปเกี่ยวกับ blog
  responses.push(
    `"${blog.title}" — ${blog.content} — อ่านเต็มๆ ได้ในส่วน Blog ครับ!`,
    `สนใจ "${blog.title}" ใช่ไหมครับ? — ผมมีสรุปและประเด็นสำคัญ — ถามมาได้เลย!`,
    `"${blog.title}" — บทความนี้มีเทคนิคและเคล็ดลับที่น่าสนใจมาก — ลองอ่านดูนะครับ — แล้วมาแชร์ความคิดเห็นกัน!`
  );

  return responses;
};

// ✅ ตอบ fallback — ไม่ซ้ำเดิม
const handleFallbackResponse = async (prompt) => {
  const responses = [
    `คำถามนี้น่าสนใจมากครับ — ผมกำลังค้นหาข้อมูลเพิ่มเติม — ลองถามเกี่ยวกับผลงานหรือทักษะของ [ชื่อคุณ] ดูนะครับ!`,
    `ผมยังเรียนรู้อยู่ — แต่จะพยายามตอบคำถามของคุณให้ดีที่สุดครับ! — ลองถามคำถามอื่นดูนะครับ!`,
    `ขอบคุณที่ถามครับ — ผมจะจดจำคำถามนี้ไว้และเรียนรู้เพิ่มเติม — ถามอะไรเกี่ยวกับผลงานหรือทักษะก็ได้นะครับ!`,
    `ลองถามเกี่ยวกับผลงาน ทักษะ หรือบทความของ [ชื่อคุณ] — ผมตอบได้ละเอียดมากครับ! — มีอะไรให้ช่วยไหมครับ?`,
    `อยากให้ผมอธิบายเรื่องไหนเป็นพิเศษไหมครับ? — ผมพร้อมช่วยเสมอ — ไม่ว่าจะเป็นเทคนิค ปัญหา หรือวิธีแก้ไขครับ!`,
    `คำถามนี้ท้าทายดีครับ! — ขอเวลาผมคิดสักครู่ — หรือลองถามเกี่ยวกับ "${getRandomProjectName()}" — ผมมีข้อมูลละเอียดเลยครับ!`,
    `ผมชอบคำถามนี้ครับ! — แสดงว่าคุณสนใจเรื่องนี้จริงๆ — ลองถามเพิ่มเติมเกี่ยวกับ "${getRandomSkillName()}" ไหมครับ?`,
    `ขอบคุณที่ถามคำถามที่น่าสนใจครับ! — ผมจะพยายามหาคำตอบที่ดีที่สุดให้คุณ — รอผมสักครู่นะครับ!`
  ];

  return getRandomResponse(responses);
};

// ✅ ฟังก์ชันช่วยเหลือ — สร้างคำตอบแบบไดนามิก
const getRandomResponse = (responses) => {
  return responses[Math.floor(Math.random() * responses.length)];
};

const getDynamicErrorResponse = (prompt) => {
  const responses = [
    `ขอโทษครับ — ผมยังเรียนรู้อยู่ — ลองถามคำถามอื่นดูนะครับ!`,
    `ผมกำลังพัฒนาให้ตอบได้ดีขึ้นครับ — ขอบคุณที่เข้าใจ!`,
    `คำถามนี้ท้าทายมากครับ — ขอเวลาผมคิดสักครู่นะ!`,
    `ผมยังไม่เข้าใจคำถามนี้ดีพอ — ลองถามใหม่ในรูปแบบอื่นดูนะครับ!`,
    `ระบบของผมกำลังประมวลผลคำถามนี้ — ลองถามคำถามอื่นก่อนนะครับ!`,
    `ผมยังไม่มีข้อมูลเพียงพอสำหรับคำถามนี้ — ลองถามเกี่ยวกับผลงานหรือทักษะแทนนะครับ!`
  ];
  return getRandomResponse(responses);
};

const getDefaultContextResponse = (doc) => {
  if (doc.type === 'project') {
    return `เกี่ยวกับ "${doc.data.title}" — ${doc.data.description} — มีเทคนิคและเรื่องราวที่น่าสนใจมากครับ!`;
  } else if (doc.type === 'skill') {
    return `เกี่ยวกับทักษะ "${doc.data.name}" — มีการใช้งานจริงในหลายโปรเจกต์ — สนใจอยากให้ขยายความส่วนไหนเป็นพิเศษไหมครับ?`;
  } else if (doc.type === 'blog') {
    return `บทความ "${doc.data.title}" — มีเนื้อหาที่น่าสนใจมาก — อ่านเต็มๆ ได้ในส่วน Blog ครับ!`;
  }
  return "ผมมีข้อมูลที่น่าสนใจเกี่ยวกับเรื่องนี้ — ถามมาได้เลยครับ!";
};

// ✅ ฟังก์ชันสำหรับ skill
const getRandomApplication = (skill) => {
  const applications = skill.applications || [
    "สร้าง interactive UI", "จัดการ state ของแอป", "ทำ API calls",
    "optimize performance", "implement authentication", "manage database connections"
  ];
  return applications[Math.floor(Math.random() * applications.length)];
};

// ✅ ฟังก์ชันสุ่มอื่นๆ
const getRandomReason = () => {
  const reasons = [
    "ประสิทธิภาพสูง", "ชุมชนใหญ่", "เอกสารดี", "เหมาะกับโปรเจกต์นี้", "เรียนรู้ง่าย",
    "รองรับการทำงานจริง", "มี plugin เยอะ", "performance ดี", "security แน่นหนา", "scalability ดี",
    "cost-effective", "flexible", "reliable", "maintainable", "testable"
  ];
  return reasons[Math.floor(Math.random() * reasons.length)];
};

const getRandomPurpose = () => {
  const purposes = [
    "เพิ่มประสิทธิภาพ", "ลดต้นทุน", "ปรับปรุงประสบการณ์ผู้ใช้", "แก้ปัญหา scalability",
    "เพิ่มความปลอดภัย", "ลดเวลาในการพัฒนา", "เพิ่มความน่าเชื่อถือ", "รองรับผู้ใช้งานจำนวนมาก",
    "improve maintainability", "enhance user engagement", "streamline workflows", "automate processes"
  ];
  return purposes[Math.floor(Math.random() * purposes.length)];
};

const getRandomSolution = () => {
  const solutions = [
    "ใช้ caching", "ปรับโครงสร้าง database", "เพิ่มการทดสอบ", "ใช้ design pattern ที่เหมาะสม",
    "optimize code", "เพิ่ม server resources", "ใช้ load balancer", "implement retry mechanism",
    "refactor codebase", "add monitoring", "improve error handling", "use better algorithms"
  ];
  return solutions[Math.floor(Math.random() * solutions.length)];
};

const getRandomMotivation = () => {
  const motivations = [
    "อยากแก้ปัญหาให้ผู้ใช้งาน", "สนใจเทคโนโลยีนี้มานาน", "เห็นโอกาสในการพัฒนา",
    "อยากท้าทายตัวเอง", "ลูกค้าต้องการ", "อยากเรียนรู้สิ่งใหม่", "อยากสร้างอะไรที่มีประโยชน์",
    "solve a real-world problem", "learn new technologies", "build something impactful"
  ];
  return motivations[Math.floor(Math.random() * motivations.length)];
};

const getRandomProblem = () => {
  const problems = [
    "ระบบทำงานช้า", "ผู้ใช้งานสับสน", "จัดการข้อมูลยาก", "ไม่มีระบบอัตโนมัติ",
    "ต้องใช้คนจำนวนมาก", "security ไม่แน่นหนา", "ไม่รองรับ mobile", "integration ยาก",
    "performance bottlenecks", "scalability issues", "poor user experience"
  ];
  return problems[Math.floor(Math.random() * problems.length)];
};

const getRandomBelief = () => {
  const beliefs = [
    "เทคโนโลยีนี้จะเปลี่ยนโลก", "จะช่วยให้ชีวิตง่ายขึ้น", "เป็นอนาคตของการพัฒนา",
    "ทุกคนควรเรียนรู้", "จะสร้างโอกาสใหม่ๆ", "จะช่วยแก้ปัญหาสังคม", "จะทำให้โลกนี้ดีขึ้น",
    "can make a difference", "will revolutionize the industry", "is the future of technology"
  ];
  return beliefs[Math.floor(Math.random() * beliefs.length)];
};

const getRandomLesson = () => {
  const lessons = [
    "การวางแผนที่ดี", "ความสำคัญของการทดสอบ", "การสื่อสารกับทีม", "การจัดการเวลา",
    "การเรียนรู้จากความผิดพลาด", "การฟัง feedback", "การ document ที่ดี", "การ optimize อย่างต่อเนื่อง",
    "importance of code reviews", "value of user feedback", "need for continuous learning"
  ];
  return lessons[Math.floor(Math.random() * lessons.length)];
};

const getRandomResource = () => {
  const resources = [
    "เอกสารทางการ", "คอร์สออนไลน์", "YouTube Tutorial", "หนังสือเล่มนี้",
    "Workshop ที่เคยเข้าร่วม", "blog ของ expert", "documentation", "community forum",
    "official documentation", "online courses", "coding bootcamps", "mentorship programs"
  ];
  return resources[Math.floor(Math.random() * resources.length)];
};

const getRandomProject = () => {
  const projects = [
    "Todo List", "Weather App", "Chat Application", "E-commerce Site",
    "Portfolio Website", "Calculator", "Game", "API Integration",
    "Social Media App", "Task Manager", "Blog Platform", "Dashboard"
  ];
  return projects[Math.floor(Math.random() * projects.length)];
};

const getRandomFocus = () => {
  const focuses = [
    "พื้นฐานให้แน่น", "การใช้งานจริง", "best practices", "performance optimization",
    "security", "accessibility", "testing", "documentation",
    "code quality", "user experience", "scalability", "maintainability"
  ];
  return focuses[Math.floor(Math.random() * focuses.length)];
};

const getRandomField = () => {
  const fields = [
    "การพัฒนาเว็บ", "การวิเคราะห์ข้อมูล", "AI และ Machine Learning",
    "ระบบคลาวด์", "Mobile Development", "DevOps", "Cybersecurity", "Game Development",
    "web development", "data science", "cloud computing", "mobile apps"
  ];
  return fields[Math.floor(Math.random() * fields.length)];
};

const getRandomOutcome = () => {
  const outcomes = [
    "ลดเวลาในการทำงานลง 70%", "เพิ่มประสิทธิภาพ 90%", "ลด bug ลง 80%",
    "เพิ่มความพึงพอใจของผู้ใช้", "ลดต้นทุน 50%", "เพิ่ม revenue 30%", "ได้รับรางวัล",
    "improved performance by 200%", "increased user engagement by 150%", "reduced costs by 40%"
  ];
  return outcomes[Math.floor(Math.random() * outcomes.length)];
};

const getRandomImpact = () => {
  const impacts = [
    "ช่วยให้ทีมทำงานเร็วขึ้น", "ทำให้ลูกค้าพอใจมากขึ้น", "ลดค่าใช้จ่ายลง",
    "เพิ่มความน่าเชื่อถือ", "ขยายฐานผู้ใช้งาน", "ได้รับการยอมรับจาก industry",
    "improved team productivity", "enhanced customer satisfaction", "increased market share"
  ];
  return impacts[Math.floor(Math.random() * impacts.length)];
};

const getRandomProjectName = () => {
  const projectNames = ["ระบบจัดการงานด้วย AI", "แอปจองห้องประชุม", "เว็บพอร์ตโฟลิโอส่วนตัว"];
  return projectNames[Math.floor(Math.random() * projectNames.length)];
};

const getRandomSkillName = () => {
  const skillNames = ["JavaScript", "React", "Node.js", "Python", "Tailwind CSS"];
  return skillNames[Math.floor(Math.random() * skillNames.length)];
};

// ✅ Export ฟังก์ชันอื่นๆ
export const aiSummarize = async (text) => {
  if (!text) return "ไม่มีเนื้อหาให้สรุป";
  const sentences = text.split(/[.!?]/);
  const summary = sentences.slice(0, 2).join('。');
  return summary || text.slice(0, 100) + "...";
};

export const aiRecommendation = async (skills) => {
  const hasReact = skills.some(s => s.name.toLowerCase().includes("react"));
  const hasNode = skills.some(s => s.name.toLowerCase().includes("node"));
  const hasPython = skills.some(s => s.name.toLowerCase().includes("python"));

  if (hasReact && hasNode) {
    return getRandomResponse([
      "แนะนำให้เรียนรู้ Next.js หรือ NestJS — เพื่อพัฒนา Full Stack ขั้นสูงครับ!",
      "ลองศึกษา Next.js — เหมาะกับโปรเจกต์จริง — มีฟีเจอร์ครบครัน — และ community ใหญ่มากครับ!",
      "NestJS — โครงสร้างชัดเจน — เหมาะกับโปรเจกต์ขนาดใหญ่ — และ scalable ดีมากครับ!",
      "Next.js + NestJS — คู่หูมหัศจรรย์สำหรับ Full Stack Developer — เรียนรู้แล้วจะไม่ผิดหวังครับ!"
    ]);
  }

  if (hasReact) {
    return getRandomResponse([
      "ลองเรียนรู้ Zustand หรือ React Query — เพื่อจัดการ state ให้มีประสิทธิภาพมากขึ้นครับ!",
      "React Query — ช่วยจัดการ data fetching — ลด boilerplate code ได้เยอะ — และมี caching ที่ดีครับ!",
      "Zustand — ง่ายและทรงพลัง — เหมาะกับโปรเจกต์ทุกขนาด — เรียนรู้เร็ว — ใช้งานง่ายครับ!",
      "React Hooks + Context API — พื้นฐานที่ต้องรู้ — แล้วค่อยขยับไป Zustand หรือ Redux Toolkit ครับ!"
    ]);
  }

  if (hasPython) {
    return getRandomResponse([
      "แนะนำให้เรียนรู้ Django หรือ Flask — เพื่อพัฒนาเว็บด้วย Python อย่างมืออาชีพครับ!",
      "Flask — เบาและยืดหยุ่น — เหมาะกับโปรเจกต์เล็กถึงกลาง — เรียนรู้เร็วครับ!",
      "Django — โครงสร้างครบ — เหมาะกับโปรเจกต์ใหญ่และซับซ้อน — มี security ที่ดีครับ!",
      "FastAPI — สำหรับ API ที่ต้องการ performance สูง — เรียนรู้ไม่ยาก — แล้วคุณจะรักมันครับ!"
    ]);
  }

  return getRandomResponse([
    "ลองเริ่มจาก JavaScript ES6+ และ React — เป็นพื้นฐานที่สำคัญสำหรับนักพัฒนาเว็บครับ!",
    "เริ่มจาก HTML, CSS, JavaScript — แล้วค่อยขยับไป React — จะเห็นผลเร็ว — และสร้าง portfolio ได้เร็วครับ!",
    "JavaScript + React — คู่หูมหัศจรรย์ — เรียนรู้แล้วทำงานได้จริง — และมีงานรองรับเยอะครับ!",
    "TypeScript + React — อนาคตของการพัฒนาเว็บ — เรียนรู้ตั้งแต่วันนี้ — จะได้เปรียบในตลาดงานครับ!"
  ]);
};

export const aiSearch = async (query, projects) => {
  if (!query || !projects?.length) return projects || [];
  return projects.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description?.toLowerCase().includes(query.toLowerCase()) ||
    p.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};