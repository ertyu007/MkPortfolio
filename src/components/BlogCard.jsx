// BlogCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { aiSummarize } from '../utils/ai'; // (ปรับ path ตามโครงสร้างโปรเจกต์ของคุณ)

const BlogCard = ({ post, index }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ นำ Logic การสรุป AI มาจากไฟล์เดิมของคุณ
  const handleSummarize = async () => {
    setLoading(true);
    try {
      if (!post?.content) {
        throw new Error("No content to summarize");
      }
      const result = await aiSummarize(post.content);
      setSummary(result);
    } catch (err) {
      console.error("AI Summarize Error:", err);
      setSummary("บทความนี้มีเนื้อหาที่น่าสนใจมาก — แนะนำให้อ่านเต็ม ๆ ครับ!");
    }
    setLoading(false);
  };

  // ✅ นำ UI และ Animation มาจาก Blog.jsx
  return (
    <motion.article
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
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* ✅ เพิ่มปุ่มและส่วนแสดงผล AI Summary */}
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "กำลังสรุป..." : "สรุปด้วย AI"}
        </button>

        {summary && (
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white">สรุปโดย AI:</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{summary}</p>
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default BlogCard;