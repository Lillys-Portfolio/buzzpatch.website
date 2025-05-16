// Screen references
const loginScreen = document.getElementById('login-screen');
const factsQuizScreen = document.getElementById('facts-quiz-screen');
const beeGardenScreen = document.getElementById('bee-garden-screen');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const quizFeedback = document.getElementById('quiz-feedback');
const toGardenBtn = document.getElementById('to-garden-btn');
const logoutBtn1 = document.getElementById('logout-btn1');
const logoutBtn2 = document.getElementById('logout-btn2');
const garden = document.getElementById('garden');
const feedBeeBtn = document.getElementById('feed-bee');
const waterBeeBtn = document.getElementById('water-bee');
const sleepBeeBtn = document.getElementById('sleep-bee');

let currentQuestion = 0;
const questions = document.querySelectorAll(".carousel .question");
document.getElementById('next-question').addEventListener('click', () => {
  questions[currentQuestion].classList.remove('active');
  currentQuestion = (currentQuestion + 1) % questions.length;
  questions[currentQuestion].classList.add('active');
});
document.getElementById('prev-question').addEventListener('click', () => {
  questions[currentQuestion].classList.remove('active');
  currentQuestion = (currentQuestion - 1 + questions.length) % questions.length;
  questions[currentQuestion].classList.add('active');
});

document.querySelectorAll('.quiz-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.closest('.question');
    const answer = parent.dataset.answer;
    if (btn.textContent.toLowerCase() === answer.toLowerCase()) {
      quizFeedback.textContent = "Correct!";
      quizFeedback.style.color = "green";
    } else {
      quizFeedback.textContent = "Try again.";
      quizFeedback.style.color = "red";
    }
  });
});

function showScreen(screen) {
  [loginScreen, factsQuizScreen, beeGardenScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();
  if (username === 'user' && password === 'pass') {
    loginError.textContent = '';
    stopHoneyAnimation();
    showScreen(factsQuizScreen);
  } else {
    loginError.textContent = 'Invalid username or password.';
  }
});

toGardenBtn.addEventListener('click', () => {
  quizFeedback.textContent = '';
  showScreen(beeGardenScreen);
});

[logoutBtn1, logoutBtn2].forEach(btn => {
  btn.addEventListener('click', () => {
    showScreen(loginScreen);
    loginForm.reset();
    quizFeedback.textContent = '';
    garden.innerHTML = '';
    startHoneyAnimation();
  });
});

function addBee() {
  const bee = document.createElement('span');
  bee.textContent = '🐝';
  bee.classList.add('bee');
  garden.appendChild(bee);

  let timeout = setTimeout(() => {
    bee.classList.add('red');
    bee.textContent = '😡';
  }, 5000); // 5 seconds to care for the bee

  bee.addEventListener('click', () => {
    clearTimeout(timeout);
    bee.remove();
  });
}

feedBeeBtn.addEventListener('click', addBee);
waterBeeBtn.addEventListener('click', addBee);
sleepBeeBtn.addEventListener('click', addBee);

// Honey drop animation
function startHoneyAnimation() {
  const container = document.getElementById('honey-animation-container');
  const puddles = document.getElementById('puddle-container');
  puddles.style.display = 'block';
  const interval = setInterval(() => {
    const drop = document.createElement('div');
    drop.className = 'honey-drop';
    drop.style.left = `${Math.random() * window.innerWidth}px`;
    container.appendChild(drop);
    setTimeout(() => drop.remove(), 3000);
  }, 200);
  container.dataset.interval = interval;
}

function stopHoneyAnimation() {
  const container = document.getElementById('honey-animation-container');
  const puddles = document.getElementById('puddle-container');
  clearInterval(container.dataset.interval);
  container.innerHTML = '';
  puddles.style.display = 'none';
}

startHoneyAnimation();