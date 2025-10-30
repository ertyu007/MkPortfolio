// Portfolio.jsx
import React, { useState, useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';
import { aiSearch } from '../utils/ai';
import ProjectCard from '../components/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Icons (ส่วนนี้เหมือนเดิม)
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Like/Dislike Icons (สำหรับแสดงสถานะอย่างเดียว)
const LikeIcon = ({ isLiked }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={isLiked ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
  </svg>
);

const DislikeIcon = ({ isDisliked }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={isDisliked ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
  </svg>
);

// Animation Variants (ส่วนนี้เหมือนเดิม)
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      mass: 0.8
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: {
      duration: 0.15,
      ease: "easeOut"
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.15,
      delay: 0.05 
    }
  }
};

const Portfolio = () => {
  // ✅ รับค่าทั้งหมดจาก hook รวมถึง pendingSyncCount และ manualSync
  const { 
    projects, 
    likeProject, 
    dislikeProject, 
    loading, 
    apiOnline,
    manualSync,
    pendingSyncCount 
  } = useProjects();
  
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Debounce search (ส่วนนี้เหมือนเดิม)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Lock scroll when modal is open (ส่วนนี้เหมือนเดิม)
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.paddingRight = '0px';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.paddingRight = '0px';
    };
  }, [selectedProject]);

  // ✅ ค้นหาเมื่อ debouncedSearch หรือ projects เปลี่ยน (ส่วนนี้เหมือนเดิม)
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearch.trim()) {
        setFiltered(projects);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        // ลองใช้ AI Search ก่อน
        if (typeof aiSearch === 'function') {
          const aiResults = await aiSearch(debouncedSearch, projects);
          if (aiResults.length > 0) {
            setFiltered(aiResults);
            setIsSearching(false);
            return;
          }
        }
      } catch (err) {
        console.warn("AI Search failed, using keyword search:", err);
      }

      // ✅ Keyword search fallback
      const keywordResults = projects.filter(p =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.description?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.tags?.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()))
      );
      setFiltered(keywordResults);
      setIsSearching(false);
    };

    performSearch();
  }, [debouncedSearch, projects]);

  const handleOpenModal = (project) => {
    if (isAnimating) return;
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    if (isAnimating || !selectedProject) return;
    
    setIsAnimating(true);
    setSelectedProject(null);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

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
          
          {/* ✅ แก้ไขส่วนนี้ - ใช้ pendingSyncCount และ manualSync ที่รับมาจาก hook */}
          {!apiOnline && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-lg text-sm">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
              โหมดออฟไลน์ - มี {pendingSyncCount} การเปลี่ยนแปลงที่รอ sync
              <button 
                onClick={manualSync}
                className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600 transition-colors"
              >
                Sync ทันที
              </button>
            </div>
          )}
        </motion.div>

        {/* ส่วนอื่นๆ เหมือนเดิมทั้งหมด */}
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
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onLike={likeProject}
                    onDislike={dislikeProject}
                    onSelect={handleOpenModal}
                    index={index}
                  />
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
                    {debouncedSearch ? `ไม่พบผลงานที่ตรงกับคำค้นหา "${debouncedSearch}"` : "ไม่พบผลงาน"}
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

        {/* Modal Overlay */}
        <AnimatePresence mode="sync">
          {selectedProject && (
            <motion.div
              key="modal-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
              onClick={handleCloseModal}
            >
              <motion.div
                key="modal-content"
                layoutId={`project-${selectedProject.id}`}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto cursor-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Image */}
                <motion.div layoutId={`image-${selectedProject.id}`} className="relative">
                  <img
                    src={selectedProject.image || selectedProject.image_url || "https://via.placeholder.com/800x400?text=Project"}
                    alt={selectedProject.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.7)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-all duration-200"
                  >
                    <CloseIcon />
                  </motion.button>
                </motion.div>

                {/* Modal Content */}
                <div className="p-6 md:p-8">
                  <motion.h2 
                    layoutId={`title-${selectedProject.id}`}
                    className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4"
                  >
                    {selectedProject.title}
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6"
                  >
                    {selectedProject.description}
                  </motion.p>

                  {/* Tags */}
                  {selectedProject.tags && selectedProject.tags.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">เทคโนโลยีที่ใช้:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, index) => (
                          <motion.span 
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ✅ Like/Dislike Stats - Display Only */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center space-x-8 pt-6 border-t border-gray-200 dark:border-gray-700"
                  >
                    {/* Like Count - Display Only */}
                    <div className={`flex items-center space-x-3 ${
                      selectedProject.isLiked 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      <LikeIcon isLiked={selectedProject.isLiked} />
                      <div className="flex flex-col">
                        <span className="font-bold text-lg">{selectedProject.like_count || 0}</span>
                        <span className="text-xs opacity-75">Likes</span>
                      </div>
                    </div>

                    {/* Dislike Count - Display Only */}
                    <div className={`flex items-center space-x-3 ${
                      selectedProject.isDisliked 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      <DislikeIcon isDisliked={selectedProject.isDisliked} />
                      <div className="flex flex-col">
                        <span className="font-bold text-lg">{selectedProject.dislike_count || 0}</span>
                        <span className="text-xs opacity-75">Dislikes</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* ✅ Note สำหรับผู้ใช้ */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
                      💡 คุณสามารถกด Like/Dislike ได้ที่การ์ดผลงานด้านนอก
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                พบผลงาน {filtered.length} รายการ {search && `สำหรับ "${search}"`}
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