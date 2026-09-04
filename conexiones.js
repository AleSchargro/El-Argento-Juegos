const MAX_TRIES = 4;

const puzzle = getTodayPuzzle();
const allWords = puzzle.categories.flatMap(cat =>
  cat.words.map(word => ({ word, category: cat.name }))
);
shuffle(allWords);

let selected = [];
let solvedCategories = [];
let triesLeft = MAX_TRIES;

const gridEl = document.getElementById("grid");
const solvedEl = document.getElementById("solved");
const triesEl = document.getElementById("tries");
const submitBtn = document.getElementById("submitBtn");
const messageEl = document.getElementById("message");

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function render() {
  gridEl.innerHTML = "";
  allWords
    .filter(w => !solvedCategories.includes(w.category))
    .forEach(w => {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.textContent = w.word;
      if (selected.includes(w.word)) tile.classList.add("selected");
      tile.addEventListener("click", () => toggleWord(w.word));
      gridEl.appendChild(tile);
    });

  triesEl.innerHTML = "";
  for (let i = 0; i < MAX_TRIES; i++) {
    const dot = document.createElement("div");
    dot.className = "try-dot" + (i >= triesLeft ? " used" : "");
    triesEl.appendChild(dot);
  }

  submitBtn.disabled = selected.length !== 4;
}

function toggleWord(word) {
  if (selected.includes(word)) {
    selected = selected.filter(w => w !== word);
  } else if (selected.length < 4) {
    selected = [...selected, word];
  }
  render();
}

function submit() {
  const categoryOfSelected = allWords.find(w => w.word === selected[0]).category;
  const isMatch = selected.every(word =>
    allWords.find(w => w.word === word).category === categoryOfSelected
  );

  if (isMatch) {
    solvedCategories.push(categoryOfSelected);
    selected = [];
    renderSolved();
    render();
    messageEl.textContent = "¡Correcto!";

    if (solvedCategories.length === puzzle.categories.length) {
      messageEl.textContent = "¡Ganaste! Resolviste las cuatro categorías.";
      submitBtn.disabled = true;
    }
  } else {
    shakeSelected();
    triesLeft -= 1;
    messageEl.textContent = "No es esa combinación.";
    selected = [];

    if (triesLeft === 0) {
      revealAll();
      messageEl.textContent = "Se acabaron los intentos. Estas eran las categorías.";
      submitBtn.disabled = true;
    } else {
      setTimeout(render, 300);
    }
  }
}

function shakeSelected() {
  document.querySelectorAll(".tile.selected").forEach(tile => {
    tile.classList.add("shake");
    setTimeout(() => tile.classList.remove("shake"), 400);
  });
}

function renderSolved() {
  solvedEl.innerHTML = "";
  solvedCategories.forEach(catName => {
    const cat = puzzle.categories.find(c => c.name === catName);
    const row = document.createElement("div");
    row.className = "solved-row";
    row.innerHTML = `<div class="cat-name">${cat.name}</div><div class="cat-words">${cat.words.join(" · ")}</div>`;
    solvedEl.appendChild(row);
  });
}

function revealAll() {
  solvedCategories = puzzle.categories.map(c => c.name);
  renderSolved();
  render();
}

submitBtn.addEventListener("click", submit);
render();
