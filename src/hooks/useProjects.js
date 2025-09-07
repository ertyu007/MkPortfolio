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
        // ✅ เพิ่มสถานะ isLiked/isDisliked สำหรับแต่ละ project
        const enhancedProjects = data.map(p => ({
          ...p,
          isLiked: false,
          isDisliked: false,
          like_count: p.like_count || 0,
          dislike_count: p.dislike_count || 0
        }));
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

  // ✅ ใน useProjects.js
  const likeProjectById = async (id, isLike) => {
    try {
      const { like_count } = await likeProject(id, isLike ? 'like' : 'unlike');
      setProjects(prev =>
        prev.map(p => p.id === id ? { ...p, like_count, isLiked: isLike } : p)
      );
    } catch (err) {
      console.error("Like toggle failed:", err);
    }
  };

  const dislikeProjectById = async (id, isDislike) => {
    try {
      const { dislike_count } = await dislikeProject(id, isDislike ? 'dislike' : 'undislike');
      setProjects(prev =>
        prev.map(p => p.id === id ? { ...p, dislike_count, isDisliked: isDislike } : p)
      );
    } catch (err) {
      console.error("Dislike toggle failed:", err);
    }
  };

  return { projects, likeProject: likeProjectById, dislikeProject: dislikeProjectById, loading };
};