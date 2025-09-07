// src/utils/api.js
const API_BASE = process.env.REACT_APP_API_URL || "";

// ✅ log ให้เห็นชัดเจน
if (!API_BASE) {
  console.warn("⚠️ REACT_APP_API_URL ไม่ได้ตั้งค่า — จะใช้โหมด mock data");
} else {
  console.log("🌐 API_BASE:", API_BASE);
}

// ฟังก์ชันดึง Projects
export const getProjects = async () => {
  if (!API_BASE) {
    // ✅ mock data เวลา dev หรือ .env ไม่ถูกตั้งค่า
    return [
      { id: 1, title: "Demo Project", description: "This is mock project data", likes: 10, dislikes: 0 },
      { id: 2, title: "Portfolio Website", description: "React + Tailwind + API", likes: 20, dislikes: 1 },
    ];
  }

  const url = `${API_BASE}/api/projects`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
  return res.json();
};

// ฟังก์ชันกด Like
export const likeProject = async (id, action) => {
  if (!API_BASE) {
    console.warn("⚠️ likeProject เรียกในโหมด mock → จะไม่ส่งจริง");
    return { success: true, id, action };
  }

  const url = `${API_BASE}/api/projects/${id}/like`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error(`Failed to like project: ${res.status} ${res.statusText}`);
  return res.json();
};

// ฟังก์ชันกด Dislike
export const dislikeProject = async (id, action) => {
  if (!API_BASE) {
    console.warn("⚠️ dislikeProject เรียกในโหมด mock → จะไม่ส่งจริง");
    return { success: true, id, action };
  }

  const url = `${API_BASE}/api/projects/${id}/dislike`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error(`Failed to dislike project: ${res.status} ${res.statusText}`);
  return res.json();
};
