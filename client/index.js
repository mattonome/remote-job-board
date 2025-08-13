

// ✅ Backend API URL (update to your deployed backend)
const API_URL = 'https://remote-job-board-ze6g.onrender.com';

// Function to fetch jobs
async function fetchJobs() {
  try {
    const res = await fetch(`${API_URL}/jobs`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    const jobs = await res.json();

    const jobList = document.getElementById('job-list');
    jobList.innerHTML = ''; // clear any existing jobs

    jobs.forEach(job => {
      const jobCard = document.createElement('div');
      jobCard.className = 'job-card';

      jobCard.innerHTML = `
        <h3>${job.title || 'Untitled Job'}</h3>
        <p><strong>Company:</strong> ${job.company || 'Not specified'}</p>
        <p><strong>Location:</strong> ${job.location || 'Not specified'}</p>
        <p><strong>Salary:</strong> ${job.salary || 'Not specified'}</p>
        <p>${job.description ? job.description.slice(0, 120) + '...' : 'No description provided.'}</p>
        <a href="#">Apply: Job ID ${job.id}</a>
      `;

      jobList.appendChild(jobCard);
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    document.getElementById('job-list').innerHTML = `<p>❌ Failed to load jobs.</p>`;
  }
}

// Function to handle job application form submission
function handleFormSubmit() {
  const form = document.getElementById('application-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent page reload

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch(`${API_URL}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Failed to submit');

      document.getElementById('status-message').textContent = '✅ Application submitted successfully!';
      form.reset();
    } catch (error) {
      document.getElementById('status-message').textContent = '❌ Failed to submit application.';
      console.error('Application error:', error);
    }
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  fetchJobs();
  handleFormSubmit();
});
