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
        console.log('📥 Fetching projects from API...');
        const data = await getProjects();
        
        // ✅ ดึงสถานะ Like/Dislike จาก localStorage
        const enhancedProjects = data.map(p => {
          const saved = localStorage.getItem(`project_${p.id}`);
          if (saved) {
            const { isLiked, isDisliked } = JSON.parse(saved);
            console.log(`💾 Loaded state for project ${p.id}:`, { isLiked, isDisliked });
            return { ...p, isLiked: isLiked || false, isDisliked: isDisliked || false };
          }
          console.log(`🆕 New project ${p.id}: default state`);
          return { ...p, isLiked: false, isDisliked: false };
        });
        
        setProjects(enhancedProjects);
        console.log('✅ Projects loaded:', enhancedProjects);
      } catch (err) {
        console.error("❌ Failed to fetch projects:", err);
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

  // ✅ Like Project — พร้อม console.log
  const likeProjectById = async (id, isLike) => {
    try {
      console.log('🚀 Like project:', { id, isLike });
      const action = isLike ? 'like' : 'unlike';
      const { like_count } = await likeProject(id, action);
      console.log('✅ Like API response:', { like_count });

      setProjects(prev => {
        const updatedProjects = prev.map(p => {
          if (p.id === id) {
            let updated = { ...p, like_count, isLiked: isLike };
            // ✅ ถ้า Like — ต้องยกเลิก Dislike
            if (isLike) {
              console.log('🔄 Auto-unlike Dislike');
              updated = { ...updated, isDisliked: false };
            }
            // ✅ บันทึกสถานะลง localStorage
            localStorage.setItem(`project_${id}`, JSON.stringify({ 
              isLiked: updated.isLiked, 
              isDisliked: updated.isDisliked 
            }));
            console.log('💾 Saved state:', { id, isLiked: updated.isLiked, isDisliked: updated.isDisliked });
            return updated;
          }
          return p;
        });
        console.log('✅ Projects updated after like:', updatedProjects);
        return updatedProjects;
      });
    } catch (err) {
      console.error("❌ Like toggle failed:", err);
      alert("ไม่สามารถกด Like ได้ในขณะนี้");
    }
  };

  // ✅ Dislike Project — พร้อม console.log
  const dislikeProjectById = async (id, isDislike) => {
    try {
      console.log('🚀 Dislike project:', { id, isDislike });
      const action = isDislike ? 'dislike' : 'undislike';
      const { dislike_count } = await dislikeProject(id, action);
      console.log('✅ Dislike API response:', { dislike_count });

      setProjects(prev => {
        const updatedProjects = prev.map(p => {
          if (p.id === id) {
            let updated = { ...p, dislike_count, isDisliked: isDislike };
            // ✅ ถ้า Dislike — ต้องยกเลิก Like
            if (isDislike) {
              console.log('🔄 Auto-unlike Like');
              updated = { ...updated, isLiked: false };
            }
            // ✅ บันทึกสถานะลง localStorage
            localStorage.setItem(`project_${id}`, JSON.stringify({ 
              isLiked: updated.isLiked, 
              isDisliked: updated.isDisliked 
            }));
            console.log('💾 Saved state:', { id, isLiked: updated.isLiked, isDisliked: updated.isDisliked });
            return updated;
          }
          return p;
        });
        console.log('✅ Projects updated after dislike:', updatedProjects);
        return updatedProjects;
      });
    } catch (err) {
      console.error("❌ Dislike toggle failed:", err);
      alert("ไม่สามารถกด Dislike ได้ในขณะนี้");
    }
  };

  return { projects, likeProject: likeProjectById, dislikeProject: dislikeProjectById, loading };
};