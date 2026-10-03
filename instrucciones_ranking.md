# Cómo publicar el juego con ranking del cole

Dos pasos: **(A)** conectar la planilla que guarda los puntajes y **(B)** subir el juego a GitHub Pages. Unos 15 minutos en total, todo gratis.

---

## A) El script dentro de tu planilla

Ya tenés la planilla "Pasapalabra Bio — Participación" con la pestaña `partidas` y las 12 columnas. Ahora falta el script que recibe los datos del juego:

1. Abrí tu planilla → arriba: **Extensiones → Apps Script**. Se abre un editor.
2. Borrá el código que trae y **pegá todo el contenido de `ranking.gs`** (el archivo que te pasé). Guardá con el ícono de disquete.
3. Arriba a la derecha: **Implementar → Nueva implementación**.
4. En "Tipo" elegí **Aplicación web**:
   - Descripción: `Ranking Pasapalabra`
   - **Ejecutar como:** `Yo (tu correo)`
   - **Quién puede acceder:** `Cualquier persona`
5. **Implementar**. Te va a pedir autorizar:
   - Elegí tu cuenta Google.
   - Aparece "Google no verificó esta app" (es normal: es TU script, no una app publicada). Tocá **Configuración avanzada → Ir a (nombre del proyecto)** y después **Permitir**.
6. Copiá la **URL de la aplicación web** que te da al final (empieza con `https://script.google.com/macros/s/…/exec`) y **pasámela** — yo la dejo puesta en el juego.

## B) Subirlo a GitHub Pages (el link para los estudiantes)

Lo hago yo con tu repo: lo preparo con el juego como `index.html`, vos solo creás el repositorio vacío en github.com (o me autorizás y lo creo). Después el link queda así:
`https://patodoc27.github.io/<nombre-del-repo>/`

Ese es el link que compartís con los estudiantes (por WhatsApp, aula virtual, QR, etc.).

---

## Cómo funciona después

- Al terminar cada partida, el juego **envía automáticamente** a la pestaña `partidas`: fecha, nombre, sección, avatar, modo, aciertos, errores, pasadas, total, porcentaje, tiempo en segundos y letra de inicio.
- La pestaña `resumen` (con fórmulas) muestra por estudiante: partidas jugadas, aciertos acumulados, porcentaje promedio y última fecha.
- La pantalla final del juego muestra el **Ranking del cole** (🥇🥈🥉 por aciertos acumulados — premia la constancia; en empate gana quien jugó menos) y el botón **"🏆 Resultados y ranking"** abre el ranking completo **separado por sección** (1° A, 1° B…).
- En el inicio aparece un mini top 5 para picarlos antes de jugar.

## Cosas a tener en cuenta

- **Sin la URL pegada** el juego funciona igual: simplemente no aparece el ranking. Nada se rompe.
- Los puntajes son "de palabra": cualquiera con el link puede mandar una marca. Es para motivar en clase, no para evaluar — pero si alguno carga de más, lo ves y lo borrás en la planilla.
- Si el link se rompe, repetí solo el paso A (nueva implementación) y avisame la URL nueva.
- Para reiniciar el registro antes de un nuevo período: borrá las filas de la pestaña `partidas` (dejá la fila de títulos).
- Si algún día cambiás el código de Apps Script, hay que hacer **Implementar → Administrar implementaciones → ✏️ → Versión: Nueva versión**, si no el link viejo sigue usando el código viejo.
