
const symbolsList = ["🍒", "🍋", "🔔", "⭐", "🍀", "7️⃣", "🍉", "💎", "🍇"];
let balance = 1000;
let bet = 50;

const balanceEl = document.getElementById("balance");
const betEl = document.getElementById("bet");
const winEl = document.getElementById("win");
const resultEl = document.getElementById("result");

function getRandomSymbols() {
  const symbols = [];
  for (let i = 0; i < 3; i++) {
    symbols.push(symbolsList[Math.floor(Math.random() * symbolsList.length)]);
  }
  return symbols;
}

function createReel(reelEl, symbols, duration) {
  reelEl.innerHTML = "";
  const container = document.createElement("div");
  container.className = "symbols";
  symbols.forEach(sym => {
    const div = document.createElement("div");
    div.className = "symbol";
    div.textContent = sym;
    container.appendChild(div);
  });
  reelEl.appendChild(container);
  container.style.top = "-240px";
  container.style.animation = `spin ${duration}s ease-out forwards`;
}

function updateUI() {
  balanceEl.textContent = balance;
  betEl.textContent = bet;
}

function checkWin(res) {
  return res[0] === res[1] && res[1] === res[2];
}

document.getElementById("spin").addEventListener("click", () => {
  if (balance < bet) {
    resultEl.textContent = "Недостаточно монет!";
    return;
  }

  balance -= bet;
  updateUI();
  winEl.textContent = "0";
  resultEl.textContent = "Крутим...";

  const res1 = getRandomSymbols();
  const res2 = getRandomSymbols();
  const res3 = getRandomSymbols();

  createReel(document.getElementById("reel1"), res1, 1.5);
  createReel(document.getElementById("reel2"), res2, 2.0);
  createReel(document.getElementById("reel3"), res3, 2.5);

  setTimeout(() => {
    const final = [res1[2], res2[2], res3[2]];
    if (checkWin(final)) {
      const winAmount = bet * 5;
      balance += winAmount;
      winEl.textContent = winAmount;
      resultEl.textContent = `🎉 Победа! ${final.join(" ")} +${winAmount}`;
    } else {
      resultEl.textContent = `❌ ${final.join(" ")} — проигрыш`;
    }
    updateUI();
  }, 2600);
});

Telegram.WebApp.ready();
updateUI();
