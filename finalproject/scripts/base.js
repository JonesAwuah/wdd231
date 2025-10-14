// Load progress from localStorage Resume-course.html
    const lessons = 8;
    let completed = 0;

    for (let i = 1; i <= lessons; i++) {
      if (localStorage.getItem(`lesson${i}Passed`) === "true") {
        document.getElementById(`lesson${i}`).querySelector("button").textContent = "View Lesson";
        document.getElementById(`lesson${i}`).querySelector("button").disabled = false;
        document.getElementById(`status${i}`).textContent = "✔️";
        completed++;
        if (i < lessons) {
          const next = i + 1;
          document.getElementById(`lesson${next}`).querySelector("button").disabled = false;
          document.getElementById(`status${next}`).textContent = "🔓";
        }
      }
    }

    const progressPercent = (completed / lessons) * 100;
    document.getElementById("progressFill").style.width = progressPercent + "%";

    function openLesson(page) {
      window.location.href = page;
    }


// Load progress from localStorage lesson1.html
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
    });


    // Load progress from localStorage lesson1.html
    