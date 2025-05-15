const garden = document.getElementById("gardenArea");
const pages = document.querySelectorAll("section");
const navButtons = document.querySelectorAll("nav button");

navButtons.forEach(btn => {
  btn.onclick = () => {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(btn.dataset.target).classList.add("active");
  };
});

document.querySelectorAll(".taskMenu button").forEach(btn => {
  btn.onclick = () => {
    clearEnemy();
    const type = btn.dataset.action;
    const effect = document.createElement("div");
    effect.className = type === "water" ? "splash" : type === "feed" ? "flurry" : "";
    effect.textContent = type === "water" ? "Splash!" : type === "feed" ? "Flowers!" : "";
    effect.style.left = `${Math.random() * 80}%`;
    effect.style.top = `${Math.random() * 80}%`;
    garden.appendChild(effect);
    setTimeout(() => effect.remove(), 1000);
    lastAction = Date.now();
  };
});

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
  const swarm = document.getElementById("swarmOverlay");
  const content = document.getElementById("beeContent");
  swarm.classList.remove("hidden");
  setTimeout(() => {
    swarm.classList.add("hidden");
    content.classList.remove("hidden");
  }, 1500);
};