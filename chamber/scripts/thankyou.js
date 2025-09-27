// thankyou.js
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  // Map query params to elements
  document.getElementById("outFirst").textContent = params.get("first") || "";
  document.getElementById("outLast").textContent = params.get("last") || "";
  document.getElementById("outEmail").textContent = params.get("email") || "";
  document.getElementById("outPhone").textContent = params.get("phone") || "";
  document.getElementById("outOrg").textContent = params.get("organization") || "";
  document.getElementById("outDesc").textContent = params.get("description") || "";
  document.getElementById("outMembership").textContent = params.get("membership") || "";

  // Use timestamp if passed, otherwise fallback to current time
  const ts = params.get("timestamp");
  let submittedDate;

  if (ts) {
    // If it's numeric (from Date.now()), parse as number
    if (!isNaN(ts)) {
      submittedDate = new Date(Number(ts));
    } else {
      // Otherwise, try parsing as ISO string
      submittedDate = new Date(ts);
    }
  } else {
    submittedDate = new Date();
  }

  document.getElementById("outTime").textContent = submittedDate.toLocaleString();
});
