# Pasapalabra Bio 🧬

Rosco de biología para 1º año — se juega de a dos o contra un bot (Boti), con ranking del cole guardado en una planilla de Google.

## Jugar

El juego es un único archivo: `index.html`. Se puede abrir directo en el navegador o servir por GitHub Pages.

## Archivos

- `index.html` — el juego completo (renombrado de `pasapalabra_bio.html`).
- `banco_palabras.md` — banco de términos del rosco, ordenado por letra.
- `ranking.gs` — script de Google Apps Script que recibe los puntajes en la planilla.
- `instrucciones_ranking.md` — paso a paso para conectar el ranking y publicar.

## Ranking

Cada partida terminada envía nombre, sección, avatar, modo, aciertos, errores, pasadas, porcentaje, tiempo y letra de inicio a la planilla "Pasapalabra Bio — Participación" vía Apps Script. El ranking premia los aciertos acumulados de todas las partidas; en empate gana quien jugó menos.
