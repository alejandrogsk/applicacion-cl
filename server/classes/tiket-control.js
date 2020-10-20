const fs = require("fs");

class Ticket {
	constructor(numero, escritorio) {
		this.numero = numero;
		this.escritorio = escritorio;
	}
}

class TiketControl {
	constructor() {
		this.ultimo = 0;
		this.hoy = new Date().getDate();
		this.tickets = [];
		this.ultimos4 = [];

		let data = require("../data/data.json");

		if (data.hoy === this.hoy) {
			this.ultimo = data.ultimo;
			this.tickets = data.tickets;
			this.ultimos4 = data.ultimos4;
		} else {
			this.reiniciarConteo();
		}
	}

	siguienteTiket() {
		this.ultimo += 1;

		let ticket = new Ticket(this.ultimo, null);
		this.tickets.push(ticket);

		this.grabarArchivo();

		return `Ticket ${this.ultimo}`;
	}

	getUltimoTicket() {
		return `Ticket ${this.ultimo}`;
	}

	getUltimos4() {
		return this.ultimos4;
	}

	//escritorio = la persona que me atiende
	atenderTicket(escritorio) {
		//Hay tickets por atender?
		if (this.tickets.length === 0) {
			return "No hay tickets";
		}

		let numeroTicket = this.tickets[0].numero;

		//elimino la primera posición del arreglo
		this.tickets.shift();

		//Creo un nuevo ticket y establesco el escritorio
		let atenderTicket = new Ticket(numeroTicket, escritorio);

		//Agrego el ticket al inicio del arreglo
		this.ultimos4.unshift(atenderTicket);

		//Verifico que existan 4 tickets en este arreglo
		if (this.ultimos4.length > 4) {
			this.ultimos4.splice(-1, 1); //Borrar el ultimo
		}

		console.log("Ultimos 4");
		console.log(this.ultimos4);

		//Grabo el archivo
		this.grabarArchivo();

		//Regreso el archivo a atender
		return atenderTicket;
	}

	reiniciarConteo() {
		this.ultimo = 0;
		this.tickets = [];
		this.ultimos4 = [];
		this.grabarArchivo();
	}

	grabarArchivo() {
		let jsonData = {
			ultimo: this.ultimo,
			hoy: this.hoy,
			tickets: this.tickets,
			ultimos4: this.ultimos4,
		};

		//El json siempre se envía con formato String
		let jsonDataString = JSON.stringify(jsonData);

		//Guardar la información mediante file sistem (fs)
		fs.writeFileSync("./server/data/data.json", jsonDataString);
	}
}

module.exports = {
	TiketControl,
};
