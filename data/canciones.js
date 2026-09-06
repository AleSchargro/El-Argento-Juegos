// Catálogo de temas para "Temazo". El título y artista se usan para
// buscar el tema en la API pública de Deezer (que da el fragmento de
// 30 segundos), así que tienen que estar bien escritos para que
// encuentre el tema correcto.
// Para sumar uno nuevo: agregalo a CANCIONES y, si querés que sea la
// respuesta de algún día, sumalo también a ANSWER_SCHEDULE.

const CANCIONES = [
  { title: "De Música Ligera", artist: "Soda Stereo" },
  { title: "Persiana Americana", artist: "Soda Stereo" },
  { title: "Matador", artist: "Los Fabulosos Cadillacs" },
  { title: "Un Vestido y Un Amor", artist: "Fito Páez" },
  { title: "Los Dinosaurios", artist: "Charly García" },
  { title: "Rasguña las Piedras", artist: "Sui Generis" },
  { title: "Muchacha (Ojos de Papel)", artist: "Almendra" },
  { title: "Sr. Cobranza", artist: "Bersuit Vergarabat" },
  { title: "El Arriero", artist: "Divididos" },
  { title: "El Momento En Que Estás (Presente)", artist: "Vox Dei" },
  { title: "Verano del 92", artist: "Los Piojos" },
  { title: "Flaca", artist: "Andrés Calamaro" },
  { title: "Adiós", artist: "Gustavo Cerati" },
  { title: "Don", artist: "Miranda!" },
  { title: "La Melodía de Dios", artist: "Tan Biónica" },
  { title: "Como Puedo Ser Feliz", artist: "Airbag" },
  { title: "Deléctrico", artist: "Babasónicos" },
  { title: "Se Le Ve", artist: "Kapanga" },
  { title: "Botija", artist: "Callejeros" },
  { title: "Volver", artist: "Carlos Gardel" },
  { title: "Ji Ji Ji", artist: "Patricio Rey y sus Redonditos de Ricota" },
  { title: "Seguir Viviendo Sin Tu Amor", artist: "Luis Alberto Spinetta" },
  { title: "Seminare", artist: "Serú Girán" },
  { title: "Balada del Diablo y la Muerte", artist: "La Renga" },
  { title: "La Argentinidad al Palo", artist: "Bersuit Vergarabat" },
  { title: "Hoy Como Ayer", artist: "Attaque 77" },
  { title: "Amor Days", artist: "Catupecu Machu" },
  { title: "Ella", artist: "Intoxicados" },
  { title: "Que Ganas de No Verte Nunca Más", artist: "Turf" },
  { title: "Prisionero", artist: "Miranda!" },
  { title: "Ciudad Mágica", artist: "Tan Biónica" },
  { title: "Bombón Asesino", artist: "Bandana" },
  { title: "La Mano de Dios", artist: "Rodrigo" },
  { title: "Que Nos Miren", artist: "La Konga" },
  { title: "Mete Pausa", artist: "Damas Gratis" },
  { title: "Ya No Vuelvas", artist: "Ke Personajes" },
  { title: "Goteo", artist: "Duki" },
  { title: "Adán y Eva", artist: "Paulo Londra" },
  { title: "Wapo Traketero", artist: "Nicki Nicole" },
  { title: "Tierra Zanta", artist: "Trueno" },
  { title: "Ojos Rojos", artist: "CA7RIEL y Paco Amoroso" },
  { title: "Rebota", artist: "Emilia Mernes" },
  { title: "Canguro", artist: "Wos" },
  { title: "Gigante", artist: "Airbag" },
  { title: "Mi Buenos Aires Querido", artist: "Carlos Gardel" },
  { title: "Por una Cabeza", artist: "Carlos Gardel" },
  { title: "Uno", artist: "Enrique Santos Discépolo" },
  { title: "Balada para un Loco", artist: "Astor Piazzolla" },
  { title: "Zamba de mi Esperanza", artist: "Jorge Cafrune" },
  { title: "Luna Tucumana", artist: "Mercedes Sosa" },
  { title: "Alfonsina y el Mar", artist: "Mercedes Sosa" },
  { title: "Blues de la Artillería", artist: "Pescado Rabioso" },
  { title: "Yo Vengo a Ofrecer mi Corazón", artist: "Fito Páez" },
  { title: "Solo le Pido a Dios", artist: "León Gieco" },
  { title: "No Voy en Tren", artist: "Andrés Calamaro" },
  { title: "Y Nada Más", artist: "Vicentico" },
  { title: "Ella Vino", artist: "Enanitos Verdes" },
  { title: "Lo Que Ves Es Lo Que Hay", artist: "Divididos" },
  { title: "Tirá para Arriba", artist: "Los Piojos" },
  { title: "Maribel Se Durmió", artist: "Los Piojos" },
  { title: "Un Poco de Sangre", artist: "Callejeros" },
  { title: "Ella Es Tan Bailanta", artist: "Damas Gratis" },
  { title: "El Extranjero", artist: "La Konga" },
  { title: "En la Ciudad de la Furia", artist: "Soda Stereo" },
  { title: "Trátame Suavemente", artist: "Soda Stereo" },
  { title: "No Bombardeen Buenos Aires", artist: "Charly García" },
  { title: "Loco (Tu Forma de Ser)", artist: "Andrés Calamaro" },
  { title: "Va a Estar Bueno", artist: "Illya Kuryaki and the Valderramas" },
  { title: "Irresponsables", artist: "Babasónicos" },
  { title: "Otra Epoca", artist: "Attaque 77" },
  { title: "Buena Suerte", artist: "Kapanga" },
  { title: "Loco un Poco", artist: "Turf" },
  { title: "Chica de Ojos Tristes", artist: "El Mató a un Policía Motorizado" },
  { title: "Corazón Cobarde", artist: "Usted Señálemelo" },
  { title: "Elvis", artist: "Bandalos Chinos" },
  { title: "El Fantasma de la Buena Onda", artist: "Conociendo Rusia" },
  { title: "Down With My Baby", artist: "Kevin Johansen" },
  { title: "Río Manso", artist: "Chaqueño Palavecino" },
  { title: "Para Cantarle a mi Gente", artist: "Los Nocheros" },
  { title: "Amor de Telenovela", artist: "Ulises Bueno" },
  { title: "Soy Cordobés", artist: "Rodrigo" },
  { title: "Dime", artist: "Marama" },
  { title: "Cerquita de Vos", artist: "La Konga" },
  { title: "El Amor de Su Vida", artist: "Ke Personajes" },
  { title: "Una Noche en Miami", artist: "FMK" },
  { title: "Nena Trampa", artist: "Cazzu" },
  { title: "Colocao", artist: "Nicki Nicole" },
  { title: "Dance Crip", artist: "Trueno" },
  { title: "Diablo", artist: "Wos" },
  { title: "Malbec", artist: "Bhavi" },
  { title: "Como Si No Importara", artist: "Emilia" }
];

const ANSWER_SCHEDULE = {
  "2026-09-05": "De Música Ligera",
  "2026-09-06": "Matador",
  "2026-09-07": "Un Vestido y Un Amor",
  "2026-09-08": "Los Dinosaurios",
  "2026-09-09": "Rasguña las Piedras",
  "2026-09-10": "Muchacha (Ojos de Papel)",
  "2026-09-11": "Sr. Cobranza",
  "2026-09-12": "El Arriero",
  "2026-09-13": "El Extraño de Pelo Largo",
  "2026-09-14": "Verano del 92",
  "2026-09-15": "Flaca",
  "2026-09-16": "Adiós",
  "2026-09-17": "Don",
  "2026-09-18": "La Melodía de Dios",
  "2026-09-19": "Como Puedo Ser Feliz"
};

const FALLBACK_CANCION_TITLE = "De Música Ligera";

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

function getTodayAnswer() {
  const key = getTodayKey();
  const title = ANSWER_SCHEDULE[key] || FALLBACK_CANCION_TITLE;
  return CANCIONES.find(c => c.title === title);
}