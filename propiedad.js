// Valterra — página de una propiedad: propiedad.html?p=<clave> (datos en fichas.js).

(() => {
  const clave = new URLSearchParams(location.search).get('p');
  const p = FICHAS[clave];
  if (!p) { location.replace('index.html#propiedades'); return; }

  const $ = (id) => document.getElementById(id);
  const fotos = p.fotos;
  const total = fotos.length;
  const [estado, tipo] = p.op.split(' · ');
  const alquiler = estado === 'Alquiler';
  const vertical = ([, , , w, h]) => h > w;
  const consulta = WA + encodeURIComponent(`Hola Valterra, me interesa ${p.msg}. ¿Me pasan más información?`);

  document.title = `${p.nom} · Valterra Real Estate`;
  document.querySelector('meta[name="description"]').content = `${p.op}. ${p.desc[0]}`;

  // 1. identificación
  $('pp-miga').textContent = p.nom;
  $('pp-estado').textContent = estado;
  $('pp-tipo').textContent = tipo;
  $('pp-nom').textContent = p.nom;
  $('pp-lugar').textContent = p.lugar;
  $('pp-contacto-nom').textContent = p.msg;

  // 2. precio
  $('pp-valor-et').textContent = alquiler ? 'Alquiler mensual' : 'Precio de venta';
  $('pp-precio').innerHTML = p.precio;
  $('pp-wa').href = consulta;
  $('pp-wa2').href = consulta;
  $('pp-visita').href = WA + encodeURIComponent(`Hola Valterra, quiero coordinar una visita a ${p.msg}.`);

  // foto principal: las verticales van al costado de la identificación, las horizontales a todo el ancho
  const [img0, que0, , w0, h0] = fotos[0];
  const principal = $('pp-principal-img');
  Object.assign(principal, { src: `img/${img0}.webp`, alt: que0, width: w0, height: h0 });
  $('pp-principal-cap').textContent = que0;
  $('pp-total').textContent = total;
  document.querySelector('.pp-portada').classList.toggle('es-vertical', vertical(fotos[0]));

  // 3. características principales: las cuatro primeras; el resto va a información adicional
  const principales = p.datos.slice(0, 4);
  const resto = p.datos.slice(4);
  $('pp-datos').innerHTML = principales.map(([t, v]) => `<div><dt>${t}</dt><dd>${v}</dd></div>`).join('');

  // galería: de a pares, la foto vertical angosta y la horizontal ancha; los pares se alternan
  const anchos = [];
  for (let i = 1; i < total; i += 2) {
    const a = fotos[i], b = fotos[i + 1];
    if (!b) { anchos.push('g-sola'); break; }
    const par = (i - 1) / 2;
    if (vertical(a) !== vertical(b)) anchos.push(vertical(a) ? 'g-5' : 'g-7', vertical(a) ? 'g-7' : 'g-5');
    else anchos.push(par % 2 ? 'g-5' : 'g-7', par % 2 ? 'g-7' : 'g-5');
  }
  $('pp-galeria').innerHTML = fotos.slice(1).map((f, j) => {
    const [img, que, , w, h] = f;
    return `<figure class="pp-g ${anchos[j]} ${vertical(f) ? 'es-vertical' : ''}">
      <button type="button" data-i="${j + 1}" aria-label="Ampliar: ${que}"><img src="img/${img}.webp" alt="${que}" width="${w}" height="${h}" loading="lazy" decoding="async"></button>
      <figcaption><span>${que}</span><span class="pp-g-n">${j + 2} / ${total}</span></figcaption>
    </figure>`;
  }).join('');

  // 4. descripción
  $('pp-desc').innerHTML = p.desc.map((t) => `<p>${t}</p>`).join('');

  // 5. información adicional
  const ficha = [['Operación', estado], ['Tipo', tipo], ['Ubicación', p.lugar], ...resto];
  $('pp-ficha').innerHTML = ficha.map(([t, v]) => `<div><dt>${t}</dt><dd>${v}</dd></div>`).join('');
  $('pp-carac').innerHTML = p.carac.map((c) => `<li>${c}</li>`).join('');

  // otras propiedades
  $('pp-otras').innerHTML = ORDEN.filter((k) => k !== clave).map((k) => {
    const q = FICHAS[k];
    const [e, t] = q.op.split(' · ');
    return `<article class="pp-otra">
      <div class="pp-otra-foto"><img src="img/${q.fotos[0][0]}.webp" alt="${q.fotos[0][1]}" loading="lazy" decoding="async"></div>
      <p class="pp-otra-op"><span>${e}</span> ${t}</p>
      <h3 class="pp-otra-nom"><a href="propiedad.html?p=${k}">${q.nom}</a></h3>
      <p class="pp-otra-lugar">${q.lugar}</p>
      <p class="pp-otra-precio">${q.precio}</p>
    </article>`;
  }).join('');
  $('pp-otras').querySelectorAll('.pp-otra').forEach((art) => art.addEventListener('click', (e) => {
    if (!e.target.closest('a')) location.href = art.querySelector('a').href;
  }));

  // ── Visor de fotos ──
  const lb = $('lb');
  const lbImg = $('lb-img');
  let actual = 0;
  let origen = null;

  const mostrar = (i) => {
    actual = (i + total) % total;
    const [img, que, , w, h] = fotos[actual];
    lbImg.classList.add('cambiando');
    const nueva = new Image();
    nueva.src = `img/${img}.webp`;
    nueva.decode().catch(() => {}).then(() => {
      Object.assign(lbImg, { src: nueva.src, alt: que, width: w, height: h });
      lbImg.classList.remove('cambiando');
    });
    $('lb-cap').textContent = que;
    $('lb-n').textContent = `${actual + 1} / ${total}`;
    // la siguiente ya queda cargada
    new Image().src = `img/${fotos[(actual + 1) % total][0]}.webp`;
  };
  const abrir = (i, desde) => {
    origen = desde;
    mostrar(i);
    lb.showModal();
    document.documentElement.classList.add('lb-abierto');
  };

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (b) abrir(Number(b.dataset.i), b);
  });
  $('lb-ant').addEventListener('click', () => mostrar(actual - 1));
  $('lb-sig').addEventListener('click', () => mostrar(actual + 1));
  $('lb-cerrar').addEventListener('click', () => lb.close());
  // un toque fuera de la foto también cierra
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-fig')) lb.close(); });
  lb.addEventListener('close', () => {
    document.documentElement.classList.remove('lb-abierto');
    origen?.focus({ preventScroll: true });
  });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') mostrar(actual - 1);
    if (e.key === 'ArrowRight') mostrar(actual + 1);
  });
  // deslizar con el dedo
  let x0 = null;
  lb.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') x0 = e.clientX; });
  lb.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) mostrar(actual + (dx < 0 ? 1 : -1));
  });
})();
