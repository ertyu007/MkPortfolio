const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getProjects = async () => {
  const res = await fetch(`${API_BASE}/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

export const likeProject = async (id) => {
  const res = await fetch(`${API_BASE}/api/projects/${id}/like`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error("Failed to like project");
  return res.json();
};

export const dislikeProject = async (id) => {
  const res = await fetch(`${API_BASE}/api/projects/${id}/dislike`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error("Failed to dislike project");
  return res.json();
};