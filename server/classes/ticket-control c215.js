const fs = require("fs");

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = []; // agregar arreglo al objeto de trabajo

    let data = require("../data/data.json");

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimos4 = data.ultimos4; // asignar arreglo del archivo json al arreglo objeto de trabajo
    } else {
      this.reiniciarConteo();
    }
  }

  siguiente() {
    this.ultimo += 1;
    let ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.grabarArchivo();
    return `Ticket ${this.ultimo} `;
  }

  getUltimoTicket() {
    return `Ticket ${this.ultimo} `;
  }

  getUltimos4() {
    return this.ultimos4;
  }

  atenderTicket(escritorio) {
    if (this.tickets.length === 0) {
      return "No hay tickets pendientes por procesar";
    }

    // extraer el primer elemento del arreglo de trabajo y a continuacion lo borra
    let numeroTicket = this.tickets[0].numero;
    this.tickets.shift();

    // crear objeto 'atenderTicket' con el constructor 'Ticket()'
    let atenderTicket = new Ticket(numeroTicket, escritorio);
    console.log(atenderTicket);

    // agregar objeto 'atenderTicket' como primer elemento al inicio del arreglo
    this.ultimos4.unshift(atenderTicket);

    // borrar el ultimo elemento despues del 4
    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(-1, 1);
    }

    console.log("Ultimos 4");
    console.log(this.ultimos4);

    this.grabarArchivo();

    return atenderTicket;
  }

  reiniciarConteo() {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = []; // reiniciar el arreglo

    console.log("Se inicializo el contador de tickets");
    this.grabarArchivo();
  }

  grabarArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4, // incluir el arreglo
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}

module.exports = {
  TicketControl,
};
