import React from 'react';

const About = () => {
  const timeline = [
    { year: "2020", title: "จบ ม.6", desc: "โรงเรียน..." },
    { year: "2024", title: "จบ ปริญญาตรี", desc: "คณะวิศวกรรมศาสตร์..." },
    { year: "2024", title: "เริ่มทำงาน", desc: "ตำแหน่ง Frontend Developer..." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="section-title">เกี่ยวกับฉัน</h1>

      <div className="mb-12 text-lg leading-relaxed text-center max-w-3xl mx-auto">
        <p>สวัสดี! ผมชื่อ <span className="font-semibold">[ชื่อคุณ]</span> สนใจด้านการพัฒนาเว็บและ AI...</p>
        <p className="mt-4">เป้าหมาย: สร้างผลิตภัณฑ์ที่มีประโยชน์ต่อผู้คนด้วยเทคโนโลยี</p>
      </div>

      <h2 className="text-2xl font-semibold mb-8 text-center">เส้นทางการศึกษาและประสบการณ์</h2>
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
        {timeline.map((item, idx) => (
          <div key={idx} className="flex items-center mb-12 relative" data-aos="fade-up">
            <div className={`w-1/2 pr-8 text-right ${idx % 2 === 0 ? 'order-1' : 'order-2'}`}>
              <div className="glass-card p-6 pulse-on-hover">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.year}</p>
                <p className="mt-2">{item.desc}</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full z-10 flex items-center justify-center shadow-lg"></div>
            <div className={`w-1/2 pl-8 text-left ${idx % 2 === 0 ? 'order-2' : 'order-1'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;