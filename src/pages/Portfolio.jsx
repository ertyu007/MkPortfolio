import React, { useState, useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';
import { aiSearch } from '../utils/ai';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

// SVG Icons
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Portfolio = () => {
  const { projects, likeProject, dislikeProject, loading } = useProjects();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // ✅ ค้นหาเมื่อ search หรือ projects เปลี่ยน — ไม่ใช้ setTimeout
  useEffect(() => {
    const performSearch = async () => {
      if (!search.trim()) {
        setFiltered(projects);
        return;
      }

      setIsSearching(true);
      try {
        const aiResults = await aiSearch(search, projects);
        if (aiResults.length > 0) {
          setFiltered(aiResults);
          return;
        }
      } catch (err) {
        console.warn("AI Search failed, using keyword search:", err);
      }

      // ✅ Keyword search
      const keywordResults = projects.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase()) ||
        p.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
      setFiltered(keywordResults);
    };

    performSearch();
    setIsSearching(false);
  }, [search, projects]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            ผลงานของฉัน
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            ผลงานที่ผ่านการพัฒนาด้วยความตั้งใจ — พร้อมให้คุณสำรวจและประเมิน
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="ค้นหาผลงาน... (พิมพ์อะไรก็ได้)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            {isSearching && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}

        {/* Results */}
        {!loading && (
          <>
            {filtered.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {filtered.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="h-full"
                  >
                    <ProjectCard
                      project={project}
                      onLike={likeProject}
                      onDislike={dislikeProject}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20"
              >
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-12 shadow-xl max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <SearchIcon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">ไม่พบผลงาน</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    ไม่พบผลงานที่ตรงกับคำค้นหา "{search}"
                  </p>
                  <button
                    onClick={() => setSearch('')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    แสดงผลงานทั้งหมด
                  </button>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Stats Section */}
        {!loading && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg inline-flex items-center space-x-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                พบผลงาน {filtered.length} รายการ จากทั้งหมด {projects.length} รายการ
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Background Decoration */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full filter blur-3xl -z-10"></div>
      <div className="fixed bottom-20 right-10 w-72 h-72 bg-purple-300/20 rounded-full filter blur-3xl -z-10"></div>
    </div>
  );
};

export default Portfolio;