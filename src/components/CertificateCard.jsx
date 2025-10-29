// CertificateCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

// SVG Icons
const AwardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Animation Variants
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8
    }
  },
  hover: {
    y: -6,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  tap: {
    scale: 0.98,
    y: -2
  }
};

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const CertificateCard = ({ cert, onSelect, index }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [, setImageError] = React.useState(false);

  return (
    <motion.div
      layoutId={`cert-${cert.id}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      transition={{ 
        delay: index * 0.08,
        type: "spring",
        stiffness: 80,
        damping: 15
      }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={() => onSelect(cert)}
    >
      <motion.div 
        layoutId={`cert-image-${cert.id}`} 
        className="relative overflow-hidden"
        variants={imageVariants}
        whileHover="hover"
      >
        <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700">
          <img
            src={cert.image || "https://via.placeholder.com/400x200?text=Certificate"}
            alt={cert.title}
            className={`w-full h-48 object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-medium">คลิกเพื่อดูรายละเอียด</span>
        </div>
      </motion.div>

      <div className="p-5">
        <div className="flex items-start space-x-3 mb-3">
          <AwardIcon className="text-yellow-500 flex-shrink-0 mt-1" />
          <motion.h3 
            layoutId={`cert-title-${cert.id}`}
            className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2"
          >
            {cert.title}
          </motion.h3>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{cert.date || "ไม่ระบุวันที่"}</span>
        </div>

        <motion.div 
          layoutId={`cert-header-${cert.id}`}
          className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {cert.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;