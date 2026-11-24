/* ============================================
   24 PUERTAS - Script principal
   ============================================
   PERSONALIZA AQUÍ ABAJO
   ============================================ */

const CONFIG = {
  // Nombres
  para: "Enana",          // Nombre de tu novia
  de: "Melón",          // Tu nombre

  // Año del calendario (importante para el bloqueo por fecha)
  año: 2026,

  // Pon esto en true si quieres poder abrir todas las puertas
  // (útil mientras preparas el regalo o para probar)
  modoVistaPrevia: true,
};

/**
 * Contenido de cada día.
 * - texto: el mensaje (puede tener saltos de línea con \n)
 * - foto: ruta de la imagen (déjalo vacío "" si no hay foto)
 *
 * Coloca las fotos dentro de la carpeta /imagenes/
 * Ejemplo: "imagenes/dia1.jpg"
 */
const DIAS = [
  { 
    dia: 1, 
    texto: `Hoy empieza nuestra cuenta atrás para Navidad y no quería dejar pasar ni un segundo sin recordarte lo muchísimo que te quiero. 

A veces el día a día va tan rápido que se nos olvida parar y agradecer lo que tenemos, pero hoy quiero hacerlo contigo. Eres lo mejor que me ha pasado y cada momento a tu lado se siente como un regalo. 

Prepárate, porque durante estos 24 días voy a ir dejándote por aquí pequeños trocitos de todo lo que siento por ti. ¡TEAMOOOOOOO!`, 
    foto: "imagenes/dia1.jpg" 
  },
  { dia: 2,  texto: "Hoy solo quería recordarte lo mucho que me haces sonreír.", foto: "imagenes/dia2.jpg" },
  { dia: 3,  texto: "Eres mi persona favorita.", foto: "imagenes/dia3.jpg" },
  { dia: 4,  texto: "Gracias por estar siempre.", foto: "imagenes/dia4.jpg" },
  { dia: 5,  texto: "Contigo todo es mejor.", foto: "imagenes/dia5.jpg" },
  { dia: 6,  texto: "Un pequeño recordatorio: eres increíble.", foto: "imagenes/dia6.jpg" },
  { dia: 7,  texto: "Me encanta cómo me miras.", foto: "imagenes/dia7.jpg" },
  { dia: 8,  texto: "Hoy pienso en nosotros.", foto: "imagenes/dia8.jpg" },
  { dia: 9,  texto: "Eres mi lugar seguro.", foto: "imagenes/dia9.jpg" },
  { dia: 10, texto: "Cada día a tu lado es un regalo.", foto: "imagenes/dia10.jpg" },
  { dia: 11, texto: "Te elijo. Hoy y siempre.", foto: "imagenes/dia11.jpg" },
  { dia: 12, texto: "Tu risa es mi sonido favorito.", foto: "imagenes/dia12.jpg" },
  { dia: 13, texto: "Gracias por quererme como lo haces.", foto: "imagenes/dia13.jpg" },
  { dia: 14, texto: "Eres mi mejor decisión.", foto: "imagenes/dia14.jpg" },
  { dia: 15, texto: "Contigo quiero todos los diciembres.", foto: "imagenes/dia15.jpg" },
  { dia: 16, texto: "Me haces querer ser mejor.", foto: "imagenes/dia16.jpg" },
  { dia: 17, texto: "Tu abrazo es mi sitio favorito.", foto: "imagenes/dia17.jpg" },
  { dia: 18, texto: "Siempre tú.", foto: "imagenes/dia18.jpg" },
  { dia: 19, texto: "Eres magia de verdad.", foto: "imagenes/dia19.jpg" },
  { dia: 20, texto: "No hay día que no te agradezca.", foto: "imagenes/dia20.jpg" },
  { dia: 21, texto: "Mi corazón es todo tuyo.", foto: "imagenes/dia21.jpg" },
  { dia: 22, texto: "Quiero seguir escribiendo nuestra historia.", foto: "imagenes/dia22.jpg" },
  { dia: 23, texto: "Mañana es Navidad... y yo ya tengo mi mejor regalo: tú.", foto: "imagenes/dia23.jpg" },
  { dia: 24, texto: "Feliz Navidad, mi amor.\nTe quiero más de lo que las palabras pueden decir.", foto: "imagenes/dia24.jpg" },
];

