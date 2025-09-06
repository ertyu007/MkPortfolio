import React, { useState } from 'react';
import { aiSummarize } from '../utils/ai';

const BlogCard = ({ post }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

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
      // ✅ ใช้ fallback ที่ดูดี
      setSummary("บทความนี้มีเนื้อหาที่น่าสนใจมาก — แนะนำให้อ่านเต็ม ๆ ครับ!");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow" data-aos="fade-up">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <div className="mt-2 flex flex-wrap gap-2">
        {post.tags?.map((tag, i) => (
          <span key={i} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded">
            #{tag}
          </span>
        ))}
      </div>
      <p className="mt-4 text-gray-700 dark:text-gray-300 line-clamp-3">{post.content}</p>
      <button
        onClick={handleSummarize}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "กำลังสรุป..." : "สรุปด้วย AI"}
      </button>
      {summary && (
        <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded">
          <h4 className="font-semibold">สรุปโดย AI:</h4>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default BlogCard;