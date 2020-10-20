//Comando para establecer la conexión
const socket = io();

const $label = document.getElementById("lblNuevoTicket");

socket.on("connect", () => {
	console.log("Conectado al servidor");
});

socket.on("disconnect", () => {
	console.log("Falla en la conexión");
});

socket.on("estadoActual", resp => {
	$label.innerHTML = resp.estadoActual;
});

// socket.on("connect", () => {
// 	socket.emit("estadoActual", null, estadoActual => {
// 		$label.innerHTML = estadoActual;
// 	});
// });

let $boton = document.getElementsByTagName("button");

$boton[0].addEventListener("click", () => {
	socket.emit("siguienteTicket", null, siguienteTicket => {
		$label.innerHTML = siguienteTicket;
	});
});
