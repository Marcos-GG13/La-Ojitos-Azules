/* ============================================================
   REGALO PARA AINA — SCRIPT PRINCIPAL
   ------------------------------------------------------------
   Índice:
   1. Configuración editable (fechas importantes)
   2. Utilidades generales
   3. Pétalos cayendo (ambiente continuo)
   4. Corazones flotantes (momentos especiales)
   5. Apertura de la caja de regalo
   6. Modales (sobres / cartas y galería de fotos)
   7. Contadores de días y cuenta atrás
   8. Botón especial "¿Sabes cuánto te quiero?"
   9. Inicialización de AOS (animaciones al hacer scroll)
   ============================================================ */

(function () {
  'use strict';

  /* --------------------------------------------------------
     1. CONFIGURACIÓN EDITABLE
     ✏️ Cambia estas fechas si algún día quieres reutilizar
        la plantilla para otra pareja de fechas.
  -------------------------------------------------------- */
  const CONFIG = {
    talkingSince: new Date('2026-03-30T00:00:00'),   // empezamos a hablar
    firstKiss: new Date('2026-04-08T00:00:00'),      // primer beso
    countdownTarget: new Date('2026-08-28T00:00:00'), // cuenta atrás
  };

  // Respetamos si la persona ha pedido menos movimiento en su sistema
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Comprobamos si las librerías externas cargaron correctamente
  // (si el CDN fallara, la página debe seguir funcionando igualmente)
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasAOS = typeof window.AOS !== 'undefined';

  /* --------------------------------------------------------
     2. UTILIDADES GENERALES
  -------------------------------------------------------- */
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /* --------------------------------------------------------
     3. PÉTALOS CAYENDO
     Crean un ambiente romántico discreto durante todo el recorrido.
  -------------------------------------------------------- */
  const petalsLayer = document.getElementById('petalsLayer');
  const PETAL_COLORS = ['#F6D9E3', '#CFE3EE', '#E8B7B7', '#FFFFFF'];

  function spawnPetal() {
    if (!petalsLayer) return;

    const petal = document.createElement('div');
    petal.className = 'petal';

    const size = random(8, 16);
    const startLeft = random(0, 100);
    const drift = random(-120, 120);
    const rot = random(180, 420);
    const duration = random(9, 17);
    const delay = random(0, 0.6);
    const color = pick(PETAL_COLORS);

    petal.style.left = startLeft + 'vw';
    petal.style.width = size + 'px';
    petal.style.height = size * 0.8 + 'px';
    petal.style.background = color;
    petal.style.borderRadius = '100% 0 100% 0';
    petal.style.setProperty('--drift-x', drift + 'px');
    petal.style.setProperty('--rot', rot + 'deg');
    petal.style.animationDuration = duration + 's';
    petal.style.animationDelay = delay + 's';

    petal.addEventListener('animationend', () => petal.remove());
    petalsLayer.appendChild(petal);
  }

  let petalInterval = null;

  function startPetals() {
    if (prefersReducedMotion || petalInterval) return;
    // Sembramos algunos pétalos ya visibles al cargar la página
    for (let i = 0; i < 5; i++) {
      setTimeout(spawnPetal, i * 400);
    }
    petalInterval = setInterval(spawnPetal, 850);
  }

  /* --------------------------------------------------------
     4. CORAZONES FLOTANTES
     Aparecen en momentos especiales (caja de regalo, botón final).
  -------------------------------------------------------- */
  const heartsLayer = document.getElementById('heartsLayer');

  function spawnHeartsBurst(count) {
    if (!heartsLayer || prefersReducedMotion) return;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = pick(['❤️', '💗', '💕']);
        heart.style.left = random(15, 85) + 'vw';
        heart.style.bottom = random(0, 10) + 'vh';
        heart.style.fontSize = random(14, 26) + 'px';
        heart.style.setProperty('--drift-x', random(-60, 60) + 'px');
        heart.style.animationDuration = random(2.5, 4) + 's';

        heart.addEventListener('animationend', () => heart.remove());
        heartsLayer.appendChild(heart);
      }, i * 90);
    }
  }

  /* --------------------------------------------------------
     5. APERTURA DE LA CAJA DE REGALO
  -------------------------------------------------------- */
  const giftBox = document.getElementById('giftBox');
  const openGiftBtn = document.getElementById('openGiftBtn');
  let giftOpened = false;

  function openGift() {
    if (giftOpened) return;
    giftOpened = true;

    giftBox.classList.add('is-open');

    // Esta clase muestra el resto de la página (estaba oculta con display:none)
    document.body.classList.add('gift-opened');

    // El contenido principal acaba de pasar de display:none a block, así que
    // hay que decirle a AOS que recalcule las posiciones de sus elementos
    if (hasAOS) {
      requestAnimationFrame(() => AOS.refreshHard());
    }

    // Ráfaga de pétalos y corazones para celebrar el momento
    spawnHeartsBurst(prefersReducedMotion ? 0 : 14);

    const goToWelcome = () => {
      const welcome = document.getElementById('bienvenida');
      if (welcome) welcome.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    };

    if (hasGSAP && !prefersReducedMotion) {
      const tl = gsap.timeline({ delay: 0.9, onComplete: goToWelcome });
      tl.to(openGiftBtn, { opacity: 0, y: 10, duration: 0.4, ease: 'power1.out' })
        .to('.hero__subtitle', { opacity: 0, duration: 0.4, ease: 'power1.out' }, '<')
        .to(giftBox, { scale: 0.92, opacity: 0, duration: 0.5, ease: 'power2.in' }, '-=0.1');
    } else {
      setTimeout(goToWelcome, prefersReducedMotion ? 200 : 1200);
    }
  }

  if (openGiftBtn) openGiftBtn.addEventListener('click', openGift);
  if (giftBox) giftBox.addEventListener('click', openGift);

  /* --------------------------------------------------------
     6. MODALES: SOBRES (CARTAS) Y GALERÍA DE FOTOS
  -------------------------------------------------------- */
  function openModal(modalEl) {
    modalEl.classList.add('is-visible');
    modalEl.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    modalEl.classList.remove('is-visible');
    modalEl.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  }

  function closeAllModals() {
    document.querySelectorAll('.modal.is-visible').forEach(closeModal);
  }

  // --- Sobres ---
  const letterModal = document.getElementById('letterModal');
  const letterModalBody = document.getElementById('letterModalBody');

  document.querySelectorAll('.envelope').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-envelope');
      const template = document.getElementById('tpl-envelope-' + id);
      if (!template || !letterModalBody) return;

      letterModalBody.innerHTML = '';
      letterModalBody.appendChild(template.content.cloneNode(true));
      openModal(letterModal);
      spawnHeartsBurst(prefersReducedMotion ? 0 : 6);
    });
  });

  // --- Galería / lightbox ---
  const photoModal = document.getElementById('photoModal');
  const photoModalImg = document.getElementById('photoModalImg');

  document.querySelectorAll('.polaroid').forEach((btn) => {
    btn.addEventListener('click', () => {
      const full = btn.getAttribute('data-full');
      const img = btn.querySelector('img');
      if (!full || !photoModalImg) return;

      photoModalImg.src = full;
      photoModalImg.alt = img ? img.alt : '';
      openModal(photoModal);
    });
  });

  // --- Cierre de modales: botón, fondo o tecla Escape ---
  document.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const modalEl = e.currentTarget.closest('.modal');
      if (modalEl) closeModal(modalEl);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  /* --------------------------------------------------------
     7. CONTADORES DE DÍAS Y CUENTA ATRÁS
  -------------------------------------------------------- */
  const counterTalking = document.getElementById('counterTalking');
  const counterKiss = document.getElementById('counterKiss');
  const counterCountdown = document.getElementById('counterCountdown');

  function daysBetween(start, end) {
    const diff = end.setHours(0,0,0,0) - start.setHours(0,0,0,0);
    return Math.max(0, Math.floor(diff / 86400000));
  }

  function updateDayCounters() {
    const now = new Date();
    if (counterTalking) {
      counterTalking.textContent = daysBetween(new Date(CONFIG.talkingSince), new Date(now));
    }
    if (counterKiss) {
      counterKiss.textContent = daysBetween(new Date(CONFIG.firstKiss), new Date(now));
    }
  }

  function updateCountdown() {
    if (!counterCountdown) return;
    const now = new Date();
    const diff = CONFIG.countdownTarget - now;

    if (diff <= 0) {
      counterCountdown.textContent = '¡Ya está aquí! 🎉';
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    counterCountdown.textContent = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
  }

  function startCounters() {
    updateDayCounters();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    setInterval(updateDayCounters, 60000);
  }

  /* --------------------------------------------------------
     8. BOTÓN ESPECIAL "¿SABES CUÁNTO TE QUIERO?"
  -------------------------------------------------------- */
  const specialBtn = document.getElementById('specialBtn');
  const specialReveal = document.getElementById('specialReveal');

  if (specialBtn && specialReveal) {
    specialBtn.addEventListener('click', () => {
      document.body.classList.add('special-moment');

      // Buena ráfaga de corazones cada vez que se pulsa el botón
      spawnHeartsBurst(prefersReducedMotion ? 0 : 32);

      const alreadyRevealed = specialReveal.classList.contains('is-visible');

      // "is-visible" cambia display:none -> flex; "is-animated" (añadida
      // un instante después, para forzar el reflow) dispara la transición
      // de opacidad/posición y la animación de aparición del corazón.
      specialReveal.classList.add('is-visible');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          specialReveal.classList.add('is-animated');
        });
      });

      if (!alreadyRevealed) {
        specialReveal.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
      }
    });
  }

  /* --------------------------------------------------------
     9. INICIALIZACIÓN
  -------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    startPetals();
    startCounters();

    if (hasAOS) {
      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 40,
        disable: prefersReducedMotion,
      });
    }
  });
})();
