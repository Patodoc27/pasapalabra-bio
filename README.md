# Pasapalabra Bio 🧬

Rosco de biología para 1º año — ahora también **en línea**: dos estudiantes compiten cada uno desde su compu. También se juega de a dos en la misma compu o contra un bot (Boti), y el ranking del cole se guarda en una planilla de Google.

## Jugar

El juego es un único archivo: `index.html` (GitHub Pages).

### En línea

1. Elegí **En línea**, escribí tu nombre, avatar y sección.
2. Dejá el código vacío y tocá **Crear sala**: aparece un código de 4 caracteres.
3. Tu rival escribe ese código (o toca la sala en la lista de "Salas esperando rival") y entra.
4. Quien creó la sala toca **Sortear rosco y empezar**. Se turnan letra por letra; quien espera ve y escucha la definición del rival, lo que va escribiendo y si acierta (si dice pasapalabra, la respuesta no se muestra).
5. Al final aparece el **podio** con el puntaje, se puede **Pedir revancha** (arranca cuando los dos la piden), chatear o **Practicar las que costaron** (a solas).

### Tiempos

- **Cada jugador tiene su propio reloj**: Normal · 6 min, Intermedio · 4 min, Intenso · 2 min cada uno (más "Sin reloj · práctica"), que corre solo durante su turno. Si a uno se le termina, el otro sigue con las letras que quedan. También hay **Sin reloj · práctica**.
- **Cada letra tiene su propio tiempo** (barra bajo la respuesta), calculado para estudiantes de 12-13 años: leer la definición, pensar y escribir la palabra. Entre 15 y 45 s. Si se agota, la letra vuelve como pasapalabra; si ya había vuelto, cuenta como error.

### Puntaje y podio

- Gana quien tiene **más aciertos**. Con la misma cantidad, queda **empate**: el desempate se juega pidiendo revancha.
- **Puntaje = aciertos × 100 + bonus de rapidez (0 a 99)** según el reloj que le sobró. Es solo para el podio de la partida: en la planilla se acumulan los aciertos, como siempre.
- Al final aparece el podio (medalla dorada 1° y plateada 2°; en empate, los dos con dorada) con lluvia de letras.

## Cómo funciona la conexión

Sin servidor propio ni base de datos: las compus se conectan por **Supabase Realtime** (plan gratuito) — los mensajes van por broadcast y la lista de salas por presence. Cada partida es un canal `egd-sala-XXXX`; no se guarda nada.

## Archivos

- `index.html` — el juego completo.
- `banco_palabras.md` — banco de términos del rosco, ordenado por letra.
- `ranking.gs` — script de Google Apps Script que recibe los puntajes en la planilla.
- `instrucciones_ranking.md` — paso a paso para conectar el ranking y publicar.

## Ranking

Cada partida terminada envía a la planilla "Pasapalabra Bio — Participación" la misma fila de siempre: nombre, sección, avatar, modo, aciertos, errores, pasadas, porcentaje, tiempo de respuesta y letra de inicio. Los estudiantes acumulan aciertos partida a partida, como siempre. Los modos nuevos aparecen como "en línea" o "vs Boti".
