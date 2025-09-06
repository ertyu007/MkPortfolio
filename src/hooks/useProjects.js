// src/hooks/useProjects.js
import { useState, useEffect } from 'react';
import { getProjects, likeProject } from '../utils/api';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        // Fallback to mock data
        setProjects([
          { id: 1, title: "Fallback Project", like_count: 0 }
        ]);
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

  return { projects, likeProject: likeProjectById };
};