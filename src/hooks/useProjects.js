import { useState, useEffect } from 'react';
import { getProjects, likeProject, dislikeProject } from '../utils/api';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ โหลด projects จาก API + โหลดสถานะจาก localStorage
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        
        // ✅ ดึงสถานะ Like/Dislike จาก localStorage
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
        // Fallback
        setProjects([
          { 
            id: 1, 
            title: "ระบบจัดการงานด้วย AI", 
            like_count: 0, 
            dislike_count: 0, 
            isLiked: false, 
            isDisliked: false,
            description: "พัฒนาด้วย React + Node.js + OpenAI API",
            tags: ["React", "AI", "Node.js"],
            image: "https://via.placeholder.com/400x200?text=AI+Project"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // ✅ Like Project
  const likeProjectById = async (id, isLike) => {
    try {
      const action = isLike ? 'like' : 'unlike';
      const { like_count } = await likeProject(id, action);

      setProjects(prev => {
        const updatedProjects = prev.map(p => {
          if (p.id === id) {
            let updated = { ...p, like_count, isLiked: isLike };
            // ✅ ถ้า Like — ต้องยกเลิก Dislike
            if (isLike) {
              updated = { ...updated, isDisliked: false };
            }
            // ✅ บันทึกสถานะลง localStorage
            localStorage.setItem(`project_${id}`, JSON.stringify({ 
              isLiked: updated.isLiked, 
              isDisliked: updated.isDisliked 
            }));
            return updated;
          }
          return p;
        });
        return updatedProjects;
      });
    } catch (err) {
      console.error("Like toggle failed:", err);
      alert("ไม่สามารถกด Like ได้ในขณะนี้");
    }
  };

  // ✅ Dislike Project
  const dislikeProjectById = async (id, isDislike) => {
    try {
      const action = isDislike ? 'dislike' : 'undislike';
      const { dislike_count } = await dislikeProject(id, action);

      setProjects(prev => {
        const updatedProjects = prev.map(p => {
          if (p.id === id) {
            let updated = { ...p, dislike_count, isDisliked: isDislike };
            // ✅ ถ้า Dislike — ต้องยกเลิก Like
            if (isDislike) {
              updated = { ...updated, isLiked: false };
            }
            // ✅ บันทึกสถานะลง localStorage
            localStorage.setItem(`project_${id}`, JSON.stringify({ 
              isLiked: updated.isLiked, 
              isDisliked: updated.isDisliked 
            }));
            return updated;
          }
          return p;
        });
        return updatedProjects;
      });
    } catch (err) {
      console.error("Dislike toggle failed:", err);
      alert("ไม่สามารถกด Dislike ได้ในขณะนี้");
    }
  };

  return { projects, likeProject: likeProjectById, dislikeProject: dislikeProjectById, loading };
};