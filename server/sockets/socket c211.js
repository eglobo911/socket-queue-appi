const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
  client.on("siguienteTicket", (data, callback) => {
    let siguiente = ticketControl.siguiente();
    console.log(siguiente);
    callback(siguiente);
  });

  client.emit("EstadoActual", {
    actual: ticketControl.getUltimoTicket(),
  });

  // escuchar al cliente solicitud de atender ticket
  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        mensaje: "El escritorio es requerido",
      });
    }
    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    callback(atenderTicket);
  });
});
