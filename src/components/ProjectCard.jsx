// ProjectCard.jsx
import React, { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const ProjectCard = ({ project, onLike, onDislike, onSelect, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // ใช้ useCallback เพื่อป้องกันการ recreate function
  const handleLike = useCallback((e) => {
    e.stopPropagation();
    onLike(project.id);
  }, [project.id, onLike]);

  const handleDislike = useCallback((e) => {
    e.stopPropagation();
    onDislike(project.id);
  }, [project.id, onDislike]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(() => {
    onSelect(project);
  }, [project, onSelect]);

  // ใช้ useMemo สำหรับ animations ที่ reuse
  const animations = useMemo(() => ({
    // Card animation
    card: {
      initial: { opacity: 0, y: 40, scale: 0.9, rotateX: 10 },
      animate: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
      whileHover: { 
        y: -12,
        scale: 1.02,
      },
      whileTap: { scale: 0.95 },
      transition: { 
        delay: Math.min(index * 0.08, 0.4), // จำกัด delay สูงสุด
        type: "spring",
        stiffness: 100,
        damping: 16,
        mass: 0.9
      },
      whileHoverTransition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }
    },

    // Floating elements - ปรับให้เบาลง
    floating: {
      top: {
        y: [0, -15, 0],
        x: [0, 8, 0],
        scale: [1, 1.1, 1],
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      bottom: {
        y: [0, 12, 0],
        x: [0, -6, 0],
        scale: [1, 1.15, 1],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8
        }
      }
    },

    // Background animation
    background: {
      animate: {
        background: isHovered 
          ? [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.15) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(236, 72, 153, 0.15) 100%)",
              "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(59, 130, 246, 0.15) 100%)"
            ]
          : "linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)"
      },
      transition: { 
        duration: 1.8, 
        repeat: isHovered ? Infinity : 0, 
        repeatType: "reverse" 
      }
    },

    // Image animation
    image: {
      whileHover: { scale: 1.05 },
      transition: { duration: 0.3, ease: "easeOut" }
    },

    // Icon animation
    icon: {
      animate: { 
        rotate: isHovered ? [0, -6, 6, 0] : 0,
        scale: isHovered ? [1, 1.1, 1] : 1
      },
      transition: { duration: 0.3 }
    },

    // Title animation
    title: {
      whileHover: { color: "#4f46e5" },
      transition: { duration: 0.2 }
    }
  }), [isHovered, index]);

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      initial={animations.card.initial}
      animate={animations.card.animate}
      whileHover={animations.card.whileHover}
      whileTap={animations.card.whileTap}
      transition={animations.card.transition}
      whileHoverTransition={animations.card.whileHoverTransition}
      className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl overflow-hidden cursor-pointer border border-white/20 dark:border-gray-700/30"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={handleClick}
      style={{ 
        willChange: 'transform, opacity',
        transform: 'translateZ(0)' // Force GPU acceleration
      }}
    >
      {/* Liquid Background Animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20"
        animate={animations.background.animate}
        transition={animations.background.transition}
        style={{ willChange: 'background' }}
      />
      
      {/* Floating Elements - ปรับขนาดและความเข้มให้เบาลง */}
      <motion.div 
        className="absolute -top-4 -left-4 w-10 h-10 bg-blue-400/15 rounded-full blur-md"
        animate={animations.floating.top}
        style={{ willChange: 'transform' }}
      />
      
      <motion.div 
        className="absolute -bottom-5 -right-5 w-12 h-12 bg-purple-400/15 rounded-full blur-md"
        animate={animations.floating.bottom}
        style={{ willChange: 'transform' }}
      />

      {/* Image Section */}
      <motion.div 
        layoutId={`image-${project.id}`}
        className="relative overflow-hidden"
        whileHover={animations.image.whileHover}
        transition={animations.image.transition}
        style={{ willChange: 'transform' }}
      >
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
          {!imageError ? (
            <motion.img
              src={project.image || project.image_url || "https://via.placeholder.com/400x200?text=Project"}
              alt={project.title}
              className={`w-full h-48 object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
              style={{ willChange: 'transform, opacity' }}
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">ไม่พบภาพ</span>
            </div>
          )}
          
          {/* Loading Spinner */}
          {!imageLoaded && !imageError && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-gray-200/50 dark:bg-gray-700/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { 
                    duration: 0.8, 
                    repeat: Infinity, 
                    ease: "linear" 
                  },
                  scale: { 
                    duration: 0.6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }
                }}
                className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
                style={{ willChange: 'transform' }}
              />
            </motion.div>
          )}
        </div>
        
        {/* Hover Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 flex items-end p-4"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.span 
            className="text-white text-xs font-medium"
            initial={{ y: 15, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            คลิกเพื่อดูรายละเอียด
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <div className="relative p-5 z-10">
        <motion.h3 
          layoutId={`title-${project.id}`}
          className="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight"
          whileHover={animations.title.whileHover}
          transition={animations.title.transition}
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed text-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {project.description}
        </motion.p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.slice(0, 3).map((tag, i) => (
            <motion.span 
              key={i} 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full backdrop-blur-sm border border-blue-500/20"
              style={{ willChange: 'transform' }}
            >
              {tag}
            </motion.span>
          ))}
          {project.tags && project.tags.length > 3 && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-2 py-1 bg-gray-500/10 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400 text-xs rounded-full backdrop-blur-sm border border-gray-500/20"
            >
              +{project.tags.length - 3}
            </motion.span>
          )}
        </div>

        {/* Like/Dislike Buttons */}
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
              project.isLiked
                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30 shadow-lg'
                : 'bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border-white/30 dark:border-gray-600/30 hover:bg-white/70 dark:hover:bg-gray-600/50'
            }`}
            aria-label={project.isLiked ? "Unlike" : "Like"}
            disabled={!onLike}
            style={{ willChange: 'transform' }}
          >
            <motion.div
              animate={project.isLiked ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <FaThumbsUp className="text-sm" />
            </motion.div>
            <span className="text-sm font-semibold">{project.like_count || 0}</span>
          </motion.button>

          {/* Dislike Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDislike}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
              project.isDisliked
                ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30 shadow-lg'
                : 'bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border-white/30 dark:border-gray-600/30 hover:bg-white/70 dark:hover:bg-gray-600/50'
            }`}
            aria-label={project.isDisliked ? "Remove Dislike" : "Dislike"}
            disabled={!onDislike}
            style={{ willChange: 'transform' }}
          >
            <motion.div
              animate={project.isDisliked ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <FaThumbsDown className="text-sm" />
            </motion.div>
            <span className="text-sm font-semibold">{project.dislike_count || 0}</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProjectCard);