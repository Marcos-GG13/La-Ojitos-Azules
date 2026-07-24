/* =====================================================
   ✏️  ESCRIBE AQUÍ TU MENSAJE PARA AINA
   Puedes usar varias líneas y dejar párrafos en blanco,
   se mostrarán tal cual los escribas dentro de la carta.
===================================================== */
const mensaje = `
Mi querida Aina, mi Enana hermosa,

Cada día sin ti se siente como una eternidad. Desde que nos conocimos, mi mundo cambió por completo. Eres esa persona que ilumina mis días más grises, la que me hace sonreír sin razón alguna y la razón por la que despierto cada mañana con ganas de ser mejor.

Recuerdo perfectamente la primera vez que te vi, tu sonrisa tímida, tus ojos brillantes y esa forma tan especial que tienes de mirar el mundo. Desde entonces, no he dejado de pensar en ti ni un solo día. Tus risas, tus mensajes a deshoras, la forma en que me abrazas fuerte como si no quisieras soltarme nunca... todo eso se ha convertido en mis momentos favoritos.

Aunque ahora estemos separados por la distancia, sé que pronto estaremos juntos de nuevo. Cada día que pasa me acerco más a ese momento tan esperado en el que podré volver a abrazarte, besarte y decirte en persona todo lo que siento por ti.

Te quiero con todo mi corazón. Eres mi refugio, mi alegría, mi compañera de aventuras y la persona con la que quiero construir un futuro lleno de amor, risas y momentos inolvidables. Gracias por existir, gracias por elegirme y gracias por ser exactamente como eres.

No veo la hora de contar los días que nos quedan juntos, de hacer planes, de viajar, de cocinar cosas ricas (aunque se me queme todo) y simplemente de estar a tu lado cada día.

Este es solo un pequeño detalle para recordarte cuánto te amo y cuánto te extraño. Eres mi flor favorita en este jardín llamado vida.

Con todo mi amor,
Tu persona favorita ❤️

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
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
