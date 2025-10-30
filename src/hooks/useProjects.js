import { useState, useEffect } from 'react';
import { getProjects, likeProject, dislikeProject, checkAPIHealth } from '../utils/api';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState({});
  const [apiOnline, setApiOnline] = useState(true);

  // ✅ ตรวจสอบสถานะ API
  useEffect(() => {
    const checkAPI = async () => {
      const online = await checkAPIHealth();
      setApiOnline(online);
      if (!online) {
        console.warn("⚠️ API is offline, using fallback mode");
      }
    };
    checkAPI();
  }, []);

  // ✅ โหลด projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        
        const enhancedProjects = data.map(p => {
          const mappedProject = {
            ...p,
            image: p.image_url || p.image,
            isLiked: false,
            isDisliked: false
          };

          // โหลดสถานะจาก localStorage
          const saved = localStorage.getItem(`project_${p.id}`);
          if (saved) {
            const { isLiked, isDisliked } = JSON.parse(saved);
            return { 
              ...mappedProject, 
              isLiked: isLiked || false, 
              isDisliked: isDisliked || false 
            };
          }
          return mappedProject;
        });
        
        setProjects(enhancedProjects);
      } catch (err) {
        console.error("❌ Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // ✅ ฟังก์ชันจัดการ Like ใหม่
  const likeProjectById = async (id) => {
    if (isProcessing[id]) return;
    
    setIsProcessing(prev => ({ ...prev, [id]: true }));
    
    const project = projects.find(p => p.id === id);
    if (!project) return;

    // ✅ บันทึกสถานะเดิมสำหรับ rollback
    const originalProject = { ...project };

    try {
      const currentStatus = {
        isLiked: project.isLiked,
        isDisliked: project.isDisliked
      };

      // ✅ Optimistic update
      setProjects(prev => {
        return prev.map(p => {
          if (p.id === id) {
            const newIsLiked = !p.isLiked;
            const newIsDisliked = newIsLiked ? false : p.isDisliked;
            
            const updated = {
              ...p,
              isLiked: newIsLiked,
              isDisliked: newIsDisliked,
              like_count: newIsLiked 
                ? (p.like_count || 0) + 1 
                : Math.max(0, (p.like_count || 0) - 1),
              dislike_count: newIsLiked && p.isDisliked 
                ? Math.max(0, (p.dislike_count || 0) - 1)
                : p.dislike_count
            };
            
            // บันทึกสถานะลง localStorage
            localStorage.setItem(`project_${id}`, JSON.stringify({ 
              isLiked: updated.isLiked, 
              isDisliked: updated.isDisliked 
            }));
            
            return updated;
          }
          return p;
        });
      });

      // ✅ Call API ถ้าออนไลน์
      if (apiOnline) {
        const result = await likeProject(id, currentStatus);
        
        // ✅ Sync กับ response จาก API
        setProjects(prev => prev.map(p => 
          p.id === id ? { 
            ...p, 
            like_count: result.like_count || p.like_count,
            dislike_count: result.dislike_count || p.dislike_count
          } : p
        ));
      }
      
    } catch (err) {
      console.error("❌ Like toggle failed:", err);
      // ✅ Rollback on error
      setProjects(prev => prev.map(p => 
        p.id === id ? originalProject : p
      ));
    } finally {
      setIsProcessing(prev => ({ ...prev, [id]: false }));
    }
  };

  // ✅ ฟังก์ชันจัดการ Dislike ใหม่
  const dislikeProjectById = async (id) => {
    if (isProcessing[id]) return;
    
    setIsProcessing(prev => ({ ...prev, [id]: true }));

    const project = projects.find(p => p.id === id);
    if (!project) return;

    // ✅ บันทึกสถานะเดิมสำหรับ rollback
    const originalProject = { ...project };

    try {
      const currentStatus = {
        isLiked: project.isLiked,
        isDisliked: project.isDisliked
      };

      // ✅ Optimistic update
      setProjects(prev => {
        return prev.map(p => {
          if (p.id === id) {
            const newIsDisliked = !p.isDisliked;
            const newIsLiked = newIsDisliked ? false : p.isLiked;
            
            const updated = {
              ...p,
              isDisliked: newIsDisliked,
              isLiked: newIsLiked,
              dislike_count: newIsDisliked 
                ? (p.dislike_count || 0) + 1 
                : Math.max(0, (p.dislike_count || 0) - 1),
              like_count: newIsDisliked && p.isLiked 
                ? Math.max(0, (p.like_count || 0) - 1)
                : p.like_count
            };
            
            localStorage.setItem(`project_${id}`, JSON.stringify({ 
              isLiked: updated.isLiked, 
              isDisliked: updated.isDisliked 
            }));
            
            return updated;
          }
          return p;
        });
      });

      // ✅ Call API ถ้าออนไลน์
      if (apiOnline) {
        const result = await dislikeProject(id, currentStatus);
        
        // ✅ Sync กับ response จาก API
        setProjects(prev => prev.map(p => 
          p.id === id ? { 
            ...p, 
            like_count: result.like_count || p.like_count,
            dislike_count: result.dislike_count || p.dislike_count
          } : p
        ));
      }
      
    } catch (err) {
      console.error("❌ Dislike toggle failed:", err);
      // ✅ Rollback on error
      setProjects(prev => prev.map(p => 
        p.id === id ? originalProject : p
      ));
    } finally {
      setIsProcessing(prev => ({ ...prev, [id]: false }));
    }
  };

  return { 
    projects, 
    likeProject: likeProjectById, 
    dislikeProject: dislikeProjectById, 
    loading,
    apiOnline
  };
};