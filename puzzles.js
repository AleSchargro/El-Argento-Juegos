// Acá vive la data de cada acertijo de Conexiones, uno por fecha.
// Para agregar el de mañana: copiá un bloque, cambiá la fecha (formato YYYY-MM-DD)
// y las 4 categorías con sus 4 palabras. Nada más hay que tocar.

const PUZZLES = {
  "2026-09-04": {
    categories: [
      { name: "Clásicos del fútbol", words: ["RIVER", "BOCA", "RACING", "INDEPENDIENTE"] },
      { name: "Comida de domingo", words: ["ASADO", "LOCRO", "EMPANADA", "MILANESA"] },
      { name: "Provincias del norte", words: ["SALTA", "CHACO", "FORMOSA", "MISIONES"] },
      { name: "Cosas que se toman", words: ["MATE", "FERNET", "TERMO", "SODA"] }
    ]
  },
  "2026-09-05": {
    categories: [
      { name: "Tu categoría 1", words: ["A", "B", "C", "D"] },
      { name: "Tu categoría 2", words: ["A", "B", "C", "D"] },
      { name: "Tu categoría 3", words: ["A", "B", "C", "D"] },
      { name: "Tu categoría 4", words: ["A", "B", "C", "D"] }
    ]
  }
};

// Placeholder que se usa si todavía no cargaste el acertijo del día de hoy.
const FALLBACK_PUZZLE = PUZZLES["2026-09-04"];

function getTodayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getTodayPuzzle() {
  return PUZZLES[getTodayKey()] || FALLBACK_PUZZLE;
}
