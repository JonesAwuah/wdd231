document.addEventListener("DOMContentLoaded", () => {
  const functionFilter = document.getElementById("functionFilter");
  const typeFilter = document.getElementById("typeFilter");
  const locationFilter = document.getElementById("locationFilter");
  const findBtn = document.getElementById("findBtn");
  const allJobsBtn = document.querySelector(".btn-load");
  const jobList = document.getElementById("jobList");
  const resultsCount = document.getElementById("resultsCount");

  let jobsData = [];

  // ✅ Load jobs from jobs.json
  async function loadJobs() {
    try {
      const response = await fetch("jobs.json");
      if (!response.ok) throw new Error("Failed to load jobs.json");
      jobsData = await response.json();
      displayJobs(jobsData);
    } catch (error) {
      console.error(error);
      jobList.innerHTML = `<p class="error">Unable to load job listings. Please try again later.</p>`;
    }
  }

  // ✅ Display jobs on screen
  function displayJobs(jobs) {
    jobList.innerHTML = "";

    if (jobs.length === 0) {
      resultsCount.textContent = "No matching jobs found.";
      return;
    }

    resultsCount.textContent = `${jobs.length} job${jobs.length > 1 ? "s" : ""} found`;

    jobs.forEach((job) => {
      const jobCard = document.createElement("div");
      jobCard.classList.add("job-card");

      jobCard.innerHTML = `
        <h3>${job.title}</h3>
        <p class="company"><strong>${job.company}</strong></p>
        <p>${job.description}</p>
        <p><strong>Location:</strong> ${job.location} | 
           <strong>Type:</strong> ${job.type} | 
           <strong>Function:</strong> ${job.function}</p>
        <button class="btn small">Apply Now</button>
      `;

      jobList.appendChild(jobCard);
    });
  }

  // ✅ Filter jobs based on dropdown selections
  function filterJobs() {
    const selectedFunction = functionFilter.value;
    const selectedType = typeFilter.value;
    const selectedLocation = locationFilter.value;

    const filtered = jobsData.filter((job) => {
      return (
        (selectedFunction === "" || job.function === selectedFunction) &&
        (selectedType === "" || job.type === selectedType) &&
        (selectedLocation === "" || job.location === selectedLocation)
      );
    });

    displayJobs(filtered);
  }

  // ✅ Show all jobs when "All Job Offers" is clicked
  function showAllJobs() {
    displayJobs(jobsData);
  }

  // ✅ Event Listeners
  findBtn.addEventListener("click", filterJobs);
  allJobsBtn.addEventListener("click", showAllJobs);

  // ✅ Load all jobs initially
  loadJobs();
});
