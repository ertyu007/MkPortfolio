// Portfolio.jsx
import React, { useState, useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';
import { aiSearch } from '../utils/ai';
import ProjectCard from '../components/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Scrollbar Styles
const scrollbarStyles = `
  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #4f46e5, #7c3aed);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #4338ca, #6d28d9);
  }
  
  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #4f46e5 rgba(255, 255, 255, 0.1);
  }
`;

// SVG Icons
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

// Animation Variants
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    rotateX: 15,
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
      mass: 0.8
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -30,
    rotateX: -10,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const Portfolio = () => {
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

  // Add custom scrollbar styles
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = scrollbarStyles;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // Search functionality
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearch.trim()) {
        setFiltered(projects);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-gray-900 dark:via-blue-950/50 dark:to-purple-950/50 py-12 relative overflow-hidden">
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
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-300/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
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
            ผลงานของฉัน
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            สิ่งที่ผมได้สร้างสรรค์ขึ้น • ทุกโปรเจคคือการเรียนรู้และพัฒนา
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            <motion.input
              type="text"
              placeholder="ค้นหาผลงาน..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-5 pl-14 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 transition-all duration-300 text-gray-900 dark:text-white text-lg placeholder-gray-500 dark:placeholder-gray-400 shadow-2xl"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.div 
              className="absolute left-5 top-6 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
              animate={{ rotate: search ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <SearchIcon />
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
                <CloseIcon />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Status Bar */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {isSearching && (
            <motion.div 
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-700 dark:text-blue-300 backdrop-blur-sm rounded-xl border border-blue-500/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
              />
              <span>กำลังค้นหา...</span>
            </motion.div>
          )}
          <motion.div 
            className="flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/30"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`w-2 h-2 rounded-full ${apiOnline ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-gray-600 dark:text-gray-400">
              {apiOnline ? 'ออนไลน์' : 'ออฟไลน์'}
            </span>
          </motion.div>
          
          {pendingSyncCount > 0 && (
            <motion.button
              onClick={manualSync}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 backdrop-blur-sm rounded-xl border border-yellow-500/30 hover:bg-yellow-500/30 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>อัพเดต {pendingSyncCount} รายการ</span>
              {loading && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full"
                />
              )}
            </motion.button>
          )}
        </motion.div>

        {/* Projects Grid */}
        {loading && !filtered.length ? (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl p-6 border border-white/30 dark:border-gray-700/30"
              >
                <div className="w-full h-48 bg-gray-300/50 dark:bg-gray-700/50 rounded-2xl mb-4 animate-pulse" />
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300/50 dark:bg-gray-700/50 rounded animate-pulse" />
                  <div className="h-4 bg-gray-300/50 dark:bg-gray-700/50 rounded animate-pulse w-3/4" />
                  <div className="flex space-x-2">
                    <div className="h-6 bg-gray-300/50 dark:bg-gray-700/50 rounded-full animate-pulse w-16" />
                    <div className="h-6 bg-gray-300/50 dark:bg-gray-700/50 rounded-full animate-pulse w-12" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence>
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
            </AnimatePresence>
          </motion.div>
        )}

        {/* No Results */}
        {!loading && filtered.length === 0 && (
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
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">ไม่พบผลงาน</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">ลองค้นหาด้วยคำอื่นๆ หรือดูผลงานทั้งหมด</p>
            <motion.button
              onClick={() => setSearch('')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              แสดงผลงานทั้งหมด
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-6"
              onClick={handleCloseModal}
            >
              {/* Modal Content */}
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full max-w-4xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  onClick={handleCloseModal}
                  className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-white/30 dark:border-gray-600/30 hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <CloseIcon />
                </motion.button>

                {/* Modal Content */}
                <div className="max-h-[90vh] overflow-y-auto">
                  {/* Image */}
                  <div className="relative h-80 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                    <img
                      src={selectedProject.image || selectedProject.image_url || "https://via.placeholder.com/800x400?text=Project"}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <motion.h3 
                      className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {selectedProject.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {selectedProject.description}
                    </motion.p>

                    {/* Tags */}
                    <motion.div 
                      className="flex flex-wrap gap-2 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {selectedProject.tags?.map((tag, i) => (
                        <span 
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full backdrop-blur-sm border border-blue-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.span
                        onClick={() => likeProject(selectedProject.id)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                          selectedProject.isLiked
                            ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30 shadow-lg'
                            : 'bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border-white/30 dark:border-gray-600/30 hover:bg-white/70 dark:hover:bg-gray-600/50'
                        }`}
                        whileHover={{ scale: 1.0, y: 0 }}
                        whileTap={{ scale: 1.0 }}
                      >
                        <LikeIcon isLiked={selectedProject.isLiked} />
                        <span className="font-semibold">ชอบ {selectedProject.like_count || 0}</span>
                      </motion.span>

                      <motion.span
                        onClick={() => dislikeProject(selectedProject.id)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                          selectedProject.isDisliked
                            ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30 shadow-lg'
                            : 'bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border-white/30 dark:border-gray-600/30 hover:bg-white/70 dark:hover:bg-gray-600/50'
                        }`}
                        whileHover={{ scale: 1.0, y: 0 }}
                        whileTap={{ scale: 1.0 }}
                      >
                        <DislikeIcon isDisliked={selectedProject.isDisliked} />
                        <span className="font-semibold">ไม่ชอบ {selectedProject.dislike_count || 0}</span>
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;