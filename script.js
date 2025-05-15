const sections = document.querySelectorAll(".section");

function showSection(id) {
  sections.forEach(section => section.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Seasonal background change
const garden = document.getElementById("garden");
const seasons = [
  "url('spring.jpg')",
  "url('summer.jpg')",
  "url('autumn.jpg')",
  "url('winter.jpg')"
];
garden.style.backgroundImage = seasons[Math.floor(Math.random() * seasons.length)];

// Splash / Flurry Effects
function waterFlowers() {
  createEffect("Splash!", "splash");
}

function feedBees() {
  createEffect("Flowers!", "flurry");
}

function createEffect(text, className) {
  const effect = document.createElement("div");
  effect.className = className;
  effect.innerText = text;

  // Position randomly in garden
  const x = Math.random() * (garden.offsetWidth - 100);
  const y = Math.random() * (garden.offsetHeight - 50);
  effect.style.left = `${x}px`;
  effect.style.top = `${y}px`;

  garden.appendChild(effect);
  setTimeout(() => effect.remove(), 1000);
}

function putBeesToSleep() {
  alert("The bees are tucked in for a nap.");
}

function handleLogin(event) {
  event.preventDefault();
  const swarm = document.getElementById("swarmOverlay");
  const content = document.getElementById("beeContent");
  swarm.classList.remove("hidden");
  setTimeout(() => {
    swarm.classList.add("hidden");
    content.classList.remove("hidden");
  }, 1500);
}

// Angry bee logic
let lastAction = Date.now();

function checkNeglect() {
  if (Date.now() - lastAction > 10000 && !document.querySelector(".enemyBee")) {
    const enemy = document.createElement("div");
    enemy.className = "enemyBee";
    enemy.innerText = "Buzz Off!";
    garden.appendChild(enemy);
    garden.style.filter = "hue-rotate(180deg)";
  }
}
setInterval(checkNeglect, 3000);

document.querySelectorAll(".task-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    lastAction = Date.now();
    garden.style.filter = "none";
    const enemy = document.querySelector(".enemyBee");
    if (enemy) enemy.remove();
  });
});