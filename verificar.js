function normalize(str) {
  return str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function deezerSearch(query, callback) {
  const cbName = "dzCallback_" + Date.now() + Math.random().toString(36).slice(2);
  const script = document.createElement("script");
  window[cbName] = function (data) {
    callback(data);
    delete window[cbName];
    script.remove();
  };
  script.src = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp&callback=${cbName}`;
  script.onerror = () => callback(null);
  document.body.appendChild(script);
}

const tbody = document.getElementById("resultsBody");
let index = 0;

function checkNext() {
  if (index >= CANCIONES.length) return;
  const c = CANCIONES[index];

  deezerSearch(`${c.title} ${c.artist}`, data => {
    const row = document.createElement("tr");

    if (data && data.data && data.data.length > 0) {
      const track = data.data[0];
      const titleMatch = normalize(track.title).includes(normalize(c.title)) || normalize(c.title).includes(normalize(track.title));
      const artistMatch = normalize(track.artist.name).includes(normalize(c.artist)) || normalize(c.artist).includes(normalize(track.artist.name));
      const ok = titleMatch && artistMatch;

      row.innerHTML = `
        <td style="padding:6px;border-bottom:1px solid var(--paper-line);">${c.title} — ${c.artist}</td>
        <td style="padding:6px;border-bottom:1px solid var(--paper-line);">${track.title} — ${track.artist.name}</td>
        <td style="padding:6px;border-bottom:1px solid var(--paper-line);text-align:center;">${ok ? "✅" : "⚠️"}</td>
        <td style="padding:6px;border-bottom:1px solid var(--paper-line);text-align:center;"><audio controls src="${track.preview}" style="height:28px;"></audio></td>
      `;
    } else {
      row.innerHTML = `
        <td style="padding:6px;border-bottom:1px solid var(--paper-line);">${c.title} — ${c.artist}</td>
        <td style="padding:6px;border-bottom:1px solid var(--paper-line);" colspan="3">❌ No se encontró nada en Deezer</td>
      `;
    }

    tbody.appendChild(row);
    index++;
    setTimeout(checkNext, 300);
  });
}

checkNext();