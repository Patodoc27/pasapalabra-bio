# PROMPT — Juego "Pasapalabra" educativo (rosco de letras)

> Instrucciones para quien construya el juego (persona o IA): recreá esta actividad completa en **UN SOLO archivo HTML** (HTML + CSS + JS inline, sin frameworks, sin build, sin dependencias salvo Google Fonts). Debe funcionar igual servido por HTTP (GitHub Pages) que abierto como archivo local.
>
> **Lo que cada docente personaliza:** la asignatura (el título siempre dice "Pasapalabra" en grande y debajo "de <asignatura>": "Pasapalabra de Biología", "Pasapalabra de Historia", "Pasapalabra de Matemática"…), el logo/mascota, el cartel del título, los avatares, las frases del globito, las secciones del curso (cuántas y cómo se llaman: puede ser 1 sola, o 2, 3, 4 según la escuela del docente), la paleta de colores y **todo el banco de consignas** (sus propias palabras, pistas y definiciones). El resto — mecánica, pantallas, animaciones, sonidos, voz, Boti y ranking — queda igual que en esta especificación.

---

## 1. Concepto del juego

Pasapalabra/rosco para la clase, de cualquier asignatura: el cartel muestra la palabra "Pasapalabra" como título principal y debajo el nombre de la materia que indica el docente. Un anillo de letras; en cada turno se muestra una consigna ("Empieza por la letra X" o "Contiene la letra X") más una definición. El jugador responde, o dice "Pasapalabra" para dejar la letra pendiente. Juegan **dos estudiantes compartiendo teclado** o **un estudiante contra Boti** (rival automático). Con reloj (modo competencia, va al ranking) o sin reloj (modo práctica, no se asienta).

## 2. Pantallas y flujo

1. **Inicio** (`p-inicio`): cabecera con logo circular + globito que habla + cartel con el nombre del juego; formulario (nombre y apellido, avatar, sección, modo: de a dos / contra Boti, con o sin reloj, ambiente claro/oscuro); mini-rosco decorativo girando; reglas del juego abiertas por defecto (plegables); ranking "Mejores del cole" con los 6 primeros; línea de créditos.
2. **Cuenta regresiva** (`p-cuenta`): tarjeta a pantalla completa, números gigantes 3 · 2 · 1 · "¡YA!".
3. **Juego** (`p-juego`): el tablero. Ver §4.
4. **Final** (`p-final`): puntaje total animado, veredicto, duelo (tarjetas por jugador), botones Volver a jugar / Ver ranking / Inicio.
5. **Ranking por sección** (`p-ranking`): una columna por cada sección configurada, con TODOS los estudiantes con marca (no se corta en top N).

Transición Inicio→Cuenta→Juego sin cambios de tamaño: **las tarjetas de cuenta y juego ocupan toda la pantalla** (`min-height: 100vh - 40px`, con `100dvh` como override; el respaldo `vh` es obligatorio porque navegadores viejos ignoran `dvh`).

## 3. Mecánica exacta

