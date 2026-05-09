const symbols = ["🍎", "🍌", "🍒", "🍇", "🍓", "🥝", "🍑", "🥥"];
let cards = [...symbols, ...symbols];
let board = document.getElementById("board");
let stepsEl = document.getElementById("steps");
let timeEl = document.getElementById("time");
let restartBtn = document.getElementById("restart");

let opened = [];
let matched = 0;
let steps = 0;
let time = 0;
let timer = null;

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function init() {
  cards = shuffle(cards);
  board.innerHTML = "";
  opened = [];
  matched = 0;
  steps = 0;
  time = 0;
  stepsEl.textContent = steps;
  timeEl.textContent = time;
  clearInterval(timer);

  cards.forEach((symbol) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.symbol = symbol;
    card.addEventListener("click", () => openCard(card));
    board.appendChild(card);
  });

  timer = setInterval(() => {
    time++;
    timeEl.textContent = time;
  }, 1000);
}

function openCard(card) {
  if (
    opened.length >= 2 ||
    card.classList.contains("open") ||
    card.classList.contains("matched")
  )
    return;

  card.classList.add("open");
  card.textContent = card.dataset.symbol;
  opened.push(card);

  if (opened.length === 2) {
    steps++;
    stepsEl.textContent = steps;
    checkMatch();
  }
}

function checkMatch() {
  const [a, b] = opened;
  if (a.dataset.symbol === b.dataset.symbol) {
    a.classList.add("matched");
    b.classList.add("matched");
    matched += 2;
    opened = [];
    if (matched === cards.length) {
      clearInterval(timer);
      setTimeout(() => {
        alert(`恭喜你，游戏完成！\n步数：${steps}\n时间：${time} 秒`);
      }, 300);
    }
  } else {
    setTimeout(() => {
      a.classList.remove("open");
      b.classList.remove("open");
      a.textContent = "";
      b.textContent = "";
      opened = [];
    }, 600);
  }
}

restartBtn.addEventListener("click", init);
init();