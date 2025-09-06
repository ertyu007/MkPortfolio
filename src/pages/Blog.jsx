import React, { useState, useEffect } from 'react';
import { useBlog } from '../hooks/useBlog';
import BlogCard from '../components/BlogCard';

const Blog = () => {
  const { posts } = useBlog();
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(posts);
  }, [posts]);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(posts);
      return;
    }
    const results = posts.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    );
    setFiltered(results);
  }, [search, posts]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">บทความของฉัน</h1>

      <input
        type="text"
        placeholder="ค้นหาบทความ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md mx-auto px-4 py-2 border rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="space-y-8">
        {filtered.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;