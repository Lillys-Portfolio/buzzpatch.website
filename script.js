function showPage(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

let lastAction = Date.now();
const garden = document.getElementById("gardenArea");

function doAction(type) {
  lastAction = Date.now();
  removeEnemy();
  const msg = document.createElement("div");
  msg.textContent = type === "water" ? "Splash!" : type === "feed" ? "Yum!" : "Zzz...";
  msg.style.position = "absolute";
  msg.style.top = "10px";
  msg.style.left = "10px";
  msg.style.color = "white";
  garden.appendChild(msg);
  setTimeout(() => msg.remove(), 1000);
}

function spawnEnemy() {
  if (Date.now() - lastAction > 10000 && !document.querySelector(".enemyBee")) {
    const bee = document.createElement("div");
    bee.className = "enemyBee";
    bee.textContent = "Buzz Off!";
    garden.appendChild(bee);
  }
}

function removeEnemy() {
  const bee = document.querySelector(".enemyBee");
  if (bee) bee.remove();
}

setInterval(spawnEnemy, 3000);

function login(e) {
  e.preventDefault();
  document.getElementById("beeContent").style.display = "block";
}