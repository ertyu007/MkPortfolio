// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ เชื่อม Neon DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ✅ สร้างตาราง + ข้อมูลตัวอย่าง
async function initializeDatabase() {
  try {
    // สร้างตาราง
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        tags TEXT[],
        like_count INTEGER DEFAULT 0,
        dislike_count INTEGER DEFAULT 0,
        image_url TEXT
      );
    `);
    console.log("✅ สร้างตาราง projects สำเร็จ");

    // ใส่ข้อมูลตัวอย่าง
    const result = await pool.query('SELECT COUNT(*) FROM projects');
    if (result.rows[0].count === '0') {
      await pool.query(`
        INSERT INTO projects (title, description, tags, like_count, dislike_count, image_url) VALUES
        ('ระบบจัดการงานด้วย AI', 'พัฒนาด้วย React + Node.js + OpenAI API', ARRAY['React', 'AI', 'Node.js'], 12, 2, 'https://via.placeholder.com/400x200?text=AI+Project'),
        ('แอปจองห้องประชุม', 'ระบบจองห้องแบบเรียลไทม์', ARRAY['React', 'Firebase', 'Tailwind'], 8, 1, 'https://via.placeholder.com/400x200?text=Booking+App'),
        ('เว็บพอร์ตโฟลิโอส่วนตัว', 'ออกแบบ UI/UX + พัฒนาด้วย React 19', ARRAY['React', 'Tailwind', 'Portfolio'], 15, 0, 'https://via.placeholder.com/400x200?text=My+Portfolio')
        ON CONFLICT DO NOTHING;
      `);
      console.log("✅ ใส่ข้อมูลตัวอย่างสำเร็จ");
    }
  } catch (err) {
    console.error("❌ สร้างฐานข้อมูลไม่สำเร็จ:", err);
    process.exit(1);
  }
}

// ✅ API: ดึง projects ทั้งหมด
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error("❌ GET /api/projects:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ API: Like/Unlike
app.post('/api/projects/:id/like', async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  try {
    let result;
    if (action === 'like') {
      result = await pool.query(
        'UPDATE projects SET like_count = like_count + 1 WHERE id = $1 RETURNING like_count',
        [id]
      );
    } else if (action === 'unlike') {
      result = await pool.query(
        'UPDATE projects SET like_count = GREATEST(like_count - 1, 0) WHERE id = $1 RETURNING like_count',
        [id]
      );
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ like_count: result.rows[0].like_count });
  } catch (err) {
    console.error("❌ POST /api/projects/:id/like:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ API: Dislike/Undislike
app.post('/api/projects/:id/dislike', async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  try {
    let result;
    if (action === 'dislike') {
      result = await pool.query(
        'UPDATE projects SET dislike_count = dislike_count + 1 WHERE id = $1 RETURNING dislike_count',
        [id]
      );
    } else if (action === 'undislike') {
      result = await pool.query(
        'UPDATE projects SET dislike_count = GREATEST(dislike_count - 1, 0) WHERE id = $1 RETURNING dislike_count',
        [id]
      );
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ dislike_count: result.rows[0].dislike_count });
  } catch (err) {
    console.error("❌ POST /api/projects/:id/dislike:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ เริ่ม server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`✅ Server ทำงานที่ http://localhost:${PORT}`);
  console.log(`🚀 ทดสอบ API: http://localhost:${PORT}/api/projects`);
});