import { useState, useEffect } from 'react';
import { mockProjects } from '../data/projects';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(mockProjects);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const likeProject = (id) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === id ? { ...p, like_count: (p.like_count || 0) + 1 } : p
      )
    );
  };

  return { projects, likeProject };
};