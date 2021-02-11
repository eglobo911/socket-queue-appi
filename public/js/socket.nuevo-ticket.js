// comando para establecer comunicacion con el servidor
var socket = io();

var label = $("#lblNuevoTicket");

// escuchar al servidor - los 'on' son para escuchar
socket.on("connect", function () {
  console.log("Se hizo conexion con el servidor");
});

socket.on("disconnect", function () {
  console.log("Se perdio conexion con el servidor");
});

socket.on("EstadoActual", function (resp) {
  label.text(resp.actual);
});

$("button").on("click", function () {
  socket.emit("siguienteTicket", null, function (siguienteTicket) {
    label.text(siguienteTicket);
  });
});
