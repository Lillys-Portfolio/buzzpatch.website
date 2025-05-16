const garden = document.getElementById('garden');

function spawnBee() {
  const bee = document.createElement('div');
  bee.classList.add('bee');
  bee.textContent = '🐝';

  const maxX = garden.clientWidth - 30;
  const maxY = garden.clientHeight - 30;

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  bee.style.left = x + 'px';
  bee.style.top = y + 'px';

  // Need bar element
  const needBar = document.createElement('div');
  needBar.classList.add('need-bar');
  needBar.style.width = '100%';
  bee.appendChild(needBar);

  garden.appendChild(bee);

  // Timer: decrease need bar every 100ms
  let needPercent = 100;
  const decreaseRate = 0.5; // 0.5% per 100ms = 50 seconds total

  const intervalId = setInterval(() => {
    needPercent -= decreaseRate;
    if (needPercent <= 0) {
      needPercent = 0;
      clearInterval(intervalId);
      // Angry bee style - red color and angry face
      bee.textContent = '😡';
      needBar.style.backgroundColor = 'red';
    }
    needBar.style.width = needPercent + '%';
  }, 100);

  // Store intervalId for future use if needed
  bee.dataset.intervalId = intervalId;
}

// Spawn a bee every 4 seconds
setInterval(spawnBee, 4000);
spawnBee();