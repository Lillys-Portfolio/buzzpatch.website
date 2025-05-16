const garden = document.getElementById('garden');

function spawnBee() {
  const bee = document.createElement('div');
  bee.classList.add('bee');
  bee.textContent = '🐝';

  // Random position inside the garden
  const maxX = garden.clientWidth - 30; // bee approx 30px
  const maxY = garden.clientHeight - 30;

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  bee.style.left = x + 'px';
  bee.style.top = y + 'px';

  // Create need bar element
  const needBar = document.createElement('div');
  needBar.classList.add('need-bar');
  needBar.style.width = '100%'; // start full

  bee.appendChild(needBar);

  garden.appendChild(bee);
}

// Spawn a bee every 4 seconds
setInterval(spawnBee, 4000);

// Spawn initial bee immediately
spawnBee();