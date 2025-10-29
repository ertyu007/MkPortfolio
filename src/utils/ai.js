// src/utils/ai.js
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

// ✅ ข้อมูลจริงจากทุก components (สามารถอัปเดตได้ตลอด)
let PORTFOLIO_CONTEXT = `
ข้อมูลเกี่ยวกับ ธนภัทร การะจักษ์:

การศึกษา:
- นักเรียนชั้นมัธยมศึกษาปีที่ 5 โรงเรียนน้ำปลีกศึกษา
- วางแผนศึกษาต่อคณะวิศวกรรมศาสตร์ สาขาเครือข่าย มหาวิทยาลัยขอนแก่น

ทักษะทางเทคนิค:
- HTML/CSS: ระดับสูง - สามารถออกแบบและจัดโครงสร้างเว็บไซต์ได้อย่างมีระบบ
- JavaScript: ระดับกลาง - พัฒนาและปรับปรุงฟังก์ชันการทำงานพื้นฐานของเว็บไซต์ได้
- PHP: ระดับกลาง - เขียนและแก้ไขโค้ดเบื้องต้นสำหรับงานฝั่งเซิร์ฟเวอร์
- Git: ระดับกลาง - ใช้ในการควบคุมเวอร์ชันของโค้ดและการทำงานร่วมทีมได้
- การจัดการเครือข่าย LAN: ระดับสูง - สามารถวางระบบและแก้ไขปัญหาเครือข่ายได้
- การเข้าหัวสาย LAN: ระดับสูง - ทำได้อย่างถูกต้อง รวดเร็ว และมีประสิทธิภาพ

ทักษะด้านซอฟต์แวร์:
- Microsoft Word: ระดับสูง - จัดทำรายงานและเอกสารทางการได้คล่องแคล่ว
- Canva: ระดับสูง - ออกแบบสื่อประชาสัมพันธ์และงานกราฟิกได้อย่างสร้างสรรค์
- Adobe Photoshop: ระดับกลาง - ตกแต่งและปรับปรุงภาพถ่ายได้
- Adobe Premiere Pro: ระดับกลาง - ตัดต่อวิดีโอสำหรับงานนำเสนอและกิจกรรมได้
- Adobe After Effects: ระดับต่ำ - สร้างแอนิเมชันและเอฟเฟกต์เบื้องต้น
- Adobe Lightroom Classic: ระดับกลาง - ปรับแต่งภาพถ่ายเพื่อการนำเสนอ
- NetSetMan, JPerf, XAMPP: ระดับกลาง - ใช้งานเพื่อทดสอบเครือข่ายและจำลองเซิร์ฟเวอร์

ทักษะด้านสังคม:
- การทำงานเป็นทีม: ระดับสูง - สามารถทำงานร่วมกับผู้อื่นได้อย่างมีประสิทธิภาพ
- การสื่อสารที่มีประสิทธิภาพ: ระดับสูง - สื่อสารได้ชัดเจนและเข้าใจง่าย
- การปรับตัวเข้ากับสภาพแวดล้อม: ระดับสูง - สามารถปรับตัวได้ดีในสถานการณ์ต่างๆ
- ความรับผิดชอบสูง: ระดับสูง - มีความรับผิดชอบต่อหน้าที่และงานที่ได้รับมอบหมาย
- การทำงานร่วมกับผู้ใหญ่: ระดับสูง - สามารถทำงานร่วมกับผู้ใหญ่และบุคคลต่างวัยได้อย่างราบรื่น

ผลงาน:
1. ระบบจัดการงานด้วย AI - พัฒนาด้วย React + Node.js + OpenAI API
2. แอปจองห้องประชุม - ระบบจองห้องแบบเรียลไทม์
3. เว็บพอร์ตโฟลิโอส่วนตัว - ออกแบบ UI/UX + พัฒนาด้วย React 19
4. Chatbot สั่งอาหาร - พัฒนา chatbot สั่งอาหารผ่าน LINE
5. ระบบซื้อขาย NFT - พัฒนา Smart Contract + React

ประกาศนียบัตรและรางวัล:
1. ค่ายคณิตศาสตร์ (NP MATH CAMP) ครั้งที่ 1 - 25 สิงหาคม 2567
2. นักเรียนจิตอาสาดีเด่น - 21 กุมภาพันธ์ 2568
3. รางวัลระดับเหรียญทอง การแข่งขันหุ่นยนต์ - 23-24 พฤศจิกายน 2566
4. แกนนำเยาวชน TO BE NUMBER ONE - 21-22 ธันวาคม 2566
5. Reunion เยาวชนสร้างชาติ ครั้งที่ 1 - 24 มกราคม 2567
6. โครงการฝึกอบรมพัฒนาทักษะชีวิตและทักษะอาชีพ - 1-14 สิงหาคม 2566
7. การคัดเลือกตัวแทนโรงเรียนแข่งขันตอบปัญหากฎหมาย - 13 กรกฎาคม 2566
8. คณะกรรมการสภานักเรียน - 12 มิถุนายน 2568
9. นักเรียนผู้มีจิตอาสาดีเด่น - 8 สิงหาคม 2567
10. โครงการอบรมเชิงปฏิบัติการห้องเรียนพิเศษวิทยาศาสตร์ - 19 ตุลาคม 2567
11. ผู้ปฏิบัติตนตรงตามคุณลักษณะอันพึงประสงค์ 'อยู่อย่างพอเพียง' - 25 กุมภาพันธ์ 2568

บทความที่เขียน:
1. "การเริ่มต้นเรียนรู้ระบบเครือข่าย" - พื้นฐานระบบเครือข่าย อุปกรณ์ที่ใช้ และแนวคิดเบื้องต้น
2. "เทคนิคการเข้าหัวสาย LAN อย่างมืออาชีพ" - สอนเทคนิคการเข้าหัวสาย CAT5e และ CAT6
3. "การวางแผนศึกษาต่อคณะวิศวกรรมศาสตร์" - วิธีการเตรียมตัวสอบเข้าคณะวิศวกรรมศาสตร์

แผนการในอนาคต:
- ศึกษาต่อคณะวิศวกรรมศาสตร์ สาขาเครือข่าย มหาวิทยาลัยขอนแก่น
- เรียนรู้ Python, Linux, และ CCNA เพื่อเตรียมความพร้อม

บุคลิกและสไตล์:
- เป็นคนรักการเรียนรู้ มีความกระตือรือร้น
- ชอบทำงานเป็นทีมและช่วยเหลือผู้อื่น
- มีความสนใจในเทคโนโลยีและนวัตกรรม
- ตั้งใจและมุ่งมั่นในการพัฒนาตนเอง

ลิงก์เว็บไซต์:
- หน้าแรก: /
- เกี่ยวกับฉัน: /about
- ผลงาน: /portfolio
- ทักษะ: /skills
- ประกาศนียบัตร: /certificates
- บทความ: /blog
`;

