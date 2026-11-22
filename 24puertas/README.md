# 24 Puertas ❤️

Calendario de adviento digital personalizado.  
Hecho con HTML + CSS + JS puro. Ideal para subir a **GitHub Pages**.

---

## Cómo personalizarlo

Abre el archivo **`script.js`**. Arriba del todo verás esta sección:

### 1. Nombres y configuración

```js
const CONFIG = {
  para: "Aina",          // Nombre de tu novia
  de: "Marcos",          // Tu nombre
  año: 2026,             // Año del calendario
  modoVistaPrevia: false // true = se pueden abrir todas las puertas
};
```

### 2. Contenido de cada día

Edita el array `DIAS`:

```js
const DIAS = [
  { dia: 1,  texto: "Tu mensaje aquí", foto: "imagenes/dia1.jpg" },
  { dia: 2,  texto: "Otro mensaje",    foto: "" },
  // ...
];
```

- **texto**: el mensaje que verá ese día (puedes usar `\n` para saltos de línea).
- **foto**: ruta de la imagen. Si no quieres foto ese día, déjalo como `""`.

### 3. Añadir las fotos

1. Pon todas las fotos dentro de la carpeta `imagenes/`.
2. Nómbralas como quieras (`dia1.jpg`, `foto-playa.png`, etc.).
3. Escribe exactamente el mismo nombre en el campo `foto` del día correspondiente.

---

## Cómo probarlo en local

1. Abre la carpeta del proyecto.
2. Haz doble clic en `index.html`  
   **o** usa una extensión como Live Server en VS Code.

---

## Cómo subirlo a GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser privado o público).
2. Sube todos los archivos de esta carpeta.
3. Ve a **Settings → Pages**.
4. En "Source" elige la rama `main` y la carpeta `/ (root)`.
5. Guarda. En uno o dos minutos tendrás una URL tipo:

   `https://tuusuario.github.io/nombre-del-repo/`

---

## Comportamiento

- Al entrar aparece el **sobre**. Al tocarlo se abre y muestra el calendario.
- Solo se puede abrir la puerta del día actual (en diciembre del año configurado).
- Las puertas ya abiertas se recuerdan (se guardan en el navegador con `localStorage`).
- Si pones `modoVistaPrevia: true` podrás abrir todas las puertas (útil mientras preparas el regalo).

---

## Estructura de archivos

```
24puertas/
├── index.html
├── style.css
├── script.js
├── README.md
└── imagenes/
    ├── dia1.jpg
    ├── dia2.jpg
    └── ...
```

¡Listo! Solo cambia los textos, las fotos y los nombres.  
Que le guste mucho ❤️
