// src/utils/api.js
// ✅ ใช้ process.env โดยตรง — ไม่ต้อง fallback ถ้า deploy แล้ว
const API_BASE = process.env.REACT_APP_API_URL;

if (!API_BASE) {
  console.warn("⚠️ REACT_APP_API_URL ไม่ได้ตั้งค่า — ใช้ localhost สำหรับ development");
}

export const getProjects = async () => {
  const url = `${API_BASE}/api/projects`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
  return res.json();
};

export const likeProject = async (id, action) => {
  const url = `${API_BASE}/api/projects/${id}/like`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error(`Failed to like project: ${res.status} ${res.statusText}`);
  return res.json();
};

export const dislikeProject = async (id, action) => {
  const url = `${API_BASE}/api/projects/${id}/dislike`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error(`Failed to dislike project: ${res.status} ${res.statusText}`);
  return res.json();
};

