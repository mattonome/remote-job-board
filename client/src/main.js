const jobsContainer = document.getElementById('jobs-container');

async function getUserCurrency() {
  const res = await fetch('https://ipapi.co/json/');
  const data = await res.json();
  return data.currency || 'USD';
}

async function convertCurrency(amount, toCurrency) {
  const res = await fetch(`https://api.exchangerate.host/convert?from=USD&to=${toCurrency}&amount=${amount}`);
  const data = await res.json();
  return data.result;
}

async function displayJobs() {
  const userCurrency = await getUserCurrency();
  const response = await fetch('http://localhost:3000/api/jobs');
  const jobs = await response.json();

  for (const job of jobs) {
    const salaryConverted = await convertCurrency(job.salary_usd, userCurrency);

    const div = document.createElement('div');
    div.className = 'job-card';
    div.innerHTML = `
      <h2>${job.title}</h2>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Salary:</strong> ${salaryConverted.toFixed(2)} ${userCurrency}</p>
      <p>${job.description}</p>
    `;
    jobsContainer.appendChild(div);
  }
}

displayJobs();

document.getElementById('application-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = {
    job_id: form.job_id.value,
    name: form.name.value,
    email: form.email.value,
    cover_letter: form.cover_letter.value
  };

  const res = await fetch('http://localhost:3000/api/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  const result = await res.json();
  document.getElementById('status-message').textContent = result.message;
  form.reset();
});
