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
    ultimos4: ticketControl.getUltimos4(),
  });

  // escuchar al cliente solicitud de atender ticket
  client.on("atenderTicket", (data, callback) => {
    if (Number(data.escritorio) < 1) {
      callback("Teclee un numero de escritorio valido");
      return;
    }
    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    callback(atenderTicket);

    // enviar msg 'ultimos4' a todos los clientes conectados informando que hubo un cambio en los tickets atendidos
    client.broadcast.emit("ultimos4", {
      ultimos4: ticketControl.getUltimos4(),
    });
  });
});
