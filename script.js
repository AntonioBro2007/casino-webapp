
let balance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 1000;
let gamesPlayed = 0;
let winStreak = 0;

const stakeEl = document.getElementById("stake");
const linesEl = document.getElementById("lines");
const riskEl = document.getElementById("risk");

const balanceEl = document.getElementById("balance");
const resultEl = document.getElementById("result");
const historyEl = document.getElementById("history");

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");

const winSound = document.getElementById("win-sound");
const symbols = ["🍒", "🍋", "🔔", "⭐", "🍀", "7️⃣"];

function updateBalanceDisplay() {
  balanceEl.textContent = balance;
  localStorage.setItem("balance", balance);
}

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinReel(reel, duration, finalSymbol) {
  return new Promise((resolve) => {
    let interval = setInterval(() => {
      reel.textContent = getRandomSymbol();
    }, 50);
    setTimeout(() => {
      clearInterval(interval);
      reel.textContent = finalSymbol;
      resolve();
    }, duration);
  });
}

function getWinChance(risk) {
  switch (risk) {
    case "low": return 50;
    case "medium": return 30;
    case "high": return 15;
  }
}

async function playRound() {
  const stake = parseInt(stakeEl.value);
  const lines = parseInt(linesEl.value);
  const risk = riskEl.value;

  if (balance < stake) {
    resultEl.textContent = "Недостаточно монет!";
    return;
  }

  balance -= stake;
  updateBalanceDisplay();
  resultEl.textContent = "Крутим...";
  gamesPlayed++;

  let winRoll = Math.random() * 100;
  let winChance = getWinChance(risk);
  let final = [];

  if (winRoll < winChance) {
    const s = getRandomSymbol();
    final = [s, s, s];
    balance += stake * 5;
    winSound.play();
    winStreak++;
    resultEl.textContent = `🎉 Победа! +${stake * 5} монет`;
  } else {
    final = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    resultEl.textContent = "😢 Увы, вы проиграли.";
    winStreak = 0;
  }

  await spinReel(reel1, 1000, final[0]);
  await spinReel(reel2, 1500, final[1]);
  await spinReel(reel3, 2000, final[2]);

  if (winStreak === 3) {
    balance += stake;
    resultEl.textContent += " 🎉 Бонус за серию побед!";
  }

  updateBalanceDisplay();
  const line = lines === 3 ? "3 линии" : "1 линия";
  historyEl.innerHTML = `<li>${line} | ${final.join(" ")} | ${resultEl.textContent}</li>` + historyEl.innerHTML;
}

document.getElementById("spin-btn").addEventListener("click", playRound);

document.getElementById("auto-btn").addEventListener("click", async () => {
  for (let i = 0; i < 10; i++) {
    await playRound();
    await new Promise(r => setTimeout(r, 3000));
  }
});

document.getElementById("topup-btn").addEventListener("click", () => {
  balance += 500;
  updateBalanceDisplay();
  resultEl.textContent = "💳 Баланс пополнен!";
});

Telegram.WebApp.ready();
updateBalanceDisplay();
