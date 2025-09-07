import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

Modal.setAppElement('#root');

const ProjectCard = ({ project, onLike, onDislike, openModal = false, onModalClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(project.isLiked || false);
  const [isDisliked, setIsDisliked] = useState(project.isDisliked || false);

  // ✅ เปิด Modal จากภายนอก
  useEffect(() => {
    if (openModal) {
      setModalIsOpen(true);
    }
  }, [openModal]);

  // ✅ ใน ProjectCard.jsx — ต้องมี logic แบบนี้
  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setIsDisliked(false);
      onLike(project.id, true); // ✅ ส่ง true = like
    } else {
      setIsLiked(false);
      onLike(project.id, false); // ✅ ส่ง false = unlike
    }
  };

  const handleDislike = () => {
    if (!isDisliked) {
      setIsDisliked(true);
      setIsLiked(false);
      onDislike(project.id, true); // ✅ ส่ง true = dislike
    } else {
      setIsDisliked(false);
      onDislike(project.id, false); // ✅ ส่ง false = undislike
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    if (onModalClose) onModalClose();
  };

  return (
    <>
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer group"
        onClick={() => setModalIsOpen(true)}
        data-aos="fade-up"
      >
        <div className="relative overflow-hidden">
          <img
            src={project.image || "https://via.placeholder.com/400x200?text=Project"}
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {project.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1">
            {project.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-xs text-indigo-800 dark:text-indigo-300 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center space-x-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-all duration-300 ${isLiked
                ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
            >
              <FaThumbsUp className={`text-sm ${isLiked ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
              <span className="text-sm font-medium">{project.like_count || 0}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handleDislike();
              }}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-all duration-300 ${isDisliked
                ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
            >
              <FaThumbsDown className={`text-sm ${isDisliked ? 'text-red-600 dark:text-red-400' : ''}`} />
              <span className="text-sm font-medium">{project.dislike_count || 0}</span>
            </motion.button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-4 bg-white dark:bg-gray-900 p-6 rounded-lg max-w-4xl mx-auto mt-20 shadow-lg overflow-auto max-h-[90vh] z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <button
          onClick={closeModal}
          className="float-right text-2xl font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{project.title}</h2>
        <img
          src={project.image || "https://via.placeholder.com/600x300?text=Project"}
          alt={project.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
        <div className="mt-4">
          <strong className="text-gray-900 dark:text-white">Tags:</strong> {project.tags?.join(", ")}
        </div>
        <div className="mt-6 flex items-center space-x-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${isLiked
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            <FaThumbsUp className={`text-sm ${isLiked ? 'text-white' : ''}`} />
            <span className="font-medium">{project.like_count || 0} Likes</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleDislike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${isDisliked
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            <FaThumbsDown className={`text-sm ${isDisliked ? 'text-white' : ''}`} />
            <span className="font-medium">{project.dislike_count || 0} Dislikes</span>
          </motion.button>
        </div>
      </Modal>
    </>
  );
};

export default ProjectCard;