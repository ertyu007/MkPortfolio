// TikTokVideos.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TikTokVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ฟังก์ชันดึงข้อมูลจาก TikTok API
  const fetchTikTokVideos = async () => {
    try {
      const username = process.env.REACT_APP_TIKTOK_USERNAME;
      const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
      const apiHost = process.env.REACT_APP_TIKTOK_API_HOST;

      // ตรวจสอบว่ามี environment variables ครบหรือไม่
      if (!username || !apiKey || !apiHost) {
        throw new Error('TikTok API configuration is missing');
      }

      const response = await fetch(
        `https://${apiHost}/user/posts?username=${username}&count=12`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch TikTok videos: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.data && Array.isArray(data.data)) {
        const formattedVideos = data.data.map(video => ({
          id: video.id,
          title: video.title || "TikTok Video",
          description: video.desc || "คลิปวิดีโอจาก TikTok",
          thumbnail: video.cover || video.thumbnail,
          videoUrl: video.play || video.downloadAddr,
          views: formatCount(video.playCount),
          likes: formatCount(video.diggCount),
          comments: formatCount(video.commentCount),
          shares: formatCount(video.shareCount),
          date: formatDate(video.createTime),
          music: video.music?.title || "Original Sound",
          duration: video.duration ? formatDuration(video.duration) : "0:00"
        }));

        setVideos(formattedVideos);
      } else {
        throw new Error('Invalid response format from TikTok API');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching TikTok videos:', err);
      setError(err.message || 'ไม่สามารถดึงวิดีโอได้ในขณะนี้');
      setLoading(false);
    }
  };

  // ฟังก์ชันจัดรูปแบบตัวเลข
  const formatCount = (count) => {
    if (!count) return "0";
    const num = parseInt(count);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // ฟังก์ชันจัดรูปแบบวันที่
  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "ไม่ทราบวันที่";
    }
  };

  // ฟังก์ชันจัดรูปแบบระยะเวลาวิดีโอ
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    fetchTikTokVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"
            />
            <p className="mt-4 text-gray-600 dark:text-gray-400">กำลังโหลดวิดีโอจาก TikTok...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-lg font-medium">{error}</p>
            </div>
            <button 
              onClick={fetchTikTokVideos}
              className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
            >
              ลองใหม่อีกครั้ง
            </button>
            
            {/* แสดงข้อมูลตัวอย่างถ้า API ไม่ทำงาน */}
            {error.includes('configuration') && (
              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  ⚠️ ต้องการตั้งค่า Environment Variables ในไฟล์ .env
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            TikTok <span className="text-cyan-600">Videos</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            คลิปวิดีโอล่าสุดจาก TikTok ของ 
            <span className="text-cyan-600 font-medium"> @{process.env.REACT_APP_TIKTOK_USERNAME}</span>
          </p>
          <div className="mt-4 flex justify-center items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>📱 {videos.length} วิดีโอ</span>
            <span>•</span>
            <span>🔄 อัพเดทอัตโนมัติ</span>
          </div>
        </motion.div>

        {/* Videos Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-[9/16] bg-gray-200 dark:bg-gray-700 overflow-hidden">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white text-4xl">📱</span>
                  </div>
                )}
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                {/* Video Duration */}
                {video.duration && (
                  <div className="absolute top-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-full">
                    {video.duration}
                  </div>
                )}

                {/* Video Stats */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between text-white text-xs">
                  <div className="flex items-center space-x-1 bg-black/70 px-2 py-1 rounded-full backdrop-blur-sm">
                    <span>👁️</span>
                    <span className="font-medium">{video.views}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-black/70 px-2 py-1 rounded-full backdrop-blur-sm">
                    <span>❤️</span>
                    <span className="font-medium">{video.likes}</span>
                  </div>
                </div>
              </div>
              
              {/* Video Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
                
                {/* Additional Stats */}
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <span>💬</span>
                      <span>{video.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>↗️</span>
                      <span>{video.shares}</span>
                    </div>
                  </div>
                  <span className="text-gray-400">{video.date}</span>
                </div>

                {/* Music Info */}
                {video.music && video.music !== "Original Sound" && (
                  <div className="mb-3 flex items-center space-x-2 text-xs text-cyan-600 dark:text-cyan-400">
                    <span>🎵</span>
                    <span className="truncate flex-1">{video.music}</span>
                  </div>
                )}

                {/* Watch on TikTok Button */}
                <a
                  href={`https://www.tiktok.com/@${process.env.REACT_APP_TIKTOK_USERNAME}/video/${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-center py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                >
                  <span>ดูบน TikTok</span>
                  <svg 
                    className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            ติดตามเพิ่มเติมได้ที่{' '}
            <a 
              href={`https://www.tiktok.com/@${process.env.REACT_APP_TIKTOK_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 hover:text-cyan-700 font-medium"
            >
              @{process.env.REACT_APP_TIKTOK_USERNAME}
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TikTokVideos;