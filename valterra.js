// Valterra — header, menú, buscador y movimiento (GSAP + ScrollTrigger).

const WA = 'https://wa.me/5491140676706?text=';

// ── Header: sólido y más bajo después de la portada ──
const cab = document.getElementById('cab');
const alScrollear = () => cab.classList.toggle('solido', scrollY > 40);
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

// ── Ficha ampliada: más fotos y más datos de cada propiedad ──
const FICHAS = {
  recoleta: {
    op: 'Venta · Departamento', nom: 'Piso de época en Recoleta', lugar: 'Recoleta, CABA', precio: 'USD 595.000',
    msg: 'el piso de época en Recoleta',
    datos: [['Superficie', '210 m²'], ['Ambientes', '5'], ['Dormitorios', '3'], ['Baños', '2 y toilette'], ['Piso', 'Alto'], ['Cochera', 'No']],
    desc: 'Piso completo en un edificio de estilo francés, con balcones de hierro sobre la calle. Recepción en dos ambientes que se comunican, techos altos con molduras y tres dormitorios hacia el contrafrente, lejos del ruido de la calle.',
    carac: ['Techos altos con molduras originales', 'Pisos de roble en la recepción', 'Balcones franceses al frente', 'Dependencia de servicio', 'Ascensor y portería', 'A pocas cuadras de Plaza Francia'],
    fotos: [
      ['prop-recoleta-piso', 'Fachada del edificio, estilo francés', 'Gelpgim22 · CC BY-SA 3.0'],
      ['g-recoleta-2', 'Balcones de hierro y mansarda', 'Gelpgim22 · CC BY-SA 3.0'],
      ['g-recoleta-3', 'Living · foto de referencia', 'Tschäff · CC BY-SA 2.0'],
      ['g-recoleta-4', 'Comedor · foto de referencia', 'Tschäff · CC BY-SA 2.0'],
      ['g-recoleta-5', 'Dormitorio · foto de referencia', 'wwarby · CC BY 2.0'],
    ],
  },
  'belgranor-casa': {
    op: 'Venta · Casa con jardín', nom: 'Casa en Belgrano R', lugar: 'Belgrano R, CABA', precio: 'USD 1.050.000',
    msg: 'la casa en Belgrano R',
    datos: [['Superficie', '380 m²'], ['Ambientes', '7'], ['Dormitorios', '4'], ['Baños', '3'], ['Plantas', '2'], ['Cochera', '2 autos']],
    desc: 'Casa de estilo pintoresco en una calle arbolada de Belgrano R, con balcón de madera y jardín al fondo. Living con hogar, comedor con puertas vidriadas y una cocina que se abre a la galería.',
    carac: ['Jardín propio con galería', 'Living con hogar a leña', 'Pisos de madera', 'Dormitorio principal en suite', 'Cochera cubierta para dos autos', 'Cerca de la estación Belgrano R'],
    fotos: [
      ['prop-belgrano-r-casa', 'Fachada con balcón de madera', 'Alv Erteynsteyn · CC BY-SA 4.0'],
      ['g-belgranor-casa-2', 'Living con hogar · foto de referencia', 'Kendyl Young · CC BY 2.0'],
      ['g-belgranor-casa-3', 'Sala de estar · foto de referencia', 'Kendyl Young · CC BY 2.0'],
      ['g-belgranor-casa-4', 'Comedor · foto de referencia', 'lisa.williams · CC BY 2.0'],
      ['g-belgranor-casa-5', 'Cocina y galería · foto de referencia', 'Arielvito · CC BY-SA 4.0'],
    ],
  },
  nordelta: {
    op: 'Alquiler · Departamento con pileta', nom: 'Departamento con amenities en Nordelta', lugar: 'Nordelta, Tigre', precio: 'USD 1.300 <small>por mes</small>',
    msg: 'el departamento en alquiler en Nordelta',
    datos: [['Superficie', '118 m²'], ['Ambientes', '3'], ['Dormitorios', '2'], ['Baños', '2'], ['Balcón', 'Terraza'], ['Cochera', '1 auto']],
    desc: 'Departamento luminoso en un edificio bajo dentro de un barrio con seguridad, rodeado de parque. Living y comedor integrados que salen a la terraza, dos dormitorios y acceso a la pileta y los espacios comunes.',
    carac: ['Pileta y solárium', 'Parque y senderos del barrio', 'Seguridad las 24 horas', 'Terraza con parrilla', 'Cochera cubierta', 'Contrato en dólares'],
    fotos: [
      ['prop-nordelta-depto', 'Edificios del barrio con pileta y parque', 'Grupo Monarca · CC BY-SA 4.0'],
      ['g-nordelta-2', 'Pileta del edificio', 'Grupo Monarca · CC BY-SA 4.0'],
      ['g-nordelta-3', 'Parque y casas del barrio', 'Grupo Monarca · CC BY-SA 4.0'],
      ['g-nordelta-4', 'Living · foto de referencia', 'Sugar Beach Residences · CC BY 2.0'],
      ['g-nordelta-5', 'Comedor · foto de referencia', 'Sugar Beach Residences · CC BY 2.0'],
    ],
  },
  'belgranor-villa': {
    op: 'Venta · Casa con patio', nom: 'Casona con torre en Belgrano R', lugar: 'Belgrano R, CABA', precio: 'USD 885.000',
    msg: 'la casona en Belgrano R',
    datos: [['Superficie', '320 m²'], ['Ambientes', '6'], ['Dormitorios', '4'], ['Baños', '3'], ['Plantas', '2 y torre'], ['Cochera', '1 auto']],
    desc: 'Casona blanca con torre y portón de madera, de las que dan carácter a Belgrano R. Ambientes amplios en planta baja, patio con pileta y un pasillo con plantas y baldosas calcáreas que lleva al fondo.',
    carac: ['Patio con pileta', 'Baldosas calcáreas originales', 'Torre con vista al barrio', 'Ventanales con postigos', 'Quincho y parrilla', 'Para reciclar a gusto'],
    fotos: [
      ['prop-belgrano-r-villa', 'Fachada con torre y portón de madera', 'Alv Erteynsteyn · CC BY-SA 4.0'],
      ['g-belgranor-villa-2', 'Patio con pileta · foto de referencia', 'Mark Surman · CC BY 2.0'],
      ['g-belgranor-villa-3', 'Pasillo con baldosas calcáreas · foto de referencia', 'Mark Surman · CC BY 2.0'],
      ['g-belgranor-villa-4', 'Living · foto de referencia', 'Oyvind Solstad · CC BY 2.0'],
      ['g-belgranor-villa-5', 'Ventanal al jardín · foto de referencia', 'Ariwerber · CC BY-SA 4.0'],
    ],
  },
  barrionorte: {
    op: 'Venta · Departamento', nom: 'Piso en Barrio Norte', lugar: 'Barrio Norte, CABA', precio: 'USD 455.000',
    msg: 'el piso en Barrio Norte',
    datos: [['Superficie', '160 m²'], ['Ambientes', '4'], ['Dormitorios', '3'], ['Baños', '2'], ['Piso', 'Intermedio'], ['Cochera', 'No']],
    desc: 'Departamento en un edificio de piedra con balcones curvos y mansarda sobre la calle Callao. Living amplio con cocina integrada y tres dormitorios, a pocas cuadras de la avenida Santa Fe y del subte.',
    carac: ['Edificio de piedra con mansarda', 'Balcón al frente', 'Cocina integrada y lavadero', 'Placares en los dormitorios', 'Portería', 'Cerca del subte línea D'],
    fotos: [
      ['prop-barrio-norte-piso', 'Fachada sobre la calle Callao', 'Anastasiya Lvova · CC BY 3.0'],
      ['g-barrionorte-2', 'Living · foto de referencia', 'danxoneil · CC BY 2.0'],
      ['g-barrionorte-3', 'Living con cocina integrada · foto de referencia', 'aforero · CC BY 2.0'],
      ['g-barrionorte-4', 'Dormitorio principal · foto de referencia', 'travelwayoflife · CC BY-SA 2.0'],
      ['g-barrionorte-5', 'Segundo dormitorio · foto de referencia', 'blmurch · CC BY 2.0'],
    ],
  },
};