- **Letras**: el rosco original usa 24 letras — `A B C D E F G H I J L M N Ñ O P Q R S T U V X Y` (sin K ni W ni Z). Un docente puede definir su propio set según su banco.
- **Sorteo del rosco**: por cada letra se elige UNA entrada al azar de su sub-lista en el banco → cada partida tiene consignas distintas.
- **Letra inicial**: sortear entre `ARRANQUES = [13,3,21,8,18,1,15,6,23,11]` (10 arranques salteados por todo el anillo, patrón irregular para que no sean previsibles); no repetir rosco hasta agotarlos.
- **Quién empieza**: moneda al aire real (`Math.random()*2`), NUNCA fijo.
- **Turno**: la consigna y definición aparecen en el centro del rosco; la letra activa se agranda y brilla con el color del jugador en turno (jugador 1 = turquesa, jugador 2 = azul).
- **Responder**: Enter o botón Responder. Estados de letra: acierto (color del jugador), error (magenta), pasada (periwinkle), pendiente. Las pasadas/erradas se reintentan cuando el anillo da la vuelta.
- **Pasapalabra**: botón "↻ Pasapalabra" o tecla Esc. No se puede pasar la última letra pendiente.
- **Validación**: `limpio()` respeta tildes/ñ y tolera artículo inicial (el/la/los/las/un/una); `pelado()` ignora tildes para detectar el "casi" (respuesta correcta mal acentuada → feedback "¡Casi! Se escribe …").
- **Aceptadas**: cada entrada admite `v` (variantes) — plurales, género, sinónimos.
- **Reloj**: 6 minutos compartidos; si se acaba, termina la partida. Sin reloj = práctica.
- **Racha**: 3+ aciertos seguidos del mismo jugador → badge "🔥 N" junto a su nombre y texto "¡Racha de N! 🔥" en el feedback.
- **Fin**: al cerrar las 24 letras o agotarse el reloj → pantalla final; si un estudiante le ganó a Boti → lluvia de confetti (~120 papelitos que caen y desaparecen).
- **Repaso ("Practicar las que costaron")**: en la pantalla final aparece un botón que relanza un rosco corto solo con las letras erradas/pasadas (`items = pendientesRepaso`), sin reloj, etiquetado "Repaso · N conceptos", arrancando por quien menos aportó. **El repaso NO es una partida: no se envía a la planilla ni suma aciertos al ranking** (misma regla que el modo práctica).

## 4. Tablero (pantalla de juego)

Tarjeta a pantalla completa, padding `clamp(12px,1.7vw,24px)`, `overflow:hidden`, columna flex:

- **Barra superior**: cápsula con avatar + nombre del jugador en turno (punto brillante del color del jugador) · "N cerradas · M por jugar" con riel de progreso segmentado · a la derecha 4 iconos de 54px en cuadrados de 14px de radio, cada uno con su color (`--c`): ambiente (luna, violeta), sonido (🔊, azul), lectura en voz alta (🗣️, turquesa), menú (⋮, magenta). Debajo, una línea divisoria.
- **Tablero** (flex horizontal, ocupa el alto restante `flex:1`):
  - Un **espaciador invisible** a la izquierda del mismo ancho que la columna lateral (`clamp(150px,15vw,210px)`) — así el rosco queda centrado entre la mascota y los botones, no en el medio de la ventana.
  - **Rosco** centrado: caja cuadrada `width: min(65vh, 700px)`, letras en un anillo (círculos del 11.4% de la caja posicionados con `translate(-50%,-50%)` sobre el perímetro). Anillo punteado decorativo. En pantallas bajas (`max-height:700px`) el rosco baja a `60vh` y las burbujas a 54px: **nunca debe aparecer barra de scroll**.
  - **Centro del rosco**: consigna en píldora turquesa (ej. "EMPIEZA POR O" / "CONTIENE LA J"), debajo la definición en dos líneas, debajo input "TU RESPUESTA" + botón Responder.
  - **Columna lateral** derecha (`clamp(150px,15vw,210px)`): burbujas circulares RELOJ (turquesa, tiempo restante), ACIERTOS (celeste), FALLADAS (magenta), RESTANTES (azul oscuro) — `clamp(52px,5vw,68px)` — luego caja de feedback (✓ respuesta correcta, ✗ error con la respuesta correcta en pastilla, o marca de pasada), botón "↻ Pasapalabra" y pista de teclado "Enter responde · Esc pasa".
  - **Mascota**: patito/ilustración circular ~150px abajo a la izquierda, con globito de diálogo para sus frases contextuales (acierto, error, pasada).
- **Overlay de turno**: difumina el tablero (`backdrop-filter: blur`), muestra "✓ PALABRA" del acierto previo, avatar grande, nombre del siguiente jugador y subtítulo:
  - **De a dos**: "Preparate para empezar" (arranque) / "Pasale el teclado", con botón "Listo, continuar".
  - **Contra Boti**: SIN botón — muestra "Tu turno" o "Le toca a Boti" ~1.1 segundos y continúa solo. No interrumpir el ritmo.

## 5. Boti (rival automático)

