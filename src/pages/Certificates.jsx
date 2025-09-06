import React, { useState } from 'react';
import CertificateCard from '../components/CertificateCard';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Certificates = () => {
  const [selected, setSelected] = useState(null);

  const certificates = [
    {
      id: 1,
      title: "AWS Certified Developer",
      image: "https://via.placeholder.com/600x400?text=AWS+Certified" // ✅ แก้ตรงนี้
    },
    {
      id: 2,
      title: "React Advanced Certification",
      image: "https://via.placeholder.com/600x400?text=React+Advanced" // ✅ แก้ตรงนี้
    },
    {
      id: 3,
      title: "Full Stack Web Development",
      image: "https://via.placeholder.com/600x400?text=Full+Stack" // ✅ แก้ตรงนี้
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">ประกาศนียบัตร</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map(cert => (
          <CertificateCard
            key={cert.id}
            cert={cert}
            onClick={() => setSelected(cert)}
          />
        ))}
      </div>

      {selected && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelected(null)}
          className="fixed inset-4 bg-white dark:bg-gray-900 p-6 rounded-lg max-w-4xl mx-auto mt-20 shadow-lg overflow-auto max-h-[90vh]"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <button
            onClick={() => setSelected(null)}
            className="float-right text-2xl font-bold"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4">{selected.title}</h2>
          <img
            src={selected.image}
            alt={selected.title}
            className="w-full max-h-[70vh] object-contain rounded-lg mx-auto"
          />
        </Modal>
      )}
    </div>
  );
};

export default Certificates;