// ✅ ฟังก์ชันอัปเดตข้อมูล context
export const updatePortfolioContext = (newData) => {
  if (newData && typeof newData === 'string') {
    PORTFOLIO_CONTEXT = newData;
    return true;
  }
  return false;
};

// ✅ ฟังก์ชันหลัก — ส่ง prompt ไปยัง Groq
export const aiChatResponse = async (prompt, context = "") => {
  if (!GROQ_API_KEY) {
    throw new Error("API key is not available");
  }

  try {
const fullPrompt = `
คุณคือ "AI Assistant" ผู้ช่วยส่วนตัวของธนภัทร การะจักษ์ 

ข้อมูลเกี่ยวกับธนภัทร (ใช้เป็นข้อมูลอ้างอิง):
${PORTFOLIO_CONTEXT}

คำแนะนำการตอบคำถาม:
1. ตอบสั้นๆ กระชับ ภายใน 1-2 ประโยคเท่านั้น
2. ใช้โทนเสียงเป็นกันเอง เหมือนเพื่อนคุยกัน
3. ใช้ภาษาไทยที่เข้าใจง่าย ไม่เป็นทางการ
4. หากคำถามเกี่ยวกับธนภัทร ให้ใช้ข้อมูลด้านบนตอบ
5. หากเป็นคำถามทั่วไป ตอบสั้นๆ ตามความรู้ทั่วไป
6. สามารถแนะนำลิงก์ในเว็บไซต์ได้ โดยใช้รูปแบบพิเศษ:
   - หน้าแรก: [[/]]
   - เกี่ยวกับฉัน: [[/about]]
   - ผลงาน: [[/portfolio]]
   - ทักษะ: [[/skills]]
   - ประกาศนียบัตร: [[/certificates]]
   - บทความ: [[/blog]]

Context การสนทนาปัจจุบัน:
${context}

คำถามของผู้ใช้:
"${prompt}"

คำตอบ (ตอบสั้นๆ เป็นกันเอง 1-2 ประโยค และแนะนำลิงก์โดยใช้รูปแบบ [[path]]):
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
          {
            role: "system",
            content: `คุณเป็นผู้ช่วย AI ที่สนทนากับผู้ใช้ได้อย่างเป็นธรรมชาติ 
                      ตอบคำถามเกี่ยวกับธนภัทร การะจักษ์ และคำถามทั่วไปอื่นๆ 
                      ใช้โทนเสียงเป็นมิตรและเป็นกันเองเหมือนเพื่อนคุยกัน
                      ตอบสั้นๆ กระชับ 1-2 ประโยคเท่านั้น
                      สามารถแนะนำลิงก์ในเว็บไซต์ได้เมื่อเหมาะสม`
          },
          { role: "user", content: fullPrompt }
        ],
        max_tokens: 100, // ลด tokens เพื่อให้ตอบสั้น
        temperature: 0.8, // เพิ่มความสร้างสรรค์เล็กน้อย
        top_p: 0.9,
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
    throw new Error("ไม่สามารถประมวลผลคำถามได้ในขณะนี้");
  }
};

// ✅ ฟังก์ชันสร้างคำถามแนะนำอัตโนมัติ
export const aiGenerateQuestions = async (userInput, botResponse, contextType) => {
  if (!GROQ_API_KEY) {
    throw new Error("API key is not available");
  }

  try {
    const prompt = `
จากบทสนทนาล่าสุด:
- ผู้ใช้ถาม: "${userInput}"
- คุณตอบ: "${botResponse}"
- ประเภท: ${contextType}

ข้อมูลเกี่ยวกับธนภัทร:
${PORTFOLIO_CONTEXT}

สร้างคำถามแนะนำ 3 คำถามที่เกี่ยวข้องกับบทสนทนานี้
คำถามต้องสั้น น่าสนใจ และทำให้การสนทนาต่อเนื่องได้
ตอบเป็น array JSON เท่านั้น

ตัวอย่าง:
["คำถามที่1?", "คำถามที่2?", "คำถามที่3?"]
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
          {
            role: "system",
            content: "คุณสร้างคำถามแนะนำสั้นๆ 3 คำถามที่น่าสนใจ ตอบเป็น JSON array เท่านั้น"
          },
          { role: "user", content: prompt }
        ],
        max_tokens: 80, // ลด tokens เพื่อให้คำถามสั้น
        temperature: 0.8,
        top_p: 1,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();

    try {
      const questions = JSON.parse(content);
      if (Array.isArray(questions) && questions.length > 0) {
        return questions.slice(0, 3).filter(q => q && q.length > 0);
      }
    } catch (e) {
      console.warn("Failed to parse AI response as JSON:", content);
      const extractedQuestions = extractQuestionsFromText(content);
      if (extractedQuestions.length > 0) {
        return extractedQuestions.slice(0, 3);
      }
    }

    // คำถามแนะนำพื้นฐานที่สั้นกว่า
    return [
      "มีผลงานอะไรน่าสนใจบ้าง?",
      "ทักษะไหนสำคัญที่สุด?",
      "แผนในอนาคตคือ?"
    ];

  } catch (err) {
    console.error("AI Question Generation Error:", err);
    return [
      "ชอบทำงานแบบไหน?",
      "มีโปรเจกต์ใหม่ไหม?",
      "ความท้าทายที่เคยเจอ?"
    ];
  }
};

