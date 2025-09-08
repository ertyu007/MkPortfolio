import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  const [search, setSearch] = useState('');

  const posts = [
    {
      id: 1,
      title: "การเริ่มต้นเรียนรู้ระบบเครือข่าย",
      excerpt: "ระบบเครือข่ายเป็นพื้นฐานสำคัญสำหรับโลกยุคดิจิทัล บทความนี้จะพาคุณรู้จักกับพื้นฐานของระบบเครือข่าย อุปกรณ์ที่ใช้ และแนวคิดเบื้องต้นที่ควรรู้",
      image: "https://via.placeholder.com/400x200/3b82f6/ffffff?text=Network+Basics",
      tags: ["Network", "Beginner", "Technology"],
      date: "2025-09-01",
      readTime: "5 นาที"
    },
    {
      id: 2,
      title: "เทคนิคการเข้าหัวสาย LAN อย่างมืออาชีพ",
      excerpt: "การเข้าหัวสาย LAN เป็นทักษะพื้นฐานที่สำคัญสำหรับผู้ที่สนใจด้านเครือข่าย บทความนี้จะสอนเทคนิคการเข้าหัวสาย CAT5e และ CAT6 อย่างถูกต้อง",
      image: "https://via.placeholder.com/400x200/8b5cf6/ffffff?text=LAN+Cabling",
      tags: ["LAN", "CAT5e", "CAT6", "Tutorial"],
      date: "2025-08-15",
      readTime: "8 นาที"
    },
    {
      id: 3,
      title: "การวางแผนศึกษาต่อคณะวิศวกรรมศาสตร์",
      excerpt: "การวางแผนศึกษาต่อเป็นสิ่งสำคัญ บทความนี้จะแนะนำวิธีการเตรียมตัวสอบเข้าคณะวิศวกรรมศาสตร์ สาขาเครือข่าย มหาวิทยาลัยขอนแก่น",
      image: "https://via.placeholder.com/400x200/6366f1/ffffff?text=Engineering+Plan",
      tags: ["Education", "Engineering", "Planning"],
      date: "2025-07-20",
      readTime: "10 นาที"
    }
  ];

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
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

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