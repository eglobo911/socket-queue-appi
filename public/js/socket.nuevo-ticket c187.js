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

$("button").on("click", function () {
  //console.log("se envio un click");
  socket.emit("siguienteTicket", null, function (siguienteTicket) {
    label.text(siguienteTicket);
  });
});
