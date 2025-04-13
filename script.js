let balance = 1000;
const stake = 10;
const winMultiplier = 5;
const winChance = 30;

const slot = document.getElementById("slot");
const result = document.getElementById("result");
const balanceEl = document.getElementById("balance");
const spinBtn = document.getElementById("spin-btn");

const symbols = ["🍒", "🍋", "🔔", "⭐", "🍀", "7️⃣"];

function updateBalance() {
  balanceEl.textContent = `Баланс: ${balance} монет`;
}

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinSlot() {
  if (balance < stake) {
    result.textContent = "Недостаточно монет!";
    return;
  }

  balance -= stake;
  updateBalance();
  result.textContent = "Крутим...";

  let spins = 0;
  const maxSpins = 15;
  const interval = setInterval(() => {
    const s1 = getRandomSymbol();
    const s2 = getRandomSymbol();
    const s3 = getRandomSymbol();
    slot.textContent = `${s1} | ${s2} | ${s3}`;
    spins++;

    if (spins >= maxSpins) {
      clearInterval(interval);

      const winRoll = Math.random() * 100;
      let final;

      if (winRoll <= winChance) {
        const sym = getRandomSymbol();
        final = [sym, sym, sym];
        balance += stake * winMultiplier;
        result.textContent = `🎉 Выигрыш! +${stake * winMultiplier} монет`;
      } else {
        final = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
        result.textContent = `😢 Проигрыш...`;
      }

      slot.textContent = `${final[0]} | ${final[1]} | ${final[2]}`;
      updateBalance();
    }
  }, 80);
}

spinBtn.addEventListener("click", spinSlot);
Telegram.WebApp.ready();
