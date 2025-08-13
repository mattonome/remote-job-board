// server/app.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory storage
let addedJobs = [];
let applications = [];

// Helper function to normalize jobs
function normalizeJob(job) {
  return {
    id: job.id || Date.now(),
    title: job.title || job.position || 'Untitled Job',
    company: job.company || 'Unknown',
    location: job.location || 'Remote',
    salary_usd: job.salary_usd || null,
    description: job.description || 'No description',
  };
}

// GET jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const response = await fetch('https://remoteok.com/api');
    const remoteJobs = await response.json();

    // Skip metadata row and normalize
    const jobs = remoteJobs
      .slice(1, 10)
      .map(normalizeJob);

    const allJobs = [...addedJobs.map(normalizeJob), ...jobs];
    res.json(allJobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// POST new job
app.post('/api/jobs', (req, res) => {
  const job = normalizeJob(req.body);
  addedJobs.push(job);
  res.json({ message: '✅ Job added successfully!', job });
});

// POST application
app.post('/api/apply', (req, res) => {
  const application = {
    ...req.body,
    applied_at: new Date().toISOString(),
  };
  applications.push(application);
  console.log('Application received:', application);
  res.json({ message: '✅ Application submitted (mock)' });
});

// GET applications
app.get('/api/applications', (req, res) => {
  res.json(applications);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
