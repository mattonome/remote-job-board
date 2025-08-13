// server/app.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let addedJobs = [];
let applications = [];

// Get jobs (from RemoteOK + in-memory jobs)
app.get('/api/jobs', async (req, res) => {
  try {
    const response = await fetch('https://remoteok.com/api');
    const remoteJobs = await response.json();

    // Skip the first element (metadata) and limit to 10
    const jobs = remoteJobs.slice(1, 10);
    const allJobs = [...addedJobs, ...jobs];

    res.json(allJobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Add a job (admin feature)
app.post('/api/jobs', (req, res) => {
  const job = req.body;
  addedJobs.push(job);
  res.json({ message: '✅ Job added successfully!' });
});

// Apply for a job (mock)
app.post('/api/apply', (req, res) => {
  const application = {
    ...req.body,
    applied_at: new Date().toISOString()
  };
  applications.push(application);
  console.log('Application received:', application);
  res.json({ message: '✅ Application submitted (mock)' });
});

// View all applications
app.get('/api/applications', (req, res) => {
  res.json(applications);
});

// ✅ Listen only once, at the end
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
