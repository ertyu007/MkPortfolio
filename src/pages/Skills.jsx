import React, { useState, useEffect, useMemo } from 'react';
import { TagCloud } from 'react-tagcloud';
import { aiRecommendation } from '../utils/ai';

const Skills = () => {
  const skills = useMemo(() => [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 75 },
    { name: "Python", level: 80 },
    { name: "PostgreSQL", level: 70 },
    { name: "Tailwind CSS", level: 85 },
    { name: "AI/ML", level: 60 },
  ], []);

  const [recommendation, setRecommendation] = useState("กำลังวิเคราะห์ทักษะของคุณ...");

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const rec = await aiRecommendation(skills);
        setRecommendation(rec);
      } catch (err) {
        console.error("AI Recommendation Error:", err);
        setRecommendation("ลองเรียนรู้ TypeScript, Next.js หรือ Docker เพื่อพัฒนาทักษะขั้นสูง!");
      }
    };
    fetchRecommendation();
  }, [skills]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="section-title">ทักษะของฉัน</h1>

      <div className="mb-12 space-y-6">
        {skills.map((skill, idx) => (
          <div key={idx} className="pulse-on-hover" data-aos="fade-right" data-aos-delay={idx * 100}>
            <div className="flex justify-between mb-2">
              <span className="font-medium">{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-12 p-8 glass-card" data-aos="zoom-in">
        <h2 className="text-xl font-semibold mb-4 text-center">เมฆคำทักษะ</h2>
        <div style={{ height: '200px' }}>
          <TagCloud
            minSize={16}
            maxSize={40}
            tags={skills.map(s => ({ value: s.name, count: s.level }))}
            onClick={tag => console.log(`Selected: ${tag.value}`)}
            style={{
              fontFamily: 'Inter, sans-serif',
              width: '100%',
              height: '100%',
              padding: '10px',
            }}
          />
        </div>
      </div>

      <div className="p-8 glass-card bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20" data-aos="fade-up">
        <h3 className="font-bold text-lg mb-2 text-indigo-600 dark:text-indigo-400">💡 AI แนะนำทักษะถัดไป:</h3>
        <p className="text-gray-700 dark:text-gray-300">{recommendation}</p>
      </div>
    </div>
  );
};

export default Skills;