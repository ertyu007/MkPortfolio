import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const ProjectCard = ({ project, onLike }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLike = () => {
    onLike();
    toast.success('ขอบคุณที่กด Like! ❤️', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <>
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition"
        onClick={() => setModalIsOpen(true)}
        data-aos="fade-up"
      >
        <img
          src={project.image || "https://via.placeholder.com/400x200?text=Project"}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg">{project.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{project.description}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {project.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm">❤️ {project.like_count || 0}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike(); // เรียก likeProject จริง
              }}
              className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
            >
              Like
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-4 bg-white dark:bg-gray-900 p-6 rounded-lg max-w-4xl mx-auto mt-20 shadow-lg overflow-auto max-h-[90vh]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <button
          onClick={() => setModalIsOpen(false)}
          className="float-right text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <img
          src={project.image || "https://via.placeholder.com/600x300?text=Project"}
          alt={project.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p>{project.description}</p>
        <div className="mt-4">
          <strong>Tags:</strong> {project.tags?.join(", ")}
        </div>
        <div className="mt-4 flex justify-between">
          <span>❤️ {project.like_count || 0} Likes</span>
          <button
            onClick={handleLike}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Like
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProjectCard;