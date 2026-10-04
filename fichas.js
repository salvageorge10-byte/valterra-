// Valterra — datos de cada propiedad (fichas de muestra). Los usa propiedad.html.
// Para cargar una propiedad real: cambiar textos, precio y fotos acá.

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

// orden en que se listan
const ORDEN = ['recoleta', 'belgranor-casa', 'nordelta', 'belgranor-villa', 'barrionorte'];