const ver = document.getElementById('ver');
const $ = (id) => document.getElementById(id);
const tira = $('ver-tira');
const minis = $('ver-minis');
let fichaActual = null;
let fotoActual = 0;
let quienAbrio = null;

const mostrarFoto = (i) => {
  const f = FICHAS[fichaActual].fotos;
  fotoActual = Math.max(0, Math.min(f.length - 1, i));
  $('ver-i').textContent = fotoActual + 1;
  $('ver-que').textContent = f[fotoActual][1];
  minis.querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-current', String(j === fotoActual)));
  ver.querySelector('.ver-ant').disabled = fotoActual === 0;
  ver.querySelector('.ver-sig').disabled = fotoActual === f.length - 1;
};
const irAFoto = (i) => {
  const n = FICHAS[fichaActual].fotos.length;
  i = Math.max(0, Math.min(n - 1, i));
  tira.scrollTo({ left: i * tira.clientWidth, behavior: reducido ? 'auto' : 'smooth' });
  mostrarFoto(i);
};

const abrirFicha = (clave) => {
  const p = FICHAS[clave];
  if (!p) return;
  fichaActual = clave;
  $('ver-op').textContent = p.op;
  $('ver-nom').textContent = p.nom;
  $('ver-lugar').textContent = p.lugar;
  $('ver-precio').innerHTML = p.precio;
  $('ver-datos').innerHTML = p.datos.map(([t, v]) => `<div><dt>${t}</dt><dd>${v}</dd></div>`).join('');
  $('ver-desc').textContent = p.desc;
  $('ver-carac').innerHTML = p.carac.map((c) => `<li>${c}</li>`).join('');
  $('ver-wa').href = WA + encodeURIComponent(`Hola Valterra, me interesa ${p.msg}. ¿Me pasan más información?`);
  $('ver-visita').href = WA + encodeURIComponent(`Hola Valterra, quiero coordinar una visita a ${p.msg}.`);
  $('ver-n').textContent = p.fotos.length;
  tira.innerHTML = p.fotos.map(([img, que], i) =>
    `<figure class="ver-foto"><img src="img/${img}.webp" alt="${que}" ${i ? 'loading="lazy"' : ''} decoding="async"></figure>`).join('');
  minis.innerHTML = p.fotos.map(([img, que], i) =>
    `<button type="button" aria-label="Ver foto ${i + 1}: ${que}"><img src="img/${img}.webp" alt="" loading="lazy"></button>`).join('');
  ver.showModal();
  document.body.classList.add('menu-abierto');
  tira.scrollLeft = 0;
  ver.querySelector('.ver-info').scrollTop = 0;
  ver.querySelector('.ver-caja').scrollTop = 0;
  mostrarFoto(0);
  history.replaceState(null, '', '#ficha-' + clave);
};

