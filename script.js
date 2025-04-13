let screws = document.querySelectorAll('.screw');
let openBtn = document.getElementById('openRemote');
let batteryArea = document.getElementById('batteryArea');
let insertBatteriesBtn = document.getElementById('insertNewBatteries');
let closeBtn = document.getElementById('closeRemote');
let remote = document.getElementById('remote');
let result = document.getElementById('result');
let timeValue = document.getElementById('timeValue');
let scoreValue = document.getElementById('scoreValue');
let restartBtn = document.getElementById('restart');
let tools = document.querySelectorAll('.tool');

let screwsRemoved = 0;
let time = 0;
let score = 0;
let timerInterval;

tools.forEach(tool => {
  tool.addEventListener('click', () => {
    tools.forEach(t => t.classList.remove('selected'));
    tool.classList.add('selected');
  });
});

screws.forEach(screw => {
  screw.addEventListener('click', () => {
    const selectedTool = document.querySelector('.tool.selected').dataset.tool;
    if (selectedTool === 'screwdriver') {
      screw.style.display = 'none';
      screwsRemoved++;
      score += 10;
      updateScore();
      if (screwsRemoved === screws.length) {
        openBtn.disabled = false;
      }
    } else {
      alert('Wrong tool! Use a screwdriver.');
      score -= 5;
      updateScore();
    }
  });
});

openBtn.addEventListener('click', () => {
  remote.classList.add('opened');
  openBtn.classList.add('hidden');
  batteryArea.classList.remove('hidden');
  score += 5;
  updateScore();
});

insertBatteriesBtn.addEventListener('click', () => {
  batteryArea.innerHTML = '<p>✅ New batteries inserted!</p>';
  closeBtn.classList.remove('hidden');
  score += 10;
  updateScore();
});

closeBtn.addEventListener('click', () => {
  result.classList.remove('hidden');
  result.textContent = '🎉 Remote fixed successfully!';
  closeBtn.classList.add('hidden');
  clearInterval(timerInterval);
});

restartBtn.addEventListener('click', () => {
  window.location.reload();
});

function updateScore() {
  scoreValue.textContent = score;
}

function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    timeValue.textContent = time;
  }, 1000);
}

window.onload = startTimer;
