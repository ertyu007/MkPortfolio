import React, { useState, useEffect, useMemo } from 'react'; // ✅ เพิ่ม useMemo
import { TagCloud } from 'react-tagcloud';
import { aiRecommendation } from '../utils/ai';

const Skills = () => {
  // ✅ ใช้ useMemo — เพื่อให้ skills มี reference เดิมถ้าไม่มีการเปลี่ยนแปลง
  const skills = useMemo(() => [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 75 },
    { name: "Python", level: 80 },
    { name: "PostgreSQL", level: 70 },
    { name: "Tailwind CSS", level: 85 },
    { name: "AI/ML", level: 60 },
  ], []); // ✅ dependencies ว่าง — สร้างแค่ครั้งเดียว

  const [recommendation, setRecommendation] = useState("กำลังวิเคราะห์ทักษะของคุณ...");

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        if (!skills?.length) {
          throw new Error("No skills data");
        }
        const rec = await aiRecommendation(skills);
        setRecommendation(rec);
      } catch (err) {
        console.error("AI Recommendation Error:", err);
        setRecommendation("ลองเรียนรู้ TypeScript, Next.js หรือ Docker เพื่อพัฒนาทักษะขั้นสูง!");
      }
    };
    fetchRecommendation();
  }, [skills]); // ✅ ตอนนี้ปลอดภัย — skills ไม่เปลี่ยนทุก render

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">ทักษะของฉัน</h1>

      {/* Progress Bars */}
      <div className="mb-12">
        {skills.map((skill, idx) => (
          <div key={idx} className="mb-4" data-aos="fade-up">
            <div className="flex justify-between mb-1">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Tag Cloud */}
      <div className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow" data-aos="zoom-in">
        <h2 className="text-xl font-semibold mb-4">เมฆคำทักษะ</h2>
        <div style={{ height: '200px' }}>
          <TagCloud
            minSize={14}
            maxSize={36}
            tags={skills.map(s => ({ value: s.name, count: s.level }))}
            onClick={tag => console.log(`Selected: ${tag.value}`)}
            style={{
              fontFamily: 'sans-serif',
              width: '100%',
              height: '100%',
              padding: '10px',
            }}
          />
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg" data-aos="fade-up">
        <h3 className="font-bold text-lg mb-2">💡 AI แนะนำทักษะถัดไป:</h3>
        <p>{recommendation}</p>
      </div>
    </div>
  );
};

export default Skills;