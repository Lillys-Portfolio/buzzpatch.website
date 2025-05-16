// script.js

// Elements and state
const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('.nav-btn');
const logoutBtn = document.querySelector('#logout-btn');

const loginForm = document.querySelector('#login-form');
const loginError = document.querySelector('#login-error');

const factsScreen = document.querySelector('#facts-quiz-screen');
const beeGardenScreen = document.querySelector('#bee-garden-screen');

const gardenGrid = document.getElementById('garden-grid');
const feedBtn = document.getElementById('feed-btn');
const waterBtn = document.getElementById('water-btn');
const sleepBtn = document.getElementById('sleep-btn');

const factsContainer = document.getElementById('facts-container');
const quizContainer = document.getElementById('quiz-container');

let loggedInUser = null;
let activeNeed = null;
let bees = [];
const maxBees = 5;
const patchCount = 15; // 3 rows x 5 columns

const beeNeeds = ['feed', 'water', 'sleep'];
const beeNeedTimes = {
  feed: 10000,
  water: 12000,
  sleep: 15000,
};

const beeImages = {
  normal: 'https://i.imgur.com/qO5KQzW.png',
  angry: 'https://i.imgur.com/2qQm1ZK.png',
};

function showScreen(screenId) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  navButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-target="${screenId}"]`)?.classList.add('active');
}

// LOGIN FLOW
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();

  // Simple mock check for example - real app should use backend auth
  if (username === 'beeuser' && password === 'buzz123') {
    loggedInUser = username;
    loginError.textContent = '';
    loginForm.reset();
    showScreen('facts-quiz-screen');
    loadBeeFacts();
    loadQuiz();
  } else {
    loginError.textContent = 'Invalid username or password';
  }
});

// LOGOUT
logoutBtn.addEventListener('click', () => {
  loggedInUser = null;
  showScreen('login-screen');
  resetGarden();
});

// NAV BUTTONS
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    if (target === 'bee-garden-screen' && !loggedInUser) {
      alert('Please log in first to access the Bee Garden!');
      return;
    }
    showScreen(target);
    if (target === 'bee-garden-screen') {
      resetGarden();
      initGarden();
    }
  });
});

// BEE GARDEN LOGIC

function createPatch(index) {
  const patch = document.createElement('div');
  patch.classList.add('patch');
  patch.dataset.index = index;
  patch.addEventListener('click', () => {
    if (!patch.classList.contains('flower') && !patch.querySelector('.bee')) {
      growFlower(patch);
    }
  });
  return patch;
}

function growFlower(patch) {
  patch.classList.add('flower');
}

function createBee() {
  if (bees.length >= maxBees) return null;
  const bee = {
    id: Date.now() + Math.random(),
    need: getRandomNeed(),
    timer: null,
    patchIndex: null,
    element: null,
    needBar: null,
  };
  return bee;
}

function getRandomNeed() {
  return beeNeeds[Math.floor(Math.random() * beeNeeds.length)];
}

function spawnBee() {
  const emptyPatches = [...gardenGrid.children].filter(p => !p.querySelector('.bee') && !p.classList.contains('flower'));
  if (emptyPatches.length === 0) return;
  const patch = emptyPatches[Math.floor(Math.random() * emptyPatches.length)];

  const bee = createBee();
  if (!bee) return;

  bee.patchIndex = patch.dataset.index;

  const beeDiv = document.createElement('div');
  beeDiv.classList.add('bee');
  beeDiv.style.backgroundImage = `url(${beeImages.normal})`;

  // Need bar container
  const needBar = document.createElement('div');
  needBar.classList.add('need-bar');
  const needFill = document.createElement('div');
  needFill.classList.add('need-fill');
  needBar.appendChild(needFill);

  beeDiv.appendChild(needBar);
  patch.appendChild(beeDiv);

  bee.element = beeDiv;
  bee.needBar = needFill;

  bees.push(bee);

  startNeedTimer(bee);

  return bee;
}

function startNeedTimer(bee) {
  const totalTime = beeNeedTimes[bee.need];
  let elapsed = 0;
  const interval = 100; // update every 100ms

  bee.timer = setInterval(() => {
    elapsed += interval;
    const widthPercent = Math.max(0, 100 - (elapsed / totalTime) * 100);
    bee.needBar.style.width = widthPercent + '%';

    if (elapsed >= totalTime) {
      clearInterval(bee.timer);
      bee.element.style.backgroundImage = `url(${beeImages.angry})`;
      bee.element.classList.add('angry');
    }
  }, interval);
}

function meetNeed(needType) {
  // Find first bee with matching need that is not angry
  const bee = bees.find(b => b.need === needType && !b.element.classList.contains('angry'));
  if (!bee) return;

  clearInterval(bee.timer);
  bee.needBar.style.width = '100%';
  bee.element.style.backgroundImage = `url(${beeImages.normal})`;
  bee.element.classList.remove('angry');

  // Spawn a new bee on meeting need
  spawnBee();

  // Assign new need to this bee and restart timer
  bee.need = getRandomNeed();
  startNeedTimer(bee);
}

function resetGarden() {
  bees = [];
  gardenGrid.innerHTML = '';
  for (let i = 0; i < patchCount; i++) {
    gardenGrid.appendChild(createPatch(i));
  }
}

function initGarden() {
  resetGarden();
  // Spawn initial bees
  for (let i = 0; i < 3; i++) {
    spawnBee();
  }
}

// Controls events
feedBtn.addEventListener('click', () => {
  meetNeed('feed');
});

waterBtn.addEventListener('click', () => {
  meetNeed('water');
});

sleepBtn.addEventListener('click', () => {
  meetNeed('sleep');
});

// BEE FACTS & QUIZ DATA

const beeFacts = [
  "Bees communicate by dancing to tell their hive mates where to find food.",
  "There are over 20,000 known species of bees worldwide.",
  "Bees have five eyes – two large compound eyes and three smaller simple eyes.",
  "Honeybees can fly up to 15 miles per hour.",
  "Bees are responsible for pollinating about 1/3 of the food we eat.",
];

const quizQuestions = [
  {
    question: "What do bees use to communicate with other bees?",
    options: ["Sound", "Dance", "Lights", "Colors"],
    answer: "Dance",
  },
  {
    question: "How many species of bees are known worldwide?",
    options: ["Over 5,000", "Over 10,000", "Over 20,000", "Over 50,000"],
    answer: "Over 20,000",
  },
  {
    question: "What do bees pollinate?",
    options: ["Animals", "Other bees", "Plants and crops", "Water"],
    answer: "Plants and crops",
  },
];

// Load bee facts into facts container
function loadBeeFacts() {
  factsContainer.innerHTML = '<h3>Bee Facts</h3><ul>' + beeFacts.map(f => `<li>${f}</li>`).join('') + '</ul>';
}

// Quiz logic
let currentQuizIndex = 0;

function loadQuiz() {
  currentQuizIndex = 0;
  showQuizQuestion();
}

function showQuizQuestion() {
  const q = quizQuestions[currentQuizIndex];
  quizContainer.innerHTML = `
    <div class="quiz-question">${q.question}</div>
    <ul class="quiz-options">
      ${q.options.map(opt => `<li><button>${opt}</button></li>`).join('')}
    </ul>
    <div class="quiz-feedback"></div>
  `;

  const buttons = quizContainer.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const feedback = quizContainer.querySelector('.quiz-feedback');
      if (btn.textContent === q.answer) {
        feedback.textContent = "Correct! 🎉";
        feedback.style.color = "#4d3700"; // dark honey yellow
      } else {
        feedback.textContent = `Wrong! The correct answer is "${q.answer}".`;
        feedback.style.color = "#cc3300"; // red
      }
      // Move to next question after short delay
      setTimeout(() => {