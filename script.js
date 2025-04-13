// script.js
const screws = document.querySelectorAll('.screw');
const openBtn = document.getElementById('openRemote');
const batteryArea = document.getElementById('batteryArea');
const insertBatteriesBtn = document.getElementById('insertNewBatteries');
const closeBtn = document.getElementById('closeRemote');
const remote = document.getElementById('remote');
const result = document.getElementById('result');

let screwsRemoved = 0;

screws.forEach(screw => {
  screw.addEventListener('click', () => {
    screw.style.display = 'none';
    screwsRemoved++;
    if (screwsRemoved === screws.length) {
      openBtn.disabled = false;
    }
  });
});

openBtn.addEventListener('click', () => {
  remote.classList.remove('closed');
  openBtn.classList.add('hidden');
  batteryArea.classList.remove('hidden');
});

insertBatteriesBtn.addEventListener('click', () => {
  batteryArea.innerHTML = '<p>✅ New batteries inserted!</p>';
  closeBtn.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
  result.classList.remove('hidden');
  result.textContent = '🎉 Remote fixed successfully!';
  closeBtn.classList.add('hidden');
});
