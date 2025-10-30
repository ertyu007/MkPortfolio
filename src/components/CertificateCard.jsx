// CertificateCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const CertificateCard = ({ cert, onSelect, index }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      layoutId={`cert-${cert.id}`}
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
      onClick={() => onSelect(cert)}
    >
      {/* Liquid Background Animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 via-orange-50/30 to-amber-50/30 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-amber-900/20"
        animate={{
          background: isHovered 
            ? [
                "linear-gradient(45deg, rgba(251, 191, 36, 0.15) 0%, rgba(249, 115, 22, 0.15) 50%, rgba(217, 119, 6, 0.15) 100%)",
                "linear-gradient(135deg, rgba(217, 119, 6, 0.15) 0%, rgba(249, 115, 22, 0.15) 50%, rgba(251, 191, 36, 0.15) 100%)"
              ]
            : "linear-gradient(45deg, rgba(251, 191, 36, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)"
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
      />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400/20 rounded-full blur-lg"
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
        className="absolute -bottom-8 -right-8 w-16 h-16 bg-orange-400/20 rounded-full blur-lg"
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
        layoutId={`cert-image-${cert.id}`} 
        className="relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
          {!imageError ? (
            <motion.img
              src={cert.image || "https://via.placeholder.com/400x200?text=Certificate"}
              alt={cert.title}
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
                className="w-8 h-8 border-3 border-yellow-500 border-t-transparent rounded-full"
              />
            </motion.div>
          )}
        </div>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6"
          whileHover={{ opacity: 1 }}
        >
          <motion.span 
            className="text-white text-sm font-medium"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            คลิกเพื่อดูรายละเอียด
          </motion.span>
        </motion.div>
      </motion.div>

      <div className="relative p-6 z-10">
        <div className="flex items-start space-x-3 mb-3">
          <motion.div
            animate={{ 
              rotate: isHovered ? [0, -10, 10, 0] : 0,
              scale: isHovered ? [1, 1.2, 1] : 1
            }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <motion.h3 
            layoutId={`cert-title-${cert.id}`}
            className="font-bold text-lg text-gray-900 dark:text-white leading-tight"
            whileHover={{ color: "#f59e0b" }}
            transition={{ duration: 0.2 }}
          >
            {cert.title}
          </motion.h3>
        </div>
        
        <motion.div 
          className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{cert.date || "ไม่ระบุวันที่"}</span>
        </motion.div>

        <motion.div 
          layoutId={`cert-header-${cert.id}`}
          className="mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50"
        >
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {cert.description}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;