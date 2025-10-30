// Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const categories = [
    {
      title: "ทักษะทางเทคนิค",
      color: "from-cyan-500 to-blue-500",
      textColor: "text-cyan-600 dark:text-cyan-400",
      skills: [
        { name: "HTML / CSS", level: "สูง", description: "สามารถออกแบบและจัดโครงสร้างเว็บไซต์ได้อย่างมีระบบ" },
        { name: "JavaScript", level: "กลาง", description: "พัฒนาและปรับปรุงฟังก์ชันการทำงานพื้นฐานของเว็บไซต์ได้" },
        { name: "PHP", level: "กลาง", description: "เขียนและแก้ไขโค้ดเบื้องต้นสำหรับงานฝั่งเซิร์ฟเวอร์" },
        { name: "Git", level: "กลาง", description: "ใช้ในการควบคุมเวอร์ชันของโค้ดและการทำงานร่วมทีมได้" },
        { name: "การจัดการเครือข่าย LAN", level: "กลาง", description: "สามารถวางระบบและแก้ไขปัญหาเครือข่ายได้" },
        { name: "การเข้าหัวสาย LAN", level: "สูง", description: "ทำได้อย่างถูกต้อง รวดเร็ว และมีประสิทธิภาพ" }
      ]
    },
    {
      title: "ทักษะด้านซอฟต์แวร์",
      color: "from-blue-500 to-indigo-500",
      textColor: "text-blue-600 dark:text-blue-400",
      skills: [
        { name: "Microsoft Word", level: "สูง", description: "จัดทำรายงานและเอกสารทางการได้คล่องแคล่ว" },
        { name: "Canva", level: "สูง", description: "ออกแบบสื่อประชาสัมพันธ์และงานกราฟิกได้อย่างสร้างสรรค์" },
        { name: "Adobe Photoshop", level: "กลาง", description: "ตกแต่งและปรับปรุงภาพถ่ายได้" },
        { name: "Adobe Premiere Pro", level: "กลาง", description: "ตัดต่อวิดีโอสำหรับงานนำเสนอและกิจกรรมได้" },
        { name: "Adobe After Effects", level: "กลาง", description: "สร้างแอนิเมชันและเอฟเฟกต์เบื้องต้น" },
        { name: "Adobe Lightroom Classic", level: "กลาง", description: "ปรับแต่งภาพถ่ายเพื่อการนำเสนอ" },
        { name: "NetSetMan, JPerf, XAMPP", level: "กลาง", description: "ใช้งานเพื่อทดสอบเครือข่ายและจำลองเซิร์ฟเวอร์" }
      ]
    },
    {
      title: "ทักษะด้านสังคม",
      color: "from-indigo-500 to-purple-500",
      textColor: "text-indigo-600 dark:text-indigo-400",
      skills: [
        { name: "การทำงานเป็นทีม", level: "สูง", description: "สามารถทำงานร่วมกับผู้อื่นได้อย่างมีประสิทธิภาพ" },
        { name: "การสื่อสารที่มีประสิทธิภาพ", level: "สูง", description: "สื่อสารได้ชัดเจนและเข้าใจง่าย" },
        { name: "การปรับตัวเข้ากับสภาพแวดล้อม", level: "สูง", description: "สามารถปรับตัวได้ดีในสถานการณ์ต่างๆ" },
        { name: "ความรับผิดชอบสูง", level: "สูง", description: "มีความรับผิดชอบต่อหน้าที่และงานที่ได้รับมอบหมาย" },
        { name: "การทำงานร่วมกับผู้ใหญ่", level: "สูง", description: "สามารถทำงานร่วมกับผู้ใหญ่และบุคคลต่างวัยได้อย่างราบรื่น" }
      ]
    }
  ];

  // Floating animation
  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // กำหนดสีและไอคอนตามระดับ
  const getLevelStyle = (level) => {
    switch (level) {
      case 'ต่ำ':
        return {
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'text-red-800 dark:text-red-300',
          icon: '🔴'
        };
      case 'กลาง':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          text: 'text-yellow-800 dark:text-yellow-300',
          icon: '🟡'
        };
      case 'สูง':
        return {
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'text-green-800 dark:text-green-300',
          icon: '🟢'
        };
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-700',
          text: 'text-gray-800 dark:text-gray-300',
          icon: '⚪'
        };
    }
  };

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-cyan-950 dark:to-blue-950 py-20 relative overflow-hidden">
      {/* Floating Background Elements */}
      <motion.div
        variants={floatingVariants}
        animate="float"
        className="absolute top-20 left-10 w-32 h-32 bg-cyan-200/30 dark:bg-cyan-700/20 rounded-full blur-3xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 2 }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/20 dark:bg-blue-700/20 rounded-full blur-3xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 1 }}
        className="absolute top-1/2 left-1/3 w-28 h-28 bg-indigo-200/20 dark:bg-indigo-700/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">ทักษะของฉัน</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">ทักษะและความสามารถที่ผมมี — แบ่งตามระดับ ต่ำ / กลาง / สูง</p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className={`text-3xl font-bold mb-8 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, skillIndex) => {
                  const levelStyle = getLevelStyle(skill.level);
                  return (
                    <motion.div
                      key={skillIndex}
                      className="bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100/50 dark:border-gray-700/50"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{skill.name}</h4>
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${levelStyle.bg} ${levelStyle.text} font-medium backdrop-blur-sm`}>
                          <span>{levelStyle.icon}</span>
                          <span>{skill.level}</span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {skill.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-3xl p-8 text-center border border-cyan-200/50 dark:border-cyan-800/50 backdrop-blur-xl"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, duration: 0.7, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💡 คำแนะนำสำหรับคุณ:</h3>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            แนะนำให้เรียนรู้ Python, Linux, และ CCNA เพื่อเตรียมความพร้อมสำหรับการสอบเข้าคณะวิศวกรรมศาสตร์ สาขาเครือข่าย
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;