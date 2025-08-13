
async function getCurrency() {
  const locRes = await fetch("https://ipapi.co/json");
  const locData = await locRes.json();
  return locData.currency || "USD";
}

async function getRate(toCurrency) {
  const res = await fetch(`https://api.exchangerate.host/convert?from=USD&to=${toCurrency}`);
  const data = await res.json();
  return data.result || 1;
}

async function fetchJobs() {
  const res = await fetch("http://localhost:3000/api/jobs");
  return res.json();
}

async function displayJobs() {
  const currency = await getCurrency();
  const rate = await getRate(currency);
  const jobs = await fetchJobs();
  const list = document.getElementById("job-list");
  list.innerHTML = "";

  jobs.forEach(job => {
    const li = document.createElement("li");
    const convertedSalary = (job.salary_usd * rate).toFixed(2);
    li.textContent = `${job.title} at ${job.company} - ${convertedSalary} ${currency}`;
    list.appendChild(li);
  });
}

displayJobs();
