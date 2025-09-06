import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaGithub, FaYoutube, FaFacebook, FaLine } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'YOUR_SERVICE_ID',   // 📌 Service ID
        'YOUR_TEMPLATE_ID',  // 📌 Template ID
        form,
        'YOUR_PUBLIC_KEY'    // 📌 Public Key
      )
      .then(
        () => {
          alert('✅ ส่งข้อความสำเร็จแล้ว!');
          setForm({ name: '', email: '', message: '' });
        },
        (error) => {
          alert('❌ เกิดข้อผิดพลาด: ' + error.text);
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-700">
        ติดต่อฉัน
      </h1>

      {/* Contact Form */}
      <form
        onSubmit={sendEmail}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6"
      >
        <input
          type="text"
          name="name"
          placeholder="ชื่อของคุณ"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="email"
          name="email"
          placeholder="อีเมล"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="message"
          placeholder="ข้อความของคุณ"
          value={form.message}
          onChange={handleChange}
          required
          rows="6"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'กำลังส่ง...' : '🚀 ส่งข้อความ'}
        </button>
      </form>

      {/* Social Links */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold mb-4">🌐 ติดตามฉันได้ที่</h3>
        <div className="flex justify-center space-x-8 text-3xl">
          <a
            href="https://github.com/ertyu007"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-white hover:text-indigo-600 hover:scale-110 transition-transform"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.youtube.com/@amazingwuji"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:scale-110 transition-transform"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.facebook.com/ertyu.kukre"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:scale-110 transition-transform"
          >
            <FaFacebook />
          </a>
          <a
            href="https://line.me/ti/p/eUc-v4Xhcb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:scale-110 transition-transform"
          >
            <FaLine />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
