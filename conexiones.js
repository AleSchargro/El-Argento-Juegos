const MAX_TRIES = 4;

const CATEGORY_COLORS = ["#1C3F60", "#4C8C6B", "#E7A62B", "#8B5FBF"];

const puzzle = getTodayPuzzle();
const allWords = puzzle.categories.flatMap(cat =>
  cat.words.map(word => ({ word, category: cat.name }))
);
shuffle(allWords);

let selected = [];
let solvedCategories = [];
let triesLeft = MAX_TRIES;
let isChecking = false;

const gridEl = document.getElementById("grid");
const solvedEl = document.getElementById("solved");
const triesEl = document.getElementById("tries");
const submitBtn = document.getElementById("submitBtn");
const messageEl = document.getElementById("message");

let toastTimeout = null;
function showToast(text, persist = false) {
  clearTimeout(toastTimeout);
  messageEl.textContent = text;
  messageEl.classList.add("show");
  if (!persist) {
    toastTimeout = setTimeout(() => messageEl.classList.remove("show"), 1600);
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
 
function categoryColor(catName) {
  const index = puzzle.categories.findIndex(c => c.name === catName);
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
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

  submitBtn.disabled = selected.length !== 4 || isChecking;
}

function toggleWord(word) {
  if (isChecking) return;
  if (selected.includes(word)) {
    selected = selected.filter(w => w !== word);
  } else if (selected.length < 4) {
    selected = [...selected, word];
  }
  render();
}

function submit() {
  if (isChecking || selected.length !== 4) return;

  const categoryOfSelected = allWords.find(w => w.word === selected[0]).category;
  const isMatch = selected.every(word =>
    allWords.find(w => w.word === word).category === categoryOfSelected
  );

  isChecking = true;
  submitBtn.disabled = true;

 
  if (isMatch) {
    playCorrect(categoryOfSelected);
  } else {
    playWrong(categoryOfSelected);
  }
}
 
function playCorrect(categoryOfSelected) {
  const color = categoryColor(categoryOfSelected);
  const tiles = getSelectedTiles();
  tiles.forEach(tile => {
    tile.style.background = color;
    tile.style.borderColor = color;
    tile.style.color = "#fff";
    tile.classList.add("correct-flash");
  });
  showToast("¡Correcto!");
 
  setTimeout(() => {
    solvedCategories.push(categoryOfSelected);
    selected = [];
    isChecking = false;
    renderSolved();
    render();
 
    if (solvedCategories.length === puzzle.categories.length) {
      showToast("¡Ganaste! Resolviste las cuatro categorías.", true);
      submitBtn.disabled = true;
    }
  }, 500);
}
 
function playWrong(categoryOfSelected) {
  const oneAway = isOneAway();
  const tiles = getSelectedTiles();
  tiles.forEach(tile => tile.classList.add("shake", "wrong"));
 
  showToast(oneAway ? "Solo falta una..." : "No es esa combinación.");
 
  setTimeout(() => {
    triesLeft -= 1;
    selected = [];
    isChecking = false;
 
    if (triesLeft === 0) {
      revealAll();
      showToast("Se acabaron los intentos. Estas eran las categorías.", true);
      submitBtn.disabled = true;
    } else {
      render();
    }
  }, 500);
}
 
function isOneAway() {
  const counts = {};
  selected.forEach(word => {
    const cat = allWords.find(w => w.word === word).category;
    counts[cat] = (counts[cat] || 0) + 1;
  });
  return Object.values(counts).some(count => count === 3);
}
 
function getSelectedTiles() {
  return Array.from(gridEl.querySelectorAll(".tile.selected"));
}
 
function renderSolved() {
  solvedEl.innerHTML = "";
  solvedCategories.forEach(catName => {
    const cat = puzzle.categories.find(c => c.name === catName);
    const row = document.createElement("div");
    row.className = "solved-row";
    row.style.background = categoryColor(catName);
    row.style.color = "#fff";
    row.innerHTML = `<div class="cat-name">${cat.name}</div><div class="cat-words">${cat.words.join(" · ")}</div>`;
    solvedEl.appendChild(row);
  });
}
 
function revealAll() {
  solvedCategories = puzzle.categories.map(c => c.name);
  renderSolved();
  render();
}
 
function resetSelection() {
  if (isChecking) return;
  selected = [];
  render();
}

function reshuffleTiles() {
  if (isChecking) return;
  shuffle(allWords);
  render();
}
const howToPlay = document.getElementById("howToPlay");
howToPlay.classList.add("show");
document.getElementById("closeHowToPlay").addEventListener("click", () => howToPlay.classList.remove("show"));
document.getElementById("closeHowToPlayX").addEventListener("click", () => howToPlay.classList.remove("show"));
document.getElementById("openHowToPlay").addEventListener("click", () => howToPlay.classList.add("show"));

submitBtn.addEventListener("click", submit);
document.getElementById("resetBtn").addEventListener("click", resetSelection);
document.getElementById("shuffleBtn").addEventListener("click", reshuffleTiles);
render();
