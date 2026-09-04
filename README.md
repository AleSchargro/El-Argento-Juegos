# El Argento: Juegos

Sitio con juegos diarios de temática argentina. Por ahora:
- **Conexiones**: jugable, con un acertijo de ejemplo (placeholder) en `data/puzzles.js`.
- **Tachero**: cartel de "Próximamente", sin lógica de juego todavía.

## Probarlo en tu compu

No hace falta nada instalado para verlo: abrí `index.html` con doble clic y se abre en el navegador. Como no usa `fetch` para cargar la data (los `<script>` la traen directo), funciona incluso sin servidor local.

## Editar el acertijo de Conexiones

Abrí `data/puzzles.js`. Cada bloque es un día:

```js
"2026-09-05": {
  categories: [
    { name: "Nombre de la categoría", words: ["PALABRA1", "PALABRA2", "PALABRA3", "PALABRA4"] },
    ...
  ]
}
```

Agregá un bloque nuevo por fecha (formato `YYYY-MM-DD`) con 4 categorías de 4 palabras cada una. El juego busca automáticamente la fecha de hoy.

## Conectarlo a GitHub

Necesitás tener [Git instalado](https://git-scm.com/downloads) y una cuenta en [GitHub](https://github.com).

1. En GitHub, creá un repositorio nuevo (botón "New repository"). Nombralo `el-argento`, dejalo vacío (sin README, sin .gitignore).
2. En tu compu, abrí una terminal parada en la carpeta `el-argento` (esta misma carpeta).
3. Corré, en orden:

```bash
git init
git add .
git commit -m "Primer commit: Conexiones jugable, Tachero como próximamente"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/el-argento.git
git push -u origin main
```

(Reemplazá `TU-USUARIO` por tu nombre de usuario de GitHub — te va a pedir loguearte la primera vez.)

Con eso el código ya queda en GitHub. De ahí en adelante, cada vez que cambies algo:

```bash
git add .
git commit -m "Descripción corta del cambio"
git push
```

## Publicarlo en internet (opcional, cuando quieras)

Con el repo ya en GitHub, podés activar **GitHub Pages**: en el repo, andá a Settings → Pages → Source → elegí la rama `main` → Save. En un minuto te da un link tipo `https://tu-usuario.github.io/el-argento/`.

## Próximos pasos posibles

- Sumarle color por dificultad a las categorías de Conexiones (como el Connections original: amarillo, verde, azul, morado).
- Guardar en el navegador (`localStorage`) si ya jugaste el de hoy, para no dejar rejugar.
- Diseñar el próximo juego de la lista.
