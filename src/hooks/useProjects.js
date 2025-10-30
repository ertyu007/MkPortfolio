import { useState, useEffect } from 'react';
import { getProjects, likeProject, dislikeProject, checkAPIHealth } from '../utils/api';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState({});
  const [apiOnline, setApiOnline] = useState(true);
  // ❌ ลบบรรทัดนี้: const [pendingSync, setPendingSync] = useState([]);

  // ✅ ตรวจสอบสถานะ API
  useEffect(() => {
    const checkAPI = async () => {
      const online = await checkAPIHealth();
      setApiOnline(online);
      
      // ✅ ถ้า API กลับมาออนไลน์ ให้ sync pending actions
      if (online) {
        syncPendingActions();
      }
    };
    
    checkAPI();
    
    // ✅ ตรวจสอบ API ทุก 30 วินาที
    const interval = setInterval(checkAPI, 30000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Sync pending actions กับ server
  const syncPendingActions = async () => {
    const pending = JSON.parse(localStorage.getItem('pending_sync') || '[]');
    if (pending.length === 0) return;

    console.log(`🔄 Syncing ${pending.length} pending actions...`);
    
    for (const action of pending) {
      try {
        if (action.type === 'like') {
          await likeProject(action.projectId, action.currentStatus);
        } else if (action.type === 'dislike') {
          await dislikeProject(action.projectId, action.currentStatus);
        }
        
        // ✅ ลบ action ที่ sync สำเร็จแล้ว
        const updatedPending = pending.filter(a => 
          !(a.projectId === action.projectId && a.type === action.type)
        );
        localStorage.setItem('pending_sync', JSON.stringify(updatedPending));
        
      } catch (err) {
        console.error(`❌ Failed to sync ${action.type} for project ${action.projectId}:`, err);
      }
    }
  };

  // ✅ โหลด projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        
        const enhancedProjects = data.map(p => {
          // ✅ โหลดสถานะจาก localStorage เป็นหลัก
          const saved = localStorage.getItem(`project_${p.id}`);
          if (saved) {
            const { isLiked, isDisliked, localLikeCount, localDislikeCount } = JSON.parse(saved);
            return { 
              ...p,
              image: p.image_url || p.image,
              isLiked: isLiked || false, 
              isDisliked: isDisliked || false,
              like_count: localLikeCount !== undefined ? localLikeCount : p.like_count,
              dislike_count: localDislikeCount !== undefined ? localDislikeCount : p.dislike_count
            };
          }
          
          return {
            ...p,
            image: p.image_url || p.image,
            isLiked: false,
            isDisliked: false
          };
        });
        
        setProjects(enhancedProjects);
        
        // ✅ Sync pending actions เมื่อโหลด projects เสร็จ
        if (apiOnline) {
          syncPendingActions();
        }
      } catch (err) {
        console.error("❌ Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // ✅ ฟังก์ชันบันทึกสถานะลง localStorage
  const saveToLocalStorage = (projectId, updates) => {
    const existing = JSON.parse(localStorage.getItem(`project_${projectId}`) || '{}');
    const updated = { ...existing, ...updates };
    localStorage.setItem(`project_${projectId}`, JSON.stringify(updated));
  };

  // ✅ ฟังก์ชันเพิ่ม pending action
  const addPendingAction = (type, projectId, currentStatus) => {
    const pending = JSON.parse(localStorage.getItem('pending_sync') || '[]');
    
    // ✅ ตรวจสอบว่าไม่มี action ซ้ำ
    const existingIndex = pending.findIndex(a => 
      a.projectId === projectId && a.type === type
    );
    
    if (existingIndex >= 0) {
      pending[existingIndex] = { type, projectId, currentStatus, timestamp: Date.now() };
    } else {
      pending.push({ type, projectId, currentStatus, timestamp: Date.now() });
    }
    
    localStorage.setItem('pending_sync', JSON.stringify(pending));
  };

  // ✅ ฟังก์ชันจัดการ Like - แบบ localStorage-first
  const likeProjectById = async (id) => {
    if (isProcessing[id]) return;
    
    setIsProcessing(prev => ({ ...prev, [id]: true }));
    
    const project = projects.find(p => p.id === id);
    if (!project) return;

    try {
      const currentStatus = {
        isLiked: project.isLiked,
        isDisliked: project.isDisliked
      };

      // ✅ คำนวณค่าใหม่
      const newIsLiked = !project.isLiked;
      const newIsDisliked = newIsLiked ? false : project.isDisliked;
      
      const newLikeCount = newIsLiked 
        ? (project.like_count || 0) + 1 
        : Math.max(0, (project.like_count || 0) - 1);
      
      const newDislikeCount = newIsLiked && project.isDisliked 
        ? Math.max(0, (project.dislike_count || 0) - 1)
        : project.dislike_count;

      // ✅ 1. อัพเดต state ทันที
      setProjects(prev => prev.map(p => 
        p.id === id ? {
          ...p,
          isLiked: newIsLiked,
          isDisliked: newIsDisliked,
          like_count: newLikeCount,
          dislike_count: newDislikeCount
        } : p
      ));

      // ✅ 2. บันทึกลง localStorage เป็นหลัก
      saveToLocalStorage(id, {
        isLiked: newIsLiked,
        isDisliked: newIsDisliked,
        localLikeCount: newLikeCount,
        localDislikeCount: newDislikeCount,
        lastUpdated: Date.now()
      });

      // ✅ 3. เพิ่ม pending action สำหรับ sync กับ server
      addPendingAction('like', id, currentStatus);

      // ✅ 4. พยายาม sync กับ server ทันทีถ้าออนไลน์
      if (apiOnline) {
        try {
          await likeProject(id, currentStatus);
          
          // ✅ ลบ pending action เมื่อ sync สำเร็จ
          const pending = JSON.parse(localStorage.getItem('pending_sync') || '[]');
          const updatedPending = pending.filter(a => 
            !(a.projectId === id && a.type === 'like')
          );
          localStorage.setItem('pending_sync', JSON.stringify(updatedPending));
          
        } catch (err) {
          console.warn("⚠️ Immediate sync failed, keeping in pending queue");
        }
      }
      
    } catch (err) {
      console.error("❌ Like operation failed:", err);
    } finally {
      setIsProcessing(prev => ({ ...prev, [id]: false }));
    }
  };

  // ✅ ฟังก์ชันจัดการ Dislike - แบบ localStorage-first
  const dislikeProjectById = async (id) => {
    if (isProcessing[id]) return;
    
    setIsProcessing(prev => ({ ...prev, [id]: true }));

    const project = projects.find(p => p.id === id);
    if (!project) return;

    try {
      const currentStatus = {
        isLiked: project.isLiked,
        isDisliked: project.isDisliked
      };

      // ✅ คำนวณค่าใหม่
      const newIsDisliked = !project.isDisliked;
      const newIsLiked = newIsDisliked ? false : project.isLiked;
      
      const newDislikeCount = newIsDisliked 
        ? (project.dislike_count || 0) + 1 
        : Math.max(0, (project.dislike_count || 0) - 1);
      
      const newLikeCount = newIsDisliked && project.isLiked 
        ? Math.max(0, (project.like_count || 0) - 1)
        : project.like_count;

      // ✅ 1. อัพเดต state ทันที
      setProjects(prev => prev.map(p => 
        p.id === id ? {
          ...p,
          isDisliked: newIsDisliked,
          isLiked: newIsLiked,
          dislike_count: newDislikeCount,
          like_count: newLikeCount
        } : p
      ));

      // ✅ 2. บันทึกลง localStorage เป็นหลัก
      saveToLocalStorage(id, {
        isLiked: newIsLiked,
        isDisliked: newIsDisliked,
        localLikeCount: newLikeCount,
        localDislikeCount: newDislikeCount,
        lastUpdated: Date.now()
      });

      // ✅ 3. เพิ่ม pending action สำหรับ sync กับ server
      addPendingAction('dislike', id, currentStatus);

      // ✅ 4. พยายาม sync กับ server ทันทีถ้าออนไลน์
      if (apiOnline) {
        try {
          await dislikeProject(id, currentStatus);
          
          // ✅ ลบ pending action เมื่อ sync สำเร็จ
          const pending = JSON.parse(localStorage.getItem('pending_sync') || '[]');
          const updatedPending = pending.filter(a => 
            !(a.projectId === id && a.type === 'dislike')
          );
          localStorage.setItem('pending_sync', JSON.stringify(updatedPending));
          
        } catch (err) {
          console.warn("⚠️ Immediate sync failed, keeping in pending queue");
        }
      }
      
    } catch (err) {
      console.error("❌ Dislike operation failed:", err);
    } finally {
      setIsProcessing(prev => ({ ...prev, [id]: false }));
    }
  };

  // ✅ ฟังก์ชัน manual sync
  const manualSync = async () => {
    if (!apiOnline) {
      alert('⚠️ ไม่สามารถ sync ได้เพราะไม่มีอินเทอร์เน็ต');
      return;
    }
    
    await syncPendingActions();
    alert('✅ Sync ข้อมูลเรียบร้อยแล้ว');
  };

  return { 
    projects, 
    likeProject: likeProjectById, 
    dislikeProject: dislikeProjectById, 
    loading,
    apiOnline,
    manualSync,
    pendingSyncCount: JSON.parse(localStorage.getItem('pending_sync') || '[]').length
  };
};