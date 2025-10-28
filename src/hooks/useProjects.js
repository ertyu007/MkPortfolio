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
        
        // ✅ Map ข้อมูลจากฐานข้อมูลให้ตรงกับ frontend
        const enhancedProjects = data.map(p => {
          // ✅ แก้ไขตรงนี้: map image_url เป็น image
          const mappedProject = {
            ...p,
            image: p.image_url || p.image, // ใช้ image_url จาก DB เป็น image ใน frontend
            isLiked: false,
            isDisliked: false
          };

          // ✅ ดึงสถานะ Like/Dislike จาก localStorage
          const saved = localStorage.getItem(`project_${p.id}`);
          if (saved) {
            const { isLiked, isDisliked } = JSON.parse(saved);
            console.log(`💾 Loaded state for project ${p.id}:`, { isLiked, isDisliked });
            return { 
              ...mappedProject, 
              isLiked: isLiked || false, 
              isDisliked: isDisliked || false 
            };
          }
          console.log(`🆕 New project ${p.id}: default state`);
          return mappedProject;
        });
        
        setProjects(enhancedProjects);
        console.log('✅ Projects loaded:', enhancedProjects);
      } catch (err) {
        console.error("❌ Failed to fetch projects:", err);
        // Fallback - ใช้ mock data ที่มี image property ถูกต้อง
        setProjects([
          { 
            id: 1, 
            title: "ผมได้เป็นหนึ่งใน สภานักเรียน",
            description: "ผมได้เป็นหนึ่งใน สภานักเรียน มีหน้าทีช่วยดูแลและรับหน้าที่ จัดการควมคุ้มเครื่องเสียงเนื่องในกิจกรรมต่างๆ และเป็นตากล้องของโรงเรียน และช่วยเหลือครูในงานต่างๆที่เกี่ยวกับ อิเล็กทรอนิกส์ หรือ IT ",
            tags: ["Student Council", "Sound System", "Photography", "IT Support"],
            like_count: 0, 
            dislike_count: 0, 
            isLiked: false, 
            isDisliked: false,
            image: "/assets/images/works/1740286124834.jpg"
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