/* ============================================
   NO HACE FALTA TOCAR A PARTIR DE AQUÍ
   (salvo que quieras cambiar el comportamiento)
   ============================================ */

const STORAGE_KEY = `24puertas-${CONFIG.para}-${CONFIG.año}`;

// ---------- Utilidades ----------
/*Activar local storage
function obtenerPuertasAbiertas() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function guardarPuertaAbierta(dia) {
  const abiertas = obtenerPuertasAbiertas();
  if (!abiertas.includes(dia)) {
    abiertas.push(dia);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(abiertas));
  }
}
*/

// FUNCIÓN TEMPORAL: no guarda ni lee del navegador (para poder probar sin localStorage)
function obtenerPuertasAbiertas() {
  // TEMPORAL: no lee del navegador (para poder probar)
  return [];
}

function guardarPuertaAbierta(dia) {
  // TEMPORAL: no guarda nada (para poder probar)
}

function hoyEs() {
  const ahora = new Date();
  return {
    año: ahora.getFullYear(),
    mes: ahora.getMonth() + 1, // 1-12
    dia: ahora.getDate(),
  };
}

function sePuedeAbrir(dia) {
  if (CONFIG.modoVistaPrevia) return true;

  const { año, mes, dia: diaHoy } = hoyEs();

  // Solo se puede abrir en diciembre del año configurado
  if (año !== CONFIG.año || mes !== 12) {
    // Si aún no es diciembre, solo dejamos abrir si ya la abrió antes
    return obtenerPuertasAbiertas().includes(dia);
  }

  // En diciembre: se puede abrir si el día ya llegó o si ya la abrió
  return dia <= diaHoy || obtenerPuertasAbiertas().includes(dia);
}

function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.classList.remove("oculto");

  clearTimeout(mostrarToast._timer);
  mostrarToast._timer = setTimeout(() => {
    toast.classList.add("oculto");
  }, 2800);
}

/*// ---------- Generar puertas ----------

function crearPuertas() {
  const rejilla = document.getElementById("rejilla-puertas");
  const abiertas = obtenerPuertasAbiertas();

  // Orden visual un poco más interesante (no estrictamente 1-24)
  // Puedes cambiar este array si quieres otro orden visual
  const ordenVisual = [
    7, 15, 1, 22, 10, 24,
    4, 13, 9, 20, 18, 2,
    5, 16, 11, 3, 23,
    19, 8, 14, 12, 21,
    17, 6
  ];

  ordenVisual.forEach((numero) => {
    const data = DIAS.find((d) => d.dia === numero) || { dia: numero, texto: "", foto: "" };
    const estaAbierta = abiertas.includes(numero);
    const disponible = sePuedeAbrir(numero);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "puerta";
    btn.dataset.dia = numero;
    btn.setAttribute("aria-label", `Puerta ${numero}`);

    if (numero === 24) btn.classList.add("especial");
    if (estaAbierta) btn.classList.add("abierta");
    if (!disponible && !estaAbierta) btn.classList.add("bloqueada");

    // Algunas puertas un poco más grandes para que no sea una cuadrícula aburrida
    if ([1, 9, 11, 17, 6].includes(numero)) {
      btn.classList.add("grande");
    }

    btn.innerHTML = `
      <div class="puerta-interior"><span>✦</span></div>
      <div class="puerta-hoja">
        <span class="puerta-numero">${numero}</span>
        ${numero === 24 ? '<div class="lazo"><div class="nudo"></div></div>' : ""}
      </div>
    `;

    btn.addEventListener("click", () => abrirPuerta(numero, btn));
    rejilla.appendChild(btn);
  });
}
*/
// ---------- Generar puertas ----------

