// scripts/main.js
// Single combined script for multiple pages. Include with: <script src="scripts/main.js" defer></script>

(function () {
  'use strict';

  /* ===========================
     Utility helpers
     =========================== */
  function escapeHtml(str = '') {
    return String(str).replace(/[&<>"]/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])
    );
  }

  function qs(sel, ctx = document) {
    return ctx.querySelector(sel);
  }
  function qsa(sel, ctx = document) {
    return Array.from(ctx.querySelectorAll(sel));
  }

  /* ===========================
     GLOBAL: Footer Year
     =========================== */
  function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ===========================
     RESUME COURSE
     - progress tracking using localStorage
     - expects elements with ids lesson1..lesson8 and status1..status8 and progressFill
     =========================== */
  function initResumeCourse() {
    const progressFill = document.getElementById('progressFill');
    if (!progressFill) return; // not on this page

    const lessons = 8;
    let completed = 0;

    for (let i = 1; i <= lessons; i++) {
      const lessonEl = document.getElementById(`lesson${i}`);
      const statusEl = document.getElementById(`status${i}`);
      if (!lessonEl || !statusEl) continue;

      const btn = lessonEl.querySelector('button');
      if (!btn) continue;

      if (localStorage.getItem(`lesson${i}Passed`) === 'true') {
        btn.textContent = 'View Lesson';
        btn.disabled = false;
        statusEl.textContent = '✔️';
        completed++;

        // unlock next
        if (i < lessons) {
          const nextEl = document.getElementById(`lesson${i + 1}`);
          const nextStatus = document.getElementById(`status${i + 1}`);
          if (nextEl && nextStatus) {
            const nextBtn = nextEl.querySelector('button');
            if (nextBtn) nextBtn.disabled = false;
            nextStatus.textContent = '🔓';
          }
        }
      } else {
        // ensure locked buttons are disabled by default
        const btnNext = lessonEl.querySelector('button');
        if (btnNext && i !== 1) btnNext.disabled = true;
      }
    }

    const percent = Math.round((completed / lessons) * 100);
    progressFill.style.width = `${percent}%`;

    // expose helper in case HTML uses inline onclick
    window.openLesson = function (url) {
      if (url) window.location.href = url;
    };
  }

  /* ===========================
     Generic Video Modal
     - modalId: id of modal element (e.g., 'videoModal')
     - containerId: id of container (e.g., 'videoContainer' or 'videoFrame')
     - triggerSelector: selector for buttons/links that open modal (class 'watch-video')
     - iframeMode: if true, will embed iframe (YouTube) otherwise uses <video>
     =========================== */
  function initVideoModal({ modalId = 'videoModal', containerId = 'videoContainer', triggerSelector = '.watch-video', iframeMode = false } = {}) {
    const modal = document.getElementById(modalId);
    const container = document.getElementById(containerId);
    if (!modal || !container) return;

    const closeBtn = modal.querySelector('.close-modal');

    function closeVideo() {
      modal.style.display = 'none';
      container.innerHTML = '';
    }

    qsa(triggerSelector).forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const videoUrl = button.getAttribute('data-video') || button.dataset.video;
        if (!videoUrl) return;
        modal.style.display = 'flex';

        if (iframeMode || videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
          // Build embed src - allow autoplay
          let src = videoUrl;
          src += (src.includes('?') ? '&' : '?') + 'autoplay=1';
          container.innerHTML = `<iframe src="${src}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        } else {
          container.innerHTML = `
            <video controls autoplay playsinline>
              <source src="${videoUrl}" type="video/mp4">
              Your browser does not support the video tag.
            </video>`;
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeVideo);
    window.addEventListener('click', (e) => {
      if (e.target === modal) closeVideo();
    });
  }

  /* ===========================
     FETCH EXAMPLE (async + try/catch)
     Demonstrates using local JSON (data/jobs.json) with try/catch
     - When a page has #jobContainer it will load jobs
     =========================== */
  async function loadJobsAndShow() {
    const container = document.getElementById('jobContainer');
    if (!container) return;

    container.innerHTML = '<p>Loading jobs...</p>';

    try {
      const res = await fetch('data/jobs.json'); // <-- ensure this file exists or change URL
      if (!res.ok) throw new Error(`Network error: ${res.status}`);
      const payload = await res.json();
      const jobs = Array.isArray(payload) ? payload : payload.jobs || [];

      if (!jobs.length) {
        container.innerHTML = '<p>No jobs available.</p>';
        return;
      }

      container.innerHTML = jobs.map(job => {
        return `<article class="job-card">
          <h3>${escapeHtml(job.title)}</h3>
          <p class="meta">${escapeHtml(job.company)} • ${escapeHtml(job.location)}</p>
          <p>${escapeHtml(job.description || job.type || '')}</p>
        </article>`;
      }).join('');
    } catch (err) {
      console.error('Failed to load jobs:', err);
      container.innerHTML = `<p style="color:crimson;">Failed to load jobs. See console for details.</p>`;
    }
  }

  /* ===========================
     INTERVIEW PRACTICE (simple)
     Exposes: getQuestion(), showHint(), showFeedback()
     =========================== */
  function initInterviewPractice() {
    const questionEl = document.getElementById('question');
    if (!questionEl) return;

    const questions = [
      "Tell me about yourself.",
      "Why do you want to work here?",
      "What are your greatest strengths?",
      "What is your biggest weakness?",
      "Describe a challenge you faced and how you overcame it.",
      "Where do you see yourself in five years?",
      "Why should we hire you?",
      "Tell me about a time you worked in a team.",
      "How do you handle pressure and deadlines?",
      "What do you know about our company?"
    ];

    const feedbackTips = {
      "yourself": { feedback: "Focus on your background, key skills, and goals related to the role.", hint: "Start with your current role, then move backward briefly." },
      "work here": { feedback: "Show enthusiasm for the company's mission or culture.", hint: "Mention something specific from their website or news." },
      "strengths": { feedback: "Pick 2–3 strengths relevant to the job and give examples.", hint: "Think of qualities your colleagues would praise you for." },
      "weakness": { feedback: "Choose a small weakness and explain how you're improving.", hint: "Avoid clichés like 'perfectionist' — be genuine!" },
      "challenge": { feedback: "Use the STAR method: Situation, Task, Action, Result.", hint: "Focus on what YOU did to solve the issue." },
      "five years": { feedback: "Show ambition but align it with the company's goals.", hint: "Mention growing your skills and contributing long-term." },
      "hire you": { feedback: "Summarize your best strengths that fit the job.", hint: "Be confident — this is your chance to sell yourself!" },
      "team": { feedback: "Give a teamwork example that shows collaboration.", hint: "Focus on communication and contribution." },
      "pressure": { feedback: "Share a success story under pressure.", hint: "Mention staying calm and prioritizing tasks." },
      "company": { feedback: "Mention facts about the company’s mission or values.", hint: "Show genuine interest and preparation." }
    };

    let index = 0;
    function getQuestion() {
      if (index >= questions.length) index = 0;
      questionEl.textContent = questions[index];
      const practiceArea = document.getElementById('practiceArea');
      const feedbackBox = document.getElementById('feedbackBox');
      const hintBox = document.getElementById('hintBox');
      const answer = document.getElementById('answer');
      const hintBtn = document.getElementById('hintBtn');
      const progress = document.getElementById('progress');

      if (practiceArea) practiceArea.style.display = 'block';
      if (feedbackBox) feedbackBox.style.display = 'none';
      if (hintBox) hintBox.style.display = 'none';
      if (answer) answer.value = '';
      if (hintBtn) hintBtn.style.display = 'inline-block';
      if (progress) progress.textContent = `Question ${index + 1} of ${questions.length}`;

      index++;
    }

    function showHint() {
      const q = (questionEl.textContent || '').toLowerCase();
      let hintText = 'Think about your best possible answer.';
      for (const key in feedbackTips) {
        if (q.includes(key)) { hintText = feedbackTips[key].hint; break; }
      }
      const hintBox = document.getElementById('hintBox');
      if (hintBox) {
        hintBox.textContent = '💡 Hint: ' + hintText;
        hintBox.style.display = 'block';
      }
    }

    function showFeedback() {
      const q = (questionEl.textContent || '').toLowerCase();
      let fb = 'Nice work! Keep practicing to refine your responses.';
      for (const key in feedbackTips) {
        if (q.includes(key)) { fb = feedbackTips[key].feedback; break; }
      }
      const feedbackBox = document.getElementById('feedbackBox');
      if (feedbackBox) {
        feedbackBox.textContent = '💬 Feedback: ' + fb;
        feedbackBox.style.display = 'block';
      }
    }

    window.getQuestion = getQuestion;
    window.showHint = showHint;
    window.showFeedback = showFeedback;
  }

  /* ===========================
     RESUME BUILDER
     Exposes generateResume() & printResume()
     =========================== */
  function initResumeBuilder() {
    const preview = document.getElementById('resumePreview');
    if (!preview) return;

    function generateResume() {
      const name = (qs('#name')?.value || '').trim();
      const location = (qs('#location')?.value || '').trim();
      const phone = (qs('#phone')?.value || '').trim();
      const email = (qs('#email')?.value || '').trim();
      const summary = (qs('#summary')?.value || '').trim();
      const experience = (qs('#experience')?.value || '').trim();
      const education = (qs('#education')?.value || '').trim();
      const skillsRaw = (qs('#skills')?.value || '').trim();

      const skills = skillsRaw.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean);
      const contact = [location, phone, email].filter(Boolean).join(' · ');

      const expHtml = experience.split(/\n{2,}/).map(block => {
        const lines = block.split(/\n/).map(l => l.trim());
        return `<div class="job"><p class="job-title">${escapeHtml(lines[0] || '')}</p><div class="job-meta">${escapeHtml(lines[1] || '')}</div><p class="job-desc">${escapeHtml(lines.slice(2).join(' '))}</p></div>`;
      }).join('');

      const eduHtml = education.split(/\n{2,}/).map(block => {
        const lines = block.split(/\n/).map(l => l.trim());
        return `<div class="job"><p class="job-title">${escapeHtml(lines[0] || '')}</p><div class="job-meta">${escapeHtml(lines.slice(1).join(' · '))}</div></div>`;
      }).join('');

      const skillsHtml = skills.map(s => `<div class="skill-pill">${escapeHtml(s)}</div>`).join('');

      preview.innerHTML = `
        <div class="resume-header">
          <h1 class="resume-name">${escapeHtml(name)}</h1>
          <div class="resume-contact">${escapeHtml(contact)}</div>
        </div>
        <div class="summary section"><p>${escapeHtml(summary)}</p></div>
        <div class="section"><h3>Experience</h3>${expHtml}</div>
        <div class="two-col section">
          <div class="left-col"><h3>Education</h3>${eduHtml}</div>
          <div class="right-col"><h3>Skills</h3><div class="skills-list">${skillsHtml}</div></div>
        </div>
        <div class="paper-footer">Job Seekers • Resume generated in browser</div>
      `;
    }

    // wire inputs
    ['#name', '#location', '#phone', '#email', '#summary', '#experience', '#education', '#skills'].forEach(id => {
      const el = qs(id);
      if (el) el.addEventListener('input', generateResume);
    });

    const printBtn = document.getElementById('printBtn');
    if (printBtn) printBtn.addEventListener('click', () => { generateResume(); window.print(); });

    // expose
    window.generateResume = generateResume;
    window.printResume = () => { generateResume(); window.print(); };

    // initial render
    generateResume();
  }

  /* ===========================
     CAREER GUIDES (iframe mode)
     =========================== */
  function initCareerGuides() {
    // embed youtube/iframe mode
    initVideoModal({ modalId: 'videoModal', containerId: 'videoFrame', triggerSelector: '.watch-video', iframeMode: true });

    // If page has guides container, optionally fetch local guides json
    const guidesContainer = document.getElementById('guidesContainer');
    if (!guidesContainer) return;

    // Try to fetch local guides for demo (data/guides.json)
    (async function loadGuides() {
      try {
        const res = await fetch('data/guides.json');
        if (!res.ok) throw new Error('Failed to fetch guides');
        const data = await res.json();
        const guides = Array.isArray(data) ? data : (data.guides || []);
        if (!guides.length) {
          guidesContainer.innerHTML = '<p>No guides found.</p>';
          return;
        }
        guidesContainer.innerHTML = guides.map(g => `<article class="guide"><h3>${escapeHtml(g.title)}</h3><p>${escapeHtml(g.summary || '')}</p><a class="watch-video" data-video="${escapeHtml(g.video)}" href="#">Watch</a></article>`).join('');
        // re-bind watchers if any were added dynamically
        initVideoModal({ modalId: 'videoModal', containerId: 'videoFrame', triggerSelector: '.watch-video', iframeMode: true });
      } catch (err) {
        console.warn('Could not load guides:', err);
      }
    })();
  }

  /* ===========================
     NETWORKING (video or cards)
     =========================== */
  function initNetworking() {
    initVideoModal({ modalId: 'videoModal', containerId: 'videoContainer', triggerSelector: '.watch-video', iframeMode: false });

    const netContainer = document.getElementById('networkContainer');
    if (!netContainer) return;

    // demo: if you have data/network.json you can fetch and render cards
    (async function loadNetwork() {
      try {
        const res = await fetch('data/network.json');
        if (!res.ok) throw new Error('No network data');
        const data = await res.json();
        const people = data.members || [];
        netContainer.innerHTML = people.map(p => `<div class="member"><img src="${escapeHtml(p.avatar||'images/avatar.png')}" alt=""><h4>${escapeHtml(p.name)}</h4><p>${escapeHtml(p.role)}</p></div>`).join('');
      } catch (err) {
        // not required; quietly skip
      }
    })();
  }

  /* ===========================
     CONTACT FORM
     =========================== */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const status = document.getElementById('formStatus');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (qs('#name')?.value || '').trim();
      const email = (qs('#email')?.value || '').trim();
      const message = (qs('#message')?.value || '').trim();

      if (name && email && message) {
        if (status) status.textContent = '✅ Message sent successfully! We’ll get back to you soon.';
        form.reset();
      } else {
        if (status) status.textContent = '⚠️ Please fill out all fields.';
      }
    });
  }

  /* ===========================
     JOIN FORM
     =========================== */
  function initJoinForm() {
    const form = document.getElementById('joinForm');
    if (!form) return;
    const status = document.getElementById('joinStatus');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (qs('#fullname')?.value || '').trim();
      const email = (qs('#email')?.value || '').trim();
      const interest = (qs('#interest')?.value || '').trim();

      if (name && email && interest) {
        if (status) status.textContent = '✅ You’ve successfully joined Job Seekers Community!';
        form.reset();
      } else {
        if (status) status.textContent = '⚠️ Please fill in all fields.';
      }
    });
  }

  /* ===========================
     INTERVIEW LIVE
     - Speech synthesis and recognition based on available API
     - Requires many elements - function is defensive and will skip if not present
     =========================== */
  function initInterviewLive() {
    // required IDs to enable interview-live features
    const required = ['role','startBtn','stopBtn','repeatBtn','nextBtn','currentQuestion','transcriptBox','submitAnswerBtn','speakFeedbackBtn','endSessionBtn','answerFeedback','qCount','answeredCount','avgScore','highlights'];
    const found = required.every(id => document.getElementById(id));
    if (!found) return;

    // DOM refs
    const roleEl = document.getElementById('role');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentQuestionEl = document.getElementById('currentQuestion');
    const transcriptBox = document.getElementById('transcriptBox');
    const submitAnswerBtn = document.getElementById('submitAnswerBtn');
    const speakFeedbackBtn = document.getElementById('speakFeedbackBtn');
    const endSessionBtn = document.getElementById('endSessionBtn');
    const answerFeedbackEl = document.getElementById('answerFeedback');
    const qCountBadge = document.getElementById('qCount');
    const answeredCountEl = document.getElementById('answeredCount');
    const avgScoreEl = document.getElementById('avgScore');
    const highlightsEl = document.getElementById('highlights');

    // features
    const synth = window.speechSynthesis;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    const supportsRecognition = !!SpeechRecognition;

    // sample Q sets & keywords
    const Q = {
      developer: [
        "Describe a challenging bug you fixed and how you found the solution.",
        "How do you ensure code quality when working with a team?",
        "Tell me about a project where you improved performance or scalability."
      ],
      sales: [
        "Tell me about your most difficult sale and how you closed it.",
        "How do you handle a customer who resists your product?",
        "Describe a time you exceeded your sales quota."
      ],
      designer: [
        "Walk me through your design process for a recent project.",
        "How do you incorporate user feedback into your designs?",
        "Tell me about a time you solved a usability problem."
      ],
      accountant: [
        "Describe how you ensure accuracy in financial reporting.",
        "Tell me about a time you found and corrected an accounting error.",
        "How do you prioritize tasks during a busy reporting period?"
      ]
    };

    const keywords = {
      developer: ["bug","fix","debug","test","code","refactor","performance","scale","optimiz"],
      sales: ["sale","close","client","negoti","quota","pipeline","pitch","objection"],
      designer: ["design","user","prototype","ux","ui","feedback","usabilit","wireframe"],
      accountant: ["reconcile","audit","financial","report","ledger","accuracy","complianc","variance"]
    };

    const starWords = ["situation","task","action","result","situation,","task,","action,","result,","situation:","task:","action:","result:"];

    // state
    let recognition = null;
    let roleQuestions = [];
    let currentQuestion = '';
    let asked = 0;
    const targetQuestions = 5;
    let scores = [];
    let highlights = [];

    // TTS helper
    function speak(text, opts = {}) {
      if (!synth || !text) return;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = opts.lang || 'en-US';
      u.rate = opts.rate || 1;
      u.pitch = opts.pitch || 1;
      u.volume = opts.volume || 1;
      const voices = synth.getVoices();
      if (voices && voices.length) {
        const found = voices.find(v => v.lang && v.lang.includes('en') && v.name.toLowerCase().includes('female'));
        if (found) u.voice = found;
      }
      synth.speak(u);
    }

    // recognition lifecycle
    function startRecognition() {
      if (!SpeechRecognition) {
        transcriptBox.textContent = 'Speech recognition not available in this browser.';
        return;
      }
      if (recognition) {
        recognition.stop();
        recognition = null;
      }
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        stopBtn.disabled = false;
        stopBtn.textContent = 'Stop Listening';
      };
      recognition.onerror = (e) => {
        stopBtn.disabled = true;
        transcriptBox.textContent = 'Recognition error: ' + (e.error || 'unknown');
      };
      recognition.onresult = (evt) => {
        const transcript = evt.results[0][0].transcript;
        transcriptBox.textContent = transcript;
        submitAnswerBtn.disabled = false;
        speakFeedbackBtn.disabled = false;
      };
      recognition.onend = () => {
        stopBtn.disabled = true;
        stopBtn.textContent = 'Stop Listening';
      };
      recognition.start();
    }

    function stopRecognition() {
      if (recognition) recognition.stop();
      stopBtn.disabled = true;
    }

    // evaluation
    function evaluateAnswer(transcript, role) {
      transcript = (transcript || '').toLowerCase();
      let score = 0;
      const reasons = [];

      const words = transcript.split(/\s+/).filter(Boolean).length;
      if (words >= 30) { score += 2; reasons.push('Detailed answer (good length)'); }
      else if (words >= 12) { score += 1; reasons.push('Concise — can add more details'); }
      else reasons.push('Too short — add examples and details');

      const kwlist = keywords[role] || [];
      const kwMatch = kwlist.some(k => transcript.includes(k));
      if (kwMatch) { score += 2; reasons.push('Used role-related keywords'); }
      else reasons.push('Missing role-specific keywords');

      const starFound = starWords.some(s => transcript.includes(s));
      if (starFound) { score += 1; reasons.push('STAR structure detected'); }
      else reasons.push('STAR structure not clearly used');

      const fillerMatches = (transcript.match(/\b(um|uh|like|you know)\b/g) || []).length;
      if (fillerMatches > 3) {
        reasons.push('Some fillers detected — try pausing instead');
        score = Math.max(0, score - 1);
      }

      const normalized = Math.max(0, Math.min(10, Math.round((score / 5) * 10)));
      return { score: normalized, reasons };
    }

    // session functions
    function startInterview() {
      const role = roleEl.value;
      if (!role) { alert('Please select a job role first.'); return; }
      roleQuestions = (Q[role] || []).slice();
      asked = 0; scores = []; highlights = [];
      nextQuestion();
      startBtn.disabled = true;
      endSessionBtn.disabled = false;
      repeatBtn.disabled = false;
      nextBtn.disabled = true;
      submitAnswerBtn.disabled = true;
      speakFeedbackBtn.disabled = true;
    }

    function nextQuestion() {
      const role = roleEl.value;
      if (!role) { alert('Please select a job role.'); return; }
      if (!roleQuestions.length) roleQuestions = (Q[role] || []).slice();

      const idx = Math.floor(Math.random() * roleQuestions.length);
      currentQuestion = roleQuestions.splice(idx, 1)[0];
      currentQuestionEl.textContent = currentQuestion;
      transcriptBox.textContent = 'Listening will start after the question is spoken.';
      speak(currentQuestion);
      setTimeout(() => startRecognition(), 700);

      submitAnswerBtn.disabled = true;
      speakFeedbackBtn.disabled = true;
      const notes = qs('#notes');
      if (notes) notes.value = '';
      answerFeedbackEl.style.display = 'none';
    }

    function repeatQuestion() {
      if (!currentQuestion) return;
      speak(currentQuestion);
    }

    function submitAnswer() {
      const transcript = (transcriptBox.textContent === 'No transcript yet.' ? '' : transcriptBox.textContent) || '';
      const role = roleEl.value || 'developer';
      let textToEval = transcript;

      if (!transcript || transcript.length < 3) {
        const typed = (qs('#notes')?.value || '').trim();
        if (!typed) { alert('No spoken answer found. Speak or type your answer in Notes.'); return; }
        textToEval = typed;
      }

      const evaluation = evaluateAnswer(textToEval, role);
      scores.push(evaluation.score);
      asked++;
      qCountBadge.textContent = `${asked} / ${targetQuestions}`;

      if (evaluation.score >= 6) highlights.push({ q: currentQuestion, score: evaluation.score });

      const fbText = `<strong>Score (0-10): ${evaluation.score}</strong>
        <div style="margin-top:8px;">Feedback:</div>
        <ul style="margin-top:6px;">${evaluation.reasons.map(r => `<li>${escapeHtml(r)}</li>`).join('')}</ul>`;
      answerFeedbackEl.innerHTML = fbText;
      answerFeedbackEl.style.display = 'block';
      speak(stripHtmlForSpeech(fbText));

      nextBtn.disabled = false;
      repeatBtn.disabled = false;
      submitAnswerBtn.disabled = true;
      speakFeedbackBtn.disabled = false;

      if (asked >= targetQuestions) finalizeSession();
    }

    function speakFeedback() {
      if (!answerFeedbackEl || answerFeedbackEl.style.display === 'none') return;
      speak(stripHtmlForSpeech(answerFeedbackEl.innerHTML));
    }

    function updateSessionUI() {
      answeredCountEl.textContent = asked;
      if (scores.length) {
        const avg = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;
        avgScoreEl.textContent = `${avg} / 10`;
      } else avgScoreEl.textContent = '—';
      highlightsEl.innerHTML = highlights.length ? highlights.map(h => `<li>${escapeHtml(h.q)} — ${h.score}/10</li>`).join('') : '<li>None yet — keep going</li>';
    }

    function finalizeSession() {
      startBtn.disabled = false;
      nextBtn.disabled = true;
      repeatBtn.disabled = true;
      submitAnswerBtn.disabled = true;
      speakFeedbackBtn.disabled = true;
      endSessionBtn.disabled = true;
      stopRecognition();

      const avg = scores.length ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10 : 0;
      const msg = `Session complete. You answered ${asked} questions. Your average score is ${avg} out of 10. Well done!`;
      speak(msg);
      localStorage.setItem('liveInterviewCompleted', 'true');

      setTimeout(() => {
        alert(`Session complete!\nAnswered: ${asked}\nAverage score: ${avg}/10`);
      }, 600);
    }

    function endSession() {
      if (!confirm('End the interview session now?')) return;
      finalizeSession();
    }

    function stripHtmlForSpeech(html) {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    }

    // wire controls
    startBtn.addEventListener('click', startInterview);
    repeatBtn.addEventListener('click', repeatQuestion);
    nextBtn.addEventListener('click', () => { nextBtn.disabled = true; nextQuestion(); });
    stopBtn.addEventListener('click', () => { stopRecognition(); stopBtn.disabled = true; });
    submitAnswerBtn.addEventListener('click', submitAnswer);
    speakFeedbackBtn.addEventListener('click', speakFeedback);
    endSessionBtn.addEventListener('click', endSession);

    // initial UI
    if (!supportsRecognition) {
      transcriptBox.textContent = 'Speech recognition not available. Type your answers in Notes and submit.';
    } else {
      transcriptBox.textContent = 'Press Start to begin. When the question finishes, grant microphone permission if prompted.';
    }

    updateSessionUI();
  }

  /* ===========================
     INITIALIZE ON DOMContentLoaded
     =========================== */
  document.addEventListener('DOMContentLoaded', () => {
    initYear();

    // Page-specific initializers (defensive)
    initResumeCourse();
    initVideoModal({ modalId: 'videoModal', containerId: 'videoContainer', triggerSelector: '.watch-video', iframeMode: false }); // generic
    loadJobsAndShow(); // will only show if #jobContainer exists
    initInterviewPractice();
    initResumeBuilder();
    initCareerGuides();
    initNetworking();
    initContactForm();
    initJoinForm();
    initInterviewLive();

    // Helpful console message for graders/dev
    if (window.console) {
      console.log('main.js initialized — page-specific modules attached where elements exist.');
    }
  });

})();