// ✅ ฟังก์ชันแยกคำถามจากข้อความ
const extractQuestionsFromText = (text) => {
  const patterns = [
    /["']([^"']*[?？])["']/g,
    /(\d+\.\s*([^.]*[?？]))/g,
    /[-•]\s*([^\n]*[?？])/g,
    /([^\n?]{5,}[?？])/g
  ];

  const questions = new Set();

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      let question = (match[1] || match[2] || match[0]).trim();
      question = question.replace(/^[0-9.\-•\s]+/, '');

      if (question && question.includes('?') && question.length > 5) {
        question.split(/(?<=\?)/).forEach(q => {
          q = q.trim();
          if (q.length > 5) questions.add(q);
        });
      }
    }
  });

  return Array.from(questions);
};

// ✅ สรุปบทความ
export const aiSummarize = async (text) => {
  if (!text) return "ไม่มีเนื้อหาให้สรุป";
  try {
    return await aiChatResponse(`สรุปบทความนี้เป็นภาษาไทยสั้นๆ:\n\n${text}`);
  } catch (err) {
    return "ไม่สามารถสรุปบทความได้ในขณะนี้";
  }
};

// ✅ แนะนำทักษะ
export const aiRecommendation = async (skills) => {
  const skillText = skills.map(s => s.name).join(', ');
  try {
    return await aiChatResponse(`จากทักษะ: ${skillText} — ควรเรียนรู้อะไรต่อไป?`);
  } catch (err) {
    return "ไม่สามารถให้คำแนะนำได้ในขณะนี้";
  }
};

// ✅ ค้นหาผลงาน
export const aiSearch = async (query, projects) => {
  if (!query || !projects?.length) return projects || [];
  return projects.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description?.toLowerCase().includes(query.toLowerCase()) ||
    p.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};

// ✅ แนะนำ Certificates
export const aiCertRecommendation = async (certs) => {
  const certText = certs.map(c => c.name).join(', ');
  try {
    return await aiChatResponse(`จาก Certificates: ${certText} — มีอะไรน่าสนใจอีกบ้าง?`);
  } catch (err) {
    return "ไม่สามารถให้คำแนะนำได้ในขณะนี้";
  }
};

// ✅ ฟังก์ชันสำหรับคำถามทั่วไป
export const aiGeneralResponse = async (prompt) => {
  return await aiChatResponse(prompt, "คำถามทั่วไป");
};