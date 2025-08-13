// client/index.js
const API_URL = 'https://remote-job-board-ze6g.onrender.com/api/jobs';

document.addEventListener('DOMContentLoaded', async () => {
  const jobList = document.getElementById('job-list');

  try {
    const res = await fetch(API_URL);
    const jobs = await res.json();

    jobs.forEach(job => {
      const div = document.createElement('div');
      div.className = 'job-card';
      div.innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location || 'Remote'}</p>
        <p><strong>Salary:</strong> ${job.salary_usd ? `$${job.salary_usd}` : 'Not specified'}</p>
        <p>${job.description?.slice(0, 150) || job.description || 'No description'}</p>
        <p><strong>Apply:</strong> Job ID ${job.id || job.title}</p>
      `;
      jobList.appendChild(div);
    });
  } catch (error) {
    jobList.innerHTML = `<p>❌ Failed to load jobs.</p>`;
    console.error(error);
  }
});