/**
 * Definición exacta del layout (basado en la imagen de referencia)
 * Cada puerta tiene: dia, columna de inicio, fila de inicio, ancho, alto
 * La rejilla es de 6 columnas.
 */
const LAYOUT = [
  // Fila 1
  { dia: 7,  col: 1, row: 1, w: 1, h: 1 },
  { dia: 15, col: 2, row: 1, w: 1, h: 1 },
  { dia: 1,  col: 3, row: 1, w: 2, h: 1 },
  { dia: 22, col: 5, row: 1, w: 1, h: 1 },
  { dia: 10, col: 6, row: 1, w: 1, h: 1 },

  // Fila 2-3 (la 24 es grande)
  { dia: 24, col: 1, row: 2, w: 2, h: 2 },
  { dia: 4,  col: 3, row: 2, w: 1, h: 1 },
  { dia: 13, col: 4, row: 2, w: 1, h: 2 },
  { dia: 9,  col: 5, row: 2, w: 2, h: 1 },

  // Continuación
  { dia: 20, col: 3, row: 3, w: 1, h: 1 },
  { dia: 18, col: 5, row: 3, w: 1, h: 1 },
  { dia: 2,  col: 6, row: 3, w: 1, h: 1 },

  // Fila 4
  { dia: 5,  col: 1, row: 4, w: 1, h: 1 },
  { dia: 16, col: 2, row: 4, w: 1, h: 1 },
  { dia: 11, col: 3, row: 4, w: 2, h: 1 },
  { dia: 3,  col: 5, row: 4, w: 1, h: 2 },
  { dia: 23, col: 6, row: 4, w: 1, h: 1 },

  // Fila 5
  { dia: 19, col: 1, row: 5, w: 1, h: 2 },
  { dia: 8,  col: 2, row: 5, w: 1, h: 1 },
  { dia: 14, col: 3, row: 5, w: 1, h: 1 },
  { dia: 12, col: 4, row: 5, w: 1, h: 1 },
  { dia: 21, col: 6, row: 5, w: 1, h: 2 },

  // Fila 6
  { dia: 17, col: 2, row: 6, w: 2, h: 1 },
  { dia: 6,  col: 4, row: 6, w: 2, h: 1 },
];

function crearPuertas() {
  const rejilla = document.getElementById("rejilla-puertas");
  const abiertas = obtenerPuertasAbiertas();

  LAYOUT.forEach((item) => {
    const { dia: numero, col, row, w, h } = item;
    const data = DIAS.find((d) => d.dia === numero) || { dia: numero, texto: "", foto: "" };
    const estaAbierta = abiertas.includes(numero);
    const disponible = sePuedeAbrir(numero);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "puerta";
    btn.dataset.dia = numero;
    btn.setAttribute("aria-label", `Puerta ${numero}`);

    // Posición y tamaño exactos en la rejilla
    btn.style.gridColumn = `${col} / span ${w}`;
    btn.style.gridRow = `${row} / span ${h}`;

    if (numero === 24) btn.classList.add("especial");
    if (w >= 2 || h >= 2) btn.classList.add("destacada");
    if (estaAbierta) btn.classList.add("abierta");
    if (!disponible && !estaAbierta) btn.classList.add("bloqueada");

    // Decidimos si mostramos la foto como portada (solo si ya está abierta y tiene foto)
    const tieneFoto = data.foto && data.foto.trim() !== "";
    const mostrarFoto = estaAbierta && tieneFoto;

    btn.innerHTML = `
      <div class="puerta-interior">
        ${mostrarFoto ? `<img src="${data.foto}" alt="Día ${numero}" class="puerta-foto">` : `<span>✦</span>`}
      </div>
      <div class="puerta-hoja">
        <span class="puerta-numero">${numero}</span>
        ${numero === 24 ? '<div class="lazo"><div class="nudo"></div></div>' : ""}
      </div>
      ${estaAbierta ? `<span class="puerta-numero-abierta">${numero}</span>` : ""}
    `;
    btn.addEventListener("click", () => abrirPuerta(numero, btn));
    rejilla.appendChild(btn);
  });
}
// ---------- Abrir puerta ----------

