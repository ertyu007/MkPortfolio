import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

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
        'YOUR_SERVICE_ID',     // 📌 เติมตรงนี้
        'YOUR_TEMPLATE_ID',    // 📌 เติมตรงนี้
        form,
        'YOUR_PUBLIC_KEY'      // 📌 เติมตรงนี้
      )
      .then(
        () => {
          alert('ส่งข้อความสำเร็จ!');
          setForm({ name: '', email: '', message: '' });
        },
        (error) => {
          alert('เกิดข้อผิดพลาด: ' + error.text);
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">ติดต่อฉัน</h1>

      <form onSubmit={sendEmail} className="space-y-6">
        <input
          type="text"
          name="name"
          placeholder="ชื่อของคุณ"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="email"
          name="email"
          placeholder="อีเมล"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="message"
          placeholder="ข้อความของคุณ"
          value={form.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'กำลังส่ง...' : 'ส่งข้อความ'}
        </button>
      </form>

      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold mb-4">ติดตามฉันได้ที่</h3>
        <div className="flex justify-center space-x-6 text-2xl">
          <a href="https://github.com/YOUR_USERNAME" target="_blank" rel="noreferrer" className="hover:text-gray-600 dark:hover:text-gray-300">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/YOUR_USERNAME" target="_blank" rel="noreferrer" className="hover:text-blue-600">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/YOUR_USERNAME" target="_blank" rel="noreferrer" className="hover:text-blue-400">
            <FaTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;