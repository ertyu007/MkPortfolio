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

  const likeProjectById = async (id, isLike) => {
    try {
      if (isLike) {
        await likeProject(id, 'like');
      } else {
        await likeProject(id, 'unlike');
      }
      setProjects(prev =>
        prev.map(p =>
          p.id === id
            ? { ...p, isLiked: isLike, like_count: isLike ? p.like_count + 1 : p.like_count - 1 }
            : p
        )
      );
    } catch (err) {
      console.error("Like toggle failed:", err);
    }
  };

  const dislikeProjectById = async (id, isDislike) => {
    try {
      if (isDislike) {
        await dislikeProject(id, 'dislike');
      } else {
        await dislikeProject(id, 'undislike');
      }
      setProjects(prev =>
        prev.map(p =>
          p.id === id
            ? { ...p, isDisliked: isDislike, dislike_count: isDislike ? p.dislike_count + 1 : p.dislike_count - 1 }
            : p
        )
      );
    } catch (err) {
      console.error("Dislike toggle failed:", err);
    }
  };

  return { projects, likeProject: likeProjectById, dislikeProject: dislikeProjectById, loading };
};