import { useState, useEffect } from 'react';
import { getProjects, likeProject, dislikeProject } from '../utils/api';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        // ✅ ดึงค่า isLiked/isDisliked จาก localStorage — ถ้ามี
        const enhancedProjects = data.map(p => {
          const saved = localStorage.getItem(`project_${p.id}`);
          if (saved) {
            const { isLiked, isDisliked } = JSON.parse(saved);
            return { ...p, isLiked: isLiked || false, isDisliked: isDisliked || false };
          }
          return { ...p, isLiked: false, isDisliked: false };
        });
        setProjects(enhancedProjects);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setProjects([
          { id: 1, title: "Fallback Project", like_count: 0, dislike_count: 0, isLiked: false, isDisliked: false }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const likeProjectById = async (id) => {
    try {
      // ✅ ดึง project ปัจจุบัน
      const currentProject = projects.find(p => p.id === id);
      const newIsLiked = !currentProject.isLiked;
      const action = newIsLiked ? 'like' : 'unlike';

      // ✅ อัปเดต server
      const { like_count } = await likeProject(id, action);

      // ✅ อัปเดต state
      const updatedProjects = projects.map(p => {
        if (p.id === id) {
          const updated = { ...p, like_count, isLiked: newIsLiked };
          // ✅ บันทึกใน localStorage
          localStorage.setItem(`project_${id}`, JSON.stringify({ isLiked: newIsLiked, isDisliked: p.isDisliked }));
          return updated;
        }
        return p;
      });

      setProjects(updatedProjects);
    } catch (err) {
      console.error("Like toggle failed:", err);
    }
  };

  const dislikeProjectById = async (id) => {
    try {
      // ✅ ดึง project ปัจจุบัน
      const currentProject = projects.find(p => p.id === id);
      const newIsDisliked = !currentProject.isDisliked;
      const action = newIsDisliked ? 'dislike' : 'undislike';

      // ✅ อัปเดต server
      const { dislike_count } = await dislikeProject(id, action);

      // ✅ อัปเดต state
      const updatedProjects = projects.map(p => {
        if (p.id === id) {
          const updated = { ...p, dislike_count, isDisliked: newIsDisliked };
          // ✅ บันทึกใน localStorage
          localStorage.setItem(`project_${id}`, JSON.stringify({ isLiked: p.isLiked, isDisliked: newIsDisliked }));
          return updated;
        }
        return p;
      });

      setProjects(updatedProjects);
    } catch (err) {
      console.error("Dislike toggle failed:", err);
    }
  };

  return { projects, likeProject: likeProjectById, dislikeProject: dislikeProjectById, loading };
};