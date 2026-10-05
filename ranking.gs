/* =====================================================
   Pasapalabra Bio — Ranking del cole
   Pegar este código completo en Extensiones →
   Apps Script, dentro de tu planilla
   "Pasapalabra Bio — Participación".
   Ver instrucciones_ranking.md para el paso a paso.
   ===================================================== */

const SHEET = "partidas";   // nombre de la pestaña donde se guardan las marcas

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(SHEET);
  if (!s) s = ss.insertSheet(SHEET);
  if (s.getLastRow() === 0) {
    s.appendRow(["fecha", "nombre", "seccion", "avatar", "modo",
                 "aciertos", "errores", "pasadas", "total",
                 "porcentaje", "tiempo_seg", "inicio"]);
  }
  return s;
}

/* El juego llama a esto cada vez que termina una partida */
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  sheet_().appendRow([
    new Date(),
    String(d.nombre || "").slice(0, 40),
    String(d.seccion || "").slice(0, 20),
    Math.max(0, Math.min(9, +d.avatar || 0)),
    String(d.modo || "").slice(0, 20),
    Math.max(0, Math.min(99, +d.aciertos || 0)),
    Math.max(0, Math.min(99, +d.errores || 0)),
    Math.max(0, Math.min(99, +d.pasadas || 0)),
    +d.total || 24,
    Math.max(0, Math.min(100, +d.porcentaje || 0)),
    d.tiempo_seg === "" || d.tiempo_seg === undefined ? "" : Math.max(0, +d.tiempo_seg || 0),
    String(d.inicio || "").slice(0, 4)
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

/* Normaliza nombre/sección para juntar al mismo estudiante
   aunque lo escriba con mayúsculas, tildes o espacios distintos */
function norma_(s) {
  return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/\s+/g, " ").trim();
}

/* El juego llama a esto para leer el ranking.
   Suma los aciertos de TODAS las partidas de cada estudiante
   (premia la constancia); en empate gana quien jugó menos partidas.
   Columnas: A fecha · B nombre · C seccion · D avatar · E modo ·
             F aciertos · G errores · H pasadas · I total ·
             J porcentaje · K tiempo_seg · L inicio              */
function doGet(e) {
  const top = Math.min(+(e && e.parameter && e.parameter.top || 15), 200);
  const filas = sheet_().getDataRange().getValues().slice(1);
  const acumulados = {};
  filas.forEach(r => {
    const clave = norma_(r[1]) + "|" + norma_(r[2]);
    if (!acumulados[clave]) {
      acumulados[clave] = { nombre: String(r[1]), seccion: String(r[2]), aciertos: 0, total: +r[8] || 24, partidas: 0, avatar: +r[3] || 0 };
    }
    acumulados[clave].partidas++;
    acumulados[clave].aciertos += +r[5] || 0;
    acumulados[clave].total = +r[8] || 24;
  });
  const lista = Object.values(acumulados)
    .sort((a, b) => b.aciertos - a.aciertos || a.partidas - b.partidas)
    .slice(0, top);
  return ContentService
    .createTextOutput(JSON.stringify(lista))
    .setMimeType(ContentService.MimeType.JSON);
}
