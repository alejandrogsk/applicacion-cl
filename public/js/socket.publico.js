//Comando para establecer la conexion
const socket = io();

const lblTicket1 = document.getElementById("lblTicket1"),
	lblTicket2 = document.getElementById("lblTicket2"),
	lblTicket3 = document.getElementById("lblTicket3"),
	lblTicket4 = document.getElementById("lblTicket4"),
	lblEscritorio1 = document.getElementById("lblEscritorio1"),
	lblEscritorio2 = document.getElementById("lblEscritorio2"),
	lblEscritorio3 = document.getElementById("lblEscritorio3"),
	lblEscritorio4 = document.getElementById("lblEscritorio4");

const lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
const lblEscritorios = [
	lblEscritorio1,
	lblEscritorio2,
	lblEscritorio3,
	lblEscritorio4,
];

socket.on("estadoActual", resp => {
	actualizaHTML(resp.ultimos4);
});

//on 'ultimos4'
socket.on("ultimos4", resp => {
	let audio = new Audio("audio/new-ticket.mp3");

	audio.pause();
	audio.play();
	actualizaHTML(resp.ultimos4);
});

function actualizaHTML(ultimos4) {
	for (let i = 0; i <= ultimos4.length - 1; i++) {
		lblTickets[i].textContent = `Ticket ${ultimos4[i].numero}`;
		lblEscritorios[i].innerHTML = `Escritorio ${ultimos4[i].escritorio}`;
	}
}
