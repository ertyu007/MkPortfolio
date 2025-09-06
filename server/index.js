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

// ✅ สร้างตาราง projects (ถ้ายังไม่มี)
async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      tags TEXT[],
      like_count INTEGER DEFAULT 0,
      image_url TEXT
    );
  `;
  await pool.query(query);
  console.log("Table 'projects' is ready");
}
createTable();

// ✅ API: ดึง projects ทั้งหมด
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ API: Like project
app.post('/api/projects/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE projects SET like_count = like_count + 1 WHERE id = $1 RETURNING like_count',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ like_count: result.rows[0].like_count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ API: Dislike project
app.post('/api/projects/:id/dislike', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE projects SET dislike_count = COALESCE(dislike_count, 0) + 1 WHERE id = $1 RETURNING dislike_count',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ dislike_count: result.rows[0].dislike_count });
  } catch (err) {
    console.error("Dislike Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