- Nombre visible "Boti", avatar de robot/pato propio.
- Por partida sortea su nivel sin avisar: acierta el 95%, 85%, 80% o 75% de sus consignas.
- Pasa el 12% de las veces y nunca encadena más de 3 aciertos seguidos (corta la racha fallando).
- **Tiempo**: empieza a "pensar" apenas aparece su consigna; piensa ~6 s (6000–7200 ms). Si la voz está activada, ESCRIBE recién cuando termina de leerse la definición — el timer corre en paralelo, así no se duplica la espera.
- Escribe su respuesta tipeando letra por letra en el campo (efecto máquina de escribir), luego resuelve.

## 6. Voz y sonido (ambos prendidos por defecto; el estudiante los apaga con los botones)

- **Dictado TTS** (`speechSynthesis`, voz es-ES/es-AR): lee primero la consigna — "Empieza por la letra eme" — usando el **nombre de la letra**, nunca la letra suelta (si no, V suena "quinta", X "décima", Q "ciu"). Mapa: `A a · B be · C ce · D de · E e · F efe · G ge · H hache · I i · J jota · L ele · M eme · N ene · Ñ eñe · O o · P pe · Q cú · R ere · S ese · T te · U u · V uve · X equis · Y i griega`. Pausa de ~2.2 s y después lee la definición.
- **Bloqueo hasta escuchar**: el input y los botones se habilitan recién cuando la voz termina la definición (evento `onend`/`onerror` + temporizador de respaldo `min(len×110ms + 5s, 18s)`). Con la voz apagada, se habilita al instante — cada estudiante lee a su velocidad.
- **Sonidos** (WebAudio, `oscillator`, sin archivos): tono de turno (880→1175 Hz), acierto, error, pasada y pulsos de la cuenta regresiva. Botón 🔊 en la barra.

## 7. Pantalla de inicio (detalles)

- Logo circular (`clamp(140px,14.5vw,196px)`, borde turquesa con halo) + **globito a su derecha** (entre el logo y el cartel) que rota frases cada ~4.6 s sin sonido: "¿Estás listo para jugar?", "¡Elegí tu avatar!", "¿De a dos o contra Boti?", "Leé las reglas del juego", "Sorteá el rosco y a jugar", "Preparate para pensar…", "¡Vos podés!".
- Formulario: "Nombre y apellido" (límite ~28 caracteres), selector de avatar circular, **sección** como botones apilados centrados generados a partir de una lista `SECCIONES` que define el docente (ej. `["1° A","1° B"]`; puede tener una sola entrada o tres, cuatro…; cada botón una división), modo (De a dos / Contra Boti), reloj (Con reloj / Sin reloj = práctica), ambiente (Aula claro / Show oscuro).
- **Avatares exclusivos**: en modo de a dos, el avatar elegido por un jugador queda bloqueado/atenuado para el otro.
- **Jugador recordado**: al apretar Jugar se guarda en `localStorage` (`{nombre, avatar, seccion}`) y se precarga la próxima vez — clave para que en la casa juegue sin reescribir.
- Reglas del juego: `<details>` abierto por defecto.
- Ranking "Mejores del cole": top 6 con 🥇 al 1°, 🥈 al 2° y 🥉 del 3° al 6°; cada fila muestra avatar, nombre, sección, partidas jugadas y aciertos totales. Texto aclaratorio: "Suma los aciertos de todas las partidas jugadas."
- El ranking por sección (pantalla final) arma una columna por cada sección de `SECCIONES`, listando a TODOS los estudiantes con marca de cada una, ordenados como el ranking general.

## 8. Banco de consignas (lo que cada docente reemplaza)

Formato de cada entrada del banco (`POOL`):

```js
{m:E o C,            // E = "empieza por", C = "contiene" la letra
 p:"PALABRA",        // respuesta esperada, en mayúsculas
 v:["variante1"],    // respuestas aceptadas además de p (plurales, sinónimos)
 k:"pista corta",    // opcional, una frase de 3–6 palabras
 d:"Definición literal tal como la dicta el docente. <b>(Dos palabras.)</b>"}
```

