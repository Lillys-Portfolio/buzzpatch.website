const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

const quizButtons = document.querySelectorAll('.quiz-btn');
const quizFeedback = document.getElementById('quiz-feedback');

const toGardenBtn = document.getElementById('to-garden-btn');

const logoutBtn1 = document.getElementById('logout-btn1');
const logoutBtn2 = document.getElementById('logout-btn2');

const garden = document.getElementById('garden');

const feedBeeBtn = document.getElementById('feed-bee');
const waterBeeBtn = document.getElementById('water-bee');
const sleepBeeBtn = document.getElementById('sleep-bee');

// Simple login validation
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();

  // For demo: username=user, password=pass
  if (username === 'user' && password === 'pass') {
    loginError.textContent = '';
    showScreen(factsQuizScreen);
  } else {
    loginError.textContent = 'Invalid username or password.';
  }
});

// Quiz buttons event
quizButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.answer === 'correct') {
      quizFeedback.textContent = 'Correct! Bees have five eyes.';
      quizFeedback.style.color = 'green';
    } else {
      quizFeedback.textContent = 'Wrong, try again.';
      quizFeedback.style.color = 'red';
    }
  });
});

// Go to bee garden button
toGardenBtn.addEventListener('click', () => {
  quizFeedback.textContent = ''; // Clear feedback
  showScreen(beeGardenScreen);
});

// Logout buttons
logoutBtn1.addEventListener('click', () => {
  showScreen(loginScreen);
  loginForm.reset();
  quizFeedback.textContent = '';
  garden.innerHTML = ''; // Clear garden bees on logout
});
logoutBtn2.addEventListener('click', () => {
  showScreen(loginScreen);
  loginForm.reset();
  quizFeedback.textContent = '';
  garden.innerHTML = '';
});

// Screen switch helper
function showScreen(screenToShow) {
  [loginScreen, factsQuizScreen, beeGardenScreen].forEach(screen =>
    screen.classList.remove('active')
  );
  screenToShow.classList.add('active');
}

// Add bee to garden
function addBee() {
  const bee = document.createElement('span');
  bee.textContent = '🐝';
  bee.classList.add('bee');
  garden.appendChild(bee);
}

feedBeeBtn.addEventListener('click', addBee);
waterBeeBtn.addEventListener('click', addBee);
sleepBeeBtn.addEventListener('click', addBee);