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

  const likeProjectById = async (id, isLike) => {
    try {
      // ✅ ลบ currentProject — เพราะไม่ได้ใช้
      const action = isLike ? 'like' : 'unlike';
      const { like_count } = await likeProject(id, action);

      const updatedProjects = projects.map(p => {
        if (p.id === id) {
          let updated = { ...p, like_count, isLiked: isLike };
          // ✅ ถ้า Like — ต้องยกเลิก Dislike
          if (isLike) {
            updated = { ...updated, isDisliked: false };
          }
          localStorage.setItem(`project_${id}`, JSON.stringify({ isLiked: updated.isLiked, isDisliked: updated.isDisliked }));
          return updated;
        }
        return p;
      });

      setProjects(updatedProjects);
    } catch (err) {
      console.error("Like toggle failed:", err);
    }
  };

  const dislikeProjectById = async (id, isDislike) => {
    try {
      // ✅ ลบ currentProject — เพราะไม่ได้ใช้
      const action = isDislike ? 'dislike' : 'undislike';
      const { dislike_count } = await dislikeProject(id, action);

      const updatedProjects = projects.map(p => {
        if (p.id === id) {
          let updated = { ...p, dislike_count, isDisliked: isDislike };
          // ✅ ถ้า Dislike — ต้องยกเลิก Like
          if (isDislike) {
            updated = { ...updated, isLiked: false };
          }
          localStorage.setItem(`project_${id}`, JSON.stringify({ isLiked: updated.isLiked, isDisliked: updated.isDisliked }));
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