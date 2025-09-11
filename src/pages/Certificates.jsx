import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

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

const CertificateCard = ({ cert, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer group"
      data-aos="fade-up"
    >
      <div className="relative overflow-hidden">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-2">
          <AwardIcon className="text-yellow-500" />
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{cert.title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {cert.date || "ไม่ระบุวันที่"}
        </p>
      </div>
    </div>
  );
};

const Certificates = () => {
  const [selected, setSelected] = useState(null);

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
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-center justify-center mb-8">
        <CertificateIcon className="text-blue-600 dark:text-blue-400 mr-3" />
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          ประกาศนียบัตร
        </h1>
      </div>

      <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
        ความสำเร็จและความภาคภูมิใจจากการเข้าร่วมกิจกรรมและโครงการต่าง ๆ
      </p>

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
          className="fixed inset-4 bg-white dark:bg-gray-900 p-6 rounded-xl max-w-4xl mx-auto mt-20 shadow-2xl overflow-auto max-h-[90vh] z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <button
            onClick={() => setSelected(null)}
            className="float-right text-2xl font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <AwardIcon className="text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selected.title}</h2>
            </div>
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full max-h-96 object-contain rounded-lg mx-auto mb-6"
            />
            <div className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              {selected.description}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              <strong>วันที่ได้รับ:</strong> {selected.date}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Certificates;