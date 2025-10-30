// Certificates.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CertificateCard from '../components/CertificateCard';

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
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

  // ใช้ useMemo เพื่อป้องกันการ recreate data
  const certificates = useMemo(() => [
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
  ], []);

  // ใช้ useMemo สำหรับ animations
  const animations = useMemo(() => ({
    modalVariants: {
      hidden: {
        opacity: 0,
        scale: 0.8,
        y: 50,
        transition: {
          duration: 0.3,
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
          stiffness: 250,
          mass: 0.8
        }
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        y: -30,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      }
    },

    overlayVariants: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration: 0.3,
          ease: "easeOut"
        }
      },
      exit: { 
        opacity: 0,
        transition: { 
          duration: 0.2,
          ease: "easeIn"
        }
      }
    },

    backgroundVariants: {
      animate1: {
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.4, 0.2],
        x: [0, 20, 0],
        y: [0, -15, 0]
      },
      animate2: {
        scale: [1, 1.2, 1],
        opacity: [0.15, 0.3, 0.15],
        x: [0, -30, 0],
        y: [0, 20, 0]
      }
    }
  }), []);

  // Optimized background elements
  const BackgroundElements = () => (
    <>
      <motion.div
        className="absolute top-20 left-10 w-60 h-60 bg-amber-300/15 rounded-full blur-3xl"
        animate={animations.backgroundVariants.animate1}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'transform' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-orange-300/15 rounded-full blur-3xl"
        animate={animations.backgroundVariants.animate2}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ willChange: 'transform' }}
      />
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-orange-50/50 to-yellow-50/50 dark:from-gray-900 dark:via-amber-950/50 dark:to-orange-950/50 py-12 relative overflow-hidden">
      <BackgroundElements />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="text-center mb-12"
        >
          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg mr-3"
              style={{ willChange: 'transform' }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </motion.div>
            <motion.h1
              className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              ประกาศนียบัตร
            </motion.h1>
          </motion.div>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            ความสำเร็จและความภาคภูมิใจจากการเข้าร่วมกิจกรรมและโครงการต่าง ๆ
          </motion.p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence>
            {certificates.map((cert, index) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                onSelect={handleOpenModal}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCert && (
            <>
              <motion.div
                variants={animations.overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
                onClick={handleCloseModal}
              >
                <motion.div
                  layoutId={`cert-${selectedCert.id}`}
                  className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden w-full max-w-3xl max-h-[85vh] overflow-y-auto cursor-auto border border-white/30 dark:border-gray-700/30"
                  onClick={(e) => e.stopPropagation()}
                  variants={animations.modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ willChange: 'transform' }}
                >
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-white/30 dark:border-gray-600/30 transition-all duration-300 shadow-lg"
                    style={{ willChange: 'transform' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>

                  {/* Modal Content */}
                  <div className="max-h-[85vh] overflow-y-auto">
                    {/* Image */}
                    <motion.div
                      layoutId={`cert-image-${selectedCert.id}`}
                      className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600"
                    >
                      <img
                        src={selectedCert.image}
                        alt={selectedCert.title}
                        className="w-full h-60 md:h-72 object-contain"
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="p-6">
                      <motion.div
                        className="flex items-center space-x-3 mb-4"
                        layoutId={`cert-header-${selectedCert.id}`}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, -3, 3, 0],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                          className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-md"
                          style={{ willChange: 'transform' }}
                        >
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </motion.div>
                        <motion.h2
                          className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight"
                          layoutId={`cert-title-${selectedCert.id}`}
                        >
                          {selectedCert.title}
                        </motion.h2>
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4"
                      >
                        {selectedCert.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg p-3 border border-white/30 dark:border-gray-600/30"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">วันที่ได้รับ:</span>
                        <span className="text-sm">{selectedCert.date}</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.div
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl p-4 shadow-lg inline-flex items-center space-x-3 border border-white/30 dark:border-gray-700/30"
            whileHover={{ scale: 1.03, y: -1 }}
            transition={{ type: "spring", stiffness: 400 }}
            style={{ willChange: 'transform' }}
          >
            <motion.div
              className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
              พบประกาศนียบัตรทั้งหมด {certificates.length} รายการ
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certificates;