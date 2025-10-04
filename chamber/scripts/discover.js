// discover.js - ES module
const DATA_PATH = 'data/discover.json'; // relative to this HTML file
const GRID = document.getElementById('discover-grid');
const VISIT_MSG = document.getElementById('visit-message');
const MODAL = document.getElementById('detail-modal');
const MODAL_CONTENT = document.getElementById('modal-content');
const MODAL_CLOSE = document.getElementById('modal-close');

/* ----------------- Visit tracking (localStorage) ----------------- */
const LAST_VISIT_KEY = 'chamber_last_visit';

function displayVisitMessage(){
  const now = Date.now();
  const last = localStorage.getItem(LAST_VISIT_KEY);
  if(!last){
    VISIT_MSG.textContent = "Welcome! Let us know if you have any questions.";
    localStorage.setItem(LAST_VISIT_KEY, String(now));
    return;
  }
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffMs = now - Number(last);
  const diffDays = Math.floor(diffMs / msPerDay);
  if(diffDays < 1){
    VISIT_MSG.textContent = "Back so soon! Awesome!";
  } else if(diffDays === 1){
    VISIT_MSG.textContent = "You last visited 1 day ago.";
  } else {
    VISIT_MSG.textContent = `You last visited ${diffDays} days ago.`;
  }
  // update last visit to now
  localStorage.setItem(LAST_VISIT_KEY, String(now));
}

/* ----------------- Fetch & render ----------------- */
async function fetchDataAndRender(){
  try {
    const res = await fetch(DATA_PATH);
    if(!res.ok) throw new Error(`Failed to fetch ${DATA_PATH}: ${res.status}`);
    const items = await res.json();
    renderCards(items);
  } catch(err){
    console.error(err);
    GRID.innerHTML = `<div class="card"><p>Unable to load discovery items at the moment. Please try again later.</p></div>`;
  }
}

/* Create one card element per item */
function renderCards(items = []){
  GRID.innerHTML = ''; // clear
  items.forEach((item, index) => {
    const el = document.createElement('article');
    el.className = 'card';
    // Set data-index for mapping; optional grid-area naming if needed
    el.dataset.index = index+1;

    el.innerHTML = `
      <figure>
        <img src="${item.image}" alt="${escapeHtml(item.title)} image" loading="lazy" width="300" height="200">
      </figure>
      <div class="card-body">
        <h2>${escapeHtml(item.title)}</h2>
        <address>${escapeHtml(item.address)}</address>
        <p>${escapeHtml(item.description)}</p>
        <div class="actions">
          <a href="#" class="btn learn-more" data-index="${index}">Learn more</a>
        </div>
      </div>
    `;
    GRID.appendChild(el);
  });

  // attach event listeners to Learn more
  GRID.querySelectorAll('.learn-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = Number(btn.dataset.index);
      openModalWithItem(idx);
    });
  });
}

/* ----------------- Modal logic ----------------- */
function openModalWithItem(index){
  // re-fetch the JSON (or store in closure) - for simplicity, fetch once again (could be optimized)
  fetch(DATA_PATH)
    .then(r => r.json())
    .then(items => {
      const data = items[index];
      if(!data) return;
      MODAL_CONTENT.innerHTML = `
        <h2>${escapeHtml(data.title)}</h2>
        <p><strong>Address:</strong> ${escapeHtml(data.address)}</p>
        <figure><img src="${data.image}" alt="${escapeHtml(data.title)} image" loading="lazy" style="max-width:100%;height:auto;border-radius:6px"></figure>
        <p>${escapeHtml(data.description)}</p>
      `;
      MODAL.setAttribute('aria-hidden','false');
      MODAL.style.display = 'flex';
      // trap focus if needed (basic)
      MODAL_CLOSE.focus();
      document.addEventListener('keydown', modalKeyHandler);
    })
    .catch(err => console.error(err));
}

function closeModal(){
  MODAL.setAttribute('aria-hidden','true');
  MODAL.style.display = 'none';
  MODAL_CONTENT.innerHTML = '';
  document.removeEventListener('keydown', modalKeyHandler);
}

function modalKeyHandler(e){
  if(e.key === 'Escape') closeModal();
}

MODAL_CLOSE.addEventListener('click', closeModal);
MODAL.addEventListener('click', (e) => {
  if(e.target === MODAL) closeModal(); // close on backdrop click
});

/* helper to avoid XSS in injected strings */
function escapeHtml(str){
  return String(str)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'", '&#39;');
}

/* ----------------- Init ----------------- */
displayVisitMessage();
fetchDataAndRender();

/* Set footer year as small nicety */
document.getElementById('year').textContent = new Date().getFullYear();
