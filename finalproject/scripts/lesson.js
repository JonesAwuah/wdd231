// Interview Lesson 5
const quizForm = document.getElementById('quizForm');
    const submitQuiz = document.getElementById('submitQuiz');
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const resultMessage = document.getElementById('resultMessage');
    const popup = document.getElementById('popup');
    const startInterviewBtn = document.getElementById('startInterviewBtn');

    const correctAnswers = {
      q1: 'a',
      q2: 'a',
      q3: 'a'
    };

    submitQuiz.addEventListener('click', () => {
      const formData = new FormData(quizForm);
      let score = 0;
      for (let [q, ans] of Object.entries(correctAnswers)) {
        if (formData.get(q) === ans) score++;
      }

      const percent = (score / Object.keys(correctAnswers).length) * 100;
      if (percent >= 70) {
        resultMessage.style.color = 'green';
        resultMessage.textContent = `✅ Excellent! You scored ${percent}%. You’ve completed the program!`;
        nextLessonBtn.disabled = false;
        localStorage.setItem('lesson5Passed', 'true');

        // Show popup
        setTimeout(() => popup.classList.add('active'), 600);
      } else {
        resultMessage.style.color = 'red';
        resultMessage.textContent = `❌ You scored ${percent}%. Try again to pass the final lesson.`;
      }
    });

    startInterviewBtn.addEventListener('click', () => {
      window.location.href = 'interview-live.html';







     


    // Interview Lesson 4
    const quizForm = document.getElementById('quizForm');
    const submitQuiz = document.getElementById('submitQuiz');
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const resultMessage = document.getElementById('resultMessage');

    const correctAnswers = {
      q1: 'a',
      q2: 'a',
      q3: 'a'
    };

    submitQuiz.addEventListener('click', () => {
      const formData = new FormData(quizForm);
      let score = 0;
      for (let [q, ans] of Object.entries(correctAnswers)) {
        if (formData.get(q) === ans) score++;
      }

      const percent = (score / Object.keys(correctAnswers).length) * 100;
      if (percent >= 70) {
        resultMessage.style.color = 'green';
        resultMessage.textContent = `✅ Great work! You scored ${percent}%. You can now continue to Lesson 5.`;
        nextLessonBtn.disabled = false;
        localStorage.setItem('lesson4Passed', 'true');
      } else {
        resultMessage.style.color = 'red';
        resultMessage.textContent = `❌ You scored ${percent}%. You need at least 70% to move on. Try again!`;
      }
    });

    nextLessonBtn.addEventListener('click', () => {
      window.location.href = 'interview-lesson5.html';





    // Interview Lesson 3
   const quizForm = document.getElementById('quizForm');
    const submitQuiz = document.getElementById('submitQuiz');
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const resultMessage = document.getElementById('resultMessage');

    const correctAnswers = {
      q1: 'b',
      q2: 'b',
      q3: 'b'
    };

    submitQuiz.addEventListener('click', () => {
      const formData = new FormData(quizForm);
      let score = 0;
      for (let [q, ans] of Object.entries(correctAnswers)) {
        if (formData.get(q) === ans) score++;
      }

      const percent = (score / Object.keys(correctAnswers).length) * 100;
      if (percent >= 70) {
        resultMessage.style.color = 'green';
        resultMessage.textContent = `✅ Great job! You scored ${percent}%. You may proceed to the next lesson.`;
        nextLessonBtn.disabled = false;
        localStorage.setItem('lesson3Passed', 'true');
      } else {
        resultMessage.style.color = 'red';
        resultMessage.textContent = `❌ You scored ${percent}%. You need at least 70% to move on. Try again!`;
      }
    });

    nextLessonBtn.addEventListener('click', () => {
      window.location.href = 'interview-lesson4.html';




    // Interview Lesson 2
    const quizForm = document.getElementById('quizForm');
    const submitQuiz = document.getElementById('submitQuiz');
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const resultMessage = document.getElementById('resultMessage');

    const correctAnswers = {
      q1: 'b',
      q2: 'b',
      q3: 'a'
    };

    submitQuiz.addEventListener('click', () => {
      const formData = new FormData(quizForm);
      let score = 0;
      for (let [q, ans] of Object.entries(correctAnswers)) {
        if (formData.get(q) === ans) score++;
      }

      const percent = (score / Object.keys(correctAnswers).length) * 100;
      if (percent >= 70) {
        resultMessage.style.color = 'green';
        resultMessage.textContent = `✅ Great job! You scored ${percent}%. You may proceed to the next lesson.`;
        nextLessonBtn.disabled = false;
        localStorage.setItem('lesson2Passed', 'true');
      } else {
        resultMessage.style.color = 'red';
        resultMessage.textContent = `❌ You scored ${percent}%. You need at least 70% to move on. Try again!`;
      }
    });

    nextLessonBtn.addEventListener('click', () => {
      window.location.href = 'interview-lesson3.html';



    // Interview Lesson 1
    const quizForm = document.getElementById('quizForm');
    const submitQuiz = document.getElementById('submitQuiz');
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const resultMessage = document.getElementById('resultMessage');

    const correctAnswers = {
      q1: 'b',
      q2: 'a',
      q3: 'b'
    };

    submitQuiz.addEventListener('click', () => {
      const formData = new FormData(quizForm);
      let score = 0;
      for (let [q, ans] of Object.entries(correctAnswers)) {
        if (formData.get(q) === ans) score++;
      }

      const percent = (score / Object.keys(correctAnswers).length) * 100;
      if (percent >= 70) {
        resultMessage.style.color = 'green';
        resultMessage.textContent = `✅ Excellent! You scored ${percent}%. You may proceed to the next lesson.`;
        nextLessonBtn.disabled = false;
        localStorage.setItem('lesson1Passed', 'true');
      } else {
        resultMessage.style.color = 'red';
        resultMessage.textContent = `❌ You scored ${percent}%. You need at least 70% to move on. Try again!`;
      }
    });

    nextLessonBtn.addEventListener('click', () => {
      window.location.href = 'interview-lesson2.html';




    // lesson1.html
    const quizForm = document.getElementById('quizForm');
    const submitQuiz = document.getElementById('submitQuiz');
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const resultMessage = document.getElementById('resultMessage');

    const correctAnswers = {
      q1: 'b',
      q2: 'a',
      q3: 'b',
      q4: 'b',
      q5: 'b'
    };

    submitQuiz.addEventListener('click', () => {
      const formData = new FormData(quizForm);
      let score = 0;
      for (let [q, ans] of Object.entries(correctAnswers)) {
        if (formData.get(q) === ans) score++;
      }

      const percent = (score / Object.keys(correctAnswers).length) * 100;
      if (percent >= 70) {
        resultMessage.style.color = 'green';
        resultMessage.textContent = `✅ Excellent! You scored ${percent}%. You may proceed to the next lesson.`;
        nextLessonBtn.disabled = false;
        localStorage.setItem('lesson1Passed', 'true');
      } else {
        resultMessage.style.color = 'red';
        resultMessage.textContent = `❌ You scored ${percent}%. You need at least 70% to move on. Try again!`;
      }
    });

    nextLessonBtn.addEventListener('click', () => {
      window.location.href = 'lesson2.html';



   // Lesson 2
   if (!localStorage.getItem('lesson1Passed')) {
      alert("You must complete Lesson 1 before accessing Lesson 2.");
      window.location.href = "lesson1.html";
    }

    const quizForm = document.getElementById('quizForm');
    const submitQuiz = document.getElementById('submitQuiz');
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const resultMessage = document.getElementById('resultMessage');

    const correctAnswers = {
      q1: 'a',
      q2: 'a',
      q3: 'b',
      q4: 'b',
      q5: 'b'
    };

    submitQuiz.addEventListener('click', () => {
      const formData = new FormData(quizForm);
      let score = 0;
      for (let [q, ans] of Object.entries(correctAnswers)) {
        if (formData.get(q) === ans) score++;
      }

      const percent = (score / Object.keys(correctAnswers).length) * 100;
      if (percent >= 70) {
        resultMessage.style.color = 'green';
        resultMessage.textContent = `✅ Excellent! You scored ${percent}%. You may proceed to the next lesson.`;
        nextLessonBtn.disabled = false;
        localStorage.setItem('lesson2Passed', 'true');
      } else {
        resultMessage.style.color = 'red';
        resultMessage.textContent = `❌ You scored ${percent}%. You need at least 70% to move on. Try again!`;
      }
    });

    nextLessonBtn.addEventListener('click', () => {
      window.location.href = 'lesson3.html';


    // Lesson 3
    if (!localStorage.getItem('lesson2Passed')) {
      alert("You must complete Lesson 2 before accessing Lesson 3.");
      window.location.href = "lesson2.html";
    }

    const quizForm = document.getElementById('quizForm');
    const submitQuiz = document.getElementById('submitQuiz');
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const prevLessonBtn = document.getElementById('prevLessonBtn');
    const resultMessage = document.getElementById('resultMessage');

    const correctAnswers = {
      q1: 'b',
      q2: 'c',
      q3: 'b',
      q4: 'a',
      q5: 'b'
    };

    submitQuiz.addEventListener('click', () => {
      const formData = new FormData(quizForm);
      let score = 0;
      for (let [q, ans] of Object.entries(correctAnswers)) {
        if (formData.get(q) === ans) score++;
      }

      const percent = (score / Object.keys(correctAnswers).length) * 100;
      if (percent >= 70) {
        resultMessage.style.color = 'green';
        resultMessage.textContent = `✅ Excellent! You scored ${percent}%. You may proceed to the next lesson.`;
        nextLessonBtn.disabled = false;
        localStorage.setItem('lesson3Passed', 'true');
      } else {
        resultMessage.style.color = 'red';
        resultMessage.textContent = `❌ You scored ${percent}%. You need at least 70% to move on. Try again!`;
      }
    });

    nextLessonBtn.addEventListener('click', () => {
      window.location.href = 'lesson4.html';
    });

    prevLessonBtn.addEventListener('click', () => {
      window.location.href = 'lesson2.html';




    // Lesson 4
    if (!localStorage.getItem('lesson3Passed')) {
      alert("You must complete Lesson 3 before accessing Lesson 4.");
      window.location.href = "lesson3.html";
    }

    const quizForm = document.getElementById('quizForm');
    const submitQuiz = document.getElementById('submitQuiz');
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const resultMessage = document.getElementById('resultMessage');

    const correctAnswers = {
      q1: 'b',
      q2: 'a',
      q3: 'b',
      q4: 'a',
      q5: 'a'
    };

    submitQuiz.addEventListener('click', () => {
      const formData = new FormData(quizForm);
      let score = 0;
      for (let [q, ans] of Object.entries(correctAnswers)) {
        if (formData.get(q) === ans) score++;
      }

      const percent = (score / Object.keys(correctAnswers).length) * 100;
      if (percent >= 70) {
        resultMessage.style.color = 'green';
        resultMessage.textContent = `✅ Excellent! You scored ${percent}%. You may proceed to the next lesson.`;
        nextLessonBtn.disabled = false;
        localStorage.setItem('lesson4Passed', 'true');
      } else {
        resultMessage.style.color = 'red';
        resultMessage.textContent = `❌ You scored ${percent}%. You need at least 70% to move on. Try again!`;
      }
    });

    nextLessonBtn.addEventListener('click', () => {
      window.location.href = 'lesson5.html';


    // Lesson 5
    if (!localStorage.getItem('lesson4Passed')) {
      alert("You must complete Lesson 4 before accessing Lesson 5.");
      window.location.href = "lesson4.html";
    }

    const quizForm = document.getElementById('quizForm');
    const submitQuiz = document.getElementById('submitQuiz');
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const resultMessage = document.getElementById('resultMessage');

    const correctAnswers = {
      q1: 'b',
      q2: 'b',
      q3: 'b',
      q4: 'a',
      q5: 'c'
    };

    submitQuiz.addEventListener('click', () => {
      const formData = new FormData(quizForm);
      let score = 0;
      for (let [q, ans] of Object.entries(correctAnswers)) {
        if (formData.get(q) === ans) score++;
      }

      const percent = (score / Object.keys(correctAnswers).length) * 100;

      if (percent >= 70) {
        resultMessage.style.color = 'green';
        resultMessage.textContent = `✅ Excellent! You scored ${percent}%. You may proceed to the next lesson.`;
        nextLessonBtn.disabled = false;
        localStorage.setItem('lesson5Passed', 'true');
      } else {
        resultMessage.style.color = 'red';
        resultMessage.textContent = `❌ You scored ${percent}%. You need at least 70% to move on. Try again!`;
      }
    });

    nextLessonBtn.addEventListener('click', () => {
      window.location.href = 'lesson6.html';



    // Lesson 6
    if (!localStorage.getItem('lesson5Passed')) {
      alert("You must complete Lesson 5 before accessing Lesson 6.");
      window.location.href = "lesson5.html";
    }

    const quizForm = document.getElementById('quizForm');
    const submitQuiz = document.getElementById('submitQuiz');
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const resultMessage = document.getElementById('resultMessage');

    const correctAnswers = {
      q1: 'b',
      q2: 'b',
      q3: 'b',
      q4: 'b',
      q5: 'b'
    };

    submitQuiz.addEventListener('click', () => {
      const formData = new FormData(quizForm);
      let score = 0;

      for (let [q, ans] of Object.entries(correctAnswers)) {
        if (formData.get(q) === ans) score++;
      }

      const percent = (score / Object.keys(correctAnswers).length) * 100;

      if (percent >= 70) {
        resultMessage.style.color = 'green';
        resultMessage.textContent = `✅ Excellent! You scored ${percent}%. You may proceed to the next lesson.`;
        nextLessonBtn.disabled = false;
        localStorage.setItem('lesson6Passed', 'true');
      } else {
        resultMessage.style.color = 'red';
        resultMessage.textContent = `❌ You scored ${percent}%. You need at least 70% to move on. Try again!`;
      }
    });

    nextLessonBtn.addEventListener('click', () => {
      window.location.href = 'lesson7.html';



    // Lesson 7
    if (!localStorage.getItem('lesson6Passed')) {
      alert("You must complete Lesson 6 before accessing Lesson 7.");
      window.location.href = "lesson6.html";
    }

    const quizForm = document.getElementById('quizForm');
    const submitQuiz = document.getElementById('submitQuiz');
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const resultMessage = document.getElementById('resultMessage');

    const correctAnswers = {
      q1: 'b',
      q2: 'b',
      q3: 'b',
      q4: 'a',
      q5: 'b'
    };

    submitQuiz.addEventListener('click', () => {
      const formData = new FormData(quizForm);
      let score = 0;
      for (let [q, ans] of Object.entries(correctAnswers)) {
        if (formData.get(q) === ans) score++;
      }
      const percent = (score / Object.keys(correctAnswers).length) * 100;
      if (percent >= 70) {
        resultMessage.style.color = 'green';
        resultMessage.textContent = `✅ Excellent! You scored ${percent}%. You may proceed to the next lesson.`;
        nextLessonBtn.disabled = false;
        localStorage.setItem('lesson7Passed', 'true');
      } else {
        resultMessage.style.color = 'red';
        resultMessage.textContent = `❌ You scored ${percent}%. You need at least 70% to move on. Try again!`;
      }
    });

    nextLessonBtn.addEventListener('click', () => {
      window.location.href = 'lesson8.html';



    if (!localStorage.getItem('lesson7Passed')) {
      alert("You must complete Lesson 7 before accessing Lesson 8.");
      window.location.href = "lesson7.html";
    }

    const correctAnswers = {
      q1: 'b', q2: 'a', q3: 'a',
      q4: 'a', q5: 'a', q6: 'a', q7: 'a'
    };

    const submitBtn = document.getElementById('submitQuiz');
    const viewCertBtn = document.getElementById('viewCertificateBtn');
    const resultMessage = document.getElementById('resultMessage');

    submitBtn.addEventListener('click', () => {
      const form = document.getElementById('quizForm');
      const data = new FormData(form);
      let score = 0;

      for (let [q, ans] of Object.entries(correctAnswers)) {
        if (data.get(q) === ans) score++;
      }

      const percent = (score / Object.keys(correctAnswers).length) * 100;

      if (percent >= 70) {
        resultMessage.textContent = `✅ Congratulations! You scored ${percent}%.`;
        resultMessage.style.color = 'green';
        viewCertBtn.disabled = false;
        localStorage.setItem('lesson8Passed', 'true');
      } else {
        resultMessage.textContent = `❌ You scored ${percent}%. You need at least 70% to unlock the certificate.`;
        resultMessage.style.color = 'red';
        viewCertBtn.disabled = true;
      }
    });

    viewCertBtn.addEventListener('click', () => {
      const name = prompt("🎓 Please enter your Full Name for the certificate:");
      if (name && name.trim() !== "") {
        localStorage.setItem('userName', name.trim());
        window.location.href = "certificate.html";
      } else {
        alert("You must enter your full name to continue.");
      }


    // Certificate
      const userName = localStorage.getItem('userName');
    if (!userName) {
      alert("Please return to Lesson 8 and enter your name before viewing the certificate.");
      window.location.href = "lesson8.html";
    } else {
      document.getElementById('userName').textContent = userName;
    }

    const date = new Date();
    const formattedDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('dateField').innerHTML = `<br><em>Date of Completion:</em> ${formattedDate}`;
    });

    });

    });

    });

    });

    });

    });

    });

    });

    });

    });

    });

    });


    