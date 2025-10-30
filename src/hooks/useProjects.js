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
        // Fallback data จะถูกจัดการใน getProjects() แล้ว
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // ✅ Like Project
  const likeProjectById = async (id, isLike) => {
    if (isProcessing[id]) return;
    
    setIsProcessing(prev => ({ ...prev, [id]: true }));
    
    try {
      const action = isLike ? 'like' : 'unlike';
      
      // ✅ Optimistic update
      setProjects(prev => {
        return prev.map(p => {
          if (p.id === id) {
            const updated = { 
              ...p, 
              isLiked: isLike,
              isDisliked: isLike ? false : p.isDisliked,
              like_count: isLike 
                ? (p.like_count || 0) + 1 
                : Math.max(0, (p.like_count || 0) - 1),
              dislike_count: isLike && p.isDisliked 
                ? Math.max(0, (p.dislike_count || 0) - 1)
                : p.dislike_count
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

      // ✅ Call API
      if (apiOnline) {
        const { like_count } = await likeProject(id, action);
        
        // ✅ Sync กับ response จาก API
        setProjects(prev => prev.map(p => 
          p.id === id ? { ...p, like_count } : p
        ));
      }
      
    } catch (err) {
      console.error("❌ Like toggle failed:", err);
      // ✅ Rollback on error
      setProjects(prev => prev.map(p => 
        p.id === id ? { 
          ...p, 
          isLiked: !isLike,
          like_count: isLike 
            ? Math.max(0, (p.like_count || 0) - 1)
            : (p.like_count || 0) + 1
        } : p
      ));
    } finally {
      setIsProcessing(prev => ({ ...prev, [id]: false }));
    }
  };

  // ✅ Dislike Project
  const dislikeProjectById = async (id, isDislike) => {
    if (isProcessing[id]) return;
    
    setIsProcessing(prev => ({ ...prev, [id]: true }));

    try {
      const action = isDislike ? 'dislike' : 'undislike';
      
      // ✅ Optimistic update
      setProjects(prev => {
        return prev.map(p => {
          if (p.id === id) {
            const updated = { 
              ...p, 
              isDisliked: isDislike,
              isLiked: isDislike ? false : p.isLiked,
              dislike_count: isDislike 
                ? (p.dislike_count || 0) + 1 
                : Math.max(0, (p.dislike_count || 0) - 1),
              like_count: isDislike && p.isLiked 
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

      // ✅ Call API
      if (apiOnline) {
        const { dislike_count } = await dislikeProject(id, action);
        
        // ✅ Sync กับ response จาก API
        setProjects(prev => prev.map(p => 
          p.id === id ? { ...p, dislike_count } : p
        ));
      }
      
    } catch (err) {
      console.error("❌ Dislike toggle failed:", err);
      // ✅ Rollback on error
      setProjects(prev => prev.map(p => 
        p.id === id ? { 
          ...p, 
          isDisliked: !isDislike,
          dislike_count: isDislike 
            ? Math.max(0, (p.dislike_count || 0) - 1)
            : (p.dislike_count || 0) + 1
        } : p
      ));
    } finally {
      setIsProcessing(prev => ({ ...prev, [id]: false }));
    }
  };

  // ✅ ฟังก์ชันสำหรับอัพเดท project โดยตรง
  const updateProject = (updatedProject) => {
    setProjects(prev => prev.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    ));
  };

  return { 
    projects, 
    likeProject: likeProjectById, 
    dislikeProject: dislikeProjectById, 
    updateProject,
    loading,
    apiOnline // ✅ เพิ่มสถานะ API
  };
};