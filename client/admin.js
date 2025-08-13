document.getElementById('add-job-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const newJob = {
    title: form.title.value,
    company: form.company.value,
    location: form.location.value,
    salary_usd: form.salary_usd.value,
    description: form.description.value
  };

  const res = await fetch('http://localhost:3000/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newJob)
  });

  const result = await res.json();
  document.getElementById('admin-status-message').textContent = result.message;
  form.reset();
});

