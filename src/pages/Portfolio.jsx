import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const { projects, likeProject, dislikeProject, loading } = useProjects();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [modalProject, setModalProject] = useState(null);

  // ✅ รับ event จาก AI Chatbot
  useEffect(() => {
    const handleOpenModal = (e) => {
      setModalProject(e.detail);
    };
    window.addEventListener('openProjectModal', handleOpenModal);
    return () => window.removeEventListener('openProjectModal', handleOpenModal);
  }, []);

  useEffect(() => {
    setFiltered(projects);
  }, [projects]);

  const handleSearch = useCallback(() => {
    if (!search.trim()) {
      setFiltered(projects);
      return;
    }

    const results = projects.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase()) ||
      p.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    );
    setFiltered(results);
  }, [search, projects]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div id="portfolio" className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
        ผลงานของฉัน
      </h1>

      <div className="mb-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
        <input
          type="text"
          placeholder="ค้นหาผลงาน..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
        >
          ค้นหา
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProjectCard
                    project={project}
                    onLike={() => likeProject(project.id)}
                    onDislike={() => dislikeProject(project.id)}
                    openModal={modalProject?.id === project.id}
                    onModalClose={() => setModalProject(null)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">ไม่พบผลงานที่ตรงกับคำค้นหา</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Portfolio;