function abrirPuerta(dia, boton) {
  if (!sePuedeAbrir(dia)) {
    const { mes, dia: diaHoy } = hoyEs();
    if (mes !== 12) {
      mostrarToast("Todavía no es diciembre ❄️");
    } else {
      mostrarToast(`Aún no es el día ${dia}. Vuelve el día ${dia}.`);
    }
    return;
  }

  // Marcar como abierta
  boton.classList.add("abierta");
  boton.classList.remove("bloqueada");
  guardarPuertaAbierta(dia);

  // Poner la foto como portada y el número en la esquina
  const data = DIAS.find((d) => d.dia === dia) || { texto: "Sorpresa vacía", foto: "" };
  const interior = boton.querySelector(".puerta-interior");

  if (data.foto && data.foto.trim() !== "") {
    interior.innerHTML = `<img src="${data.foto}" alt="Día ${dia}" class="puerta-foto">`;
  }

  if (!boton.querySelector(".puerta-numero-abierta")) {
    const numEsquina = document.createElement("span");
    numEsquina.className = "puerta-numero-abierta";
    numEsquina.textContent = dia;
    boton.appendChild(numEsquina);
  }

  // Mostrar contenido en el modal
  mostrarModal(dia, data);
}

// ---------- Modal ----------

function mostrarModal(dia, data) {
  const modal = document.getElementById("modal");
  const fotoEl = document.getElementById("modal-foto");
  const textoEl = document.getElementById("modal-texto");
  const numeroEl = document.getElementById("modal-numero");

  numeroEl.textContent = `Día ${dia}`;

  if (data.foto && data.foto.trim() !== "") {
    fotoEl.src = data.foto;
    fotoEl.alt = `Foto del día ${dia}`;
    fotoEl.classList.remove("oculto");
  } else {
    fotoEl.classList.add("oculto");
    fotoEl.removeAttribute("src");
  }

  textoEl.textContent = data.texto || "…";

  modal.showModal();
}

function cerrarModal() {
  document.getElementById("modal").close();
}

// ---------- Sobre ----------

function configurarSobre() {
    const btnSobre = document.getElementById("btn-sobre");
    const btnContinuar = document.getElementById("btn-continuar");

    const envoltorio = document.getElementById("envoltorio");
    const calendario = document.getElementById("calendario");

    // PASO 1: Abrir el sobre
    btnSobre.addEventListener("click", () => {

        btnSobre.classList.add("abierto");

        setTimeout(() => {

            // Ocultar las instrucciones
            const indicacion = document.querySelector(".envoltorio-indicacion");

            if (indicacion) {
                indicacion.classList.add("oculto");
            }

            // Mostrar el botón para entrar al calendario
            btnContinuar.classList.remove("oculto");

        }, 700);
    });

    // PASO 2: Entrar al calendario
    btnContinuar.addEventListener("click", () => {

        envoltorio.classList.add("cerrado");

        setTimeout(() => {
            calendario.classList.remove("oculto");
        }, 600);

    });
}

// ---------- Cuenta atrás ----------

