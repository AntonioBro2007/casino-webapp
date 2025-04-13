
const symbols = ["🍒", "🍋", "🔔", "⭐", "🍀", "7️⃣", "🍉", "💎", "🍇"];
let balance = 1000;
let bet = 10;

const grid = document.getElementById("slot-grid");
const balanceEl = document.getElementById("balance");
const betEl = document.getElementById("bet");
const winEl = document.getElementById("win");
const resultEl = document.getElementById("result");

function updateUI() {
  balanceEl.textContent = balance;
  betEl.textContent = bet;
}

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generateGrid() {
  grid.innerHTML = "";
  const cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "slot-cell";
    cell.textContent = getRandomSymbol();
    grid.appendChild(cell);
    cells.push(cell);
  }

  setTimeout(() => {
    cells.forEach((cell, index) => {
      setTimeout(() => {
        cell.style.opacity = "1";
        cell.style.transform = "translateY(0)";
      }, index * 50);
    });
  }, 100);
  
  return cells;
}

function checkWin(cells) {
  const rows = [
    [0,1,2],
    [3,4,5],
    [6,7,8]
  ];

  for (const row of rows) {
    if (
      cells[row[0]].textContent === cells[row[1]].textContent &&
      cells[row[1]].textContent === cells[row[2]].textContent
    ) {
      return true;
    }
  }
  return false;
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

  const cells = generateGrid();

  setTimeout(() => {
    if (checkWin(cells)) {
      const winAmount = bet * 5;
      balance += winAmount;
      winEl.textContent = winAmount;
      resultEl.textContent = `🎉 Вы выиграли ${winAmount} монет!`;
    } else {
      resultEl.textContent = "❌ Попробуйте снова!";
    }
    updateUI();
  }, 1000);
});

document.getElementById("increase-bet").addEventListener("click", () => {
  bet += 10;
  updateUI();
});
document.getElementById("decrease-bet").addEventListener("click", () => {
  if (bet > 10) bet -= 10;
  updateUI();
});

Telegram.WebApp.ready();
updateUI();
