// src/components/CertificateCard.jsx
import React from 'react'; // ✅ ลบ ", { useState }" ออก
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CertificateCard = ({ cert, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition"
      data-aos="fade-up"
    >
      <img
        src={cert.image || "https://via.placeholder.com/400x200?text=Certificate"}
        alt={cert.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{cert.title}</h3>
      </div>
    </div>
  );
};

export default CertificateCard;