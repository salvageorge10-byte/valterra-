// Arma el mensaje de WhatsApp a partir de la frase del formulario de tasación.
(function () {
  var WA = "5491140676706";
  var form = document.getElementById("tasador");
  var op = document.getElementById("op");
  var tipo = document.getElementById("tipo");
  var amb = document.getElementById("amb");
  var barrio = document.getElementById("barrio");
  var art = document.getElementById("art");
  var deAmb = document.getElementById("de-amb");
  var campoAmb = document.getElementById("campo-amb");
  var enviar = document.getElementById("enviar");

  // Barrios porteños para el autocompletado (los mismos de la sección Zona).
  var lista = document.getElementById("barrios");
  document.querySelectorAll(".barrios span").forEach(function (s) {
    var o = document.createElement("option");
    o.value = s.textContent;
    lista.appendChild(o);
  });

  var sinAmbientes = ["local", "oficina", "terreno"];

  function actualizar() {
    var comprar = op.value === "comprar";
    art.textContent = comprar ? "un" : "mi";
    var conAmb = sinAmbientes.indexOf(tipo.value) === -1;
    deAmb.hidden = !conAmb;
    campoAmb.hidden = !conAmb;
    enviar.textContent = comprar ? "Consultar por WhatsApp" : "Pedir tasación sin cargo";
  }

  function mensaje() {
    var conAmb = !campoAmb.hidden;
    var lugar = barrio.value.trim();
    var frase = "quiero " + op.value + " " + art.textContent + " " + tipo.value +
      (conAmb ? " de " + amb.value : "") +
      (lugar ? " en " + lugar : "");
    var pedido = op.value === "comprar"
      ? "¿Me pueden asesorar?"
      : "¿Me pasan una tasación sin cargo?";
    return "Hola Valterra, " + frase + ". " + pedido;
  }

  op.addEventListener("change", actualizar);
  tipo.addEventListener("change", actualizar);
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(mensaje()), "_blank", "noopener");
  });
  actualizar();
})();
