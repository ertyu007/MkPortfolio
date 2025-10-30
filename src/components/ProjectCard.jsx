// ProjectCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const ProjectCard = ({ project, onLike, onDislike, onSelect, index }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    onLike(project.id);
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    onDislike(project.id);
  };

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      whileHover={{ 
        y: -12,
        scale: 1.02,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 25 
        }
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 80,
        damping: 15
      }}
      className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden cursor-pointer border border-white/20 dark:border-gray-700/30"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
    >
      {/* Liquid Background Animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20"
        animate={{
          background: isHovered 
            ? [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.15) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(236, 72, 153, 0.15) 100%)",
                "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(59, 130, 246, 0.15) 100%)"
              ]
            : "linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)"
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
      />
      
      {/* Floating Bubbles */}
      <motion.div 
        className="absolute -top-6 -left-6 w-12 h-12 bg-blue-400/20 rounded-full blur-lg"
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-8 -right-8 w-16 h-16 bg-purple-400/20 rounded-full blur-lg"
        animate={{ 
          y: [0, 15, 0],
          x: [0, -10, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div 
        layoutId={`image-${project.id}`} 
        className="relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
          {!imageError ? (
            <motion.img
              src={project.image || project.image_url || "https://via.placeholder.com/400x200?text=Project"}
              alt={project.title}
              className={`w-full h-48 object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">ไม่พบภาพ</span>
            </div>
          )}
          {!imageLoaded && !imageError && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ 
                  rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                  scale: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full"
              />
            </motion.div>
          )}
        </div>
        <motion.div 
          className="absolute inset-0 bg-black/0"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <div className="relative p-6 z-10">
        <motion.h3 
          layoutId={`title-${project.id}`}
          className="font-bold text-xl text-gray-900 dark:text-white mb-2 leading-tight"
          whileHover={{ color: "#4f46e5" }}
          transition={{ duration: 0.2 }}
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
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
              transition={{ delay: 0.4 + (i * 0.1) }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full backdrop-blur-sm border border-blue-500/20"
            >
              {tag}
            </motion.span>
          ))}
          {project.tags && project.tags.length > 3 && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
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
          transition={{ delay: 0.5 }}
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

export default ProjectCard;