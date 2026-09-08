// Acá vive la data de cada acertijo de Conexiones, uno por fecha.
// Para agregar el de mañana: copiá un bloque, cambiá la fecha (formato YYYY-MM-DD)
// y las 4 categorías con sus 4 palabras. Nada más hay que tocar.

const PUZZLES = {
  "2026-09-04": {
    categories: [
      { name: "Si estás leyendo esto, avisale a Alejo!", words: ["PRUEBA 1", "PRUEBA 2", "PRUEBA 3", "PRUEBA 4"] },
      { name: "Categoría Prueba 2", words: ["PRUEBA 5", "PRUEBA 6", "PRUEBA 7", "PRUEBA 8"] },
      { name: "Categoría Prueba 3", words: ["PRUEBA 9", "PRUEBA 10", "PRUEBA 11", "PRUEBA 12"] },
      { name: "Categoría Prueba 4", words: ["PRUEBA 13", "PRUEBA 14", "PRUEBA 15", "PRUEBA 16"] }
    ]
  },
  "2026-09-05": {
    categories: [
      { name: "Apodos de personajes de OKUPAS", words: ["Mulo", "Chiqui", "Negro", "Pollo"] },
      { name: "Canciones de Charly García", words: ["Mientes", "Vampiro", "Intuición", "Lluvia"] },
      { name: "Apodos de presidentes Argentinos", words: ["Zorro", "Viejo", "Chupete", "Pingüino"] },
      { name: "Apellidos de personajes interpretados por Guillermo Francella", words: ["Basurto", "Argento", "Guerrero", "Scarpelli"] }
    ]
  },
  "2026-09-06": {
    categories: [
      { name: "Canciones de 'Los Piojos'", words: ["Tan Solo", "El Farolito", "Ruleta", "Civilización"] },
      { name: "Ciudades de Santa Fé", words: ["Rosario", "Rafaela", "San Lorenzo", "Santo Tomé"] },
      { name: "Teatros", words: ["Opera", "Metropolitan", "Astros", "Colón"] },
      { name: "Golondrina ____", words: ["Doméstica", "Ceja Blanca", "Barranquera", "Patagónica"] }
    ]
  },
  "2026-09-07": {
    categories: [
      { name: "Juegos tradicionales", words: ["TEG", "Estanciero", "Truco", "Sapo"] },
      { name: "Golosinas tradicionales", words: ["Alfajor", "Turrón", "Rhodesia", "DRF"] },
      { name: "Elementos típicos de gaucho", words: ["Poncho", "Rebenque", "Guitarra", "Rastra"] },
      { name: "Nombre de cantantes de Tango", words: ["Tita", "Roberto", "Carlos", "Anibal"] }
    ]
  },
  "2026-09-08": {
    categories: [
      { name: "Del lunfardo", words: ["Baranda", "Berreta", "Minga", "Macana"] },
      { name: "Profesional del derecho", words: ["Jurista", "Legista", "Letrado", "Defensor"] },
      { name: "Que aparecen en una carta", words: ["Ñoquis", "Ensalada Caesar", "Firma", "Destinatario"] },
      { name: "Preposición + Corte de carne", words: ["Sobre Vacío", "Contra Bife", "Vía Lomo", "Hasta Falda"] }
    ]
  },
  "2026-09-09": {
    categories: [
      { name: "Si estás leyendo esto, avisale a Alejo!", words: ["PRUEBA 1", "PRUEBA 2", "PRUEBA 3", "PRUEBA 4"] },
      { name: "Categoría Prueba 2", words: ["PRUEBA 5", "PRUEBA 6", "PRUEBA 7", "PRUEBA 8"] },
      { name: "Categoría Prueba 3", words: ["PRUEBA 9", "PRUEBA 10", "PRUEBA 11", "PRUEBA 12"] },
      { name: "Categoría Prueba 4", words: ["PRUEBA 13", "PRUEBA 14", "PRUEBA 15", "PRUEBA 16"] }
    ]
  },
  "2026-09-10": {
    categories: [
      { name: "Si estás leyendo esto, avisale a Alejo!", words: ["PRUEBA 1", "PRUEBA 2", "PRUEBA 3", "PRUEBA 4"] },
      { name: "Categoría Prueba 2", words: ["PRUEBA 5", "PRUEBA 6", "PRUEBA 7", "PRUEBA 8"] },
      { name: "Categoría Prueba 3", words: ["PRUEBA 9", "PRUEBA 10", "PRUEBA 11", "PRUEBA 12"] },
      { name: "Categoría Prueba 4", words: ["PRUEBA 13", "PRUEBA 14", "PRUEBA 15", "PRUEBA 16"] }
    ]
  }
};

// Placeholder que se usa si todavía no cargaste el acertijo del día de hoy.
const FALLBACK_PUZZLE = PUZZLES["2026-09-04"];

function getTodayKey() {
  const params = new URLSearchParams(window.location.search);
  const override = params.get("fecha");
  if (override) return override;

  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getTodayPuzzle() {
  return PUZZLES[getTodayKey()] || FALLBACK_PUZZLE;
}
