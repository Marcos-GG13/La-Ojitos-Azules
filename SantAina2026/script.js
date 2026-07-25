/* =====================================================
   ✏️  ESCRIBE AQUÍ TU MENSAJE PARA AINA
   Puedes usar varias líneas y dejar párrafos en blanco,
   se mostrarán tal cual los escribas dentro de la carta.
===================================================== */
const mensaje = `
Feliz santo mi niña preciosa,

Ojalá pudiera estar ahora mismo contigo para darte infinitos besitos y abrazitos y para recordarte lo muchísimo que te amo y te adoro. Pero como no puede ser, he decidido escribirte este pequeño mensajito y programarte esta página web en forma de regalo para tu santo y para que sepas que, aunque estemos muy lejos el uno del otro, yo siempre te llevo en mi mente y en mi corazón (y en mi muñeca porque la goma no me la quito nunca  jejejeje).

Solo quería felicitarte por tu santo y desearte un día estupendo miamor, y ya que estamos recordarte que eres la mujer de mis sueños y el amor de mi vida. Nunca he amado ni adorado a nadie como te adoro a ti miniña. Lo que siento por ti es totalmente real y puro, y sé que este sentimiento va a vivir dentro de mi corazón hasta que este mismo deje de latir. Gracias otra vez por ser tan buena persona, por tu forma de quererme y por explicarme mil veces todas las cosas que necesito y que a la primera no entiendo.

Estoy muy orgulloso de ti amor, sé que te estás esforzando muchísimo con tus miedos y tus inseguridades, y sé que estás aprendiendo a confiar cada vez más. Y me alegro por ti y estoy muy orgulloso de que seas tan valiente como para afrontar esos miedos y de que sigas mejorando un poquito cada día. Quiero que sepas que, incluso aunque yo esté en la otra punta del mundo, siempre me vas a tener aquí para celebrar tus logros y apoyarte en tus momentos difíciles. Siempre que necesites una mano voy a estar aquí para dartela amor, y quiero recordarte que la distancia no va a hacer que deje de amarte a ti y SOLO a ti. Eso es algo que nada ni nadie en este mundo puede cambiar mivida, y te lo sello 😘🍍.

Espero que tengas un día increible miamor y que disfrutes muchísimo de tu familia. Te echo muchísimo de menos miniña preciosa, de verdad que no sabes las ganas que tengo de verte, pero como ves aquí abajo, cada vez queda un poquito menos para que nos volvamos a ver amor. 

Te adoro miniña preciosa, y te voy a adorar siempre.
Con cariño, el amor de tu vida.
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

/* 
// Si flor.jpg todavía no existe, mostramos un aviso elegante en su lugar
const fotoFlor = document.getElementById("foto-flor");
const fotoVacia = document.getElementById("foto-vacia");
fotoFlor.addEventListener("error", () => {
  fotoFlor.hidden = true;
  fotoVacia.hidden = false;
});
*/

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
