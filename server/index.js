require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { projectsData } = require('./data/projects.js');

const app = express();
app.use(cors({
  origin: ['https://thnapazones.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ✅ สร้างตาราง + ใส่ข้อมูลตัวอย่างอัตโนมัติ
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

    // ตรวจสอบว่ามีข้อมูลอยู่แล้วหรือยัง
    const checkResult = await pool.query('SELECT COUNT(*) FROM projects');
    const count = parseInt(checkResult.rows[0].count);

    if (count === 0) {
      console.log("⏳ กำลังใส่ข้อมูลตัวอย่าง...");
      // ใส่ข้อมูลจาก projectsData
      for (let project of projectsData) {
        await pool.query(
          `INSERT INTO projects (title, description, tags, like_count, dislike_count, image_url) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            project.title,
            project.description,
            project.tags,
            project.like_count,
            project.dislike_count,
            project.image_url
          ]
        );
      }
      console.log("✅ ใส่ข้อมูลตัวอย่างสำเร็จ");
    } else {
      console.log(`✅ มีข้อมูล ${count} รายการอยู่แล้ว — ไม่ต้องใส่ใหม่`);
    }
  } catch (err) {
    console.error("❌ สร้างฐานข้อมูลไม่สำเร็จ:", err);
    process.exit(1);
  }
}

app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/projects Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

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
      return res.status(400).json({ error: "Invalid action. Use 'like' or 'unlike'" });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ like_count: result.rows[0].like_count });
  } catch (err) {
    console.error("POST /api/projects/:id/like Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ API: Dislike project
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
      return res.status(400).json({ error: "Invalid action. Use 'dislike' or 'undislike'" });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ dislike_count: result.rows[0].dislike_count });
  } catch (err) {
    console.error("POST /api/projects/:id/dislike Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await initializeDatabase(); // ✅ เรียกฟังก์ชันนี้ก่อนเริ่ม server
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🚀 Test API: http://localhost:${PORT}/api/projects`);
});