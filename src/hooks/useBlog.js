// useBlog.js
import { useState, useEffect } from 'react';
// ✅ อัปเดต path ให้อ่านจากไฟล์ใหม่
import { mockBlogPosts } from '../data/blog'; // (ปรับ path ตามโครงสร้างโปรเจกต์ของคุณ)

export const useBlog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(mockBlogPosts);
    }, 500); // จำลองการโหลดข้อมูล
    return () => clearTimeout(timer);
  }, []);

  return { posts };
};