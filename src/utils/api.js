// src/utils/api.js
const API_BASE = process.env.REACT_APP_API_URL || "";

// ✅ log ให้เห็นชัดเจน
// if (!API_BASE) {
//   console.warn("⚠️ REACT_APP_API_URL ไม่ได้ตั้งค่า — จะใช้โหมด mock data");
// } else {
//   console.log("🌐 API_BASE:", API_BASE);
// }

// ฟังก์ชันดึง Projects
export const getProjects = async () => {
  const res = await fetch(`${API_BASE}/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

export const likeProject = async (id, action) => {
  const res = await fetch(`${API_BASE}/api/projects/${id}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error("Failed to like project");
  return res.json();
};

export const dislikeProject = async (id, action) => {
  const res = await fetch(`${API_BASE}/api/projects/${id}/dislike`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error("Failed to dislike project");
  return res.json();
};
