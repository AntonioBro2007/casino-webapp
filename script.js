
let balance = 1000;
const stake = 10;
const winMultiplier = 5;
const winChance = 30;

const balanceEl = document.getElementById("balance");
const resultEl = document.getElementById("result");
const spinBtn = document.getElementById("spin-btn");

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");

const symbols = ["🍒", "🍋", "🔔", "⭐", "🍀", "7️⃣"];

function updateBalance() {
  balanceEl.textContent = `Баланс: ${balance} монет`;
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

spinBtn.addEventListener("click", async () => {
  if (balance < stake) {
    resultEl.textContent = "Недостаточно монет!";
    return;
  }

  balance -= stake;
  updateBalance();
  resultEl.textContent = "Крутим...";

  // определяем результат
  const winRoll = Math.random() * 100;
  let finalSymbols = [];

  if (winRoll <= winChance) {
    const sym = getRandomSymbol();
    finalSymbols = [sym, sym, sym];
    balance += stake * winMultiplier;
  } else {
    finalSymbols = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
  }

  // анимация с остановкой поочерёдно
  await spinReel(reel1, 1000, finalSymbols[0]);
  await spinReel(reel2, 1500, finalSymbols[1]);
  await spinReel(reel3, 2000, finalSymbols[2]);

  if (finalSymbols[0] === finalSymbols[1] && finalSymbols[1] === finalSymbols[2]) {
    resultEl.textContent = `🎉 Победа! +${stake * winMultiplier} монет`;
  } else {
    resultEl.textContent = "😢 Увы, вы проиграли.";
  }

  updateBalance();
});

Telegram.WebApp.ready();
updateBalance();
    