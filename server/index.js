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

// ✅ API: Like project
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
      return res.status(400).json({ error: "Invalid action" });
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

// ✅ เริ่ม server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server ทำงานที่ http://localhost:${PORT}`);
  console.log(`🚀 ทดสอบ API: http://localhost:${PORT}/api/projects`);
});