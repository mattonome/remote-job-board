// server/app.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory storage
let addedJobs = [];
let applications = [];

app.get('/api/jobs', async (req, res) => {
  try {
    const response = await fetch('https://remoteok.com/api');
    const remoteJobs = await response.json();
    const jobs = remoteJobs.slice(1, 10); // skip metadata
    const allJobs = [...addedJobs, ...jobs];
    res.json(allJobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.post('/api/jobs', (req, res) => {
  const job = req.body;
  addedJobs.push(job);
  res.json({ message: '✅ Job added successfully!' });
});

app.post('/api/apply', (req, res) => {
  const application = {
    ...req.body,
    applied_at: new Date().toISOString()
  };
  applications.push(application);
  console.log('Application received:', application);
  res.json({ message: '✅ Application submitted (mock)' });
});

app.get('/api/applications', (req, res) => {
  res.json(applications);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
