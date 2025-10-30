// BlogCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { aiSummarize } from '../utils/ai';

const BlogCard = ({ post, index }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 80,
        damping: 15
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/30"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"
        animate={{
          background: isHovered 
            ? [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
                "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)"
              ]
            : "linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)"
        }}
        transition={{ duration: 1, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
      />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute -top-10 -right-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative overflow-hidden">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        />
      </div>
      
      <div className="relative p-6 z-10">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>
        
        <motion.h3 
          className="text-xl font-bold text-gray-900 dark:text-white mb-3 cursor-pointer"
          whileHover={{ color: "#4f46e5" }}
          transition={{ duration: 0.2 }}
        >
          {post.title}
        </motion.h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
          {post.excerpt}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, tagIndex) => (
            <motion.span
              key={tagIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + (tagIndex * 0.1) }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-3 py-1 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs rounded-full backdrop-blur-sm border border-blue-500/20"
            >
              #{tag}
            </motion.span>
          ))}
        </div>

        {/* AI Summary Button */}
        <motion.button
          onClick={handleSummarize}
          disabled={loading}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg disabled:opacity-50 transition-all duration-300 backdrop-blur-sm border border-white/20"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
            />
          ) : (
            "สรุปด้วย AI"
          )}
        </motion.button>

        {summary && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 p-4 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl backdrop-blur-sm border border-indigo-500/20"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">สรุปโดย AI:</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{summary}</p>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
};

export default BlogCard;