Reglas para armar un banco:

- Mínimo 1 entrada por letra del rosco; ideal 2–3 por letra para que el sorteo sea surtido. Si una letra no tiene palabra que empiece, usá `m:C` (contiene).
- **Ninguna palabra en dos letras y ninguna definición repetida** — cada concepto entra una sola vez.
- Definiciones con el vocabulario exacto que vieron los estudiantes; si la respuesta son dos/tres palabras, agregar al final `<b>(Dos palabras.)</b>`.
- Cantidades de referencia del juego original: 83 entradas para 24 letras.

## 9. Identidad visual (personalizable, con los valores originales como referencia)

Todo el color vive en variables CSS `:root` (tema claro "aula", por defecto) y `[data-tema="show"]` (oscuro). Cambiar la paleta = redefinir estas variables en ambos temas:

- Acentos: `--parina` magenta `#E01480`, `--turquesa` `#0A9E96`, `--marca` azul `#0062D6`, `--uva` violeta `#2446C8`, `--sol` periwinkle `#7C9BE8`, `--ambar` `#3D5BC4`. Jugador 1 = `--j1` turquesa, jugador 2 = `--j2` azul.
- Fondos: `--fondo0`/`--fondo1` + tres luces radiales `--au1..3` que derivan en loop de 26 s + trama de puntos `--dots`.
- Tarjeta: `--carta` gradiente, `--borde`, `--sombra`, `--overlay-bg` (velo del overlay).
- Letras del rosco: `--letra-bg`, `--letra-txt`, `--letra-borde`, `--anillo`.
- Tipografías: **Baloo 2** (700/800, display/títulos) y **Nunito** (300–700, cuerpo), desde Google Fonts.
- Ambiente "show" (oscuro): mismas variables con fondos `#060B22`/`#0C1638` y acentos más luminosos.
- Avatares: ilustraciones cuadradas embebidas como `data:image/webp;base64,...` recortadas en círculo; el juego trae ~8 + el de Boti. El docente puede poner los suyos (mismo formato).
- Favicon: el mismo logo embebido como `<link rel="icon" type="image/webp" href="data:...">`.

## 10. Ranking con Google Sheets (cada docente conecta el suyo)

El juego envía cada partida terminada a una planilla del docente y lee el ranking de ahí. Puesta en marcha (5 minutos, sin saber programar):

1. Crear una planilla en Google Sheets.
2. **Extensiones → Apps Script**, pegar este código completo y guardar:

