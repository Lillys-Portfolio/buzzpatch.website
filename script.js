const garden = document.getElementById("gardenArea");
const pages = document.querySelectorAll("section");
const buttons = document.querySelectorAll("nav button");
const seasons = ["spring.jpg", "summer.jpg", "autumn.jpg", "winter.jpg"];

function switchPage(id) {
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
buttons.forEach(btn => btn.onclick = () => switchPage(btn.dataset.target));

// Seasonal background
garden.style.backgroundImage = `url(${seasons[Math.floor(Math.random() * seasons.length)]})`;

document.querySelectorAll(".taskMenu button").forEach(btn => {
  btn.onclick = () => handleTask(btn.dataset.action);
});

function handleTask(action) {
  clearEnemy();
  const effect = document.createElement("div");
  effect.className = action === "water" ? "splash" : action === "feed" ? "flurry" : "";
  effect.textContent = action === "water" ? "Splash!" : action === "feed" ? "Flowers!" : "";
  effect.style.left = `${Math.random() * 80}%`;
  effect.style.top = `${Math.random() * 80}%`;
  garden.appendChild(effect);
  setTimeout(() => effect.remove(), 1000);
  lastAction = Date.now();
}

let lastAction = Date.now();
setInterval(() => {
  if (Date.now() - lastAction > 10000 && !document.querySelector(".enemyBee")) {
    const enemy = document.createElement("div");
    enemy.className = "enemyBee";
    enemy.textContent = "Buzz Off!";
    garden.appendChild(enemy);
    garden.style.filter = "hue-rotate(180deg)";
  }
}, 3000);

function clearEnemy() {
  const enemy = document.querySelector(".enemyBee");
  if (enemy) enemy.remove();
  garden.style.filter = "none";
}

document.getElementById("loginForm").onsubmit = e => {
  e.preventDefault();
  document.getElementById("swarmOverlay").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("swarmOverlay").classList.add("hidden");
    document.getElementById("beeContent").classList.remove("hidden");
  }, 1500);
};