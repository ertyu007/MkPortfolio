// Blog.jsx
import React, { useState } from 'react';
import { useBlog } from '../hooks/useBlog'; // (ปรับ path)
import BlogCard from '../components/BlogCard'; // (ปรับ path)

const Blog = () => {
  const [search, setSearch] = useState('');
  const { posts } = useBlog(); // ✅ เรียกใช้ Hook เพื่อดึงข้อมูล

  // ✅ Logic การกรองยังคงเหมือนเดิม
  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    p.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">บทความของฉัน</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">ความรู้และประสบการณ์ที่ผมแบ่งปัน</p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาบทความ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-4 pl-12 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-lg"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* ✅ เรียกใช้ BlogCard ที่เราปรับปรุงใหม่ */}
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">ไม่พบบทความ</h3>
            <p className="text-gray-600 dark:text-gray-400">ลองค้นหาด้วยคำอื่นๆ หรือดูบทความทั้งหมด</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;