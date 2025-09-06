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
        // ✅ เพิ่ม dislike_count ถ้ายังไม่มี
        const projectsWithDislike = data.map(p => ({
          ...p,
          dislike_count: p.dislike_count || 0
        }));
        setProjects(projectsWithDislike);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setProjects([
          { id: 1, title: "Fallback Project", like_count: 0, dislike_count: 0 }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const likeProjectById = async (id) => {
    try {
      const { like_count } = await likeProject(id);
      setProjects(prev =>
        prev.map(p => p.id === id ? { ...p, like_count } : p)
      );
    } catch (err) {
      console.error("Like failed:", err);
      alert("ไม่สามารถกด Like ได้ในขณะนี้");
    }
  };

  const dislikeProjectById = async (id) => {
    try {
      const { dislike_count } = await dislikeProject(id);
      setProjects(prev =>
        prev.map(p => p.id === id ? { ...p, dislike_count } : p)
      );
    } catch (err) {
      console.error("Dislike failed:", err);
      alert("ไม่สามารถกด Dislike ได้ในขณะนี้");
    }
  };

  return { projects, likeProject: likeProjectById, dislikeProject: dislikeProjectById, loading };
};