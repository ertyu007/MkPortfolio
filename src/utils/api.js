// src/utils/api.js
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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

fetch('https://thnapazones.onrender.com/api/projects')
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);