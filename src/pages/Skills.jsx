import React from 'react';

const Skills = () => {
  const categories = [
    {
      title: "ทักษะทางเทคนิค",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600 dark:text-blue-400",
      skills: [
        { name: "HTML / CSS", level: 90, description: "สามารถออกแบบและจัดโครงสร้างเว็บไซต์ได้อย่างมีระบบ" },
        { name: "JavaScript", level: 70, description: "พัฒนาและปรับปรุงฟังก์ชันการทำงานพื้นฐานของเว็บไซต์ได้" },
        { name: "PHP", level: 70, description: "เขียนและแก้ไขโค้ดเบื้องต้นสำหรับงานฝั่งเซิร์ฟเวอร์" },
        { name: "Git", level: 70, description: "ใช้ในการควบคุมเวอร์ชันของโค้ดและการทำงานร่วมทีมได้" },
        { name: "การจัดการเครือข่าย LAN", level: 95, description: "สามารถวางระบบและแก้ไขปัญหาเครือข่ายได้" },
        { name: "การเข้าหัวสาย LAN", level: 100, description: "ทำได้อย่างถูกต้อง รวดเร็ว และมีประสิทธิภาพ" }
      ]
    },
    {
      title: "ทักษะด้านซอฟต์แวร์",
      color: "from-indigo-500 to-indigo-600",
      textColor: "text-indigo-600 dark:text-indigo-400",
      skills: [
        { name: "Microsoft Word", level: 90, description: "จัดทำรายงานและเอกสารทางการได้คล่องแคล่ว" },
        { name: "Canva", level: 90, description: "ออกแบบสื่อประชาสัมพันธ์และงานกราฟิกได้อย่างสร้างสรรค์" },
        { name: "Adobe Photoshop", level: 70, description: "ตกแต่งและปรับปรุงภาพถ่ายได้" },
        { name: "Adobe Premiere Pro", level: 70, description: "ตัดต่อวิดีโอสำหรับงานนำเสนอและกิจกรรมได้" },
        { name: "Adobe After Effects", level: 50, description: "สร้างแอนิเมชันและเอฟเฟกต์เบื้องต้น" },
        { name: "Adobe Lightroom Classic", level: 70, description: "ปรับแต่งภาพถ่ายเพื่อการนำเสนอ" },
        { name: "NetSetMan, JPerf, XAMPP", level: 70, description: "ใช้งานเพื่อทดสอบเครือข่ายและจำลองเซิร์ฟเวอร์" }
      ]
    },
    {
      title: "ทักษะด้านสังคม",
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-600 dark:text-purple-400",
      skills: [
        { name: "การทำงานเป็นทีม", level: 85, description: "สามารถทำงานร่วมกับผู้อื่นได้อย่างมีประสิทธิภาพ" },
        { name: "การสื่อสารที่มีประสิทธิภาพ", level: 85, description: "สื่อสารได้ชัดเจนและเข้าใจง่าย" },
        { name: "การปรับตัวเข้ากับสภาพแวดล้อม", level: 90, description: "สามารถปรับตัวได้ดีในสถานการณ์ต่างๆ" },
        { name: "ความรับผิดชอบสูง", level: 95, description: "มีความรับผิดชอบต่อหน้าที่และงานที่ได้รับมอบหมาย" },
        { name: "การทำงานร่วมกับผู้ใหญ่", level: 80, description: "สามารถทำงานร่วมกับผู้ใหญ่และบุคคลต่างวัยได้อย่างราบรื่น" }
      ]
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">ทักษะของฉัน</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">ทักษะและความสามารถที่ผมมี</p>
        </div>

        {/* Skills Grid */}
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-3xl p-2 shadow-xl">
              <h3 className={`text-3xl font-bold mb-8 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-3 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h4>
                      <span className={`font-bold ${category.textColor}`}>{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${category.color}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💡 คำแนะนำสำหรับคุณ:</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            แนะนำให้เรียนรู้ Python, Linux, และ CCNA เพื่อเตรียมความพร้อมสำหรับการสอบเข้าคณะวิศวกรรมศาสตร์ สาขาเครือข่าย
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skills;