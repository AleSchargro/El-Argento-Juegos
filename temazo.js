const answer = getTodayAnswer();
const DURATIONS = [0.1, 0.5, 1, 2, 5, 15];
const MAX_TRIES = DURATIONS.length;

let triesUsed = 0;
let won = false;
let revealed = false;
let trackData = null;
const guessedTitles = new Set();

const playBtn = document.getElementById("playBtn");
const durationLabel = document.getElementById("durationLabel");
const triesEl = document.getElementById("tries");
const input = document.getElementById("guessInput");
const btn = document.getElementById("guessBtn");
const skipBtn = document.getElementById("skipBtn");
const autocompleteList = document.getElementById("autocompleteList");
const historyEl = document.getElementById("guessHistory");
const revealEl = document.getElementById("reveal");
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

function renderTries() {
  triesEl.innerHTML = "";
  for (let i = 0; i < MAX_TRIES; i++) {
    const dot = document.createElement("div");
    dot.className = "try-dot" + (i < triesUsed ? " used" : "");
    triesEl.appendChild(dot);
  }
}

function updateDurationLabel() {
  durationLabel.textContent = DURATIONS[triesUsed] + " seg";
}

renderTries();
updateDurationLabel();

function deezerSearch(query, callback) {
  const cbName = "dzCallback_" + Date.now();
  const script = document.createElement("script");
  window[cbName] = function (data) {
    callback(data);
    delete window[cbName];
    script.remove();
  };
  script.src = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp&callback=${cbName}`;
  script.onerror = () => showToast("No se pudo cargar la canción de hoy.", true);
  document.body.appendChild(script);
}

deezerSearch(`${answer.title} ${answer.artist}`, data => {
  if (data && data.data && data.data.length > 0) {
    trackData = data.data[0];
    playBtn.disabled = false;
  } else {
    showToast("No se encontró el audio de hoy.", true);
  }
});

const audio = new Audio();
let stopTimeout = null;

function updatePlayButton() {
  playBtn.textContent = audio.paused ? "▶" : "■";
  playBtn.classList.toggle("playing", !audio.paused);
}
audio.addEventListener("play", updatePlayButton);
audio.addEventListener("pause", updatePlayButton);

function playSnippet() {
  if (!trackData) return;

  if (!audio.paused) {
    audio.pause();
    clearTimeout(stopTimeout);
    return;
  }

  clearTimeout(stopTimeout);
  audio.src = trackData.preview;
  audio.currentTime = 0;
  audio.play();
  const seconds = revealed ? 30 : DURATIONS[triesUsed];
  stopTimeout = setTimeout(() => audio.pause(), seconds * 1000);
}

playBtn.addEventListener("click", playSnippet);

function normalize(str) {
  return str.trim().toLowerCase();
}

function searchKey(str) {
  return normalize(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function findCancion(title) {
  return CANCIONES.find(c => normalize(c.title) === normalize(title));
}

function addHistoryRow(title, correct, skipped = false) {
  const row = document.createElement("div");
  row.className = "song-row" + (correct ? " correct" : "") + (skipped ? " skipped" : "");
  row.textContent = title;
  historyEl.prepend(row);
}

function revealAnswer(correct) {
  revealed = true;
  renderTries();
  input.disabled = true;
  btn.disabled = true;
  skipBtn.disabled = true;
  revealEl.style.display = "block";
  revealEl.innerHTML = `
    <p class="reveal-title">${answer.title}</p>
    <p class="reveal-artist">${answer.artist}</p>
    ${trackData ? `<a class="back-link" href="${trackData.link}" target="_blank" rel="noopener">Escuchar completa en Deezer →</a>` : ""}
  `;
  showToast(correct ? "¡Correcto!" : `Era "${answer.title}" de ${answer.artist}.`, true);
  if (!audio.paused) audio.pause();
  clearTimeout(stopTimeout);
  audio.src = trackData ? trackData.preview : "";
  audio.currentTime = 0;
  audio.play();
}

function submitGuess() {
  if (won || triesUsed >= MAX_TRIES) return;
  const raw = input.value;
  if (!raw.trim()) return;

  const cancion = findCancion(raw);
  if (!cancion) {
    showToast("Ese título no está en la lista.");
    return;
  }
  if (guessedTitles.has(normalize(cancion.title))) {
    showToast("Ya probaste ese título.");
    return;
  }
  guessedTitles.add(normalize(cancion.title));

  if (normalize(cancion.title) === normalize(answer.title)) {
    won = true;
    addHistoryRow(cancion.title, true);
    revealAnswer(true);
  } else {
    triesUsed++;
    addHistoryRow(cancion.title, false);
    input.value = "";
    autocompleteList.classList.remove("show");

    if (triesUsed >= MAX_TRIES) {
      revealAnswer(false);
    } else {
      renderTries();
      updateDurationLabel();
      showToast("No es esa. Escuchá un poco más.");
    }
  }
}

function skipGuess() {
  if (won || triesUsed >= MAX_TRIES) return;
  triesUsed++;
  addHistoryRow("— Salteado —", false, true);

  if (triesUsed >= MAX_TRIES) {
    revealAnswer(false);
  } else {
    renderTries();
    updateDurationLabel();
    showToast("Salteado.");
  }
}

input.addEventListener("input", () => {
  const query = searchKey(input.value);
  autocompleteList.innerHTML = "";
  if (!query) {
    autocompleteList.classList.remove("show");
    return;
  }
  const matches = CANCIONES.filter(c => searchKey(c.title).includes(query)).slice(0, 6);
  if (matches.length === 0) {
    autocompleteList.classList.remove("show");
    return;
  }
  matches.forEach(c => {
    const item = document.createElement("div");
    item.className = "autocomplete-item";
    item.textContent = c.title;
    item.addEventListener("mousedown", e => {
      e.preventDefault();
      input.value = c.title;
      autocompleteList.classList.remove("show");
      submitGuess();
    });
    autocompleteList.appendChild(item);
  });
  autocompleteList.classList.add("show");
});

input.addEventListener("blur", () => {
  setTimeout(() => autocompleteList.classList.remove("show"), 100);
});

btn.addEventListener("click", submitGuess);
skipBtn.addEventListener("click", skipGuess);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") submitGuess();
});