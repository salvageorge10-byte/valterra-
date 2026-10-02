// Valterra — header, menú, buscador y movimiento (GSAP + ScrollTrigger).

const WA = 'https://wa.me/5491140676706?text=';

// ── Header: sólido y más bajo después de la portada ──
const cab = document.getElementById('cab');
const waFlot = document.querySelector('.wa-flot');
const alScrollear = () => {
  cab.classList.toggle('solido', scrollY > 40);
  waFlot.classList.toggle('oculto', scrollY < innerHeight * .7);
};
addEventListener('scroll', alScrollear, { passive: true });
alScrollear();

// ── Menú de celular ──
const botonMenu = document.querySelector('.cab-menu');
const menu = document.getElementById('menu-mob');
const abrirMenu = (abrir) => {
  botonMenu.setAttribute('aria-expanded', String(abrir));
  menu.hidden = !abrir;
  document.body.classList.toggle('menu-abierto', abrir);
  cab.classList.toggle('solido', abrir || scrollY > 40);
};
botonMenu.addEventListener('click', () => abrirMenu(menu.hidden));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) abrirMenu(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { abrirMenu(false); botonMenu.focus(); } });

// ── Buscador: los rangos de precio cambian con la operación; la búsqueda sale por WhatsApp ──
const busca = document.getElementById('busca');
const precio = busca.elements.precio;
busca.querySelectorAll('input[name="op"]').forEach((r) => r.addEventListener('change', () => {
  const rangos = JSON.parse(precio.dataset[r.value]);
  precio.innerHTML = rangos.map((t) => `<option>${t}</option>`).join('');
}));
busca.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = busca.elements;
  const op = f.op.value === 'comprar' ? 'comprar' : 'alquilar';
  const msg = `Hola Valterra, busco ${op} un/a ${f.tipo.value.toLowerCase()} en ${f.zona.value}. Precio: ${f.precio.value}.`;
  window.open(WA + encodeURIComponent(msg), '_blank', 'noopener');
});

// ── Movimiento ──
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;

function animar() {
  if (reducido || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('anim');
  const suave = 'power3.out';

  // portada: entrada en cascada y foto que se aleja apenas al bajar
  gsap.fromTo('.hero [data-txt]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.1, ease: suave, stagger: .14, delay: .15 });
  gsap.fromTo('.hero-marca', { yPercent: 18, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.4, ease: suave, delay: .35 });
  gsap.to('.hero-foto img', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // textos: aparición suave
  gsap.utils.toArray('[data-txt]').forEach((el) => {
    if (el.closest('.hero')) return;
    gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: suave, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  // listas: en cascada
  gsap.utils.toArray('[data-stagger]').forEach((lista) => {
    gsap.fromTo(lista.children, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .8, ease: suave, stagger: .09, scrollTrigger: { trigger: lista, start: 'top 85%', once: true } });
  });

  // fotos: se descubren de abajo hacia arriba y la imagen se asienta
  gsap.utils.toArray('[data-clip]').forEach((caja) => {
    const img = caja.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: caja, start: 'top 85%', once: true } });
    tl.fromTo(caja, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.out' })
      .fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.6, ease: suave, clearProps: 'transform' }, 0);
  });

  // propiedad protagonista: la foto crece hasta ocupar todo el ancho
  gsap.fromTo('.prota-foto', { scale: .82 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.prota', start: 'top 85%', end: 'top 15%', scrub: true } });
  gsap.fromTo('.prota-foto img', { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.prota', start: 'top 85%', end: 'bottom top', scrub: true } });

  // parallax muy leve en las fotos de inversiones
  gsap.utils.toArray('.inv-foto img').forEach((img) => {
    gsap.fromTo(img, { yPercent: -4, scale: 1.08 }, { yPercent: 4, scale: 1.08, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // por si las fuentes cambian alturas después de calcular
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

// los scripts con defer corren en orden: GSAP ya está cargado acá
animar();
