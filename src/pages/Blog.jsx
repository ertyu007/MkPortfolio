// Blog.jsx
import React, { useState } from 'react';
import { useBlog } from '../hooks/useBlog';
import BlogCard from '../components/BlogCard';
import { motion } from 'framer-motion';

const Blog = () => {
  const [search, setSearch] = useState('');
  const { posts } = useBlog();

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    p.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-gray-900 dark:via-blue-950/50 dark:to-purple-950/50 py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, 30, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            บทความของฉัน
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            ความรู้และประสบการณ์ที่ผมแบ่งปัน • แรงบันดาลใจในการสร้างสรรค์
          </motion.p>
        </motion.div>

        {/* Search */}
        <motion.div 
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            <motion.input
              type="text"
              placeholder="ค้นหาบทความ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-5 pl-14 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 transition-all duration-300 text-gray-900 dark:text-white text-lg placeholder-gray-500 dark:placeholder-gray-400 shadow-2xl"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.div 
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
              animate={{ rotate: search ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.div>
            
            {search && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Posts Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-6xl mb-6"
            >
              🔍
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">ไม่พบบทความ</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">ลองค้นหาด้วยคำอื่นๆ หรือดูบทความทั้งหมด</p>
            <motion.button
              onClick={() => setSearch('')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              แสดงบทความทั้งหมด
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;