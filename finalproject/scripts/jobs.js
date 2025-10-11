// Fetch job data and initialize
let allJobs = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    allJobs = data;
    displayJobs(allJobs); // show all on load
  })
  .catch(error => console.error("Error loading job data:", error));

// DOM elements
const functionFilter = document.getElementById("functionFilter");
const typeFilter = document.getElementById("typeFilter");
const locationFilter = document.getElementById("locationFilter");
const findBtn = document.getElementById("findBtn");
const jobList = document.getElementById("jobList");

// Filter and display jobs
findBtn.addEventListener("click", () => {
  const selectedFunction = functionFilter.value;
  const selectedType = typeFilter.value;
  const selectedLocation = locationFilter.value;

  const filtered = allJobs.filter(job => {
    return (
      (selectedFunction === "" || job.function === selectedFunction) &&
      (selectedType === "" || job.type === selectedType) &&
      (selectedLocation === "" || job.location === selectedLocation)
    );
  });

  displayJobs(filtered);
});

// Display job cards
function displayJobs(jobs) {
  jobList.innerHTML = "";

  if (jobs.length === 0) {
    jobList.innerHTML = `<p style="text-align:center;color:#6b7a86;">No job matches found. Try changing filters.</p>`;
    return;
  }

  jobs.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");

    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>${job.company}</strong></p>
      <p>${job.description}</p>
      <div class="job-meta">
        <span>${job.function}</span>
        <span>${job.type}</span>
        <span>${job.location}</span>
      </div>
    `;

    jobList.appendChild(jobCard);
  });
}

// Optional: reload all jobs when "All Job Offers" button clicked
document.querySelector(".btn-load")?.addEventListener("click", () => {
  functionFilter.value = "";
  typeFilter.value = "";
  locationFilter.value = "";
  displayJobs(allJobs);
});
