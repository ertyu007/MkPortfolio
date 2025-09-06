import { useState, useEffect } from 'react';
import { mockBlogPosts } from '../data/blog';

export const useBlog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(mockBlogPosts);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { posts };
};