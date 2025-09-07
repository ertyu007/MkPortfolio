import React, { useState } from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

Modal.setAppElement('#root');

const ProjectCard = ({ project, onLike, onDislike }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(project.isLiked || false);
  const [isDisliked, setIsDisliked] = useState(project.isDisliked || false);

  const handleLike = () => {
    if (isDisliked) {
      // ถ้าเคย Dislike → ต้องยกเลิก Dislike ก่อน
      setIsDisliked(false);
      onDislike(project.id, false); // ส่ง false = ยกเลิก
    }
    setIsLiked(!isLiked);
    onLike(project.id, !isLiked); // ส่ง true/false = like/unlike
  };

  const handleDislike = () => {
    if (isLiked) {
      // ถ้าเคย Like → ต้องยกเลิก Like ก่อน
      setIsLiked(false);
      onLike(project.id, false);
    }
    setIsDisliked(!isDisliked);
    onDislike(project.id, !isDisliked);
  };

  return (
    <>
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer group"
        onClick={() => setModalIsOpen(true)}
        data-aos="fade-up"
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden">
          <img
            src={project.image || "https://via.placeholder.com/400x200?text=Project"}
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {project.description}
          </p>

          {/* Like/Dislike Buttons - YouTube Style */}
          <div className="mt-4 flex items-center space-x-2">
            {/* Like Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-all duration-200 ${
                isLiked
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              title={isLiked ? "Unlike" : "Like"}
            >
              <FaThumbsUp className="text-sm" />
              <span className="text-sm font-medium">{project.like_count || 0}</span>
            </motion.button>

            {/* Dislike Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handleDislike();
              }}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-all duration-200 ${
                isDisliked
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              title={isDisliked ? "Remove Dislike" : "Dislike"}
            >
              <FaThumbsDown className="text-sm" />
              <span className="text-sm font-medium">{project.dislike_count || 0}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modal - เหมือนเดิม */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-4 bg-white dark:bg-gray-900 p-6 rounded-lg max-w-4xl mx-auto mt-20 shadow-lg overflow-auto max-h-[90vh] z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <button
          onClick={() => setModalIsOpen(false)}
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
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
              isLiked
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <FaThumbsUp className="text-sm" />
            <span className="font-medium">{project.like_count || 0} Likes</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleDislike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
              isDisliked
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <FaThumbsDown className="text-sm" />
            <span className="font-medium">{project.dislike_count || 0} Dislikes</span>
          </motion.button>
        </div>
      </Modal>
    </>
  );
};

export default ProjectCard;