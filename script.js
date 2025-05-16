const beeNames = [
  "Saul Stinger", "Heisenbuzz", "Beezefeld", "StingRay", "Bumbleina",
  "Honeycomb", "Zzzara", "PollenPaul", "Waggle", "SunDancer",
  "Nectarine", "Dr. Buzz", "Guz Fly", "Amberwing"
];
const moods = ["Happy", "Hungry", "Sleepy", "Excited", "Lazy"];
let sleepIntervals = {};

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function createGarden() {
  const garden = document.getElementById("garden");
  const beedex = document.getElementById("beedexList");
  garden.innerHTML = "";
  beedex.innerHTML = "";

  for (let i = 0; i < 12; i++) {
    const plot = document.createElement("div");
    plot.className = "plot";
    plot.dataset.index = i;

    if (Math.random() > 0.25) {
      const bee = document.createElement("div");
      bee.className = "bee";

      const name = beeNames[i % beeNames.length];
      const mood = moods[Math.floor(Math.random() * moods.length)];

      bee.innerText = "🐝";
      bee.title = `${name} - ${mood}`;
      bee.onclick = () => showPopup(name, mood);

      const sleepBar = document.createElement("div");
      sleepBar.className = "sleep-bar";
      const fill = document.createElement("div");
      fill.className = "sleep-fill";
      fill.style.width = "0%";
      sleepBar.appendChild(fill);

      plot.appendChild(bee);
      plot.appendChild(sleepBar);

      // BeeDex
      const card = document.createElement("div");
      card.className = "beecard";
      card.innerHTML = `<p>🐝 <strong>${name}</strong></p><p>Mood: ${mood}</p>`;
      beedex.appendChild(card);
    } else {
      plot.onclick = () => plantFlower(plot);
    }

    garden.appendChild(plot);
  }
}

function showPopup(name, mood) {
  const popup = document.getElementById("beePopup");
  popup.innerHTML = `<h2>${name}</h2><p>Mood: ${mood}</p><button onclick="closePopup()">Close</button>`;
  popup.style.display = "block";
}

function closePopup() {
  document.getElementById("beePopup").style.display = "none";
}

function waterFlowers() {
  alert("💧 You watered the flowers!");
}

function feedBees() {
  alert("🍯 You fed the bees!");
}

function handleLogin(event) {
  event.preventDefault();
  const username = event.target[0].value.trim();
  const password = event.target[1].value.trim();

  if (username === "beeuser" && password === "buzz123") {
    document.getElementById("loginMessage").innerText = "✅ You are now logged in!";
    showSection("gardenSection");
  } else {
    document.getElementById("loginMessage").innerText = "❌ Invalid username or password.";
  }
}

function putBeesToSleep() {
  const plots = document.querySelectorAll(".plot");
  plots.forEach((plot, index) => {
    const bee = plot.querySelector(".bee");
    const fill = plot.querySelector(".sleep-fill");

    if (bee && fill) {
      bee.classList.add("sleeping");
      bee.parentElement.classList.add("sleeping");

      let percent = 0;
      if (sleepIntervals[index]) clearInterval(sleepIntervals[index]);

      sleepIntervals[index] = setInterval(() => {
        if (percent < 100) {
          percent += 10;
          fill.style.width = `${percent}%`;
        } else {
          clearInterval(sleepIntervals[index]);
          bee.classList.remove("sleeping");
          plot.classList.remove("sleeping");
          fill.style.width = "0%";
        }
      }, 500);
    }
  });

  alert("🌙 Bees are sleeping...");
}

function plantFlower(plot) {
  if (!plot.classList.contains("flowered")) {
    plot.classList.add("flowered");
    plot.onclick = null;
    alert("🌼 You planted a flower!");
  } else {
    alert("🌼 There's already a flower here!");
  }
}

createGarden();