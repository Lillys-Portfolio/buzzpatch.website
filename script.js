// --- Login variables ---
const loginPage = document.getElementById('login-page');
const factsQuizPage = document.getElementById('facts-quiz-page');
const beeGardenPage = document.getElementById('bee-garden-page');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const correctUser = 'beeuser';
const correctPass = 'buzz123';

// --- Quiz variables ---
const quizQuestions = [
  "Bees have five eyes. True or False?",
  "Which flower do bees love the most?",
  "How many wings does a bee have?"
];
let currentQuestion = 0;

const quizQuestionElem = document.getElementById('quiz-question');
const prevBtn = document.getElementById('prev-question');
const nextBtn = document.getElementById('next-question');
const goToGardenBtn = document.getElementById('go-to-garden-btn');

// --- Bee Garden variables ---
const garden = document.getElementById('garden');
const feedBtn = document.getElementById('feed-btn');
const waterBtn = document.getElementById('water-btn');
const sleepBtn = document.getElementById('sleep-btn');
const logoutBtn = document.getElementById('logout-btn');

let bees = [];
let flowers = [];

function showPage(page) {
  loginPage.style.display = 'none';
  factsQuizPage.style.display = 'none';
  beeGardenPage.style.display = 'none';
  page.style.display = 'block';
}

// --- LOGIN ---
loginBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === correctUser && password === correctPass) {
    loginError.textContent = '';
    showPage(factsQuizPage);
    showQuestion();
  } else {
    loginError.textContent = 'Invalid username or password.';
  }
});

// --- QUIZ NAVIGATION ---
function showQuestion() {
  quizQuestionElem.textContent = quizQuestions[currentQuestion];
}
prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
});
nextBtn.addEventListener('click', () => {
  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    showQuestion();
  }
});

// --- GO TO BEE GARDEN ---
goToGardenBtn.addEventListener('click', () => {
  showPage(beeGardenPage);
  renderGarden();
});

// --- LOGOUT ---
logoutBtn.addEventListener('click', () => {
  usernameInput.value = '';
  passwordInput.value = '';
  showPage(loginPage);
});

// --- BEE GARDEN LOGIC ---

function randomPosition() {
  const gardenRect = garden.getBoundingClientRect();
  return {
    x: Math.floor(Math.random() * (garden.clientWidth - 40)),
    y: Math.floor(Math.random() * (garden.clientHeight - 40))
  };
}

function createBee() {
  const bee = document.createElement('div');
  bee.classList.add('bee');
  bee.textContent = '🐝';
  const pos = randomPosition();
  bee.style.left = pos.x + 'px';
  bee.style.top = pos.y + 'px';
  garden.appendChild(bee);

  // Bee needs start full at 100%
  const beeObj = {
    element: bee,
    needs: 100,
    angry: false
  };

  bees.push(beeObj);

  // Start need drain interval for this bee
  beeObj.interval = setInterval(() => {
    beeObj.needs -= 5;
    if (beeObj.needs <= 0) {
      beeObj.needs = 0;
      beeObj.angry = true;
      bee.classList.add('angry');
      bee.textContent = '😡';
    } else if (beeObj.angry) {
      beeObj.angry = false;
      bee.classList.remove('angry');
      bee.textContent = '🐝';
    }
  }, 2000);
}

function createFlower(x, y) {
  const flower = document.createElement('div');
  flower.classList.add('flower');
  flower.style.left = x + 'px';
  flower.style.top = y + 'px';
  garden.appendChild(flower);
  flowers.push(flower);
}

function renderGarden() {
  garden.innerHTML = ''; // clear garden
  bees.forEach(beeObj => {
    garden.appendChild(beeObj.element);
  });
  flowers.forEach(flower => {
    garden.appendChild(flower);
  });
}

// Buttons add bees and flowers
feedBtn.addEventListener('click', () => {
  createBee();
});

waterBtn.addEventListener('click', () => {
  createBee();
});

sleepBtn.addEventListener('click', () => {
  createBee();
});

// Clicking empty garden adds a flower
garden.addEventListener('click', (e) => {
  if (e.target === garden) {
    const rect = garden.getBoundingClientRect();
    const x = e.clientX - rect.left - 20;
    const y = e.clientY - rect.top - 20;
    createFlower(x, y);
  }
});

// Initialize on page load
showPage(loginPage);