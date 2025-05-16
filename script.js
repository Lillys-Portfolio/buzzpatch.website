// Screen elements
const loginScreen = document.getElementById('login-screen');
const factsQuizScreen = document.getElementById('facts-quiz-screen');
const beeGardenScreen = document.getElementById('bee-garden-screen');

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

// Login validation
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();

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

// Go to garden screen
toGardenBtn.addEventListener('click', () => {
  quizFeedback.textContent = '';
  showScreen(beeGardenScreen);
});

// Logout buttons
logoutBtn1.addEventListener('click', () => {
  showScreen(loginScreen);
  loginForm.reset();
  quizFeedback.textContent = '';
  clearGarden();
});
logoutBtn2.addEventListener('click', () => {
  showScreen(loginScreen);
  loginForm.reset();
  quizFeedback.textContent = '';
  clearGarden();
});

function showScreen(screenToShow) {
  [loginScreen, factsQuizScreen, beeGardenScreen].forEach(screen =>
    screen.classList.remove('active')
  );
  screenToShow.classList.add('active');
}

// Garden data
const bees = [];
const NEED_DECREASE_RATE = 1; // percent per tick
const NEED_TICK_INTERVAL = 1000; // ms

// Create a bee with needs bar
function createBee() {
  const container = document.createElement('div');
  container.classList.add('bee-container');

  const beeSpan = document.createElement('span');
  beeSpan.classList.add('bee');
  beeSpan.textContent = '🐝';
  container.appendChild(beeSpan);

  const needBar = document.createElement('div');
  needBar.classList.add('need-bar');

  const needFill = document.createElement('div');
  needFill.classList.add('need-fill');
  needBar.appendChild(needFill);
  container.appendChild(needBar);

  garden.appendChild(container);

  const bee = {
    container,
    beeSpan,
    needFill,
    need: 100,
    angry: false,
  };

  bees.push(bee);
}

// Update all bees’ needs
function updateNeeds() {
  bees.forEach(bee => {
    if (bee.need > 0) {
      bee.need = Math.max(0, bee.need - NEED_DECREASE_RATE);
    }

    bee.needFill.style.width = bee.need + '%';

    if (bee.need === 0 && !bee.angry) {
      bee.angry = true;
      bee.beeSpan.classList.add('angry');
    }

    if (bee.need > 0 && bee.angry) {
      bee.angry = false;
      bee.beeSpan.classList.remove('angry');
    }
  });
}

// Increase all bees needs by 20% max 100%
function increaseNeeds() {
  bees.forEach(bee => {
    bee.need = Math.min(100, bee.need + 20);
  });
}

// Clear garden: remove bees and flowers
function clearGarden() {
  garden.innerHTML = '';
  bees.length = 0;
}

// Add flower at empty spot
function addFlower() {
  const flower = document.createElement('span');
  flower.classList.add('flower');
  flower.textContent = '🌸';
  garden.appendChild(flower);
}

// Garden click event
garden.addEventListener('click', e => {
  // If clicked exactly on garden (not a child element)
  if (e.target === garden) {
    addFlower();
  }
});

// Buttons spawn bees and increase needs
feedBeeBtn.addEventListener('click', () => {
  createBee();
  increaseNeeds();
});
waterBeeBtn.addEventListener('click', () => {
  createBee();
  increaseNeeds();
});
sleepBeeBtn.addEventListener('click', () => {
  createBee();
  increaseNeeds();
});

// Needs decrease interval
setInterval(updateNeeds, NEED_TICK_INTERVAL);