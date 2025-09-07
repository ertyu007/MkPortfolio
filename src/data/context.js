// src/data/context.js
export const portfolioContext = [
  {
    type: 'project',
    title: 'ระบบจัดการงานด้วย AI',
    context: 'ระบบจัดการงานอัจฉริยะที่ใช้ AI ช่วยวิเคราะห์และจัดลำดับความสำคัญของงานอัตโนมัติ โดยใช้ React สำหรับ frontend, Node.js สำหรับ backend, และ OpenAI API สำหรับการวิเคราะห์เนื้องาน',
    data: {
      title: 'ระบบจัดการงานด้วย AI',
      description: 'พัฒนาด้วย React + Node.js + OpenAI API',
      tags: ['React', 'AI', 'Node.js', 'OpenAI'],
      relatedSkills: ['React', 'Node.js', 'Python', 'AI/ML', 'OpenAI API'],
      challenges: ['ระบบวิเคราะห์งานช้า', 'ความแม่นยำในการจัดลำดับงาน', 'integration กับระบบเก่า'],
      solutions: ['ใช้ caching ด้วย Redis', 'ปรับปรุง algorithm การจัดลำดับ', 'ใช้ API Gateway'],
      outcomes: ['ลดเวลาในการจัดลำดับงาน 70%', 'เพิ่มความพึงพอใจผู้ใช้งาน 90%', 'ลด bug ลง 80%']
    }
  },
  {
    type: 'project',
    title: 'แอปจองห้องประชุม',
    context: 'แอปพลิเคชันสำหรับจองห้องประชุมแบบเรียลไทม์ ดูสถานะห้องว่างผ่านปฏิทินแบบ interactive โดยใช้ React สำหรับ UI, Firebase สำหรับ realtime database, และ Tailwind CSS สำหรับ styling',
    data: {
      title: 'แอปจองห้องประชุม',
      description: 'ระบบจองห้องแบบเรียลไทม์',
      tags: ['React', 'Firebase', 'Tailwind', 'Calendar'],
      relatedSkills: ['React', 'Firebase', 'Tailwind CSS', 'JavaScript'],
      challenges: ['sync ข้อมูล real-time', 'แสดงสถานะห้องแบบ visual', 'รองรับผู้ใช้งานพร้อมกันจำนวนมาก'],
      solutions: ['ใช้ Firebase Realtime Database', 'ออกแบบ UI ด้วย Tailwind', 'implement optimistic updates'],
      outcomes: ['ลดเวลาการจองห้อง 60%', 'เพิ่มการใช้งานระบบ 200%', 'ได้รับ feedback ดีจากผู้ใช้งาน']
    }
  },
  {
    type: 'project',
    title: 'เว็บพอร์ตโฟลิโอส่วนตัว',
    context: 'เว็บไซต์พอร์ตโฟลิโอส่วนตัวที่ออกแบบ UI/UX ด้วย Figma และพัฒนาด้วย React 19 + Tailwind CSS โดยมีระบบ AI Chatbot ที่สามารถตอบคำถามเกี่ยวกับผลงานและทักษะได้อย่างชาญฉลาด',
    data: {
      title: 'เว็บพอร์ตโฟลิโอส่วนตัว',
      description: 'ออกแบบ UI/UX + พัฒนาด้วย React 19',
      tags: ['React', 'Tailwind', 'Portfolio', 'Design', 'AI'],
      relatedSkills: ['React', 'Tailwind CSS', 'Figma', 'JavaScript', 'AI'],
      challenges: ['ออกแบบ UI ให้ทันสมัย', 'ทำให้ AI ตอบคำถามได้แม่นยำ', 'optimize performance'],
      solutions: ['ใช้ Figma สำหรับ prototyping', 'ใช้ Transformers.js สำหรับ AI', 'implement code splitting'],
      outcomes: ['ได้งานจากลูกค้า 3 ราย', 'traffic เพิ่ม 300%', 'ได้รับคำชมเรื่อง design และ functionality']
    }
  },
  {
    type: 'skill',
    name: 'JavaScript',
    context: 'JavaScript คือภาษาหลักที่ใช้ในการพัฒนาเว็บแอปพลิเคชัน โดยผมมีประสบการณ์ใช้งานมากกว่า 3 ปี ในโปรเจกต์จริงหลายโปรเจกต์',
    data: {
      name: 'JavaScript',
      level: 90,
      relatedProjects: ['ระบบจัดการงานด้วย AI', 'แอปจองห้องประชุม', 'เว็บพอร์ตโฟลิโอส่วนตัว'],
      applications: ['สร้าง interactive UI', 'จัดการ state ของแอป', 'ทำ API calls'],
      learningResources: ['MDN Web Docs', 'JavaScript.info', 'Eloquent JavaScript']
    }
  },
  {
    type: 'skill',
    name: 'React',
    context: 'React คือ library สำหรับสร้าง UI ที่มีประสิทธิภาพสูง โดยผมใช้ React ในทุกโปรเจกต์หลัก และมีความเชี่ยวชาญใน hooks, context API, และ state management',
    data: {
      name: 'React',
      level: 85,
      relatedProjects: ['ระบบจัดการงานด้วย AI', 'แอปจองห้องประชุม', 'เว็บพอร์ตโฟลิโอส่วนตัว'],
      applications: ['สร้าง component-based architecture', 'จัดการ state ด้วย hooks', 'optimize performance ด้วย memoization'],
      learningResources: ['React Official Docs', 'Kent C. Dodds', 'Epic React']
    }
  },
  {
    type: 'skill',
    name: 'Node.js',
    context: 'Node.js คือ runtime สำหรับสร้าง server-side applications โดยผมใช้ Node.js สำหรับสร้าง backend services และ API สำหรับโปรเจกต์ต่างๆ',
    data: {
      name: 'Node.js',
      level: 75,
      relatedProjects: ['ระบบจัดการงานด้วย AI', 'เว็บพอร์ตโฟลิโอส่วนตัว'],
      applications: ['สร้าง RESTful APIs', 'จัดการ database connections', 'implement authentication'],
      learningResources: ['Node.js Documentation', 'The Net Ninja', 'Traversy Media']
    }
  },
  {
    type: 'blog',
    title: 'เริ่มต้นเรียนรู้ React 19 ฉบับมือใหม่',
    context: 'บทความนี้จะพาคุณรู้จักกับ React 19 ฟีเจอร์ใหม่ๆ ที่น่าสนใจ เช่น Actions, Document Metadata, และ Asset Loading ที่ทำให้การพัฒนาเว็บแอปพลิเคชันมีประสิทธิภาพมากขึ้น',
    data: {
      title: 'เริ่มต้นเรียนรู้ React 19 ฉบับมือใหม่',
      content: 'React 19 เปิดตัวด้วยฟีเจอร์ใหม่ ๆ ที่น่าสนใจ เช่น Actions, Document Metadata, และ Asset Loading',
      keyPoints: ['Actions สำหรับ server components', 'Document Metadata สำหรับ SEO', 'Asset Loading สำหรับ performance'],
      targetAudience: ['มือใหม่ที่เริ่มเรียน React', 'ผู้พัฒนาที่อยากอัปเกรดเป็น React 19']
    }
  },
  {
    type: 'blog',
    title: 'รวมเทคนิคใช้ Tailwind CSS ให้ทรงพลัง',
    context: 'Tailwind CSS ไม่ใช่แค่ Utility-First Framework แต่ยังสามารถขยายความสามารถด้วย Plugins, Custom Themes, และ JIT Compiler บทความนี้รวบรวมเทคนิคขั้นสูงที่คุณอาจยังไม่รู้!',
    data: {
      title: 'รวมเทคนิคใช้ Tailwind CSS ให้ทรงพลัง',
      content: 'Tailwind CSS ไม่ใช่แค่ Utility-First Framework แต่ยังสามารถขยายความสามารถด้วย Plugins, Custom Themes, และ JIT Compiler',
      keyPoints: ['สร้าง custom plugins', 'extend theme ให้เหมาะกับแบรนด์', 'ใช้ JIT compiler สำหรับ performance'],
      targetAudience: ['นักพัฒนาที่ใช้ Tailwind CSS', 'ผู้ที่อยากยกระดับ CSS skills']
    }
  }
];