```javascript
const SHEET = "partidas";
function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(SHEET);
  if (!s) s = ss.insertSheet(SHEET);
  if (s.getLastRow() === 0) {
    s.appendRow(["fecha","nombre","seccion","avatar","modo",
                 "aciertos","errores","pasadas","total",
                 "porcentaje","tiempo_seg","inicio"]);
  }
  return s;
}
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  sheet_().appendRow([
    new Date(),
    String(d.nombre||"").slice(0,40), String(d.seccion||"").slice(0,20),
    Math.max(0,Math.min(9,+d.avatar||0)), String(d.modo||"").slice(0,20),
    Math.max(0,Math.min(99,+d.aciertos||0)), Math.max(0,Math.min(99,+d.errores||0)),
    Math.max(0,Math.min(99,+d.pasadas||0)), +d.total||24,
    Math.max(0,Math.min(100,+d.porcentaje||0)),
    d.tiempo_seg===""||d.tiempo_seg===undefined?"":Math.max(0,+d.tiempo_seg||0),
    String(d.inicio||"").slice(0,4)
  ]);
  return ContentService.createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}
function norma_(s) {   // junta al mismo estudiante aunque escriba
  return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/\s+/g, " ").trim();   // distinto: tildes,
}                                                // mayúsculas, espacios
function doGet(e) {
  const top = Math.min(+(e && e.parameter && e.parameter.top || 15), 200);
  const filas = sheet_().getDataRange().getValues().slice(1);
  const acum = {};
  filas.forEach(r => {
    const k = norma_(r[1])+"|"+norma_(r[2]);
    if (!acum[k]) acum[k] = {nombre:String(r[1]), seccion:String(r[2]),
      aciertos:0, total:+r[8]||24, partidas:0, avatar:+r[3]||0};
    acum[k].partidas++; acum[k].aciertos += +r[5]||0; acum[k].total = +r[8]||24;
    acum[k].avatar = +r[3]||0;   // se muestra el avatar de la ÚLTIMA partida
  });
  const lista = Object.values(acum)
    .sort((a,b)=>b.aciertos-a.aciertos || a.partidas-b.partidas).slice(0,top);
  return ContentService.createTextOutput(JSON.stringify(lista))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Implementar → Nueva implementación** → tipo **Aplicación web** → "Ejecutar como: yo" → "Quién tiene acceso: **cualquier persona**" → Implementar → autorizar con la cuenta de Google.
4. Copiar la URL `/exec` y pegarla en el juego: `const RANKING_URL="https://script.google.com/.../exec"`.
5. **Cada vez que se edite el script hay que hacer Nueva implementación** (una nueva versión), si no los cambios no se ven.

Contrato: `GET ?top=N` devuelve `[{nombre, seccion, aciertos, partidas, avatar, total}]` ya acumulado por estudiante+sección; `POST` con JSON `{nombre, seccion, avatar, modo, aciertos, errores, pasadas, total, porcentaje, tiempo_seg, inicio}` agrega una fila. La partida **sin reloj (práctica o repaso) no se envía**.

Reglas del ranking (importantes, ya decididas):
- **Un estudiante = nombre+sección normalizados** (`norma_`: minúsculas, sin tildes, sin espacios de más). "agustín mendoza", "AGUSTIN MENDOZA" e "Isabela  Martínez" son la misma persona — nunca se duplica por tipeo.
- **Orden**: más aciertos acumulados primero (premia la constancia: cada partida suma); en empate de aciertos, quien lo logró en MENOS partidas.
- **Avatar**: el de la última partida jugada (si se equivocó al elegirlo, se corrige solo al jugar de nuevo).
- **Nombre mostrado**: en el juego se imprime siempre con mayúscula inicial en cada palabra ("Agustín Mendoza") aunque se haya tipeado en minúscula — función `nombreBonito` del lado del cliente, no hace falta tocar la planilla.

## 11. Publicación

- Repo público en GitHub, archivo `index.html` en la raíz → Settings → Pages → Deploy from a branch → main / (root). La URL queda `https://<usuario>.github.io/<repo>/`.
- Se puede acompañar de `LICENSE` con copyright del docente ("Todos los derechos reservados") — no impide copias pero deja constancia de autoría; el historial de commits es la prueba de que el trabajo es suyo.

## 12. Checklist de aceptación

- [ ] Cada partida sortea rosco distinto, letra inicial entre 10 arranques y quién empieza al azar.
- [ ] La voz dice el nombre de la letra ("letra equis"), hace pausa ~2 s y recién lee la definición; el input se habilita solo al terminar (o al instante si la voz está apagada).
- [ ] Contra Boti: Boti piensa ~6 s en paralelo a la lectura, tipea letra por letra, y el cambio de turno es automático (~1 s, sin clic).
- [ ] De a dos: el overlay pide "Listo, continuar" y los avatares no se repiten.
- [ ] Sin reloj no escribe en la planilla; con reloj sí, y el inicio muestra top 6 con 🥇🥈🥉.
- [ ] El repaso ("Practicar las que costaron") no se asienta como partida ni suma aciertos.
- [ ] El ranking por sección lista a TODOS los estudiantes, una columna por sección; los nombres se ven con mayúscula inicial y nadie se duplica por tildes/mayúsculas/espacios.
- [ ] Nunca aparece barra de scroll en el tablero (probar 1366×768 y 1280×720).
- [ ] Enter responde, Esc pasa; la última letra pendiente no se puede pasar.
- [ ] El jugador queda recordado en su computadora (nombre, avatar, sección precargados).
