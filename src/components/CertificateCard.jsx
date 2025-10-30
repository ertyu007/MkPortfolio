// CertificateCard.jsx
import React, { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const CertificateCard = ({ cert, onSelect, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // ใช้ useCallback เพื่อป้องกันการ recreate function
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
    onSelect(cert);
  }, [cert, onSelect]);

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
              "linear-gradient(45deg, rgba(251, 191, 36, 0.12) 0%, rgba(249, 115, 22, 0.12) 50%, rgba(217, 119, 6, 0.12) 100%)",
              "linear-gradient(135deg, rgba(217, 119, 6, 0.12) 0%, rgba(249, 115, 22, 0.12) 50%, rgba(251, 191, 36, 0.12) 100%)"
            ]
          : "linear-gradient(45deg, rgba(251, 191, 36, 0.08) 0%, rgba(249, 115, 22, 0.08) 100%)"
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
      whileHover: { color: "#f59e0b" },
      transition: { duration: 0.2 }
    }
  }), [isHovered, index]);

  return (
    <motion.div
      layoutId={`cert-${cert.id}`}
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
        className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 via-orange-50/30 to-amber-50/30 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-amber-900/20"
        animate={animations.background.animate}
        transition={animations.background.transition}
        style={{ willChange: 'background' }}
      />
      
      {/* Floating Elements - ปรับขนาดและความเข้มให้เบาลง */}
      <motion.div 
        className="absolute -top-4 -left-4 w-10 h-10 bg-yellow-400/15 rounded-full blur-md"
        animate={animations.floating.top}
        style={{ willChange: 'transform' }}
      />
      
      <motion.div 
        className="absolute -bottom-5 -right-5 w-12 h-12 bg-orange-400/15 rounded-full blur-md"
        animate={animations.floating.bottom}
        style={{ willChange: 'transform' }}
      />

      {/* Image Section */}
      <motion.div 
        layoutId={`cert-image-${cert.id}`} 
        className="relative overflow-hidden"
        whileHover={animations.image.whileHover}
        transition={animations.image.transition}
        style={{ willChange: 'transform' }}
      >
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
          {!imageError ? (
            <motion.img
              src={cert.image || "https://via.placeholder.com/400x200?text=Certificate"}
              alt={cert.title}
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
                className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full"
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
        <div className="flex items-start space-x-2 mb-3">
          <motion.div
            animate={animations.icon.animate}
            transition={animations.icon.transition}
            style={{ willChange: 'transform' }}
          >
            <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <motion.h3 
            layoutId={`cert-title-${cert.id}`}
            className="font-bold text-sm text-gray-900 dark:text-white leading-tight line-clamp-2"
            whileHover={animations.title.whileHover}
            transition={animations.title.transition}
          >
            {cert.title}
          </motion.h3>
        </div>
        
        {/* Date */}
        <motion.div 
          className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-xs mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{cert.date || "ไม่ระบุวันที่"}</span>
        </motion.div>

        {/* Description */}
        <motion.div 
          layoutId={`cert-header-${cert.id}`}
          className="mt-2 pt-2 border-t border-gray-200/50 dark:border-gray-700/50"
        >
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2 leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {cert.description}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default React.memo(CertificateCard);