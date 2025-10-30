// src/utils/api.js
const API_BASE = process.env.REACT_APP_API_URL || "";

// ✅ ฟังก์ชันดึง Projects - เพิ่ม retry mechanism
export const getProjects = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${API_BASE}/api/projects`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return await res.json();
    } catch (err) {
      console.warn(`⚠️ Attempt ${i + 1} failed to fetch projects:`, err.message);
      if (i === retries - 1) {
        console.error("❌ All attempts failed, using fallback data");
        // ✅ Fallback data ถ้า API ล้มเหลว
        return getFallbackProjects();
      }
      // รอ 1 วินาทีก่อนลองใหม่
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

// ✅ Like Project - เพิ่ม error handling ที่ดีขึ้น
export const likeProject = async (id, action, retries = 2) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}/like`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ action }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }
      
      return await res.json();
    } catch (err) {
      console.warn(`⚠️ Attempt ${i + 1} failed to ${action} project ${id}:`, err.message);
      if (i === retries - 1) {
        throw new Error(`Failed to ${action} project: ${err.message}`);
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
};

// ✅ Dislike Project - เพิ่ม error handling ที่ดีขึ้น
export const dislikeProject = async (id, action, retries = 2) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}/dislike`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ action }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }
      
      return await res.json();
    } catch (err) {
      console.warn(`⚠️ Attempt ${i + 1} failed to ${action} project ${id}:`, err.message);
      if (i === retries - 1) {
        throw new Error(`Failed to ${action} project: ${err.message}`);
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
};

// ✅ Fallback data ถ้า API ล้มเหลว
const getFallbackProjects = () => {
  console.log("🔄 Using fallback projects data");
  return [
    { 
      id: 1, 
      title: "ผมได้เป็นหนึ่งใน สภานักเรียน",
      description: "ผมได้เป็นหนึ่งใน สภานักเรียน มีหน้าทีช่วยดูแลและรับหน้าที่ จัดการควมคุ้มเครื่องเสียงเนื่องในกิจกรรมต่างๆ และเป็นตากล้องของโรงเรียน และช่วยเหลือครูในงานต่างๆที่เกี่ยวกับ อิเล็กทรอนิกส์ หรือ IT ",
      tags: ["Student Council", "Sound System", "Photography", "IT Support"],
      like_count: 0, 
      dislike_count: 0, 
      isLiked: false, 
      isDisliked: false,
      image: "/assets/images/works/1740286124834.jpg",
      image_url: "/assets/images/works/1740286124834.jpg"
    },
    { 
      id: 2, 
      title: "ตากล้องประจำโรงเรียน",
      description: "ผมได้เป็นตากล้องประจำโรงเรียน มีหน้าที่ถ่ายภาพในงานกิจกรรมต่างๆของโรงเรียน และรับหน้าที่ตกแต่งรูปภาพต่างๆที่ถ่ายมาให้สวยงาม",
      tags: ["Photography", "Event Coverage", "Photo Editing"],
      like_count: 0, 
      dislike_count: 0, 
      isLiked: false, 
      isDisliked: false,
      image: "/assets/images/works/1751160656102.jpg",
      image_url: "/assets/images/works/1751160656102.jpg"
    },
    { 
      id: 3, 
      title: "โปรเจ็ค Smart Farm",
      description: "ผมลองเล่น esp32 กับเซ็นเซอร์ต่างๆ เพื่อทำระบบ Smart Farm ขึ้นมา โดยใช้ esp32 เป็นตัวควบคุมหลักในการอ่านค่าจากเซ็นเซอร์ต่างๆ และแจ้งเตือนผ่านทางแอพพลิเคชั่นบนมือถือ",
      tags: ["IoT", "ESP32", "Smart Farm", "Embedded System", "Sensor"],
      like_count: 0, 
      dislike_count: 0, 
      isLiked: false, 
      isDisliked: false,
      image: "/assets/images/works/CircuitsSmartFarm.jpg",
      image_url: "/assets/images/works/CircuitsSmartFarm.jpg"
    },
    { 
      id: 4, 
      title: "ผมได้ออกแบบปกวิดีโอสั้น ของโรงเรียนเพื่อลงแข่งขัน",
      description: "ผมได้ออกแบบปกวิดีโอสั้น ของโรงเรียนเพื่อลงแข่งขัน ในงานกิจกรรมต่างๆของโรงเรียน และรับหน้าที่ตกแต่งรูปภาพต่างๆที่ถ่ายมาให้สวยงาม",
      tags: ["Graphic Design", "Video Cover", "Competition", "Photo Editing"],
      like_count: 0, 
      dislike_count: 0, 
      isLiked: false, 
      isDisliked: false,
      image: "/assets/images/works/IMG_20241127_142725.jpg",
      image_url: "/assets/images/works/IMG_20241127_142725.jpg"
    },
    { 
      id: 5, 
      title: "ในรูปคือการ ตรวจเช็คความเร็วอินเตอร์เน็ต",
      description: "ผมได้ช่วยอาจารย์เดินระบบอินเตอร์เน็ตในโรงเรียน และในรูปคือการ ตรวจเช็คความเร็วอินเตอร์เน็ต ว่ามีความเร็วตามที่ได้ติดตั้งไว้หรือไม่ ขั้นต่ำคือ 900 Mbps",
      tags: ["Network", "Internet Setup", "Speed Test", "IT Support", "Cabling"],
      like_count: 0, 
      dislike_count: 0, 
      isLiked: false, 
      isDisliked: false,
      image: "/assets/images/works/IMG20250506092117.jpg",
      image_url: "/assets/images/works/IMG20250506092117.jpg"
    },
    { 
      id: 6, 
      title: "ผมช่องลำโพงใช้เองง่ายๆ",
      description: "ผมได้ซ่อมลำโพงให้กลับมาใช้งานได้เองง่ายๆ และดัดแปลงเป็นปลูทูธ เพื่อให้สามารถเชื่อมต่อกับมือถือได้ และอุปกรณ์อื่นๆที่รองรับการเชื่อมต่อแบบปลูทูธ",
      tags: ["Electronics", "Repair", "Modification", "Bluetooth", "Audio"],
      like_count: 0, 
      dislike_count: 0, 
      isLiked: false, 
      isDisliked: false,
      image: "/assets/images/works/IMG20251004155815.jpg",
      image_url: "/assets/images/works/IMG20251004155815.jpg"
    },
    { 
      id: 7, 
      title: "ผมสร้าง botgame ใน Discord",
      description: "ผมได้สร้าง botgame ใน Discord ขึ้นมาเพื่อให้เพื่อนๆในเซิฟเวอร์ได้เล่นกัน โดยใช้ภาษา Python ในการเขียนโปรแกรม และใช้ไลบรารี discord.py เพื่อเชื่อมต่อกับ Discord API",
      tags: ["Python", "Discord Bot", "Programming", "API", "Game"],
      like_count: 0, 
      dislike_count: 0, 
      isLiked: false, 
      isDisliked: false,
      image: "/assets/images/works/discord.jpg",
      image_url: "/assets/images/works/discord.jpg"
    }
  ];
};

// ✅ Utility function สำหรับตรวจสอบ API status
export const checkAPIHealth = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/projects`);
    return res.ok;
  } catch (err) {
    return false;
  }
};

// ✅ Function สำหรับ simulate delay (สำหรับ testing)
export const simulateDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};