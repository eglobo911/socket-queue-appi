// comando para establecer comunicacion con el servidor
var socket = io();

// obtener los parametros recibidos en el 'url'
var searchParams = new URLSearchParams(window.location.search);

// crear variable para aplicar instrucciones a todos las etiquetas 'small'
var label = $("small");

// checar si en los paramtros del 'url' viene el 'escritorio' y ejecutar accion dependiendo del resultado
if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es requerido");
}

var escritorio = searchParams.get("escritorio");

//console.log(escritorio);

// desplegar el escritorio en la pagina web
$("h1").text("Escritorio " + escritorio);

// detectar 'click' en boton 'Atender siguiente ticket', enviar al servidor msg con los argumentos 'escritorio' y un 'callback'
$("button").on("click", function () {
  socket.emit("atenderTicket", { escritorio: escritorio }, function (resp) {
    if (resp === "Teclee un numero de escritorio valido") {
      alert(resp);
      return;
    }
    if (resp === "No hay tickets pendientes por procesar") {
      alert(resp);
      return;
    }
    label.text(" ticket " + resp.numero);
  });
});
