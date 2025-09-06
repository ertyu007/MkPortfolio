import React from 'react';

const About = () => {
  const timeline = [
    { year: "2020", title: "จบ ม.6", desc: "โรงเรียน..." },
    { year: "2024", title: "จบ ปริญญาตรี", desc: "คณะวิศวกรรมศาสตร์..." },
    { year: "2024", title: "เริ่มทำงาน", desc: "ตำแหน่ง Frontend Developer..." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">เกี่ยวกับฉัน</h1>

      <div className="mb-12 text-lg leading-relaxed">
        <p>สวัสดี! ผมชื่อ [ชื่อคุณ] สนใจด้านการพัฒนาเว็บและ AI...</p> {/* 📌 เติมตรงนี้ */}
        <p className="mt-4">เป้าหมาย: สร้างผลิตภัณฑ์ที่มีประโยชน์ต่อผู้คนด้วยเทคโนโลยี</p>
      </div>

      <h2 className="text-2xl font-semibold mb-6">เส้นทางการศึกษาและประสบการณ์</h2>
      <div className="relative border-l-2 border-indigo-600 dark:border-indigo-400 ml-4">
        {timeline.map((item, idx) => (
          <div key={idx} className="mb-8 ml-8" data-aos="fade-right">
            <div className="absolute w-4 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-full -left-2.5"></div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.year}</p>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;