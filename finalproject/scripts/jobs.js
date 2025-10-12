document.addEventListener("DOMContentLoaded", () => {
  const functionFilter = document.getElementById("functionFilter");
  const typeFilter = document.getElementById("typeFilter");
  const locationFilter = document.getElementById("locationFilter");
  const findBtn = document.getElementById("findBtn");
  const jobList = document.getElementById("jobList");
  const allBtn = document.querySelector(".btn-load");
  const resultsCount = document.getElementById("resultsCount");

  let jobsData = [];

  // Load jobs from jobs.json
  async function loadJobs() {
    try {
      const res = await fetch("jobs.json");
      jobsData = await res.json();
    } catch (err) {
      console.error("Error loading jobs:", err);
      jobList.innerHTML = `<p class="error">⚠️ Unable to load job data. Please try again later.</p>`;
    }
  }

  // Display job results
  function displayJobs(filteredJobs) {
    if (!filteredJobs.length) {
      jobList.innerHTML = `<p class="no-results">No matching jobs found. Try different filters.</p>`;
      resultsCount.textContent = "";
      return;
    }

    jobList.innerHTML = filteredJobs
      .map(
        (job) => `
        <div class="job-card">
          <h3>${job.title}</h3>
          <p><strong>Company:</strong> ${job.company}</p>
          <p><strong>Location:</strong> ${job.location}</p>
          <p><strong>Type:</strong> ${job.type}</p>
          <p><strong>Function:</strong> ${job.function}</p>
          <p>${job.description}</p>
          <button class="btn small">Apply Now</button>
        </div>
      `
      )
      .join("");

    resultsCount.textContent = `${filteredJobs.length} job${filteredJobs.length > 1 ? "s" : ""} found`;
  }

  // Filter jobs
  function filterJobs() {
    const func = functionFilter.value;
    const type = typeFilter.value;
    const loc = locationFilter.value;

    const filtered = jobsData.filter(
      (job) =>
        (!func || job.function === func) &&
        (!type || job.type === type) &&
        (!loc || job.location === loc)
    );

    displayJobs(filtered);
  }

  // Show all jobs
  function showAllJobs() {
    displayJobs(jobsData);
  }

  // Event listeners
  findBtn.addEventListener("click", filterJobs);
  allBtn.addEventListener("click", showAllJobs);

  // Load data on page start
  loadJobs();
});
