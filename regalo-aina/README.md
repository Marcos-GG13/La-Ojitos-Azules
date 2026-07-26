# 💌 Regalo digital para Aina

Página web de una sola pantalla (single page), pensada como regalo por
el Día Internacional de la Novia. Hecha sólo con **HTML, CSS y
JavaScript** (sin frameworks), más dos librerías por CDN para las
animaciones: **GSAP** (la caja de regalo y el momento especial) y
**AOS** (animaciones suaves al hacer scroll).

## Cómo verla

- **La forma más simple:** haz doble clic en `index.html` y se abrirá
  en tu navegador.
- **Recomendado para que todo funcione perfecto (incluidas las rutas
  de imágenes):** súbela a GitHub Pages, o ábrela con la extensión
  "Live Server" de VS Code.

## Estructura del proyecto

```
/
│ index.html          → estructura de toda la página
│ README.md           → este archivo
│
├── css/
│      style.css      → todos los estilos (comentado por secciones)
│
├── js/
│      script.js       → toda la interactividad (comentado por secciones)
│
├── img/
│      foto1.jpg … foto6.jpg   → fotos de la galería (sustitúyelas)
│      LEEME.txt              → instrucciones para cambiar las fotos
│
└── assets/
       LEEME.txt              → carpeta libre para recursos extra
```

## Qué puedes personalizar fácilmente

Todo el texto editable está marcado en `index.html` con comentarios
que empiezan por `✏️ EDITA AQUÍ`. Los principales bloques son:

1. **Pantalla inicial** — título y subtítulo de bienvenida.
2. **Bienvenida** — el texto de introducción y los "chips" de cosas
   que le gustan (con mensaje oculto al pasar el ratón).
3. **Los 4 sobres** — el texto de cada carta está dentro de un
   `<template>` justo debajo de la sección "3. CUATRO SOBRES".
4. **Galería** — sustituye las imágenes en `img/` (ver `img/LEEME.txt`).
5. **Contadores** — las fechas se cambian en `js/script.js`, arriba del
   todo, dentro del objeto `CONFIG`:
   ```js
   const CONFIG = {
     talkingSince: new Date('2026-03-30T00:00:00'),
     firstKiss: new Date('2026-04-08T00:00:00'),
     countdownTarget: new Date('2026-08-28T00:00:00'),
   };
   ```
6. **Botón especial** — el mensaje que aparece al pulsar
   "¿Sabes cuánto te quiero?".
7. **Carta final** — el texto de la carta de cierre.

## Publicarla en GitHub Pages (gratis)

1. Crea un repositorio nuevo en GitHub y sube estos archivos
   (manteniendo la misma estructura de carpetas).
2. Ve a **Settings → Pages**.
3. En "Branch", elige `main` (o `master`) y la carpeta `/root`.
4. Guarda. En un par de minutos tendrás un enlace tipo
   `https://tu-usuario.github.io/tu-repositorio/` para compartir.

## Notas técnicas

- El diseño está hecho **mobile-first**: primero se pensó y probó
  para móvil, y luego se adapta a tablet/escritorio.
- Si el dispositivo tiene activado "reducir movimiento" en sus
  preferencias de accesibilidad, la página reduce automáticamente
  los pétalos, corazones y animaciones.
- No se usa `localStorage` ni nada que dependa de guardar datos en el
  navegador: todo funciona igual cada vez que se abre la página.
