
let balance = 1000;
const winMultiplier = 5;
const winChance = 30;

const balanceEl = document.getElementById("balance");
const resultEl = document.getElementById("result");
const stakeSelect = document.getElementById("stake");
const spinBtn = document.getElementById("spin-btn");
const topupBtn = document.getElementById("topup-btn");
const historyEl = document.getElementById("history");

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");
const winSound = document.getElementById("win-sound");

const symbols = ["🍒", "🍋", "🔔", "⭐", "🍀", "7️⃣"];

function updateBalance() {
  balanceEl.textContent = balance;
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

function addToHistory(text) {
  const li = document.createElement("li");
  li.textContent = text;
  historyEl.prepend(li);
}

spinBtn.addEventListener("click", async () => {
  const stake = parseInt(stakeSelect.value);
  if (balance < stake) {
    resultEl.textContent = "Недостаточно монет!";
    return;
  }

  balance -= stake;
  updateBalance();
  resultEl.textContent = "Крутим...";

  const winRoll = Math.random() * 100;
  let finalSymbols = [];

  if (winRoll <= winChance) {
    const sym = getRandomSymbol();
    finalSymbols = [sym, sym, sym];
    balance += stake * winMultiplier;
  } else {
    finalSymbols = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
  }

  await spinReel(reel1, 1000, finalSymbols[0]);
  await spinReel(reel2, 1500, finalSymbols[1]);
  await spinReel(reel3, 2000, finalSymbols[2]);

  const win = finalSymbols[0] === finalSymbols[1] && finalSymbols[1] === finalSymbols[2];

  if (win) {
    resultEl.textContent = `🎉 Победа! +${stake * winMultiplier} монет`;
    document.body.classList.add("win-effect");
    winSound.play();
    setTimeout(() => document.body.classList.remove("win-effect"), 1200);
  } else {
    resultEl.textContent = "😢 Увы, вы проиграли.";
  }

  addToHistory(`Ставка: ${stake} → Результат: ${finalSymbols.join(" ")} ${win ? "✅ Победа" : "❌"}`);
  updateBalance();
});

topupBtn.addEventListener("click", () => {
  balance += 500;
  updateBalance();
  resultEl.textContent = "💳 Баланс пополнен!";
});

Telegram.WebApp.ready();
updateBalance();
