// ProjectCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const ProjectCard = ({ project, onLike, onDislike, onSelect, index }) => {
  // ✅ ฟังก์ชัน Like — พร้อม console.log
  const handleLike = (e) => {
    e.stopPropagation();
    console.log('❤️ Like clicked:', { 
      projectId: project.id, 
      currentIsLiked: project.isLiked, 
      currentIsDisliked: project.isDisliked 
    });

    if (project.isDisliked) {
      console.log('🔄 Auto-unlike Dislike first');
      onDislike(project.id, false);
    }
    
    const newIsLiked = !project.isLiked;
    console.log('✅ Setting like:', { id: project.id, isLiked: newIsLiked });
    onLike(project.id, newIsLiked);
  };

  // ✅ ฟังก์ชัน Dislike — พร้อม console.log
  const handleDislike = (e) => {
    e.stopPropagation();
    console.log('👎 Dislike clicked:', { 
      projectId: project.id, 
      currentIsLiked: project.isLiked, 
      currentIsDisliked: project.isDisliked 
    });

    if (project.isLiked) {
      console.log('🔄 Auto-unlike Like first');
      onLike(project.id, false);
    }
    
    const newIsDisliked = !project.isDisliked;
    console.log('✅ Setting dislike:', { id: project.id, isDisliked: newIsDisliked });
    onDislike(project.id, newIsDisliked);
  };

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ 
        opacity: 0, 
        y: 20,
        transition: { duration: 0.2 }
      }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 80,
        damping: 15
      }}
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={() => onSelect(project)}
    >
      <motion.div 
        layoutId={`image-${project.id}`} 
        className="relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={project.image || "https://via.placeholder.com/400x200?text=Project"}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </motion.div>

      <div className="p-5">
        <motion.h3 
          layoutId={`title-${project.id}`}
          className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2"
        >
          {project.title}
        </motion.h3>
        
        <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.slice(0, 3).map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
          {project.tags && project.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Like/Dislike Buttons */}
        <div className="flex items-center space-x-3">
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              project.isLiked
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
            aria-label={project.isLiked ? "Unlike" : "Like"}
          >
            <FaThumbsUp className={`text-sm ${project.isLiked ? 'text-blue-600 dark:text-blue-400' : ''}`} />
            <span className="text-sm font-semibold">{project.like_count || 0}</span>
          </motion.button>

          {/* Dislike Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDislike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              project.isDisliked
                ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
            aria-label={project.isDisliked ? "Remove Dislike" : "Dislike"}
          >
            <FaThumbsDown className={`text-sm ${project.isDisliked ? 'text-red-600 dark:text-red-400' : ''}`} />
            <span className="text-sm font-semibold">{project.dislike_count || 0}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;