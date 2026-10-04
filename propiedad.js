// Valterra — página de una propiedad: propiedad.html?p=<clave> (datos en fichas.js).

(() => {
  const clave = new URLSearchParams(location.search).get('p');
  const p = FICHAS[clave];
  if (!p) { location.replace('index.html#propiedades'); return; }

  const $ = (id) => document.getElementById(id);
  const total = p.fotos.length;
  const consulta = WA + encodeURIComponent(`Hola Valterra, me interesa ${p.msg}. ¿Me pasan más información?`);

  document.title = `${p.nom} · Valterra Real Estate`;
  document.querySelector('meta[name="description"]').content = `${p.op}. ${p.desc}`;

  $('pp-miga').textContent = p.nom;
  $('pp-op').textContent = p.op;
  $('pp-nom').textContent = p.nom;
  $('pp-lugar').textContent = p.lugar;
  $('pp-precio').innerHTML = p.precio;
  $('pp-wa').href = consulta;
  $('pp-wa2').href = consulta;
  $('pp-visita').href = WA + encodeURIComponent(`Hola Valterra, quiero coordinar una visita a ${p.msg}.`);

  // mosaico: cada foto lleva a su versión grande más abajo
  $('pp-mosaico').innerHTML = p.fotos.map(([img, que], i) =>
    `<a class="pp-m" href="#foto-${i + 1}"><img src="img/${img}.webp" alt="${que}" ${i > 2 ? 'loading="lazy"' : ''} decoding="async"></a>`).join('');
  $('pp-cuenta').textContent = `${total} fotos`;

  $('pp-datos').innerHTML = p.datos.map(([t, v]) => `<div><dt>${t}</dt><dd>${v}</dd></div>`).join('');
  $('pp-desc').textContent = p.desc;
  $('pp-carac').innerHTML = p.carac.map((c) => `<li>${c}</li>`).join('');

  $('pp-fotos').innerHTML = p.fotos.map(([img, que], i) =>
    `<figure class="pp-foto" id="foto-${i + 1}"><img src="img/${img}.webp" alt="${que}" loading="lazy" decoding="async">` +
    `<figcaption><span>${que}</span><span class="pp-foto-n">Foto ${i + 1} de ${total}</span></figcaption></figure>`).join('');

  // otras propiedades, con el mismo formato de tarjeta que la portada
  const dato = (q, t) => q.datos.find(([n]) => n === t)?.[1] ?? '';
  $('pp-otras').innerHTML = ORDEN.filter((k) => k !== clave).map((k) => {
    const q = FICHAS[k];
    return `<article class="prop">
      <a class="prop-foto" href="propiedad.html?p=${k}"><img src="img/${q.fotos[0][0]}.webp" alt="${q.fotos[0][1]}" loading="lazy"><span class="prop-n">${q.fotos.length} fotos</span></a>
      <div class="ficha">
        <p class="ficha-op">${q.op}</p>
        <h3 class="ficha-nom">${q.nom}</h3>
        <p class="ficha-lugar">${q.lugar}</p>
        <p class="ficha-linea">${dato(q, 'Superficie')} <span aria-hidden="true">·</span> ${dato(q, 'Ambientes')} amb. <span aria-hidden="true">·</span> ${dato(q, 'Dormitorios')} dorm.</p>
        <div class="ficha-pie"><p class="ficha-precio">${q.precio}</p><a class="ficha-ver" href="propiedad.html?p=${k}">Ver ficha</a></div>
      </div>
    </article>`;
  }).join('');
  $('pp-otras').querySelectorAll('.prop').forEach((card) => card.addEventListener('click', (e) => {
    if (!e.target.closest('a')) location.href = card.querySelector('.ficha-ver').href;
  }));
})();
