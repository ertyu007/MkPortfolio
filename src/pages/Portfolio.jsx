import React, { useState, useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';
import { aiSearch } from '../utils/ai';
import ProjectCard from '../components/ProjectCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Portfolio = () => {
  const { projects, likeProject } = useProjects();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [isAISearch, setIsAISearch] = useState(false);

  useEffect(() => {
    setFiltered(projects);
  }, [projects]);

  const handleSearch = async () => {
    if (!search.trim()) {
      setFiltered(projects);
      return;
    }

    if (isAISearch) {
      try {
        const results = await aiSearch(search, projects);
        setFiltered(results);
      } catch (err) {
        console.error("AI Search Error:", err);
        setFiltered(projects);
      }
    } else {
      const results = projects.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
      setFiltered(results);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [search, isAISearch, projects]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">ผลงานของฉัน</h1>

      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
        <input
          type="text"
          placeholder="ค้นหาผลงาน..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => setIsAISearch(!isAISearch)}
          className={`px-4 py-2 rounded-lg ${isAISearch ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          {isAISearch ? 'AI Search (ON)' : 'Keyword Search'}
        </button>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          ค้นหา
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onLike={() => likeProject(project.id)}
          />
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Portfolio;