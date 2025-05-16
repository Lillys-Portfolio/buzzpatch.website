function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const error = document.getElementById("loginError");

  if (user === "bee" && pass === "buzz") {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("factQuizSection").style.display = "block";
  } else {
    error.textContent = "Invalid login. Try username: bee, password: buzz";
  }
}

function goToGarden() {
  document.getElementById("factQuizSection").style.display = "none";
  document.getElementById("beeGarden").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const garden = document.getElementById("garden");
  const feedBtn = document.getElementById("feedBtn");
  const waterBtn = document.getElementById("waterBtn");
  const sleepBtn = document.getElementById("sleepBtn");

  const needs = ["feed", "water", "sleep"];
  const beeColors = ["#fce94f", "#ffd700", "#ffee58"];

  function createBee(needType) {
    const bee = document.createElement("div");
    bee.className = "bee";
    bee.style.backgroundColor = beeColors[Math.floor(Math.random() * beeColors.length)];
    bee.setAttribute("data-need", needType);

    const face = document.createElement("div");
    face.className = "face";
    face.textContent = "🐝";
    bee.appendChild(face);

    const bar = document.createElement("div");
    bar.className = "need-bar";
    const fill = document.createElement("div");
    fill.className = "need-fill";
    bar.appendChild(fill);
    bee.appendChild(bar);

    garden.appendChild(bee);
    bee.style.left = `${Math.random() * 90}%`;
    bee.style.top = `${Math.random() * 90}%`;

    let needLevel = 100;
    const interval = setInterval(() => {
      needLevel -= 1;
      fill.style.width = `${needLevel}%`;
      if (needLevel <= 0) {
        clearInterval(interval);
        bee.classList.add("angry");
        face.textContent = "😡";
      }
    }, 200);

    bee.addEventListener("click", () => {
      if (!bee.classList.contains("angry")) {
        clearInterval(interval);
        garden.removeChild(bee);
      }
    });
  }

  feedBtn.addEventListener("click", () => createBee("feed"));
  waterBtn.addEventListener("click", () => createBee("water"));
  sleepBtn.addEventListener("click", () => createBee("sleep"));

  garden.addEventListener("click", (e) => {
    if (e.target === garden) {
      const flower = document.createElement("div");
      flower.className = "flower";
      flower.style.left = `${e.clientX - garden.getBoundingClientRect().left}px`;
      flower.style.top = `${e.clientY - garden.getBoundingClientRect().top}px`;
      garden.appendChild(flower);
    }
  });
});