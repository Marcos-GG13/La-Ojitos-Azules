/* =====================================================
   ✏️  ESCRIBE AQUÍ TU MENSAJE PARA AINA
   Puedes usar varias líneas y dejar párrafos en blanco,
   se mostrarán tal cual los escribas dentro de la carta.
===================================================== */
const mensaje = `
Aquí escribiré mi propio mensaje para Aina
`;

/* =====================================================
   📅 FECHA DEL REENCUENTRO
   Cambia aquí el día y, si quieres, la hora exacta.
===================================================== */
const fechaReencuentro = new Date("2026-08-28T00:00:00");

/* =====================================================
   No hace falta tocar nada a partir de aquí
===================================================== */

// Mostrar el mensaje personal dentro de la carta
document.getElementById("mensaje-texto").textContent = mensaje.trim();

// Si flor.jpg todavía no existe, mostramos un aviso elegante en su lugar
const fotoFlor = document.getElementById("foto-flor");
const fotoVacia = document.getElementById("foto-vacia");
fotoFlor.addEventListener("error", () => {
  fotoFlor.hidden = true;
  fotoVacia.hidden = false;
});

// Cuenta atrás en vivo hasta el reencuentro
const elDias = document.getElementById("dias");
const elHoras = document.getElementById("horas");
const elMinutos = document.getElementById("minutos");
const elSegundos = document.getElementById("segundos");
const elTextoCuenta = document.querySelector(".cuenta-atras-texto");

function pad(numero) {
  return String(numero).padStart(2, "0");
}

function actualizarCuentaAtras() {
  const ahora = new Date();
  const diferencia = fechaReencuentro - ahora;

  if (diferencia <= 0) {
    elTextoCuenta.textContent = "¡Ya estamos juntos otra vez! ❤️";
    elDias.textContent = elHoras.textContent = elMinutos.textContent = elSegundos.textContent = "00";
    return;
  }

  const segundosTotales = Math.floor(diferencia / 1000);
  const dias = Math.floor(segundosTotales / 86400);
  const horas = Math.floor((segundosTotales % 86400) / 3600);
  const minutos = Math.floor((segundosTotales % 3600) / 60);
  const segundos = segundosTotales % 60;

  elDias.textContent = pad(dias);
  elHoras.textContent = pad(horas);
  elMinutos.textContent = pad(minutos);
  elSegundos.textContent = pad(segundos);
}

actualizarCuentaAtras();
setInterval(actualizarCuentaAtras, 1000);

// Aparición suave de la tarjeta una vez cargado todo
window.addEventListener("load", () => {
  document.body.classList.add("cargado");
});