function actualizarCuentaAtras() {
    const ahora = new Date();

    const inicioDiciembre = new Date(CONFIG.año, 11, 1, 0, 0, 0);
    const finalDiciembre = new Date(CONFIG.año, 11, 25, 0, 0, 0);

    let siguientePuerta;

    // Antes de diciembre: puerta 1
    if (ahora < inicioDiciembre) {
        siguientePuerta = inicioDiciembre;
    }

    // Durante diciembre: siguiente día a las 00:00
    else if (ahora < finalDiciembre) {
        siguientePuerta = new Date(
            CONFIG.año,
            11,
            ahora.getDate() + 1,
            0, 0, 0
        );
    }

    // Ya se han abierto todas las puertas
    else {
        document.getElementById("cuenta-atras").innerHTML =
            "<p>¡Ya están abiertas las 24 puertas! ❤️</p>";
        return;
    }

    const diferencia = siguientePuerta - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    // Mostrar los días solo si faltan 24 horas o más
    document.getElementById("unidad-dias").style.display =
        diferencia >= 24 * 60 * 60 * 1000 ? "flex" : "none";

    document.getElementById("cuenta-dias").textContent =
        String(dias).padStart(2, "0");

    document.getElementById("cuenta-horas").textContent =
        String(horas).padStart(2, "0");

    document.getElementById("cuenta-minutos").textContent =
        String(minutos).padStart(2, "0");

    document.getElementById("cuenta-segundos").textContent =
        String(segundos).padStart(2, "0");
}

// ---------- Inicialización ----------

document.addEventListener("DOMContentLoaded", () => {
  configurarSobre();
  crearPuertas();

  // Iniciar cuenta atrás
  actualizarCuentaAtras();
  setInterval(actualizarCuentaAtras, 1000);

  // Cerrar modal
  document.getElementById("btn-cerrar").addEventListener("click", cerrarModal);
  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) cerrarModal();
  });

  // Tecla Escape también cierra (comportamiento nativo del <dialog>, pero por si acaso)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
  });
});



/* ==========================================
   GENERADOR DE NIEVE - 24 PUERTAS
   ========================================== */

(() => {
    const contenedor = document.getElementById("nieve");

    if (!contenedor) return;

    const movimientoReducido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Cantidad adaptada al dispositivo
    const esMovil = window.matchMedia(
        "(max-width: 520px)"
    ).matches;

    const cantidadCopos = esMovil ? 45 : 90;

    // Generación de números aleatorios
    const aleatorio = (min, max) =>
        Math.random() * (max - min) + min;

    const fragmento = document.createDocumentFragment();

    for (let i = 0; i < cantidadCopos; i++) {

        const copo = document.createElement("div");
        const balanceo = document.createElement("span");

        copo.className = "copo";
        balanceo.className = "copo-balanceo";

        // Tamaño del copo
        const tamano = aleatorio(1.5, 4.5);

        // Duración de caída
        const duracion = aleatorio(18, 36);

        // Balanceo horizontal
        const tiempoBalanceo = aleatorio(3, 7);

        const desplazamiento = aleatorio(8, 30);

        // Retraso negativo: distribuye los copos
        // por toda la pantalla desde el segundo 0
        const retraso = -aleatorio(0, duracion);

        // Posición horizontal
        const posicionX = aleatorio(0, 100);

        // Profundidad simulada mediante opacidad
        const opacidad = aleatorio(0.35, 0.9);

        copo.style.setProperty(
            "--tamano",
            `${tamano}px`
        );

        copo.style.setProperty(
            "--posicion-x",
            `${posicionX}%`
        );

        copo.style.setProperty(
            "--duracion",
            `${duracion}s`
        );

        copo.style.setProperty(
            "--retraso",
            `${retraso}s`
        );

        copo.style.setProperty(
            "--balanceo",
            `${tiempoBalanceo}s`
        );

        copo.style.setProperty(
            "--desplazamiento",
            `${desplazamiento}px`
        );

        copo.style.setProperty(
            "--opacidad",
            opacidad
        );

        // Accesibilidad: nieve estática
        // cuando el usuario reduce las animaciones
        if (movimientoReducido) {
            copo.style.top = `${aleatorio(0, 100)}%`;
        }

        copo.appendChild(balanceo);
        fragmento.appendChild(copo);
    }

    // Una única inserción en el DOM
    contenedor.appendChild(fragmento);

})();