document.querySelectorAll('[data-ficha]').forEach((el) => el.addEventListener('click', (e) => {
  e.preventDefault();
  quienAbrio = el;
  abrirFicha(el.dataset.ficha);
}));
// en las tarjetas chicas, tocar cualquier parte abre la ficha
document.querySelectorAll('.prop:not(.prop-a)').forEach((card) => card.addEventListener('click', (e) => {
  if (e.target.closest('a, button')) return;
  const boton = card.querySelector('.ficha-ver');
  quienAbrio = boton;
  abrirFicha(boton.dataset.ficha);
}));
ver.querySelector('.ver-cerrar').addEventListener('click', () => ver.close());
ver.addEventListener('click', (e) => { if (e.target === ver) ver.close(); });   // clic en el fondo
ver.addEventListener('close', () => {
  document.body.classList.remove('menu-abierto');
  history.replaceState(null, '', location.pathname + location.search);
  quienAbrio?.focus();
});
ver.querySelector('.ver-ant').addEventListener('click', () => irAFoto(fotoActual - 1));
ver.querySelector('.ver-sig').addEventListener('click', () => irAFoto(fotoActual + 1));
minis.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (b) irAFoto([...minis.children].indexOf(b));
});
ver.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { e.preventDefault(); irAFoto(fotoActual + 1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); irAFoto(fotoActual - 1); }
});
// deslizar con el dedo: el contador sigue a la foto que queda centrada
let esperaScroll;
tira.addEventListener('scroll', () => {
  clearTimeout(esperaScroll);
  esperaScroll = setTimeout(() => mostrarFoto(Math.round(tira.scrollLeft / tira.clientWidth)), 80);
}, { passive: true });

// un link con #ficha-recoleta abre esa ficha directamente
const desdeLink = location.hash.match(/^#ficha-(.+)$/);
if (desdeLink && FICHAS[desdeLink[1]]) abrirFicha(desdeLink[1]);

// ── Movimiento ──
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;

function animar() {
  if (reducido || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('anim');
  const suave = 'power3.out';

  // portada: entrada en cascada y foto que se aleja apenas al bajar
  gsap.fromTo('.hero [data-txt]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.1, ease: suave, stagger: .14, delay: .15 });
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
