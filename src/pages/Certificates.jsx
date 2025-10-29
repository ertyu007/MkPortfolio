// Certificates.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CertificateCard from '../components/CertificateCard';

// SVG Icons
const CertificateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AwardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Animation Variants
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      mass: 0.8
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: {
      duration: 0.15,
      ease: "easeOut"
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.15,
      delay: 0.05 
    }
  }
};

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.paddingRight = '0px';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.paddingRight = '0px';
    };
  }, [selectedCert]);

  const handleOpenModal = (cert) => {
    if (isAnimating) return;
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    if (isAnimating || !selectedCert) return;
    
    setIsAnimating(true);
    setSelectedCert(null);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const certificates = [
    {
      id: 1,
      title: "ค่ายคณิตศาสตร์ (NP MATH CAMP) ครั้งที่ 1",
      description: "ได้เข้าร่วมกิจกรรม 'ค่ายคณิตศาสตร์ (NP MATH CAMP) ครั้งที่ 1' ณ โรงเรียนน้ำปลีกศึกษา อำเภอเมือง จังหวัดอำนาจเจริญ",
      date: "25 สิงหาคม 2567",
      image: "/assets/certificates/Certificate_1.jpg"
    },
    {
      id: 2,
      title: "นักเรียนจิตอาสาดีเด่น",
      description: "เป็นนักเรียนจิตอาสาดีเด่น เนื่องในกิจกรรมการเดินทางไกลและอยู่ค่ายพักแรม ลูกเสือ - เนตรนารี และผู้บำเพ็ญประโยชน์ ประจำปีการศึกษา 2567",
      date: "21 กุมภาพันธ์ 2568",
      image: "/assets/certificates/Certificate_2.jpg"
    },
    {
      id: 3,
      title: "รางวัลระดับเหรียญทอง กิจกรรมการแข่งขันหุ่นยนต์",
      description: "ได้รับรางวัลระดับเหรียญทอง กิจกรรมการแข่งขันหุ่นยนต์ระดับชั้น ม.๔ - ม.๖ งานศิลปหัตถกรรมนักเรียน ระดับเขตพื้นที่การศึกษา ครั้งที่ ๗๑ ประจำปีการศึกษา ๒๕๖๖",
      date: "๒๓-๒๔ พฤศจิกายน ๒๕๖๖",
      image: "/assets/certificates/Certificate_3.jpg"
    },
    {
      id: 4,
      title: "แกนนำเยาวชน TO BE NUMBER ONE",
      description: "ได้เข้าพัฒนาแกนนำเยาวชน TO BE NUMBER ONE เพื่อเป็นต้นแบบการเป็นคนดี คนเก่งและมีคุณภาพ ประจำปีงบประมาณ ๒๕๖๖",
      date: "๒๑ - ๒๒ ธันวาคม ๒๕๖๖",
      image: "/assets/certificates/Certificate_4.jpg"
    },
    {
      id: 5,
      title: "Reunion เยาวชนสร้างชาติ ครั้งที่ 1",
      description: "ได้ผ่านการอบรมโครงการค่าย Reunion เยาวชนสร้างชาติ ดี เก่ง กล้า จังหวัดอำนาจเจริญ (ครั้งที่ 1) โดยนักศึกษาหลักสูตรนักบริหารระดับสูงเพื่อการสร้างชาติ รุ่นที่ 13",
      date: "24 มกราคม 2567",
      image: "/assets/certificates/Certificate_5.jpg"
    },
    {
      id: 6,
      title: "โครงการฝึกอบรมพัฒนาทักษะชีวิตและทักษะอาชีพ",
      description: "ได้เข้าร่วมโครงการฝึกอบรมพัฒนาทักษะชีวิตและทักษะอาชีพ เพื่อเตรียมความพร้อมเด็กไทยสู่การเป็นผู้ประกอบการรุ่นเยาว์ รุ่นที่ ๑",
      date: "๑-๑๔ สิงหาคม ๒๕๖๖",
      image: "/assets/certificates/Certificate_6.jpg"
    },
    {
      id: 7,
      title: "การคัดเลือกตัวแทนโรงเรียนไปแข่งขันตอบปัญหากฎหมาย",
      description: "ได้เข้าร่วมการคัดเลือกตัวแทนโรงเรียน เพื่อไปแข่งขันตอบปัญหากฎหมายเนื่องในวันรพี ชิงทุนการศึกษาพร้อมโล่รางวัล ณ ศาลเยาวชนและครอบครัวจังหวัดอำนาจเจริญ",
      date: "13 กรกฎาคม 2566",
      image: "/assets/certificates/Certificate_7.jpg"
    },
    {
      id: 8,
      title: "คณะกรรมการสภานักเรียน",
      description: "คณะกรรมการสภานักเรียน ประจำปีการศึกษา ๒๕๖๘ และคณะกรรมการดำเนินงาน ผู้มีความเสียสละ อุทิศเวลา และความสามารถในการร่วมวางแผนและดำเนินการตามกิจกรรม ด้วยความตั้งใจและความรับผิดชอบ เนื่องในพิธีไหว้ครู ประจำปีการศึกษา ๒๕๖๘",
      date: "๑๒ มิถุนายน พ.ศ. ๒๕๖๘",
      image: "/assets/certificates/Certificate_8.jpg"
    },
    {
      id: 9,
      title: "นักเรียนผู้มีจิตอาสาดีเด่น",
      description: "ได้รับการคัดเลือกให้เป็น นักเรียนผู้มีจิตอาสาดีเด่น ภาคเรียนที่ ๑ ปีการศึกษา ๒๕๖๗",
      date: "๘ สิงหาคม พ.ศ. ๒๕๖๗",
      image: "/assets/certificates/Certificate_9.jpg"
    },
    {
      id: 10,
      title: "โครงการอบรมเชิงปฏิบัติการห้องเรียนพิเศษวิทยาศาสตร์",
      description: "ได้เข้าร่วมโครงการอบรมเชิงปฏิบัติการห้องเรียนพิเศษวิทยาศาสตร์ ณ คณะวิทยาศาสตร์ มหาวิทยาลัยอุบลราชธานี",
      date: "19 ตุลาคม 2567",
      image: "/assets/certificates/Certificate_10.jpg"
    },
    {
      id: 11,
      title: "ผู้ปฏิบัติตนตรงตามคุณลักษณะอันพึงประสงค์ 'อยู่อย่างพอเพียง'",
      description: "เป็นผู้ปฏิบัติตนตรงตามคุณลักษณะอันพึงประสงค์ข้อที่ ๔ 'อยู่อย่างพอเพียง' ชั้นมัธยมศึกษาปีที่ ๕/๒ ปีการศึกษา ๒๕๖๗",
      date: "25 กุมภาพันธ์ 2568",
      image: "/assets/certificates/Certificate_11.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <CertificateIcon className="text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ประกาศนียบัตร
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            ความสำเร็จและความภาคภูมิใจจากการเข้าร่วมกิจกรรมและโครงการต่าง ๆ
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {certificates.map((cert, index) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              onSelect={handleOpenModal}
              index={index}
            />
          ))}
        </motion.div>

        {/* ✅ แก้ไข Certificate Modal - ทำให้ลื่นไหลมากขึ้น */}
        <AnimatePresence mode="sync">
          {selectedCert && (
            <motion.div
              key="cert-modal-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
              onClick={handleCloseModal}
            >
              <motion.div
                key="cert-modal-content"
                layoutId={`cert-${selectedCert.id}`}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto cursor-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Image */}
                <motion.div layoutId={`cert-image-${selectedCert.id}`} className="relative">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-64 md:h-80 object-contain bg-gray-100 dark:bg-gray-900"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.7)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-all duration-200"
                  >
                    <CloseIcon />
                  </motion.button>
                </motion.div>

                {/* Modal Content */}
                <div className="p-6 md:p-8">
                  <motion.div 
                    className="flex items-center space-x-3 mb-4"
                    layoutId={`cert-header-${selectedCert.id}`}
                  >
                    <AwardIcon className="text-yellow-500 flex-shrink-0" />
                    <motion.h2 
                      className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
                      layoutId={`cert-title-${selectedCert.id}`}
                    >
                      {selectedCert.title}
                    </motion.h2>
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6"
                  >
                    {selectedCert.description}
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-2 text-gray-500 dark:text-gray-400"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">วันที่ได้รับ:</span>
                    <span>{selectedCert.date}</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg inline-flex items-center space-x-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              พบประกาศนียบัตรทั้งหมด {certificates.length} รายการ
            </span>
          </div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full filter blur-3xl -z-10"></div>
      <div className="fixed bottom-20 right-10 w-72 h-72 bg-purple-300/20 rounded-full filter blur-3xl -z-10"></div>
    </div>
  );
};

export default Certificates;