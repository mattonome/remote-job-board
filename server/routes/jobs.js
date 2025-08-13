const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const [jobs] = await db.query('SELECT * FROM jobs ORDER BY posted_date DESC');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

module.exports = router;



// server/routes/jobs.js (append below existing routes)
router.post('/', async (req, res) => {
  const { title, company, location, salary_usd, description } = req.body;
  try {
    await db.execute(
      `INSERT INTO jobs (title, company, location, salary_usd, description) VALUES (?, ?, ?, ?, ?)`,
      [title, company, location, salary_usd, description]
    );
    res.json({ message: '✅ Job added successfully!' });
  } catch (error) {
    console.error('Add job error:', error);
    res.status(500).json({ message: '❌ Failed to add job' });
  }
});
